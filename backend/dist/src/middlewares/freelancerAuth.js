"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protector = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const freelancerRepositoryImpl_1 = require("../repositories/freelancerRepositoryImpl");
const freelancerRepository = new freelancerRepositoryImpl_1.FreelancerRepositoryImpl();
const protector = async (req, res, next) => {
    console.log("middleware called");
    try {
        const token = req.headers.authorization;
        console.log(token, "token in mid");
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error("JWT_SECRET is not defined in the environment variables.");
            return res.status(500).json({ message: "Internal server error" });
        }
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, jwtSecret);
            const user = await freelancerRepository.find_ById(decodedToken.id);
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            if (user.isBlocked == "Block") {
                return res.status(401).json({ message: "Your account is blocked" });
            }
            req.user = user;
            next();
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
                return res.status(401).json({ message: "Login expired" });
            }
            else {
                throw err;
            }
        }
    }
    catch (error) {
        console.error("Error in protector middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.protector = protector;
