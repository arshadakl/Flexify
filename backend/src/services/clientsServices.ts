import { ClientDetails } from "../models/Clients";
import { Freelancer } from "../models/Freelancer";
import { ClientRepositoryImpl } from '../repositories/clientsRepository';
import { FreelancerRepository } from "../repositories/freelancerRepository";
import jwt from "jsonwebtoken"


export class ClientService {
    constructor(private readonly clientRepository: ClientRepositoryImpl, private readonly freelancerRepository: FreelancerRepository) {}


    async profileCompletionServ(formData: any): Promise<Freelancer> {
        const response: any = await this.clientRepository.ClientDetailsAdd(formData);
        
        const clientDs = await this.freelancerRepository.findById(response.user)
        console.log(clientDs,"profile completion user");
        if (clientDs) {
            
            const credentialsResponse = await this.jwtCreation(clientDs);
            return credentialsResponse;
        } else {
            throw new Error("Wrong");
        }
    }

    async jwtCreation(freelancer: Freelancer): Promise<any> {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secret is not defined in environment variables.");
        }

        const token = jwt.sign({ id: freelancer.id, email: freelancer.email }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        freelancer.token = token;
        freelancer.password = "";
        const options = {
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        const credentials = { token, options, freelancer };
        return credentials;
    }
}
