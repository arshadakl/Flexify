"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreelancerService = void 0;
// freelancerService.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const MailService_1 = require("./MailService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = require("jwt-decode");
const Cloudinary_1 = require("../utils/Cloudinary");
const fs_1 = __importDefault(require("fs"));
// import { uploadFile } from '../utils/Cloudinary';
const mailService = new MailService_1.MailServices();
const generateOTP = (length = 4) => {
    return [...new Array(length)].reduce(function (a) {
        return a + Math.floor(Math.random() * 10);
    }, "");
};
class FreelancerService {
    freelancerRepository;
    constructor(freelancerRepository) {
        this.freelancerRepository = freelancerRepository;
    }
    // login services 
    // =======================================
    async login(username, password) {
        const freelancer = await this.freelancerRepository.findByUsername(username);
        if (!freelancer) {
            // return null; 
            throw new Error("If you do not have an account, please create a new one as the user was not found.");
        }
        if (freelancer.isBlocked == "Block") {
            throw new Error("your account is blocked");
        }
        const isPasswordValid = await this.freelancerRepository.checkPassword(username, password);
        if (!isPasswordValid) {
            throw new Error("incorrect credentials");
        }
        freelancer.password = "";
        freelancer.OTP = 0;
        const credentialsResponse = await this.jwtCreation(freelancer);
        return credentialsResponse;
    }
    //signup
    // ================
    async signup(freelancer) {
        console.log(freelancer);
        const existingUsername = await this.freelancerRepository.findByUsername(freelancer.username);
        const existingEmail = await this.freelancerRepository.findByEmail(freelancer.email);
        if (existingEmail) {
            throw new Error("email already exists");
        }
        if (existingUsername) {
            throw new Error("Username already exists");
        }
        const hashedPassword = await bcrypt_1.default.hash(freelancer.password, 10);
        const OTP = generateOTP();
        const newFreelancer = {
            ...freelancer, profile: "", isBlocked: "unBlock",
            password: hashedPassword, OTP, isVerified: freelancer.isVerified ? 1 : 0
        };
        const response = await this.freelancerRepository.create(newFreelancer);
        if (!freelancer.isVerified) {
            mailService.sendOtp(freelancer.email, OTP);
        }
        const userData = await this.freelancerRepository.findByEmail(freelancer.email);
        console.log(userData, "userData in sign");
        return userData?.id;
    }
    async OTPVerificationServ(email, code) {
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
            return { status: true, id: userData.id };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async doVerifyOtp(id) {
        console.log(id, "reached");
        try {
            if (id) {
                const verifiedData = await this.freelancerRepository.doVerification(id);
                console.log("User Verified");
                console.log(verifiedData);
                return id;
            }
        }
        catch (error) {
            console.error("OTP verification error:", error);
            // Rethrow the error to propagate it further if needed
            throw error;
        }
    }
    async reSendotpServ(email) {
        try {
            console.log(email, "test");
            const OTP = generateOTP();
            console.log(email, OTP, " resend email");
            const status = await this.freelancerRepository.setNewOTP(email, OTP);
            console.log(status, " # status");
            mailService.sendOtp(email, OTP);
            return status;
        }
        catch (error) {
            throw new Error("faild to create new otp");
        }
    }
    async profileCompletionServ(formData) {
        const response = await this.freelancerRepository.FreelancerDetailsAdd(formData);
        console.log(response, "test");
        const FreelancerDs = await this.freelancerRepository.find_ById(response.user);
        console.log(FreelancerDs);
        if (FreelancerDs) {
            const credentialsResponse = await this.jwtCreation(FreelancerDs);
            console.log(credentialsResponse, "datatatatata");
            return credentialsResponse;
        }
        else {
            throw new Error("wrong");
        }
    }
    async profileUpdateServ(formData) {
        const response = await this.freelancerRepository.FreelancerDetailsupdate(formData);
        console.log(response, "updation");
        const FreelancerDs = await this.freelancerRepository.findDetailsById(formData.user);
        console.log(FreelancerDs, "new thisnk");
        if (FreelancerDs) {
            return FreelancerDs;
        }
        else {
            throw new Error("wrong");
        }
    }
    //role specyfication
    async doRoleSpecify(id, role) {
        const response = await this.freelancerRepository.doRolespecify(id, role);
        console.log(response);
        if (response) {
            return true;
        }
        else {
            throw new Error("wrong");
        }
    }
    //role changing service
    async doRoleChange(id, role) {
        const response = await this.freelancerRepository.doRolespecify(id, role);
        if (response) {
            const userData = await this.freelancerRepository.find_ById(id);
            if (userData) {
                return userData;
            }
            else {
                throw new Error("user not found");
            }
        }
        else {
            throw new Error("wrong");
        }
    }
    async GoogleKeyValidation(key) {
        try {
            const decoded = (0, jwt_decode_1.jwtDecode)(key);
            // console.log(decoded);
            return decoded;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async GoogleLoginEmailValidation(email) {
        try {
            const user = await this.freelancerRepository.findByEmail(email);
            console.log(user, "sdsdsdsdsd");
            if (user !== null) {
                if (user.isBlocked === "Block") {
                    throw new Error("your account is blocked");
                }
                else {
                    user.OTP = 0;
                    user.password = "";
                    const credentialsResponse = await this.jwtCreation(user);
                    return credentialsResponse;
                }
            }
            else {
                throw new Error("User not found 1");
            }
        }
        catch (error) {
            console.error("Error in GoogleLoginEmailValidation:", error.message);
            throw error;
        }
    }
    async profiledataService(id) {
        try {
            // const decodedToken = await this.validateJWT(token);
            const userData = await this.freelancerRepository.findDetailsById(id);
            if (userData) {
                // console.log(userData);
                return userData;
            }
            else {
                throw new Error("User not found ");
            }
        }
        catch (error) {
            throw new Error("User not found ");
        }
    }
    async updatePrfileImage(token, file) {
        try {
            const decodedToken = await this.validateJWT(token);
            const response = await this.freelancerRepository.updateProfileImage(decodedToken.id, file);
            console.log(response);
            return response;
        }
        catch (error) {
            throw new Error("User not found ");
        }
    }
    //comming forgot password call
    async forgotPass(email) {
        try {
            const response = await this.freelancerRepository.findByEmail(email);
            if (!response) {
                throw new Error("Email not found. Please double-check the address you entered.");
            }
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async jwtCreation(freelancer) {
        if (freelancer !== null) {
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT secret is not defined in environment variables.");
            }
            const token = jsonwebtoken_1.default.sign({ id: freelancer.id, email: freelancer.email }, process.env.JWT_SECRET, {
                expiresIn: "10h", // Change expiration to 10 hours
            });
            freelancer.token = token;
            freelancer.password = "";
            const options = {
                httpOnly: true,
            };
            const credentials = { token, options, freelancer };
            return credentials;
        }
        else {
            throw new Error("Email not found");
        }
    }
    async securityCode(freelancer) {
        if (freelancer !== null) {
            if (!process.env.JWT_SECRET) {
                throw new Error("JWT secret is not defined in environment variables.");
            }
            const token = jsonwebtoken_1.default.sign({ id: freelancer.id, email: freelancer.email, secure: true }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            return token;
        }
        else {
            throw new Error("Email not found");
        }
    }
    async validateJWT(token) {
        return new Promise((resolve, reject) => {
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                reject(new Error("JWT secret is not defined in environment variables."));
                return;
            }
            jsonwebtoken_1.default.verify(token, jwtSecret, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
    async managePreResetpassword(email) {
        try {
            const userData = await this.freelancerRepository.findByEmail(email);
            if (userData) {
                const securityCode = await this.securityCode(userData);
                return securityCode;
            }
            else {
                throw new Error("user not found");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async managePostResetpassword(password, token) {
        try {
            const decodeToken = await this.validateJWT(token);
            console.log(decodeToken);
            if (!decodeToken.secure) {
                throw new Error("Unauthorized access token");
            }
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const updateResponse = await this.freelancerRepository.updatePassword(decodeToken.id, hashedPassword);
            return updateResponse;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllCategories() {
        try {
            const allCategories = await this.freelancerRepository.getAllCategories();
            if (allCategories) {
                return allCategories;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllSubCategories() {
        try {
            const allCategories = await this.freelancerRepository.getAllSubCategories();
            if (allCategories) {
                return allCategories;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async WorkSubmitService(workData) {
        try {
            const response = await this.freelancerRepository.createWorkPost(workData);
            console.log(response);
            if (response) {
                await this.freelancerRepository.addOrUpdateActivity(workData.user);
                return true;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async uploadMultiFiles(filePaths, folderName) {
        try {
            const cloudinaryResponse = await (0, Cloudinary_1.uploadMultipleToCloudinary)(filePaths, folderName);
            if (!cloudinaryResponse) {
                throw new Error("Cloud Image Upload Failed, please try again");
            }
            const image1Url = cloudinaryResponse[0] ? cloudinaryResponse[0].url : '';
            const image2Url = cloudinaryResponse[1] ? cloudinaryResponse[1].url : '';
            const image3Url = cloudinaryResponse[2] ? cloudinaryResponse[2].url : '';
            console.log(image1Url, image2Url, image3Url);
            filePaths.forEach((path) => {
                fs_1.default.unlinkSync(path);
            });
            return { image1Url, image2Url, image3Url };
        }
        catch (error) {
        }
    }
    async CategoryDataFetch(categoryId, subCategoryId) {
        try {
            const categoryPromise = this.freelancerRepository.findCategoriesById(categoryId);
            const subcategoryPromise = this.freelancerRepository.findSubCategoriesById(subCategoryId);
            return Promise.all([categoryPromise, subcategoryPromise])
                .then(([category, subcategory]) => {
                let categoryTitle = category?.title;
                let subcategoryTitle = subcategory?.name;
                return { categoryTitle, subcategoryTitle };
            })
                .catch(error => {
                throw new Error(error.message);
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getallWorksOfUserServ(id) {
        try {
            const allWorks = await this.freelancerRepository.getAllWorkOfUser(id);
            if (!allWorks)
                throw new Error("Could not get all works of user");
            return allWorks;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getallWorksToDiscoverService(searchKey, filter, page) {
        try {
            const allWorks = await this.freelancerRepository.getAllActiveWorksToDiscover(searchKey, filter, page);
            if (allWorks) {
                return allWorks;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteWorkPost(id) {
        try {
            const deleteResponse = await this.freelancerRepository.deleteWork(id);
            if (deleteResponse) {
                return true;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getSingleWorkDetails(id) {
        try {
            // const singleDetails = await this.freelancerRepository.singlePostDetails(id)
            const singleDetails = await this.freelancerRepository.getWorkDetails(id);
            if (singleDetails) {
                return singleDetails;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getSingleOrderDetails(id) {
        try {
            const singleDetails = await this.freelancerRepository.getOrderDetails(id);
            if (singleDetails) {
                return singleDetails;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getRecivedWorkDetails(id) {
        try {
            const OrderDetails = await this.freelancerRepository.getRecivedWork(id);
            return OrderDetails;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getActivePosts(freelancerId, page) {
        try {
            const response = await this.freelancerRepository.getAllActivepost(freelancerId, page);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getSuspendedPosts(freelancerId) {
        try {
            const response = await this.freelancerRepository.getAllSuspendedpost(freelancerId);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getSingleWork(workId) {
        try {
            const response = await this.freelancerRepository.getSingleWork(workId);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateWorkDetails(data, workId) {
        try {
            const response = await this.freelancerRepository.updateWork(data, workId);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async submitWorkServ(data, filePath) {
        try {
            const fileCloudURL = await (0, Cloudinary_1.uploadToCloudinary)(filePath, "SubmissionFile");
            const formData = {
                workId: data.workId,
                freelancerId: data.freelancerId,
                clientId: data.clientId,
                description: data.description,
                file: fileCloudURL.secure_url,
                status: "pending",
                revise: 1,
                orderId: data.orderId,
            };
            const response = await this.freelancerRepository.createSubmission(formData);
            if (response) {
                await this.freelancerRepository.addOrUpdateActivity(data.freelancerId);
                const statusChange = await this.freelancerRepository.changeWorkStatus(data.orderId, "Awaiting Approval");
            }
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getRequirementsServ(orderId) {
        try {
            const response = await this.freelancerRepository.getRequirements(orderId);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getTransaction(userId) {
        try {
            const response = await this.freelancerRepository.getUserAllTransaction(userId);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getchartData(userId) {
        try {
            const convertDataForChart = (data) => {
                const chartData = {
                    labels: [],
                    datasets: []
                };
                const dataset = {
                    label: "",
                    data: []
                };
                data.forEach(entry => {
                    chartData.labels.push(entry.day);
                    dataset.data.push(entry.orderCount ?? entry.totalAmount ?? 0); // Assuming either orderCount or totalAmount is present
                });
                chartData.datasets.push(dataset);
                return chartData;
            };
            const response = await this.freelancerRepository.getChartData(userId);
            const statistics = await this.freelancerRepository.getStaticsData(userId);
            const orders = convertDataForChart(response[0].orderCount);
            const Amount = convertDataForChart(response[0].Amount);
            // console.log(response[0].orderCount);
            return { orders, Amount, statistics };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getNotification(userId) {
        try {
            const response = await this.freelancerRepository.getNotification(userId);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getActivity(freelancerId) {
        try {
            const response = await this.freelancerRepository.getActivity(freelancerId);
            if (response) {
                return response;
            }
            return [];
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.FreelancerService = FreelancerService;
