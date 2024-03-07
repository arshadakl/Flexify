// freelancerRepository.ts

import { Freelancer } from "../models/Freelancer";

export interface FreelancerRepository {
    findByUsername(username: string): Promise<Freelancer | null>;
    // Other repository methods related to Freelancer database operations
    checkPassword(username: string, password: string): Promise<boolean>;
}
