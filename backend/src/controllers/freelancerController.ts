// src/controllers/freelancerController.ts
import { Request, Response } from "express";
import { FreelancerService } from "../services/freelancerService";
import { Freelancer } from "../models/Freelancer";

export class FreelancerController {
    constructor(private readonly freelancerService: FreelancerService) {}


    //login functions
    // =========================
    async login(req: Request, res: Response): Promise<void> {
        
        const { username, password } = req.body;
        console.log(req.body)
        try {
            const freelancer = await this.freelancerService.login(username, password);
            if (freelancer) {
                res.status(200).json(freelancer);
            } else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }


    //signup
    // ============================
    async signup(req: Request, res: Response): Promise<void> {
        const { username, email, password } = req.body;
        const freelancer: Freelancer = { username, email, password };

        try {
            await this.freelancerService.signup(freelancer);
            res.status(201).json({ message: "Freelancer signed up successfully", status:true });
        } catch (error) {
            console.log("failed");
            
            res.json({ error: "Username or email already exists" ,status:false});
            // res.json({ status:false });
        }
    }


    //otp verification 
    // ===========================
    async OtpVerification(req:Request,res:Response):Promise<void>{
        const {email,code} = req.body
        try {
           const userId = await this.freelancerService.verifyOtp(email,code)
           if(userId){
             res.status(200).json({message:"user successfully verified", status:true,userId })
           }
            
        } catch (error) {
            res.json({ error: (error as Error).message ,status:false});
        }
    }
    
    // profile completion functions 
    // ===========================
    async profileCompletion(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body);
            const response = await this.freelancerService.profileCompletionServ(req.body);
            // console.log(response,"2nd response");
            if ("token" in response && "options" in response && "freelancer" in response) {
                const { token, options, freelancer } = response;
    
                console.log("control response: ", response);
    
                if (token && options) {
                    res.status(200).cookie("token", token, options).json({
                        success: true,
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


    

    // 
}

