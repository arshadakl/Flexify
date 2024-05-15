"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminJwtCreation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AdminJwtCreation = async (data) => {
    if (data !== null) {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secret is not defined in environment variables.");
        }
        const token = jsonwebtoken_1.default.sign({ id: data._id, adminId: data.adminId }, process.env.JWT_SECRET, {
            expiresIn: "7d", // Change the expiration time to 7 days
        });
        // Assuming you're setting a cookie with the token
        const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        const credentials = { token, options, data };
        return credentials;
    }
    else {
        throw new Error("Email not found");
    }
};
exports.AdminJwtCreation = AdminJwtCreation;
