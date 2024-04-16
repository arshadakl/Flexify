import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AdminRepositoryImpl } from "../repositories/adminRepositoryImpl";

// Extend the Request interface to include a user property
declare global {
 namespace Express {
    interface Request {
      admin?: any; 
    }
 }
}

const adminRepository = new AdminRepositoryImpl();

const protector = async (req: Request, res: Response, next: NextFunction) => {
 console.log("middleware called");
  
 try {
    const token = req.headers.authorization;
    
    console.log(token, "token in mid");
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return res.status(500).json({ message: "Internal server error: JWT_SECRET is not defined" });
    }

    try {
      console.log("befor next called");

      const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
      if (!decodedToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const admin = await adminRepository.findAdminById(decodedToken.id);
      console.log(admin, "admin");
      
      if (!admin) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }
      req.admin = admin;
      
       next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: "session expired please login again" });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      } else {
        console.error("Error in protector middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
 } catch (error) {
    console.error("Error in protector middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
 }
};

export { protector };
