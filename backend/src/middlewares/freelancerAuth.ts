import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { FreelancerRepositoryImpl } from "../repositories/freelancerRepositoryImpl";

// Extend the Request interface to include a user property
declare global {
  namespace Express {
    interface Request {
      user?: any; // Update the type of user as per your requirements
    }
  }
}

const freelancerRepository = new FreelancerRepositoryImpl();

const protector = async (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware called");
    
  try {

    const token = req.headers.authorization;
    console.log(token,"tokend in mid");
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in the environment variables.");
      return res.status(500).json({ message: "Internal server error" });
    }

    const decodedToken = jwt.verify(token, jwtSecret) as JwtPayload;
    if (!decodedToken) {      
      return res.status(401).json({ message: "Login expired" });
    }

    const user = await freelancerRepository.find_ById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if(user.isBlocked=="Block"){
        return res.status(401).json({message : "your account is blocked"})
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protector middleware:", error);
    return res.status(401).json({ message: "Login expired" });
  }
};

export {protector};
