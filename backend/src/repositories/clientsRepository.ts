// import { ClientDetails } from "../models/Clients";
import { ClientRepository } from "./clientsRepositoryImpl";
const ClientDetailsModel = require('../models/Clients').ClientDetails
import { Category, Subcategory } from "../models/Category";
import { WorkModel } from "../models/Works";
import { DeleteResult, ICategory, ISubcategory } from "../interfaces/adminInterface";
import { IWork, MyError, SingleWorkDetails } from "../interfaces/freelancerInterface";
import { TransactionModel } from "../models/Transaction";
import { IOrder, ISubmissions, ITransaction } from "../interfaces/clientInterface";
import { UpdateWriteOpResult } from "mongoose";
import { Order, Requirement } from "../models/Clients";
import { Freelancer, Submissions } from "../models/Freelancer";
import mongoose from 'mongoose';
import { IReport } from "../interfaces/chatInterface";
import { ReportModel } from "../models/Actions";
const ObjectId = mongoose.Types.ObjectId;

export class ClientRepositoryImpl implements ClientRepository {


    async ClientDetailsAdd(formData: any) {
        return await ClientDetailsModel.create(formData)
    }

    async FindWorkById(id: string): Promise<IWork | null> {
        try {
            return await WorkModel.findOne({ _id: id })
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async createTransaction(data: ITransaction): Promise<any> {
        try {
            return await TransactionModel.create(data)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async FindTransactionBySession(id: string): Promise<ITransaction | null> {
        try {
            return await TransactionModel.findOne({ session_id: id })
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async updateTransaction(session: string, status: string): Promise<UpdateWriteOpResult> {
        try {
            return await TransactionModel.updateOne({ session_id: session },
                {
                    $set: { payment_status: status }
                }
            )
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async createOrder(order: IOrder): Promise<IOrder> {
        try {
            return await Order.create(order)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getAllordersOfClient(client: string): Promise<IOrder[] | null> {
        try {
            return await Order.find({ clientId: client }).sort({ date: -1 });
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getSingleOrder(id: string): Promise<IOrder | null> {
        try {
            return await Order.findOne({ _id: id })
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    async addOrderIdToTransaction(sessionId: string, orderId: string): Promise<UpdateWriteOpResult> {
        try {
            return await TransactionModel.updateOne({ session_id: sessionId }, { $addToSet: { orderId: orderId } })
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async addRequirements(data: any): Promise<any> {
        try {
            const response = await Requirement.create(data)
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async changeRequirementStatus(orderId: string, status: Boolean): Promise<any> {
        try {
            console.log(orderId, status, " this is the arguments");

            const response = await Order.updateOne({ _id: orderId }, {
                $set: { requirementStatus: status }
            })
            console.log(response);

            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getLatestTransaction(clientId: string): Promise<ITransaction[] | null> {
        try {
            const latestTransaction = await TransactionModel.find({ user: clientId }).sort({ date: -1 }).limit(1)
            if (!latestTransaction) throw new Error("Couldn't find latest transaction")
            return latestTransaction
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    //get submitted details

    async getDeliverdWork(orderId: string): Promise<ISubmissions | null> {
        try {
            const response = await Submissions.aggregate([
                { $match: { orderId: new mongoose.Types.ObjectId(orderId) } },
                {
                    $lookup: {
                        from: "freelancers",
                        localField: "freelancerId",
                        foreignField: "_id",
                        as: "freelancer"
                    }
                },
                {
                    $lookup: {
                        from: "orders",
                        localField: "orderId",
                        foreignField: "_id",
                        as: "orderDetails"
                    }
                },
                {
                    $project: {
                        freelancer: {
                            username: 1,
                            profile: 1,
                            email: 1
                        },
                        orderDetails: {
                            workId: 1,
                            amount: 1,
                            WorkDetails: 1,
                            date: 1,
                            category: 1,
                            status: 1,
                            requirementStatus: 1,
                            deadline: 1,
                            approval: 1
                        },
                        workId: 1,
                        freelancerId: 1,
                        clientId: 1,
                        description: 1,
                        date: 1,
                        file: 1,
                        status: 1,
                        revise: 1,
                        orderId: 1,

                    }
                }
            ])
            if (!response) throw new Error("Couldn't find latest transaction")
            return response[0]
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    async getDeliverdWorkBySubmission(orderId: string): Promise<ISubmissions | null> {
        try {
            const response = await Submissions.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(orderId) } },
                {
                    $lookup: {
                        from: "freelancers",
                        localField: "freelancerId",
                        foreignField: "_id",
                        as: "freelancer"
                    }
                },
                {
                    $lookup: {
                        from: "orders",
                        localField: "orderId",
                        foreignField: "_id",
                        as: "orderDetails"
                    }
                },
                {
                    $project: {
                        freelancer: {
                            username: 1,
                            profile: 1,
                            email: 1
                        },
                        orderDetails: {
                            workId: 1,
                            amount: 1,
                            WorkDetails: 1,
                            date: 1,
                            category: 1,
                            status: 1,
                            requirementStatus: 1,
                            deadline: 1,
                            approval: 1
                        },
                        workId: 1,
                        freelancerId: 1,
                        clientId: 1,
                        description: 1,
                        date: 1,
                        file: 1,
                        status: 1,
                        revise: 1,
                        orderId: 1,

                    }
                }
            ])
            if (!response) throw new Error("Couldn't find latest transaction")
            return response[0]
        } catch (error: any) {
            throw new Error(error.message)
        }
    }



    async getFreelancerData(id: string): Promise<any> {
        try {
            const response = await Freelancer.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "freelancerdetails",
                        localField: "_id",
                        foreignField: "user",
                        as: "userDetails"
                    }
                },

            ])
            return response[0]
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getDeliverdWorkFile(submitId: string): Promise<any | null> {
        try {
            const Fileurl = await Submissions.findOne({ _id: submitId }, { file: 1 })
            if (!Fileurl) throw new Error("Couldn't find latest transaction")
            return Fileurl
        } catch (error: any) {
            throw new Error(error.message)
        }
    }


    async changeOrderStatus(orderId: string, status: string): Promise<UpdateWriteOpResult> {
        try {

            const response = await Order.updateOne({ _id: orderId }, {
                $set: { status: status }
            })
            console.log(response);

            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async changeSubmissionStatus(orderId: string, status: string): Promise<UpdateWriteOpResult> {
        try {
            const response = await Submissions.updateOne({ _id: orderId }, {
                $set: { status: status }
            })
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async submitPostReport(formData: IReport): Promise<IReport | null> {
        try {

            const response = await ReportModel.create(formData);
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async findReportByIDs(reported_post_id: string, reporter_id: string): Promise<IReport | null> {
        try {

            const response = await ReportModel.findOne({ reported_post_id: reported_post_id, reporter_id: reporter_id })
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    // async addRating(workId: string, userId: string, ratingValue: number): Promise<void> {
    //     try {
    //         const work = await WorkModel.findById(workId);
    //         if (!work) {
    //             throw new Error('Work not found');
    //         }

    //         // Check if the user has already rated the work
    //         const existingRatingIndex = work.ratings?.findIndex(rating => rating.user === userId);

    //         if (work.ratings && existingRatingIndex !== undefined && existingRatingIndex !== -1) {
    //             // If the user has already rated the work, update their existing rating
    //             work.ratings[existingRatingIndex]?.value = ratingValue;
    //         } else {
    //             // If the user has not yet rated the work, add a new rating for them
    //             work.ratings?.push({ user: userId, value: ratingValue });
    //         }

    //         // Calculate the average rating only if ratings is defined and not empty
    //         if (work.ratings && work.ratings.length > 0) {
    //             const totalRating = work.ratings.reduce((sum, rating) => sum + rating.value, 0);
    //             const averageRating = totalRating / work.ratings.length;
    //             work.averageRating = averageRating;
    //         } else {
    //             // If ratings array is empty or undefined, set averageRating to undefined
    //             work.averageRating = undefined;
    //         }

    //         // Save the updated document
    //         await work.save();


    //     } catch (error: any) {
    //         throw new Error(error.message)
    //     }
    // }

    async addRating(workId: string, userId: string, ratingValue: number): Promise<boolean> {
        try {
            const work = await WorkModel.findById(workId).exec();
            if (!work) {
                throw new Error('Work not found');
            }
    
            const existingRatingIndex = work.ratings?.findIndex(rating => rating.user.toString() === userId.toString());
    
            if (work.ratings !== undefined && existingRatingIndex !== undefined && existingRatingIndex !== -1) {
                work.ratings[existingRatingIndex].value = ratingValue;
            } else {
                const newRating = { user: userId, value: ratingValue };
                work.ratings = [...(work.ratings || []), newRating];
            }
    
            if (work.ratings && work.ratings.length > 0) {
                const totalRating = work.ratings.reduce((sum, rating) => sum + rating.value, 0);
                work.averageRating = totalRating / work.ratings.length;
            } else {
                work.averageRating = undefined;
            }
    
             await work.save();
            return true
        } catch (error:any) {
            throw new Error(error.message)
        }
    }


    async  getRatingByUserAndWork(userId: string, workId: string): Promise<number> {
        try {
            console.log(userId ,"user id");
            
            const work = await WorkModel.findById(workId);
            console.log(work, " this is work");
                        
            if (!work) {
                throw new Error('Work not found');
            }    
            const existingRating = work.ratings?.find(rating => rating.user.toString() === userId.toString());
            console.log(existingRating," - Rating");
            
            if (existingRating) {
                return existingRating.value;
            } else {
                return 0;
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    






}