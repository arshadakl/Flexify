// freelancerService.ts
import bcrypt from 'bcrypt';
import { Freelancer, FreelancerDetails } from "../models/Freelancer";
import { FreelancerRepository } from "../repositories/freelancerRepository";
import { MailServices } from './MailService';
import { FreelancerController } from '../controllers/freelancerController';
import jwt, { Secret } from "jsonwebtoken"
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from 'jsonwebtoken';
import { ICategory, ISubcategory } from '../interfaces/adminInterface';
import { uploadMultipleToCloudinary, uploadToCloudinary } from '../utils/Cloudinary';
import { IWork } from '../interfaces/freelancerInterface';
import fs from 'fs'
import { IOrder, ISubmissions, ITransaction } from '../interfaces/clientInterface';
import path from 'path';
import axios from 'axios';

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

        if (existingEmail) {
            throw new Error("email already exists");
        }
        if (existingUsername) {
            throw new Error("Username already exists");
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



    async doVerifyOtp(id: string): Promise<string | undefined> {
        console.log(id, "reached");

        try {

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

    //role specyfication
    async doRoleSpecify(id: string, role: string): Promise<Boolean> {
        const response = await this.freelancerRepository.doRolespecify(id, role)
        console.log(response);

        if (response) {
            return true
        } else {
            throw new Error("wrong")
        }

    }
    //role changing service
    async doRoleChange(id: string, role: string): Promise<Freelancer> {
        const response = await this.freelancerRepository.doRolespecify(id, role)
        if (response) {
            const userData = await this.freelancerRepository.find_ById(id)
            if (userData) {
                return userData
            } else {
                throw new Error("user not found")
            }
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


    async profiledataService(id: string): Promise<FreelancerDetails | null> {
        try {
            // const decodedToken = await this.validateJWT(token);
            const userData = await this.freelancerRepository.findDetailsById(id);
            if (userData) {
                // console.log(userData);
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
                expiresIn: "10h", // Change expiration to 10 hours
            });

            freelancer.token = token;
            freelancer.password = "";
            const options = {
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

    async getAllCategories(): Promise<ICategory[] | undefined> {
        try {
            const allCategories = await this.freelancerRepository.getAllCategories()
            if (allCategories) {
                return allCategories
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }


    async getAllSubCategories(): Promise<ISubcategory[] | undefined> {
        try {
            const allCategories = await this.freelancerRepository.getAllSubCategories()

            if (allCategories) {
                return allCategories
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async WorkSubmitService(workData: IWork): Promise<any> {
        try {
            const response = await this.freelancerRepository.createWorkPost(workData)
            console.log(response);
            if (response) {
                return true
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }


    async uploadMultiFiles(filePaths: string[], folderName: string): Promise<any> {
        try {

            const cloudinaryResponse = await uploadMultipleToCloudinary(filePaths, folderName);
            if (!cloudinaryResponse) {
                throw new Error("Cloud Image Upload Failed, please try again")
            }
            const image1Url: string = cloudinaryResponse[0] ? cloudinaryResponse[0].url : '';
            const image2Url: string = cloudinaryResponse[1] ? cloudinaryResponse[1].url : '';
            const image3Url: string = cloudinaryResponse[2] ? cloudinaryResponse[2].url : '';

            console.log(image1Url, image2Url, image3Url);
            filePaths.forEach((path) => {
                fs.unlinkSync(path);
            })
            return { image1Url, image2Url, image3Url }


        } catch (error) {

        }
    }

    async CategoryDataFetch(categoryId: string, subCategoryId: string): Promise<any> {
        try {
            const categoryPromise = this.freelancerRepository.findCategoriesById(categoryId);
            const subcategoryPromise = this.freelancerRepository.findSubCategoriesById(subCategoryId);

            return Promise.all([categoryPromise, subcategoryPromise])
                .then(([category, subcategory]) => {
                    let categoryTitle = category?.title
                    let subcategoryTitle = subcategory?.name

                    return { categoryTitle, subcategoryTitle };
                })
                .catch(error => {
                    throw new Error(error.message);
                });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


    async getallWorksOfUserServ(id: string): Promise<IWork[] | null> {
        try {
            const allWorks = await this.freelancerRepository.getAllWorkOfUser(id)
            if (!allWorks) throw new Error("Could not get all works of user")
            return allWorks

        } catch (error: any) {
            throw new Error(error.message)
        }
    }


    async getallWorksToDiscoverService(): Promise<any> {
        try {
            const allWorks = await this.freelancerRepository.getAllActiveWorksToDiscover()

            if (allWorks) {
                return allWorks
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async deleteWorkPost(id: string): Promise<any> {
        try {
            const deleteResponse = await this.freelancerRepository.deleteWork(id)

            if (deleteResponse) {
                return true
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getSingleWorkDetails(id: string): Promise<any> {
        try {
            // const singleDetails = await this.freelancerRepository.singlePostDetails(id)
            const singleDetails = await this.freelancerRepository.getWorkDetails(id)
            if (singleDetails) {
                return singleDetails
            }

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getSingleOrderDetails(id: string): Promise<any> {
        try {
            const singleDetails = await this.freelancerRepository.getOrderDetails(id)
            if (singleDetails) {
                return singleDetails
            }

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getRecivedWorkDetails(id: string): Promise<IOrder[] | null> {
        try {
            const OrderDetails = await this.freelancerRepository.getRecivedWork(id)
            return OrderDetails
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getActivePosts(freelancerId: string): Promise<IWork[] | null> {
        try {
            const response = await this.freelancerRepository.getAllActivepost(freelancerId)
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getSuspendedPosts(freelancerId: string): Promise<IWork[] | null> {
        try {
            const response = await this.freelancerRepository.getAllSuspendedpost(freelancerId)
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getSingleWork(workId: string): Promise<IWork | null> {
        try {
            const response = await this.freelancerRepository.getSingleWork(workId)
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async updateWorkDetails(data: any, workId: string): Promise<any> {
        try {
            const response = await this.freelancerRepository.updateWork(data, workId)
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async submitWorkServ(data: any, filePath: string): Promise<ISubmissions | null> {
        try {

            const fileCloudURL = await  uploadToCloudinary(filePath, "SubmissionFile");
            const formData = {
                workId: data.workId,
                freelancerId: data.freelancerId,
                clientId: data.clientId,
                description: data.description,
                file: fileCloudURL.secure_url,
                status: "pending",
                revise: 1,
                orderId: data.orderId,
            }
            const response = await this.freelancerRepository.createSubmission(formData)
            if(response){
                const statusChange = await this.freelancerRepository.changeWorkStatus(data.orderId,"Awaiting Approval")
            }
            
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }


    
    async getRequirementsServ(orderId: string): Promise<any> {
        try {
            const response = await this.freelancerRepository.getRequirements(orderId)
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    
    async getTransaction(userId: string): Promise<ITransaction[] | null> {
        try {
            
            const response = await this.freelancerRepository.getUserAllTransaction(userId)
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

   



}
