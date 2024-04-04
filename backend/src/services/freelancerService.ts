// freelancerService.ts
import bcrypt from 'bcrypt';
import { Freelancer, FreelancerDetails } from "../models/Freelancer";
import { FreelancerRepository } from "../repositories/freelancerRepository";
import { MailServices } from './MailService';
import { FreelancerController } from '../controllers/freelancerController';
import jwt, { Secret } from "jsonwebtoken"
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from 'jsonwebtoken';
// import { uploadFile } from '../utils/Cloudinary';


const mailService = new MailServices()

const generateOTP = (length: number = 4): number => {
    return [...new Array(length)].reduce(function (a) {
        return a + Math.floor(Math.random() * 10);
    }, "");
};

export class FreelancerService {
    constructor(private readonly freelancerRepository: FreelancerRepository) { }

    // login services 
    // =======================================
    async login(username: string, password: string): Promise<Freelancer | null> {
        const freelancer = await this.freelancerRepository.findByUsername(username);
        if (!freelancer) {
            // return null; 
            throw new Error("Failed to find Freelancer")
        }
        if (freelancer.isBlocked == "Block") {
            throw new Error("your account is blocked")
        }
        const isPasswordValid = await this.freelancerRepository.checkPassword(username, password);
        if (!isPasswordValid) {
            throw new Error("Failed to check")
        }
        freelancer.password = ""
        freelancer.OTP = 0
        const credentialsResponse = await this.jwtCreation(freelancer)
        return credentialsResponse;
    }



    //signup
    // ================
    async signup(freelancer: Freelancer): Promise<string | undefined> {
        console.log(freelancer);

        const existingUsername = await this.freelancerRepository.findByUsername(freelancer.username);
        const existingEmail = await this.freelancerRepository.findByEmail(freelancer.email);

        if (existingUsername || existingEmail) {
            throw new Error("Username or email already exists");
            // return
        }

        const hashedPassword = await bcrypt.hash(freelancer.password, 10);
        const OTP: number = generateOTP()

        const newFreelancer: Freelancer = {
            ...freelancer, profile: "", isBlocked: "unBlock",
            password: hashedPassword, OTP, isVerified: freelancer.isVerified ? 1 : 0
        };


        const response = await this.freelancerRepository.create(newFreelancer);
        if (!freelancer.isVerified) {
            mailService.sendOtp(freelancer.email, OTP)
        }
        const userData = await this.freelancerRepository.findByEmail(freelancer.email)
        console.log(userData, "userData in sign");

        return userData?.id


    }


    async OTPVerificationServ(email: string, code: number): Promise<any> {
        try {
            const userData = await this.freelancerRepository.findByEmail(email);
            if (!userData || !userData.OTP) {
                throw new Error("Invalid email or missing OTP.");
            }

            console.log("Stored OTP:", userData.OTP);
            console.log("Entered OTP:", code);

            if (userData.OTP !== code) {
                throw new Error("Incorrect OTP");
            }
            return { status: true, id: userData.id }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    // want to change functions

    async doVerifyOtp(id: string): Promise<string | undefined> {
        console.log(id, "reached");

        try {
            // const userData = await this.freelancerRepository.findByEmail(email);

            // if (!userData || !userData.OTP) {
            //     throw new Error("Invalid email or missing OTP.");
            // }

            // console.log("Stored OTP:", userData.OTP);
            // console.log("Entered OTP:", code);

            // if (userData.OTP !== code) {
            //     throw new Error("Incorrect OTP");
            // }

            if (id) {
                const verifiedData = await this.freelancerRepository.doVerification(id);
                console.log("User Verified");
                console.log(verifiedData);

                return id;
            }
        } catch (error) {
            console.error("OTP verification error:", error);
            // Rethrow the error to propagate it further if needed
            throw error;
        }
    }


    async reSendotpServ(email: string): Promise<void> {
        try {
            console.log(email, "test");

            const OTP = generateOTP()
            console.log(email, OTP, " resend email");
            const status = await this.freelancerRepository.setNewOTP(email, OTP)
            console.log(status, " # status");

            mailService.sendOtp(email, OTP)
            return status

        } catch (error) {
            throw new Error("faild to create new otp")
        }
    }


    async profileCompletionServ(formData: any): Promise<Freelancer | FreelancerDetails> {
        const response: any = await this.freelancerRepository.FreelancerDetailsAdd(formData)

        console.log(response, "test");
        const FreelancerDs = await this.freelancerRepository.find_ById(response.user)
        console.log(FreelancerDs);

        if (FreelancerDs) {
            const credentialsResponse = await this.jwtCreation(FreelancerDs)
            console.log(credentialsResponse, "datatatatata");

            return credentialsResponse
        } else {
            throw new Error("wrong")
        }

    }


    async profileUpdateServ(formData: any): Promise<Freelancer | FreelancerDetails> {
        const response: any = await this.freelancerRepository.FreelancerDetailsupdate(formData)
        console.log(response, "updation");

        const FreelancerDs = await this.freelancerRepository.findDetailsById(formData.user)
        console.log(FreelancerDs, "new thisnk");

        if (FreelancerDs) {
            return FreelancerDs
        } else {
            throw new Error("wrong")
        }

    }

    async GoogleKeyValidation(key: string): Promise<JwtPayload> {
        try {
            const decoded = jwtDecode(key);
            // console.log(decoded);
            return decoded;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


    // async GoogleLoginEmailValidation(email: string): Promise<any> {
    //     try {
    //         const user = await this.freelancerRepository.findByEmail(email)
    //         console.log(user ,"sdsdsdsdsd");

    //         if (user!==null) {
    //             console.log("user is null");

    //             if(user.isBlocked=="Block"){
    //                 console.log("user Blocked");
    //                 throw new Error("blocked user")
    //             }else{
    //                 user.OTP = 0
    //                 user.password = ""
    //                 const credentialsResponse = await this.jwtCreation(user)
    //                 return credentialsResponse
    //             }

    //         } else {
    //             throw new Error("User not found 1")

    //         }
    //     } catch (error) {
    //         throw new Error("User not found 2")
    //     }
    // }


    async GoogleLoginEmailValidation(email: string): Promise<any> {
        try {
            const user = await this.freelancerRepository.findByEmail(email);
            console.log(user, "sdsdsdsdsd");
            if (user !== null) {
                if (user.isBlocked === "Block") {
                    throw new Error("your account is blocked");
                } else {
                    user.OTP = 0;
                    user.password = "";
                    const credentialsResponse = await this.jwtCreation(user);
                    return credentialsResponse;
                }
            } else {
                throw new Error("User not found 1");
            }
        } catch (error: any) {
            console.error("Error in GoogleLoginEmailValidation:", error.message);
            throw error;
        }
    }


    async profiledataService(token: string) {
        try {
            const decodedToken = await this.validateJWT(token);
            const userData = await this.freelancerRepository.findDetailsById(decodedToken.id);
            if (userData) {
                console.log(userData);
                return userData
            } else {
                throw new Error("User not found ")
            }

        } catch (error) {
            throw new Error("User not found ")
        }
    }

    async updatePrfileImage(token: string, file: string): Promise<any> {
        try {
            const decodedToken = await this.validateJWT(token);

            const response = await this.freelancerRepository.updateProfileImage(decodedToken.id, file);
            console.log(response);

            return response
        } catch (error) {
            throw new Error("User not found ")
        }
    }

    //comming forgot password call
    async forgotPass(email: string): Promise<Boolean> {
        try {

            const response = await this.freelancerRepository.findByEmail(email)
            if (!response) {
                throw new Error("Email not found. Please double-check the address you entered.")
            }
            return true
        } catch (error: any) {
            throw new Error(error.message)
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

    async securityCode(freelancer: Freelancer): Promise<any> {
        if (freelancer !== null) {
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT secret is not defined in environment variables.");
            }

            const token = jwt.sign({ id: freelancer.id, email: freelancer.email, secure: true }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            return token;
        } else {
            throw new Error("Email not found");
        }
    }

    async validateJWT(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const jwtSecret = process.env.JWT_SECRET as Secret | undefined;
            if (!jwtSecret) {
                reject(new Error("JWT secret is not defined in environment variables."));
                return;
            }

            jwt.verify(token, jwtSecret, (err: any, decoded: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            });
        });
    }

    async managePreResetpassword(email: string): Promise<string> {
        try {

            const userData = await this.freelancerRepository.findByEmail(email)
            if (userData) {
                const securityCode = await this.securityCode(userData)
                return securityCode

            } else {
                throw new Error("user not found")
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async managePostResetpassword(password: string, token: string): Promise<string> {
        try {
            const decodeToken = await this.validateJWT(token)
            console.log(decodeToken);
            if (!decodeToken.secure) {
                throw new Error("Unauthorized access token")
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const updateResponse = await this.freelancerRepository.updatePassword(decodeToken.id, hashedPassword)
            return updateResponse
        } catch (error: any) {
            throw new Error(error.message)
        }
    }



}
