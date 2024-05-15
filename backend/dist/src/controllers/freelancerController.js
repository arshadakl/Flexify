"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreelancerController = void 0;
const ImageUploadRepository_1 = __importDefault(require("../repositories/ImageUploadRepository"));
const Cloudinary_1 = require("../utils/Cloudinary");
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { MulterFile } from "../interfaces/multerInterface";
const imageUploadRepository = new ImageUploadRepository_1.default();
class FreelancerController {
    _freelancerService;
    constructor(_freelancerService) {
        this._freelancerService = _freelancerService;
    }
    //login functions
    // =========================
    async login(req, res) {
        const { username, password } = req.body;
        console.log(req.body);
        try {
            const response = await this._freelancerService.login(username, password);
            if (response == null) {
                throw new Error("Failed to login");
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
                }
                else {
                    throw new Error("Token or options are undefined");
                }
            }
            else {
                throw new Error("Response is missing required properties");
            }
            // if (freelancer) {
            //     console.log(freelancer);
            //     res.status(200).json({freelancer,status:true});
            // } 
        }
        catch (error) {
            // res.json({ error: "Invalid credentials", status: false });
            res.status(401).json({ message: error.message, error: error.message, status: false });
        }
    }
    //signup
    // ============================
    async signup(req, res) {
        const { username, email, password } = req.body;
        console.log(req.body);
        const freelancer = { username, email, password };
        try {
            const userId = await this._freelancerService.signup(freelancer);
            res.status(201).json({ message: "Freelancer signed up successfully", status: true });
        }
        catch (error) {
            res.json({ error: error.message, status: false });
        }
    }
    async GoogleAuthLogin(req, res) {
        const { key } = req.body;
        console.log(key);
        try {
            const decodeResponse = await this._freelancerService.GoogleKeyValidation(key);
            if (decodeResponse.email_verified) {
                const response = await this._freelancerService.GoogleLoginEmailValidation(decodeResponse.email);
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
                    }
                    else {
                        // console.log("hi");
                        throw new Error("Token or options are undefined");
                    }
                }
                else {
                    throw new Error("Token or options are undefined");
                }
            }
        }
        catch (error) {
            console.log(error.message);
            // res.json({ error: "User not found", status: false });
            res.json({ error: error.message, status: false });
        }
    }
    async GoogleAuthentication(req, res) {
        // console.log(req.body);
        const { key } = req.body;
        try {
            const decodeResponse = await this._freelancerService.GoogleKeyValidation(key);
            console.log(decodeResponse);
            if (decodeResponse.email_verified) {
                const { name, email, jti } = decodeResponse;
                const data = {
                    isVerified: 1, isBlocked: "unBlock",
                    username: name, profile: "",
                    email, password: jti || " "
                };
                const response = await this._freelancerService.signup(data);
                res.status(201).json({ message: "User signed up successfully", status: true, id: response });
            }
            // res.status(200).json({data:decodeResponse})
        }
        catch (error) {
            res.json({ error: "Username or email already exists", status: false });
        }
    }
    //otp verification 
    // ===========================
    async OtpVerification(req, res) {
        const { email, code } = req.body;
        try {
            const user = await this._freelancerService.OTPVerificationServ(email, code);
            if (user.status) {
                const response = await this._freelancerService.doVerifyOtp(user.id);
                if (user.id) {
                    console.log(user.id);
                    res.status(200).json({ message: "user successfully verified", status: true, userId: user.id });
                }
                else {
                    res.json({ status: false, error: "Incorrect OTP, Please try again." });
                }
            }
            // const userId = await this._freelancerService.OTPVerificationServ()
        }
        catch (error) {
            res.json({ error: error.message, status: false });
        }
    }
    // resend OTP 
    //================================
    async reSendOtp(req, res) {
        try {
            const email = req.body.email;
            const response = await this._freelancerService.reSendotpServ(email);
            console.log(response);
            res.status(200).json({ status: true });
        }
        catch (error) {
        }
    }
    //signup
    // ============================
    async forgotpassword(req, res) {
        const { email } = req.body;
        try {
            const isUser = await this._freelancerService.forgotPass(email);
            if (isUser) {
                const otpGenarte = await this._freelancerService.reSendotpServ(email);
                console.log(otpGenarte);
                res.status(200).json({ message: `Verification code sent to ${email}. Check your inbox to reset password.`, status: true });
            }
        }
        catch (error) {
            console.log("failed");
            res.json({ error: error.message, status: false });
        }
    }
    // resend OTP 
    //================================
    async rolespecify(req, res) {
        try {
            const { id, role } = req.body;
            console.log(id, role);
            const response = await this._freelancerService.doRoleSpecify(id, role);
            if (response) {
                res.status(200).json({ status: true, message: "user role specified" });
            }
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    //change role
    async changeRole(req, res) {
        try {
            console.log(req.body, "role change called");
            const { role } = req.body;
            console.log(role);
            if (role !== 'freelancer' && role !== 'client') {
                throw new Error("Invalid role");
            }
            console.log(req.user, "user data");
            const { _id } = req.user;
            console.log(_id, role, "tet");
            const userData = await this._freelancerService.doRoleChange(_id, role);
            res.status(200).json({ status: true, message: "Role change success", userData: userData });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    // profile completion functions 
    // ===========================
    async profileCompletion(req, res) {
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
                }
                else {
                    throw new Error("Token or options are undefined");
                }
            }
            else {
                throw new Error("Response is missing required properties");
            }
        }
        catch (error) {
            console.error("Error in profile completion:", error);
            res.json({ status: false });
        }
    }
    // profile update functions 
    // ===========================
    async profileUpdate(req, res) {
        try {
            const response = await this._freelancerService.profileUpdateServ(req.body);
            if (response) {
                res.status(200).json({ status: true, response });
            }
            else {
                throw new Error("Token or options are undefined");
            }
        }
        catch (error) {
            console.error("Error in profile completion:", error);
            res.json({ status: false });
        }
    }
    async profiledata(req, res) {
        try {
            const userId = req.user._id;
            if (userId) {
                const userDetails = await this._freelancerService.profiledataService(userId);
                res.status(200).json({ userDetails, status: true });
            }
            else {
                throw new Error("Invalid Request");
            }
        }
        catch (error) {
            console.log(error);
            res.json({ error, status: false });
        }
    }
    //profile image updating
    async uploadImage(req, res) {
        try {
            // console.log(req.body);
            if (!req.file) {
                res.status(400).send('No file uploaded');
                return;
            }
            const token = req.headers.authorization;
            console.log(token);
            if (!token) {
                throw new Error('Invalid token');
            }
            console.log(req.file);
            const result = await (0, Cloudinary_1.uploadToCloudinary)(req.file.path, "profile");
            // console.log(result);
            const userData = await this._freelancerService.updatePrfileImage(token, result.url);
            fs_1.default.unlinkSync(req.file.path);
            userData.password = "";
            userData.OTP = 0;
            res.status(200).json({ userData, status: true });
        }
        catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            res.status(400).json({ error, status: false });
        }
    }
    async forgotPasswordOTP(req, res) {
        const { email, code } = req.body;
        console.log(email, code);
        try {
            const user = await this._freelancerService.OTPVerificationServ(email, code);
            if (user.status) {
                const response = await this._freelancerService.managePreResetpassword(email);
                if (response) {
                    res.status(201).json({ status: true, token: response, message: "OTP verification successful. Please proceed to reset your password" });
                }
            }
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    async resetPassword(req, res) {
        const { password, token } = req.body;
        try {
            const response = await this._freelancerService.managePostResetpassword(password, token);
            if (response) {
                res.status(201).json({ status: true, message: "All done! Your password is now updated" });
            }
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    //get all categories
    async allCategories(req, res) {
        try {
            console.log(req.headers);
            const categories = await this._freelancerService.getAllCategories();
            console.log(categories);
            return res.status(200).json({ status: 'success', data: categories });
        }
        catch (error) {
            return res.json({ status: false, error: error.message });
        }
    }
    //get all Subcategories
    async allSubCategories(req, res) {
        try {
            const categories = await this._freelancerService.getAllSubCategories();
            console.log(categories);
            res.status(200).json({ status: 'success', data: categories });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    //create new  work
    async WorkSubmit(req, res) {
        const workData = req.body;
        try {
            const files = req.files;
            if (!files || !files['image1'] || files['image1'].length === 0) {
                throw new Error('At least one image is required.');
            }
            const filePaths = [];
            if (files['image1'] && files['image1'].length > 0)
                filePaths.push(files['image1'][0].path);
            if (files['image2'] && files['image2'].length > 0)
                filePaths.push(files['image2'][0].path);
            if (files['image3'] && files['image3'].length > 0)
                filePaths.push(files['image3'][0].path);
            const responseImages = await this._freelancerService.uploadMultiFiles(filePaths, "workImages");
            if (responseImages) {
                workData.image1 = responseImages.image1Url;
                workData.image2 = responseImages.image2Url;
                workData.image3 = responseImages.image3Url;
            }
            console.log(workData);
            workData.user = req.user._id;
            workData.questionnaire = JSON.parse(workData.questionnaire);
            const categoryDetails = await this._freelancerService.CategoryDataFetch(workData.category, workData.subcategory);
            workData.categoryNames = [categoryDetails.categoryTitle, categoryDetails.subcategoryTitle];
            const submitResponse = await this._freelancerService.WorkSubmitService(workData);
            if (submitResponse) {
                res.status(200).json({ status: true });
            }
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    //update WorkData
    async updateWorkData(req, res) {
        try {
            const { id, data } = req.body;
            console.log(id, data, "updating data called");
            const works = await this._freelancerService.updateWorkDetails(data, id);
            if (works) {
                res.status(200).json({ status: 'success' });
            }
            else {
                throw new Error;
            }
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    async getallWorksOfUser(req, res) {
        try {
            const userID = req.user._id;
            if (!userID) {
                throw new Error("Unauthorized access");
            }
            console.log("called##s ### ## ###");
            console.log(userID, "user ID");
            const works = await this._freelancerService.getallWorksOfUserServ(userID);
            // console.log(categories)
            // console.log(works)
            res.status(200).json({ status: 'success', data: works });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    async getallWorksToDiscover(req, res) {
        try {
            const searchKey = req.query.skey ? req.query.skey : "";
            const filter = req.query.fkey ? req.query.fkey : "";
            const page = req.query.page ? req.query.page : 1;
            const works = await this._freelancerService.getallWorksToDiscoverService(searchKey, filter, page);
            res.status(200).json({ status: 'success', data: works });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    //get Single work Post details
    async getallSingleWorkDetails(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("Invalid request");
            }
            const worksData = await this._freelancerService.getSingleWorkDetails(id);
            res.status(200).json({ status: 'success', data: worksData });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    //get Single work Post details
    async getallSingleOrderDetails(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("Invalid request");
            }
            const orderData = await this._freelancerService.getSingleOrderDetails(id);
            res.status(200).json({ status: 'success', data: orderData });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    //get Single work Post details
    async getallSingleWOrderDetails(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                throw new Error("Invalid request");
            }
            const worksData = await this._freelancerService.getSingleWorkDetails(id);
            console.log(worksData);
            // // console.log(categories)
            // console.log(works)
            res.status(200).json({ status: 'success', data: worksData });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    async deleteworkWork(req, res) {
        try {
            const userID = req.user._id;
            if (!userID) {
                throw new Error("Unauthorized access");
            }
            const id = req.query.id;
            //    const deleteRequest = await this._freelancerService()
            const deleteResponse = await this._freelancerService.deleteWorkPost(id);
            if (deleteResponse) {
                const works = await this._freelancerService.getallWorksOfUserServ(userID);
                res.status(200).json({ status: 'success', data: works });
            }
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    async getRecivedWork(req, res) {
        try {
            const FreelancerID = req.user._id;
            const OrdersDetails = await this._freelancerService.getRecivedWorkDetails(FreelancerID);
            res.status(200).json({ status: 'success', orders: OrdersDetails });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    async getPosts(req, res) {
        try {
            const FreelancerID = req.user._id;
            const page = req.query.page;
            const ActiveOrders = await this._freelancerService.getActivePosts(FreelancerID, Number(page));
            const SuspendedOrders = await this._freelancerService.getSuspendedPosts(FreelancerID);
            res.status(200).json({ status: 'success', active: ActiveOrders, suspended: SuspendedOrders });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    async getSingleWork(req, res) {
        try {
            const workId = req.query.id;
            console.log(workId);
            if (!workId)
                throw new Error("workId not specified");
            const workDetails = await this._freelancerService.getSingleWork(workId);
            res.status(200).json({ status: 'success', post: workDetails });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    //submit recived orders
    async submitWork(req, res) {
        try {
            console.log("called");
            console.log(req.file);
            if (!req.file) {
                throw new Error("file not specified");
            }
            console.log(req.file.path);
            const response = await this._freelancerService.submitWorkServ(req.body, req.file.path);
            if (response) {
                res.status(200).json({ status: 'success' });
            }
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    async getRequirements(req, res) {
        try {
            const orderId = req.query.id;
            if (!orderId)
                throw new Error("order id not specified");
            const workDetails = await this._freelancerService.getRequirementsServ(orderId);
            res.status(200).json({ status: 'success', details: workDetails });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    async downloadSubmissionFile(req, res) {
        try {
            console.log("data reached");
            const url = req.query.url;
            console.log(url);
            const filename = path_1.default.basename(new URL(url).pathname);
            console.log(filename);
            const response = await axios_1.default.get(url, { responseType: 'stream' });
            res.setHeader('Content-Disposition', `Requirement-File-${filename}`);
            res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
            res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
            response.data.pipe(res);
        }
        catch (error) {
            console.error("Error:", error);
            res.json({ status: false, error: error.message });
        }
    }
    async getTransactions(req, res) {
        try {
            const userId = req.user._id;
            const transactions = await this._freelancerService.getTransaction(userId);
            console.log(transactions);
            res.status(200).json({ status: 'success', details: transactions });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    async genarateVideoCallToken(req, res) {
        try {
            const userId = req.query.id;
            if (!userId)
                throw new Error("id is Missing");
            const api_secret = process.env.STREEM_SECRET;
            console.log(api_secret, userId, "called");
            if (api_secret) {
                const token = jsonwebtoken_1.default.sign({ "user_id": userId }, api_secret);
                res.status(200).json({ status: 'success', token: token, id: userId });
            }
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    async getchartData(req, res) {
        try {
            const userId = req.user._id;
            // const userId = "661e98313b4154eee9d66a38"
            const response = await this._freelancerService.getchartData(userId);
            res.status(200).json({ status: 'success', chartData: response });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
    async getNotification(req, res) {
        try {
            const userId = req.user._id;
            const response = await this._freelancerService.getNotification(userId);
            res.status(200).json({ status: 'success', notifications: response });
        }
        catch (error) {
            res.json({ status: false, error: error.message });
        }
    }
}
exports.FreelancerController = FreelancerController;
