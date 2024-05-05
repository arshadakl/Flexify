// src/controllers/freelancerController.ts
import { Request, Response, response } from "express";
import { FreelancerService } from "../services/freelancerServiceImpl";
import { Freelancer, FreelancerDetails } from "../models/Freelancer";
import ImageUploadRepository from "../repositories/ImageUploadRepository";
import { Readable } from 'stream';
import { uploadToCloudinary } from "../utils/Cloudinary";
import fs from 'fs'
import { File } from "../interfaces/multerInterface";
import axios from "axios";
import path from "path";
import jwt from 'jsonwebtoken';
// import { MulterFile } from "../interfaces/multerInterface";




const imageUploadRepository = new ImageUploadRepository();

export class FreelancerController {
    constructor(private readonly _freelancerService: FreelancerService) { }


    //login functions
    // =========================
    async login(req: Request, res: Response): Promise<void> {

        const { username, password } = req.body;
        console.log(req.body)
        try {
            const response = await this._freelancerService.login(username, password);
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
            const userId = await this._freelancerService.signup(freelancer);
            res.status(201).json({ message: "Freelancer signed up successfully", status: true });
        } catch (error: any) {
            res.json({ error: error.message, status: false });
        }
    }


    async GoogleAuthLogin(req: Request, res: Response): Promise<void> {
        const { key } = req.body
        console.log(key);

        try {
            const decodeResponse = await this._freelancerService.GoogleKeyValidation(key)

            if (decodeResponse.email_verified) {
                const response = await this._freelancerService.GoogleLoginEmailValidation(decodeResponse.email)
                console.log(response, "for tests ");

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
            const decodeResponse = await this._freelancerService.GoogleKeyValidation(key)
            console.log(decodeResponse);
            if (decodeResponse.email_verified) {
                const { name, email, jti } = decodeResponse
                const data = {
                    isVerified: 1, isBlocked: "unBlock",
                    username: name, profile: "",
                    email, password: jti || " "
                }
                const response = await this._freelancerService.signup(data);

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
            const user = await this._freelancerService.OTPVerificationServ(email, code)
            if (user.status) {
                const response = await this._freelancerService.doVerifyOtp(user.id)
                if (user.id) {
                    console.log(user.id);

                    res.status(200).json({ message: "user successfully verified", status: true, userId: user.id })
                } else {
                    res.json({ status: false, error: "Incorrect OTP, Please try again." });

                }
            }
            // const userId = await this._freelancerService.OTPVerificationServ()


        } catch (error) {
            res.json({ error: (error as Error).message, status: false });
        }
    }

    // resend OTP 
    //================================

    async reSendOtp(req: Request, res: Response): Promise<void> {
        try {
            const email = req.body.email
            const response = await this._freelancerService.reSendotpServ(email)
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
            const isUser = await this._freelancerService.forgotPass(email)
            if (isUser) {
                const otpGenarte = await this._freelancerService.reSendotpServ(email)
                console.log(otpGenarte);
                res.status(200).json({ message: `Verification code sent to ${email}. Check your inbox to reset password.`, status: true });

            }

        } catch (error: any) {
            console.log("failed");
            res.json({ error: error.message, status: false });
        }
    }

    // resend OTP 
    //================================

    async rolespecify(req: Request, res: Response): Promise<void> {
        try {
            const { id, role } = req.body
            console.log(id, role);

            const response = await this._freelancerService.doRoleSpecify(id, role)
            if (response) {
                res.status(200).json({ status: true, message: "user role specified" })
            }

        } catch (error: any) {
            res.json({ status: false, error: error.message })

        }
    }

    //change role
    async changeRole(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body, "role change called");

            const { role } = req.body
            console.log(role);

            if (role !== 'freelancer' && role !== 'client') {
                throw new Error("Invalid role");
            }


            console.log(req.user, "user data");

            const { _id } = req.user
            console.log(_id, role, "tet");

            const userData = await this._freelancerService.doRoleChange(_id, role)
            res.status(200).json({ status: true, message: "Role change success", userData: userData })

        } catch (error: any) {
            res.json({ status: false, error: error.message })

        }
    }

    // profile completion functions 
    // ===========================
    async profileCompletion(req: Request, res: Response): Promise<void> {
        try {
            console.log(req.body, "body");
            const response = await this._freelancerService.profileCompletionServ(req.body);
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
            const response = await this._freelancerService.profileUpdateServ(req.body);
            if (response) {
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
            const userId = req.user._id
            if (userId) {
                const userDetails = await this._freelancerService.profiledataService(userId)
                res.status(200).json({ userDetails, status: true })
            } else {
                throw new Error("Invalid Request")
            }

        } catch (error) {
            console.log(error);
            res.json({ error, status: false });

        }
    }

    //profile image updating
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
            const userData = await this._freelancerService.updatePrfileImage(token, result.url)
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
            const user = await this._freelancerService.OTPVerificationServ(email, code)
            if (user.status) {
                const response = await this._freelancerService.managePreResetpassword(email)
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
            const response = await this._freelancerService.managePostResetpassword(password, token)
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

            const categories = await this._freelancerService.getAllCategories()
            console.log(categories)

            return res.status(200).json({ status: 'success', data: categories })
        } catch (error: any) {
            return res.json({ status: false, error: error.message })
        }
    }

    //get all Subcategories
    async allSubCategories(req: Request, res: Response): Promise<any> {
        try {
            const categories = await this._freelancerService.getAllSubCategories()
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

            const responseImages = await this._freelancerService.uploadMultiFiles(filePaths, "workImages")
            if (responseImages) {
                workData.image1 = responseImages.image1Url
                workData.image2 = responseImages.image2Url
                workData.image3 = responseImages.image3Url
            }
            console.log(workData);
            workData.user = req.user._id
            workData.questionnaire = JSON.parse(workData.questionnaire)
            const categoryDetails = await this._freelancerService.CategoryDataFetch(workData.category, workData.subcategory)
            workData.categoryNames = [categoryDetails.categoryTitle, categoryDetails.subcategoryTitle]
            const submitResponse = await this._freelancerService.WorkSubmitService(workData)
            if (submitResponse) {
                res.status(200).json({ status: true })
            }

        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }


    //update WorkData
    async updateWorkData(req: Request, res: Response): Promise<any> {
        try {
            const { id, data } = req.body
            console.log(id, data, "updating data called");

            const works = await this._freelancerService.updateWorkDetails(data, id)
            if (works) {
                res.status(200).json({ status: 'success' })
            } else {
                throw new Error
            }
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

    async getallWorksOfUser(req: Request, res: Response): Promise<any> {
        try {

            const userID = req.user._id

            if (!userID) {
                throw new Error("Unauthorized access")
            }
            console.log("called##s ### ## ###");
            console.log(userID, "user ID");

            const works = await this._freelancerService.getallWorksOfUserServ(userID)
            // console.log(categories)
            // console.log(works)


            res.status(200).json({ status: 'success', data: works })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

    async getallWorksToDiscover(req: Request, res: Response): Promise<any> {
        try {
            console.log("called");

            const works = await this._freelancerService.getallWorksToDiscoverService()
            // console.log(categories)
            console.log(works)
            res.status(200).json({ status: 'success', data: works })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }
    //get Single work Post details
    async getallSingleWorkDetails(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params
            if (!id) {
                throw new Error("Invalid request")
            }
            const worksData = await this._freelancerService.getSingleWorkDetails(id)
            res.status(200).json({ status: 'success', data: worksData })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

    //get Single work Post details
    async getallSingleOrderDetails(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params
            if (!id) {
                throw new Error("Invalid request")
            }
            const orderData = await this._freelancerService.getSingleOrderDetails(id)

            res.status(200).json({ status: 'success', data: orderData })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }
    //get Single work Post details
    async getallSingleWOrderDetails(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params
            if (!id) {
                throw new Error("Invalid request")
            }
            const worksData = await this._freelancerService.getSingleWorkDetails(id)
            console.log(worksData);

            // // console.log(categories)
            // console.log(works)
            res.status(200).json({ status: 'success', data: worksData })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

    async deleteworkWork(req: Request, res: Response): Promise<any> {
        try {
            const userID = req.user._id
            if (!userID) {
                throw new Error("Unauthorized access")
            }
            const id: string = req.query.id as string;

            //    const deleteRequest = await this._freelancerService()
            const deleteResponse = await this._freelancerService.deleteWorkPost(id)
            if (deleteResponse) {
                const works = await this._freelancerService.getallWorksOfUserServ(userID)
                res.status(200).json({ status: 'success', data: works })

            }


        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }


    async getRecivedWork(req: Request, res: Response): Promise<void> {
        try {
            const FreelancerID = req.user._id
            const OrdersDetails = await this._freelancerService.getRecivedWorkDetails(FreelancerID)
            res.status(200).json({ status: 'success', orders: OrdersDetails })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

    async getPosts(req: Request, res: Response): Promise<void> {
        try {
            const FreelancerID = req.user._id
            const ActiveOrders = await this._freelancerService.getActivePosts(FreelancerID)
            const SuspendedOrders = await this._freelancerService.getSuspendedPosts(FreelancerID)

            res.status(200).json({ status: 'success', active: ActiveOrders, suspended: SuspendedOrders })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }


    async getSingleWork(req: Request, res: Response): Promise<void> {
        try {
            const workId = req.query.id
            console.log(workId);

            if (!workId) throw new Error("workId not specified")
            const workDetails = await this._freelancerService.getSingleWork(workId as string)
            res.status(200).json({ status: 'success', post: workDetails })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }



    //submit recived orders
    async submitWork(req: Request, res: Response): Promise<any> {
        try {
            console.log("called");

            console.log(req.file);
            if (!req.file) {
                throw new Error("file not specified")
            }
            console.log(req.file.path);
            const response = await this._freelancerService.submitWorkServ(req.body, req.file.path)
            if (response) {
                res.status(200).json({ status: 'success' })
            }
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }


    async getRequirements(req: Request, res: Response): Promise<void> {
        try {
            const orderId = req.query.id

            if (!orderId) throw new Error("order id not specified")
            const workDetails = await this._freelancerService.getRequirementsServ(orderId as string)
            res.status(200).json({ status: 'success', details: workDetails })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

    async downloadSubmissionFile(req: Request, res: Response): Promise<void> {
        try {
            console.log("data reached");
            
            const url = req.query.url
            console.log(url);
            
            const filename = path.basename(new URL(url as string).pathname);
            console.log(filename);
            const response = await axios.get(url as string, { responseType: 'stream' });
            res.setHeader('Content-Disposition', `Requirement-File-${filename}`);
            res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
            res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
            response.data.pipe(res);
        } catch (error: any) {
            console.error("Error:", error);
            res.json({ status: false, error: error.message });
        }
    }


    
    async getTransactions(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user._id
            const transactions = await this._freelancerService.getTransaction(userId)
            console.log(transactions);
            
            res.status(200).json({ status: 'success', details: transactions })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

    
    async genarateVideoCallToken(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.query.id
            
            const  api_secret = process.env.STREEM_SECRET
            console.log(api_secret, userId,"called");
            if(api_secret){
                const token = jwt.sign({ "user_id": userId }, api_secret);
                res.status(200).json({ status: 'success', token: token,id:userId })
            }
            
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }



}

