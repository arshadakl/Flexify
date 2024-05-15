"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Cloudinary_1 = require("../utils/Cloudinary");
const fs_1 = __importDefault(require("fs"));
class ClientService {
    clientRepository;
    freelancerRepository;
    constructor(clientRepository, freelancerRepository) {
        this.clientRepository = clientRepository;
        this.freelancerRepository = freelancerRepository;
    }
    async profileCompletionServ(formData) {
        const response = await this.clientRepository.ClientDetailsAdd(formData);
        const clientDs = await this.freelancerRepository.find_ById(response.user);
        console.log(clientDs, "profile completion user");
        if (clientDs) {
            const credentialsResponse = await this.jwtCreation(clientDs);
            return credentialsResponse;
        }
        else {
            throw new Error("Wrong");
        }
    }
    async jwtCreation(freelancer) {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secret is not defined in environment variables.");
        }
        const token = jsonwebtoken_1.default.sign({ id: freelancer.id, email: freelancer.email }, process.env.JWT_SECRET, {
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
    // async stripCheckOut(id: string, user: string): Promise<any> {
    //     try {
    //         const workDetails = await this.clientRepository.FindWorkById(id);
    //         if (!process.env.STRIPE_KEY) {
    //             throw new Error('STRIPE_KEY is not defined in the environment variables');
    //         }
    //         // const stripe = new Stripe(process.env.STRIPE_KEY);
    //         const stripe = require('stripe')(process.env.STRIPE_KEY)
    //         if (!workDetails) {
    //             throw new Error('Work details not found');
    //         }
    //         const purchaseDetails = [{
    //             price_data: {
    //                 currency: "usd",
    //                 product_data: {
    //                     name: workDetails.title,
    //                     images: [workDetails.image1],
    //                     work: workDetails._id
    //                 },
    //                 unit_amount: workDetails.amount * 100,
    //             },
    //             quantity: 1
    //         }];
    //         const session = await stripe.checkout.sessions.create({
    //             payment_method_types: ["card"],
    //             line_items: purchaseDetails,
    //             mode: "payment",
    //             success_url: "http://localhost:5173/client/success",
    //             cancel_url: "http://localhost:5173/client/fail",
    //         });
    //         console.log(session.id, " sessio9n ID #############################");
    //         //    const response  = await this.TransactionCreation(transactionData)
    //         return session.id
    //     } catch (error: any) {
    //         throw new Error(error.message)
    //     }
    // }
    async stripCheckOut(id, user) {
        try {
            const workDetails = await this.clientRepository.FindWorkById(id);
            if (!process.env.STRIPE_KEY) {
                throw new Error('STRIPE_KEY is not defined in the environment variables');
            }
            const stripe = require('stripe')(process.env.STRIPE_KEY);
            if (!workDetails) {
                throw new Error('Work details not found');
            }
            const purchaseDetails = [{
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: workDetails.title,
                            images: [workDetails.image1],
                            // Removed the 'work' field as it's not supported by Stripe
                        },
                        unit_amount: workDetails.amount * 100,
                    },
                    quantity: 1
                }];
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: purchaseDetails,
                mode: "payment",
                success_url: "http://localhost:5173/client/success",
                cancel_url: "http://localhost:5173/client/fail",
            });
            console.log(session.id, " session ID #############################");
            return session.id;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //Transaction creation 
    async TransactionCreation(session, workId, user) {
        try {
            console.log("called,", session, workId);
            const workDetails = await this.clientRepository.FindWorkById(workId);
            if (!workDetails)
                throw new Error("workId not found");
            const transactionData = {
                user: user,
                session_id: session,
                work_id: workDetails._id,
                amount: workDetails.amount,
                purpose: "purchase",
                payment_status: "pending"
            };
            const response = await this.clientRepository.createTransaction(transactionData);
            return response;
        }
        catch (error) {
        }
    }
    //Transaction creation 
    async TransactionUpdate(session, status) {
        try {
            const workDetails = await this.clientRepository.updateTransaction(session, status);
            if (workDetails) {
                return workDetails;
            }
        }
        catch (error) {
        }
    }
    addDaysToDate(date, days) {
        const newDate = new Date(date.getTime());
        newDate.setDate(newDate.getDate() + days);
        return newDate.getTime();
    }
    //order creation 
    async createNewOrder(session, payment_intent) {
        try {
            console.log("called,", session);
            const transactionData = await this.clientRepository.FindTransactionBySession(session);
            if (!transactionData) {
                throw new Error("Could not find transaction");
            }
            const workDetails = await this.clientRepository.FindWorkById(transactionData?.work_id);
            if (!workDetails)
                throw new Error("Could not find work");
            const deadlineDate = this.addDaysToDate(new Date(), workDetails.deliveryPeriod || 0);
            const orderDetails = {
                workId: transactionData?.work_id,
                // transactionId: transactionData._id
                amount: workDetails?.amount,
                category: workDetails?.categoryNames,
                freelancerId: workDetails?.user,
                clientId: transactionData.user,
                payment_intent,
                WorkDetails: workDetails,
                date: Date.now(),
                status: "pending",
                requirementStatus: false,
                deadline: deadlineDate,
                approval: "pending",
            };
            const order = await this.clientRepository.createOrder(orderDetails);
            if (order) {
                return order;
            }
        }
        catch (error) {
        }
    }
    //used for get all orders of client 
    // ---------------------------------
    async getAllOrders(user) {
        try {
            const orders = await this.clientRepository.getAllordersOfClient(user);
            if (orders) {
                return orders;
            }
        }
        catch (error) {
        }
    }
    //get orders Single 
    // ---------------------------------
    async getSingleOrderDetails(id) {
        try {
            const orders = await this.clientRepository.getSingleOrder(id);
            if (!orders)
                throw new Error("No order");
            return orders;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //submit Requirements 
    // ---------------------------------
    async submitRequirements(formData, files) {
        try {
            const filePaths = [];
            if (files['logo'] && files['logo'].length > 0)
                filePaths.push(files['logo'][0].path);
            if (files['referenceMaterial'] && files['referenceMaterial'].length > 0)
                filePaths.push(files['referenceMaterial'][0].path);
            const responseFiles = await this.uploadRequirementFile(filePaths, "requirements");
            console.log(responseFiles);
            const data = {
                logo: responseFiles.logo ? responseFiles.logo : "",
                referenceMaterial: responseFiles.referenceMaterial ? responseFiles.referenceMaterial : "",
                ...formData
            };
            console.log(data);
            const response = await this.clientRepository.addRequirements(data);
            if (response) {
                const requirementsStatusReponse = await this.clientRepository.changeRequirementStatus(data.orderId, true);
                return true;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async uploadRequirementFile(filePaths, folderName) {
        try {
            const cloudinaryResponse = await (0, Cloudinary_1.uploadMultipleToCloudinary)(filePaths, folderName);
            if (!cloudinaryResponse) {
                throw new Error("Cloud file Upload Failed, please try again");
            }
            const logo = cloudinaryResponse[0] ? cloudinaryResponse[0].url : '';
            const referenceMaterial = cloudinaryResponse[1] ? cloudinaryResponse[1].url : '';
            console.log(logo);
            filePaths.forEach((path) => {
                fs_1.default.unlinkSync(path);
            });
            return { logo, referenceMaterial };
        }
        catch (error) {
        }
    }
    async getLatestTransaction(clientId) {
        try {
            const latestTransaction = await this.clientRepository.getLatestTransaction(clientId);
            if (latestTransaction) {
                return latestTransaction[0];
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateOrderIdTotransaction(sessionId, orderId) {
        try {
            const response = await this.clientRepository.addOrderIdToTransaction(sessionId, orderId);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getDeliverdWorkServ(orderId) {
        try {
            console.log(orderId);
            const response = await this.clientRepository.getDeliverdWork(orderId);
            console.log(response);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getDeliverdWorkFile(submitionId) {
        try {
            const response = await this.clientRepository.getDeliverdWorkFile(submitionId);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async manageWorkApproval(submisionId, status, orderId) {
        try {
            const response = await this.clientRepository.changeSubmissionStatus(submisionId, status);
            if (status == "approved") {
                const statusChange = await this.clientRepository.changeOrderStatus(orderId, "submited");
            }
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getfreelancerData(id) {
        try {
            const response = await this.clientRepository.getFreelancerData(id);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async submitPostReportServ(formData) {
        try {
            const isAlreadyRepoted = await this.clientRepository.findReportByIDs(formData.reported_post_id, formData.reporter_id);
            if (isAlreadyRepoted)
                throw new Error("you already Repoted this Post");
            const response = await this.clientRepository.submitPostReport(formData);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //addRating service
    async addRatingServ(workId, userId, ratingValue) {
        try {
            const response = await this.clientRepository.addRating(workId, userId, ratingValue);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //addRating service
    async getRatingByUserAndWorkServ(userId, workId) {
        try {
            const response = await this.clientRepository.getRatingByUserAndWork(userId, workId);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //addRating service
    async getAverageRatingForFreelancer(freelancerId) {
        try {
            const response = await this.clientRepository.getAverageRatingForFreelancer(freelancerId);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.ClientService = ClientService;
