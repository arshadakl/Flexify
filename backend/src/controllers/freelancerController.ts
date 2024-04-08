// src/controllers/freelancerController.ts
import { Request, Response, response } from "express";
import { FreelancerService } from "../services/freelancerService";
import { Freelancer, FreelancerDetails } from "../models/Freelancer";
import ImageUploadRepository from "../repositories/ImageUploadRepository";
import { Readable } from 'stream';
import { uploadToCloudinary } from "../utils/Cloudinary";
import fs from 'fs'
// import { MulterFile } from "../interfaces/multerInterface";


// Define a custom type for Multer file
interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}


interface File {
    path: string;
    // Include other properties of File as needed
}
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
        } catch (error: any) {
            // res.json({ error: "Invalid credentials", status: false });
            res.status(400).json({ error: error.message, status: false });
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
                console.log(response, "for test      s ");

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
        } catch (error: any) {
            console.log(error.message);

            // res.json({ error: "User not found", status: false });
            res.json({ error: error.message, status: false });
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
            const user = await this.freelancerService.OTPVerificationServ(email, code)
            if (user.status) {
                const response = await this.freelancerService.doVerifyOtp(user.id)
                if (user.id) {
                    console.log(user.id);

                    res.status(200).json({ message: "user successfully verified", status: true, userId: user.id })
                } else {
                    res.json({ status: false, error: "Incorrect OTP, Please try again." });

                }
            }
            // const userId = await this.freelancerService.OTPVerificationServ()


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

    //signup
    // ============================
    async forgotpassword(req: Request, res: Response): Promise<void> {
        const { email } = req.body;
        try {
            const isUser = await this.freelancerService.forgotPass(email)
            if (isUser) {
                const otpGenarte = await this.freelancerService.reSendotpServ(email)
                console.log(otpGenarte);
                res.status(200).json({ message: `Verification code sent to ${email}. Check your inbox to reset password.`, status: true });

            }

        } catch (error: any) {
            console.log("failed");
            res.json({ error: error.message, status: false });
        }
    }

    // profile completion functions 
    // ===========================
    async profileCompletion(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body, "body");
            const response = await this.freelancerService.profileCompletionServ(req.body);
            console.log(response, "2nd response");
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
        // res.status(401).json({message : "You are blocked by admin"})
        try {
            // console.log(req.headers);
            const token = req.headers.authorization
            console.log(token, "controller token");

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
            // console.log(req.body);

            if (!req.file) {
                res.status(400).send('No file uploaded');
                return;
            }
            const token = req.headers.authorization
            console.log(token);

            if (!token) {
                throw new Error('Invalid token')
            }
            console.log(req.file);
            
            const result = await uploadToCloudinary(req.file.path, "profile");
            // console.log(result);
            const userData = await this.freelancerService.updatePrfileImage(token, result.url)
            fs.unlinkSync(req.file.path);
            userData.password = ""
            userData.OTP = 0
            res.status(200).json({ userData, status: true })
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            res.status(400).json({ error, status: false });
        }
    }


    async forgotPasswordOTP(req: Request, res: Response): Promise<void> {
        const { email, code } = req.body
        console.log(email, code);

        try {
            const user = await this.freelancerService.OTPVerificationServ(email, code)
            if (user.status) {
                const response = await this.freelancerService.managePreResetpassword(email)
                if (response) {
                    res.status(201).json({ status: true, token: response, message: "OTP verification successful. Please proceed to reset your password" })
                }
            }
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }


    async resetPassword(req: Request, res: Response): Promise<void> {
        const { password, token } = req.body
        try {
            const response = await this.freelancerService.managePostResetpassword(password, token)
            if (response) {
                res.status(201).json({ status: true, message: "All done! Your password is now updated" })
            }
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

    //get all categories
    async allCategories(req: Request, res: Response): Promise<any> {
        try {
            console.log(req.headers);

            const categories = await this.freelancerService.getAllCategories()
            console.log(categories)

            return res.status(200).json({ status: 'success', data: categories })
        } catch (error: any) {
            return res.json({ status: false, error: error.message })
        }
    }

    //get all Subcategories
    async allSubCategories(req: Request, res: Response): Promise<any> {
        try {
            const categories = await this.freelancerService.getAllSubCategories()
            console.log(categories)

            res.status(200).json({ status: 'success', data: categories })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

    //create new  work
    async WorkSubmit(req: Request, res: Response): Promise<any> {
        const workData = req.body
        try {
 
            const files = req.files as { [fieldname: string]: File[]; };

            if (!files || !files['image1'] || files['image1'].length === 0) {
                throw new Error('At least one image is required.');
            }

            const filePaths: string[] = [];
            if (files['image1'] && files['image1'].length > 0) filePaths.push(files['image1'][0].path);
            if (files['image2'] && files['image2'].length > 0) filePaths.push(files['image2'][0].path);
            if (files['image3'] && files['image3'].length > 0) filePaths.push(files['image3'][0].path);

            const responseImages = await this.freelancerService.uploadMultiFiles(filePaths,"workImages")
            if(responseImages){
                workData.image1 = responseImages.image1Url
                workData.image2 = responseImages.image2Url
                workData.image3 = responseImages.image3Url
            }
            // console.log(workData);
            workData.user = req.user._id
            const categoryDetails = await this.freelancerService.CategoryDataFetch(workData.category,workData.subcategory)
            workData.categoryNames=[categoryDetails.categoryTitle,categoryDetails.subcategoryTitle]
            const submitResponse = await this.freelancerService.WorkSubmitService(workData)
            if(submitResponse){
                res.status(200).json({ status: true })
            }
            
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }


    async getallWorksOfUser(req: Request, res: Response): Promise<any> {
        try {
            
            const userID = req.user._id
            
            if(!userID){
                throw new Error("Unauthorized access")
            }
            console.log("called##s ### ## ###");
            console.log(userID ,"user ID");
            
            const works = await this.freelancerService.getallWorksOfUserServ(userID)
            // console.log(categories)
            console.log(works)
            

            res.status(200).json({ status: 'success', data: works })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }





}

