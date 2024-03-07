// src/controllers/freelancerController.ts
import { Request, Response } from "express";
import { FreelancerService } from "../services/freelancerService";

export class FreelancerController {
    constructor(private readonly freelancerService: FreelancerService) {}

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

    // Other controller methods related to Freelancer operations
}

