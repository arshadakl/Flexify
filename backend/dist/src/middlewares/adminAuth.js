"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protector = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminRepositoryImpl_1 = require("../repositories/adminRepositoryImpl");
const adminRepository = new adminRepositoryImpl_1.AdminRepositoryImpl();
const protector = async (req, res, next) => {
    console.log("middleware called");
    try {
        const token = req.headers.authorization;
        console.log(token, "token in mid");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error("JWT_SECRET is not defined in the environment variables.");
            return res.status(500).json({ message: "Internal server error: JWT_SECRET is not defined" });
        }
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, jwtSecret);
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
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return res.status(401).json({ message: "session expired please login again" });
            }
            else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            }
            else {
                console.error("Error in protector middleware:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
        }
    }
    catch (error) {
        console.error("Error in protector middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.protector = protector;
