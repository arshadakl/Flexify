"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailServices = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const freelancerRepositoryImpl_1 = require("../repositories/freelancerRepositoryImpl");
const freelancerRepository = new freelancerRepositoryImpl_1.FreelancerRepositoryImpl();
class MailServices {
    // public transporter: Transporter;
    async sendOtp(email, otp) {
        console.log(email, otp);
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.SENDER_MAIL,
                pass: process.env.OTP_KEY,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const mailOptions = {
            from: process.env.SENDER_MAIL,
            to: email,
            subject: "For veryfication email",
            html: `<h1>${otp}</h1>`,
        };
        console.log(`OTP is : ${otp}`);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email ented ", info.response);
                setTimeout(() => {
                    freelancerRepository.clearOTP(email);
                    console.log(`${email} OTP Expired`);
                }, 50000);
            }
        });
    }
}
exports.MailServices = MailServices;
