// src/controllers/freelancerController.ts
import { Request, Response } from "express";
import { FreelancerService } from "../services/freelancerService";
import { Freelancer, FreelancerDetails } from "../models/Freelancer";
import ImageUploadRepository from "../repositories/ImageUploadRepository";
import { Readable } from 'stream';
import { uploadToCloudinary } from "../utils/Cloudinary";
import fs from 'fs'



const imageUploadRepository = new ImageUploadRepository();

export class FreelancerController {
    constructor(private readonly freelancerService: FreelancerService) { }


    //login functions
    // =========================
    async login(req: Request, res: Response): Promise<void> {

        const { username, password } = req.body;
        console.log(req.body)
        try {
            const response = await this.freelancerService.login(username, password);
            if (response == null) {
                throw new Error("Failed to login")
            }
            if ("token" in response && "options" in response && "freelancer" in response) {
                const { token, options, freelancer } = response;

                console.log("control response: ", response);

                if (token && options) {
                    res.status(200).cookie("token", token, options).json({
                        status: true,
                        token,
                        freelancer,
                    });
                } else {
                    throw new Error("Token or options are undefined");
                }
            } else {
                throw new Error("Response is missing required properties");
            }
            // if (freelancer) {
            //     console.log(freelancer);

            //     res.status(200).json({freelancer,status:true});
            // } 
        } catch (error) {
            res.json({ error: "Invalid credentials", status: false });
        }
    }


    //signup
    // ============================
    async signup(req: Request, res: Response): Promise<void> {
        const { username, email, password } = req.body;
        console.log(req.body);
        
        const freelancer: Freelancer = { username, email, password };

        try {
           const userId = await this.freelancerService.signup(freelancer);
            res.status(201).json({ message: "Freelancer signed up successfully", status: true });
        } catch (error) {
            console.log("failed");

            res.json({ error: "Username or email already exists", status: false });
            // res.json({ status:false });
        }
    }

    async GoogleAuthLogin(req: Request, res: Response): Promise<void> {
        const { key } = req.body
        console.log(key);

        try {
            const decodeResponse = await this.freelancerService.GoogleKeyValidation(key)
            if (decodeResponse.email_verified) {
                const response = await this.freelancerService.GoogleLoginEmailValidation(decodeResponse.email)

                if ("token" in response && "options" in response && "freelancer" in response) {
                    const { token, options, freelancer } = response;

                    console.log("control response: ", response);

                    if (token && options) {
                        res.status(200).cookie("token", token, options).json({
                            status: true,
                            token,
                            freelancer,
                        });
                    } else {
                        // console.log("hi");

                        throw new Error("Token or options are undefined");
                    }
                } else {
                    throw new Error("Token or options are undefined");
                }
            }
        } catch (error) {
            res.json({ error: "User not found", status: false });
        }
    }

    async GoogleAuthentication(req: Request, res: Response): Promise<void> {
        // console.log(req.body);
        const { key } = req.body
        try {
            const decodeResponse = await this.freelancerService.GoogleKeyValidation(key)
            console.log(decodeResponse);
            if (decodeResponse.email_verified) {
                const { name, email, jti } = decodeResponse
                const data = {
                    isVerified: 1, isBlocked: "unBlock",
                    username: name, profile: "",
                    email, password: jti || " "
                }
                const response = await this.freelancerService.signup(data);

                res.status(201).json({ message: "User signed up successfully", status: true, id: response });
            }
            // res.status(200).json({data:decodeResponse})

        } catch (error) {
            res.json({ error: "Username or email already exists", status: false });
        }
    }

    //otp verification 
    // ===========================
    async OtpVerification(req: Request, res: Response): Promise<void> {
        const { email, code } = req.body
        try {
            const userId = await this.freelancerService.verifyOtp(email, code)
            if (userId) {
                console.log(userId);
                
                res.status(200).json({ message: "user successfully verified", status: true, userId })
            } else {
                res.json({ status: false, error: "Incorrect OTP, Please try again." });

            }

        } catch (error) {
            res.json({ error: (error as Error).message, status: false });
        }
    }

    // resend OTP 
    //================================

    async reSendOtp(req: Request, res: Response): Promise<void> {
        try {
            const email = req.body.email
            const response = await this.freelancerService.reSendotpServ(email)
            console.log(response);
            res.status(200).json({ status: true })

        } catch (error) {

        }
    }

    // profile completion functions 
    // ===========================
    async profileCompletion(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body,"body");
            const response = await this.freelancerService.profileCompletionServ(req.body);
            console.log(response,"2nd response");
            if ("token" in response && "options" in response && "freelancer" in response) {
                const { token, options, freelancer } = response;

                console.log("control response: ", response);

                if (token && options) {
                    res.status(200).cookie("token", token, options).json({
                        status: true,
                        token,
                        freelancer,
                    });
                } else {
                    throw new Error("Token or options are undefined");
                }
            } else {
                throw new Error("Response is missing required properties");
            }
        } catch (error) {
            console.error("Error in profile completion:", error);
            res.json({ status: false });
        }
    }

    // profile update functions 
    // ===========================
    async profileUpdate(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body, "new profile");
            const response = await this.freelancerService.profileUpdateServ(req.body);
            console.log(response, "2nd response");
            if (response) {
                // console.log("control response: ", response);
                res.status(200).json({ status: true, response })
            } else {
                throw new Error("Token or options are undefined");
            }

        } catch (error) {
            console.error("Error in profile completion:", error);
            res.json({ status: false });
        }
    }


    async profiledata(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization
            if (token) {
                const userDetails = await this.freelancerService.profiledataService(token)
                res.status(200).json({ userDetails, status: true })
            } else {
                throw new Error("Invalid Request")
            }

        } catch (error) {
            console.log(error);
            res.json({ error, status: false });

        }
    }


    async uploadImage(req: Request, res: Response): Promise<void> {
        try {
            if (!req.file) {
                res.status(400).send('No file uploaded');
                return;
            }
            const token = req.headers.authorization
            console.log(token);

            if (!token) {
                throw new Error('Invalid token')
            }

            const result = await uploadToCloudinary(req.file.path);
            console.log(result);
            const userData = await this.freelancerService.updatePrfileImage(token, result.url)
            fs.unlinkSync(req.file.path);
            userData.password = ""
            userData.OTP = 0
            res.status(200).json({ userData, status: true })
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            res.status(400).json({error,status:false});
        }
    }


}

