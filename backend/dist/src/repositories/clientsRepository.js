"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepositoryImpl = void 0;
const ClientDetailsModel = require('../models/Clients').ClientDetails;
const Works_1 = require("../models/Works");
const Transaction_1 = require("../models/Transaction");
const Clients_1 = require("../models/Clients");
const Freelancer_1 = require("../models/Freelancer");
const mongoose_1 = __importDefault(require("mongoose"));
const Actions_1 = require("../models/Actions");
const ObjectId = mongoose_1.default.Types.ObjectId;
class ClientRepositoryImpl {
    async ClientDetailsAdd(formData) {
        return await ClientDetailsModel.create(formData);
    }
    async FindWorkById(id) {
        try {
            return await Works_1.WorkModel.findOne({ _id: id });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async createTransaction(data) {
        try {
            return await Transaction_1.TransactionModel.create(data);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async FindTransactionBySession(id) {
        try {
            return await Transaction_1.TransactionModel.findOne({ session_id: id });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateTransaction(session, status) {
        try {
            return await Transaction_1.TransactionModel.updateOne({ session_id: session }, {
                $set: { payment_status: status }
            });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async createOrder(order) {
        try {
            return await Clients_1.Order.create(order);
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllordersOfClient(client) {
        try {
            return await Clients_1.Order.find({ clientId: client }).sort({ date: -1 });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getSingleOrder(id) {
        try {
            return await Clients_1.Order.findOne({ _id: id });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async addOrderIdToTransaction(sessionId, orderId) {
        try {
            return await Transaction_1.TransactionModel.updateOne({ session_id: sessionId }, { $addToSet: { orderId: orderId } });
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async addRequirements(data) {
        try {
            const response = await Clients_1.Requirement.create(data);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async changeRequirementStatus(orderId, status) {
        try {
            console.log(orderId, status, " this is the arguments");
            const response = await Clients_1.Order.updateOne({ _id: orderId }, {
                $set: { requirementStatus: status }
            });
            console.log(response);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getLatestTransaction(clientId) {
        try {
            const latestTransaction = await Transaction_1.TransactionModel.find({ user: clientId }).sort({ date: -1 }).limit(1);
            if (!latestTransaction)
                throw new Error("Couldn't find latest transaction");
            return latestTransaction;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //get submitted details
    async getDeliverdWork(orderId) {
        try {
            const response = await Freelancer_1.Submissions.aggregate([
                { $match: { orderId: new mongoose_1.default.Types.ObjectId(orderId) } },
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
            ]);
            if (!response)
                throw new Error("Couldn't find latest transaction");
            return response[0];
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getDeliverdWorkBySubmission(orderId) {
        try {
            const response = await Freelancer_1.Submissions.aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(orderId) } },
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
            ]);
            if (!response)
                throw new Error("Couldn't find latest transaction");
            return response[0];
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getFreelancerData(id) {
        try {
            const response = await Freelancer_1.Freelancer.aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "freelancerdetails",
                        localField: "_id",
                        foreignField: "user",
                        as: "userDetails"
                    }
                },
            ]);
            return response[0];
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getDeliverdWorkFile(submitId) {
        try {
            const Fileurl = await Freelancer_1.Submissions.findOne({ _id: submitId }, { file: 1 });
            if (!Fileurl)
                throw new Error("Couldn't find latest transaction");
            return Fileurl;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async changeOrderStatus(orderId, status) {
        try {
            const response = await Clients_1.Order.updateOne({ _id: orderId }, {
                $set: { status: status }
            });
            console.log(response);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async changeSubmissionStatus(orderId, status) {
        try {
            const response = await Freelancer_1.Submissions.updateOne({ _id: orderId }, {
                $set: { status: status }
            });
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async submitPostReport(formData) {
        try {
            const response = await Actions_1.ReportModel.create(formData);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findReportByIDs(reported_post_id, reporter_id) {
        try {
            const response = await Actions_1.ReportModel.findOne({ reported_post_id: reported_post_id, reporter_id: reporter_id });
            return response;
        }
        catch (error) {
            throw new Error(error.message);
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
    async addRating(workId, userId, ratingValue) {
        try {
            const work = await Works_1.WorkModel.findById(workId).exec();
            if (!work) {
                throw new Error('Work not found');
            }
            const existingRatingIndex = work.ratings?.findIndex(rating => rating.user.toString() === userId.toString());
            if (work.ratings !== undefined && existingRatingIndex !== undefined && existingRatingIndex !== -1) {
                work.ratings[existingRatingIndex].value = ratingValue;
            }
            else {
                const newRating = { user: userId, value: ratingValue };
                work.ratings = [...(work.ratings || []), newRating];
            }
            if (work.ratings && work.ratings.length > 0) {
                const totalRating = work.ratings.reduce((sum, rating) => sum + rating.value, 0);
                work.averageRating = totalRating / work.ratings.length;
            }
            else {
                work.averageRating = undefined;
            }
            await work.save();
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getRatingByUserAndWork(userId, workId) {
        try {
            console.log(userId, "user id");
            const work = await Works_1.WorkModel.findById(workId);
            console.log(work, " this is work");
            if (!work) {
                throw new Error('Work not found');
            }
            const existingRating = work.ratings?.find(rating => rating.user.toString() === userId.toString());
            console.log(existingRating, " - Rating");
            if (existingRating) {
                return existingRating.value;
            }
            else {
                return 0;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAverageRatingForFreelancer(freelancerId) {
        try {
            const works = await Works_1.WorkModel.find({ user: freelancerId });
            if (works.length === 0) {
                return null;
            }
            let totalRating = 0;
            let totalCount = 0;
            works.forEach(work => {
                if (work.ratings && work.ratings.length > 0) {
                    work.ratings.forEach(rating => {
                        totalRating += rating.value / 10;
                        totalCount++;
                    });
                }
            });
            const averageRating = (totalRating / totalCount) * 10;
            return averageRating;
        }
        catch (error) {
            console.log(error);
            throw new Error(`Error getting average rating for freelancer: ${error}`);
        }
    }
}
exports.ClientRepositoryImpl = ClientRepositoryImpl;
