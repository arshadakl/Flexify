// freelancerService.ts
import bcrypt from 'bcrypt';
import { Freelancer, FreelancerDetails } from "../models/Freelancer";
import { FreelancerRepository } from "../repositories/freelancerRepository";
import { MailServices } from './MailService';
import { FreelancerController } from '../controllers/freelancerController';
import jwt from "jsonwebtoken"

const mailService = new MailServices()

const generateOTP = (length:number = 4):number => {
    return [...new Array(length)].reduce(function (a) {
      return a + Math.floor(Math.random() * 10);
    }, "");
  };
  
export class FreelancerService {
    constructor(private readonly freelancerRepository: FreelancerRepository) {}

    // login services 
    // =======================================
    async login(username: string, password: string): Promise<Freelancer | null> {
        const freelancer = await this.freelancerRepository.findByUsername(username);
        if (!freelancer) {
            return null; 
        }

        const isPasswordValid = await this.freelancerRepository.checkPassword(username, password);
        if (!isPasswordValid) {
            return null; 
        }

        return freelancer;
    }



    //signup
    // ================
    async signup(freelancer: Freelancer): Promise<void> {
        console.log(freelancer);
        
        const existingUsername = await this.freelancerRepository.findByUsername(freelancer.username);
        const existingEmail = await this.freelancerRepository.findByEmail(freelancer.email);
     
        if (existingUsername || existingEmail) {
            throw new Error("Username or email already exists");
            // return
        }
        
        const hashedPassword = await bcrypt.hash(freelancer.password, 10); 
        const OTP:number = generateOTP()

        const newFreelancer: Freelancer = {
            ...freelancer,
            password: hashedPassword,OTP
        };
        
    
        await this.freelancerRepository.create(newFreelancer);
        mailService.sendOtp(freelancer.email,OTP)
        
    }


   async verifyOtp(email:string,code:number):Promise<string | undefined>{
    console.log(email,"reaced");
    const userData =  await this.freelancerRepository.findByEmail(email)
    console.log(userData?.OTP);
    
    if(userData?.OTP===code){
        console.log("otp correct");
        return userData.id
    }else{
        console.log("wrong otp");
        throw new Error("Incorrect OTP Please try again.");
    }
    
    
   }


    async profileCompletionServ(formData:any):Promise<Freelancer | FreelancerDetails>{
        const response:any = await this.freelancerRepository.FreelancerDetailsAdd(formData)
        const FreelancerDs = await this.freelancerRepository.findById(response.user)
        if(FreelancerDs){
            const credentialsResponse = await this.jwtCreation(FreelancerDs)
            return credentialsResponse
        }else{
            throw new Error("wrong")
        }
       
    }


    async jwtCreation(freelancer: Freelancer): Promise<any> {
        if (freelancer !== null) {
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
        } else {
            throw new Error("Email not found");
        }
    }
    
}
