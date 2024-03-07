// freelancerService.ts

import { Freelancer } from "../models/Freelancer";
import { FreelancerRepository } from "../repositories/freelancerRepository";

export class FreelancerService {
    constructor(private readonly freelancerRepository: FreelancerRepository) {}

    async login(username: string, password: string): Promise<Freelancer | null> {
        const freelancer = await this.freelancerRepository.findByUsername(username);
        if (!freelancer) {
            return null; // Freelancer not found
        }

        const isPasswordValid = await this.freelancerRepository.checkPassword(username, password);
        if (!isPasswordValid) {
            return null; // Password is incorrect
        }

        return freelancer;
    }

    // Other methods related to FreelancerService
}
