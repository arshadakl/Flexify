"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepositoryImpl = void 0;
const AdminModel = require('../models/Admin').Admin;
const FreelancerModel = require('../models/Freelancer').Freelancer;
const Freelancer_1 = require("../models/Freelancer");
const Category_1 = require("../models/Category");
const Works_1 = require("../models/Works");
const Clients_1 = require("../models/Clients");
const Transaction_1 = require("../models/Transaction");
const Actions_1 = require("../models/Actions");
// import { AdminInter } from "../interfaces/adminInterface";
class AdminRepositoryImpl {
    async getAllUsersData() {
        return await Freelancer_1.Freelancer.find();
    }
    async findById(id) {
        return await FreelancerModel.findById(id);
    }
    async findAdminById(id) {
        return await AdminModel.findById(id);
    }
    async blockUser(id, action) {
        return await FreelancerModel.updateOne({ _id: id }, { isBlocked: action });
    }
    async findAdminByName(adminId) {
        return await AdminModel.findOne({ adminId: adminId });
    }
    //main category
    async findCategoryByName(name) {
        return await Category_1.Category.findOne({ title: name });
    }
    async findCategoryById(id) {
        return await Category_1.Category.findOne({ _id: id });
    }
    //category
    async addNewCategory(title, description) {
        return await Category_1.Category.create({ title: title, description: description });
    }
    async editCategory(title, description, _id) {
        return await Category_1.Category.updateOne({ _id: _id }, {
            $set: { title: title, description: description },
            $currentDate: { updatedAt: true },
        });
    }
    async getAllCategories() {
        try {
            const data = await Category_1.Category.find({});
            if (!data)
                throw new Error("No category");
            return data;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllCategoriesPagenation(page) {
        try {
            let limit = 5;
            let skip = (page - 1) * limit;
            let count = await Category_1.Category.find({}).countDocuments();
            let totalPages = Math.floor(count / limit);
            const data = await Category_1.Category.find({}).skip(skip).limit(limit);
            if (!data)
                throw new Error("No category");
            return { data, totalPages };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getOneCategorie(id) {
        return await Category_1.Category.findOne({ _id: id });
    }
    async deleteCategory(id) {
        return await Category_1.Category.deleteOne({ _id: id });
    }
    //sucatecory 
    async findSubCategoryByName(name) {
        return await Category_1.Subcategory.findOne({ name: name });
    }
    async findSubCategoryById(id) {
        return await Category_1.Subcategory.findOne({ _id: id });
    }
    async addNewSubCategory(name, description, category) {
        return await Category_1.Subcategory.create({ name: name, description: description, category: category });
    }
    async getAllSubCategories() {
        return await Category_1.Subcategory.find({});
    }
    async getOneSubCategorie(id) {
        return await Category_1.Subcategory.findOne({ _id: id });
    }
    async deleteSubCategory(id) {
        return await Category_1.Subcategory.deleteOne({ _id: id });
    }
    async deleteSubCategoryByMain(category) {
        return await Category_1.Subcategory.deleteMany({ category: category });
    }
    async editSubCategory(name, description, _id) {
        return await Category_1.Subcategory.updateOne({ _id: _id }, {
            $set: { name: name, description: description },
            $currentDate: { updatedAt: true },
        });
    }
    async getAllWorks() {
        return await Works_1.WorkModel.find();
    }
    async findWorkById(id) {
        return await Works_1.WorkModel.findOne({ _id: id });
    }
    async suspendWork(id, action) {
        try {
            const response = await Works_1.WorkModel.updateOne({ _id: id }, {
                $set: { isActive: action }
            });
            if (!action) {
                const repotedPost = await Actions_1.ReportModel.updateOne({ reported_post_id: id }, {
                    $set: { admin_review: true }
                });
            }
            return response;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAllOrders() {
        try {
            return await Clients_1.Order.find();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllTransaction() {
        try {
            // const response = await TransactionModel.find();
            const response = await Transaction_1.TransactionModel.aggregate([
                {
                    $lookup: {
                        from: "freelancers",
                        localField: "user",
                        foreignField: "_id",
                        as: "user"
                    }
                }, {
                    $sort: {
                        date: -1 // Sort by date in descending order (reverse order)
                    }
                }
            ]);
            if (!response)
                throw new Error("No transaction found");
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllSubmissions() {
        try {
            // const response = await TransactionModel.find();
            const response = await Freelancer_1.Submissions.aggregate([
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
                        from: "freelancers",
                        localField: "clientId",
                        foreignField: "_id",
                        as: "client"
                    }
                },
                {
                    $lookup: {
                        from: "workmodels",
                        localField: "workId",
                        foreignField: "_id",
                        as: "workDetails"
                    }
                }, {
                    $sort: {
                        date: -1
                    }
                }
            ]);
            if (!response)
                throw new Error("No transaction found");
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async GetRepotedPost() {
        try {
            const response = await Actions_1.ReportModel.aggregate([
                {
                    $lookup: {
                        from: "freelancers",
                        localField: "reporter_id",
                        foreignField: "_id",
                        as: "reporter"
                    }
                },
                {
                    $lookup: {
                        from: "workmodels",
                        localField: "reported_post_id",
                        foreignField: "_id",
                        as: "postDetails"
                    }
                },
                { $unwind: "$postDetails" },
                {
                    $lookup: {
                        from: "freelancers",
                        localField: "postDetails.user",
                        foreignField: "_id",
                        as: "FreelancerDetails"
                    }
                },
                {
                    $project: {
                        FreelancerDetails: {
                            username: 1,
                            profile: 1,
                            email: 1
                        },
                        reporter: {
                            username: 1,
                            profile: 1,
                            email: 1
                        },
                        postDetails: {
                            title: 1,
                            category: 1,
                            subcategory: 1,
                            categoryNames: 1,
                            tags: 1,
                            image1: 1,
                            deliveryPeriod: 1,
                            referenceMaterial: 1,
                            logo: 1,
                            description: 1,
                            questionnaire: 1,
                            amount: 1,
                            isActive: 1,
                            _id: 1
                        },
                        reported_post_id: 1,
                        reporter_id: 1,
                        reason: 1,
                        admin_review: 1,
                        admin_action: 1,
                        report_date: 1
                    }
                }
            ]);
            return response;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    // async getDashboardChartData(): Promise<any> {
    //     // Helper function to get the date 7 days ago
    //     const getSevenDaysAgoDate = (): Date => {
    //         const date = new Date();
    //         date.setDate(date.getDate() - 7);
    //         return date;
    //     };
    //     try {
    //         const sevenDaysAgo = getSevenDaysAgoDate();
    //         // Aggregation pipeline for Work Posts
    //         const workPostsPromise = WorkModel.aggregate([
    //             { $match: { date: { $gte: sevenDaysAgo.getTime() }, isActive: true } },
    //             { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$date" } } }, count: { $sum: 1 } } },
    //             { $sort: { _id: 1 } }
    //         ]).exec();
    //         // Aggregation pipeline for Work Purchases (Orders)
    //         const workPurchasesPromise = Order.aggregate([
    //             { $match: { date: { $gte: sevenDaysAgo.getTime() }} },
    //             { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$date" } } }, count: { $sum: 1 } } },
    //             { $sort: { _id: 1 } }
    //         ]).exec();
    //         // Aggregation pipeline for Work Submissions
    //         const workSubmissionsPromise = Submissions.aggregate([
    //             { $match: { date: { $gte: sevenDaysAgo.getTime() }, status: "approved" } },
    //             { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$date" } } }, count: { $sum: 1 } } },
    //             { $sort: { _id: 1 } }
    //         ]).exec();
    //         // Await all promises and return the results
    //         const [workPosts, workPurchases, workSubmissions] = await Promise.all([
    //             workPostsPromise,
    //             workPurchasesPromise,
    //             workSubmissionsPromise
    //         ]);
    //         return { workPosts, workPurchases, workSubmissions };
    //     } catch (error:any) {
    //         console.error('Error getting dashboard chart data:', error);
    //         return { error: error.message };
    //     }
    // }
    // async getDashboardChartData(): Promise<any> {
    //     // Helper function to get the date 7 days ago
    //     const getSevenDaysAgoDate = (): Date => {
    //         const date = new Date();
    //         date.setDate(date.getDate() - 7);
    //         return date;
    //     };
    //     try {
    //         const sevenDaysAgo = getSevenDaysAgoDate();
    //         const workPostsPromise = WorkModel.aggregate([
    //             { $match: { date: { $gte: sevenDaysAgo.getTime() }, isActive: true } },
    //             { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$date" } } }, count: { $sum: 1 } } },
    //             { $sort: { _id: 1 } }
    //         ]).exec();
    //         const workPurchasesPromise = Order.aggregate([
    //             { $match: { date: { $gte: sevenDaysAgo.getTime() }} },
    //             { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$date" } } }, count: { $sum: 1 } } },
    //             { $sort: { _id: 1 } }
    //         ]).exec();
    //         const workSubmissionsPromise = Submissions.aggregate([
    //             { $match: { date: { $gte: sevenDaysAgo.getTime() }, status: "approved" } },
    //             { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$date" } } }, count: { $sum: 1 } } },
    //             { $sort: { _id: 1 } }
    //         ]).exec();
    //         //am waiting for the all data
    //         const [workPosts, workPurchases, workSubmissions] = await Promise.all([
    //             workPostsPromise,
    //             workPurchasesPromise,
    //             workSubmissionsPromise
    //         ]);
    //         // Create an array containing the last 7 days
    //         const datesArray = [];
    //         for (let i = 0; i < 7; i++) {
    //             const date = new Date();
    //             date.setDate(date.getDate() - i);
    //             datesArray.push(date.toISOString().split('T')[0]);
    //         }
    //         // Merge the data obtained from aggregation queries with the dates array
    //         const mergedData = datesArray.map(date => {
    //             const workPostEntry = workPosts.find(entry => entry._id === date) || { count: 0 };
    //             const workPurchaseEntry = workPurchases.find(entry => entry._id === date) || { count: 0 };
    //             const workSubmissionEntry = workSubmissions.find(entry => entry._id === date) || { count: 0 };
    //             return {
    //                 date,
    //                 workPosts: workPostEntry.count,
    //                 workPurchases: workPurchaseEntry.count,
    //                 workSubmissions: workSubmissionEntry.count
    //             };
    //         });
    //         return mergedData;
    //     } catch (error:any) {
    //         console.error('Error getting dashboard chart data:', error);
    //         return { error: error.message };
    //     }
    // }
    //this is okay
    // _________
    async getDashboardChartData(timeFrame) {
        try {
            let startDate;
            let endDate = new Date(); // By default, set the end date to today
            switch (timeFrame) {
                case 'last7days':
                    startDate = new Date();
                    startDate.setDate(startDate.getDate() - 7);
                    break;
                case 'last12months':
                    startDate = new Date();
                    startDate.setFullYear(startDate.getFullYear() - 1);
                    startDate.setDate(1); // Set the day to the 1st of the month
                    break;
                case 'last5years':
                    startDate = new Date();
                    startDate.setFullYear(startDate.getFullYear() - 5);
                    startDate.setDate(1); // Set the day to the 1st of January
                    break;
                default:
                    throw new Error('Invalid time frame specified.');
            }
            // Debugging: Print out the start and end dates
            console.log('Start Date:', startDate);
            console.log('End Date:', endDate);
            // Convert startDate and endDate to Unix timestamps
            const startTimestamp = startDate.getTime();
            const endTimestamp = endDate.getTime();
            // Call the function to retrieve data based on the calculated start and end dates
            const data = await this.getChartData(startTimestamp, endTimestamp);
            return data;
        }
        catch (error) {
            console.error('Error getting dashboard chart data:', error);
            return { error: error.message };
        }
    }
    async getChartData(startDate, endDate) {
        try {
            // Add aggregation pipelines here based on start and end dates
            // Ensure that dates are compared correctly
            const workPostsPromise = Works_1.WorkModel.aggregate([
                { $match: { date: { $gte: startDate, $lte: endDate }, isActive: true } },
                { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$date" } } }, count: { $sum: 1 } } },
                { $sort: { _id: 1 } }
            ]).exec();
            const workPurchasesPromise = Clients_1.Order.aggregate([
                { $match: { date: { $gte: startDate, $lte: endDate } } },
                { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$date" } } }, count: { $sum: 1 } } },
                { $sort: { _id: 1 } }
            ]).exec();
            const workSubmissionsPromise = Freelancer_1.Submissions.aggregate([
                { $match: { date: { $gte: startDate, $lte: endDate }, status: "approved" } },
                { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: { $toDate: "$date" } } }, count: { $sum: 1 } } },
                { $sort: { _id: 1 } }
            ]).exec();
            // Await all promises and return the result
            const [workPosts, workPurchases, workSubmissions] = await Promise.all([
                workPostsPromise,
                workPurchasesPromise,
                workSubmissionsPromise
            ]);
            // Merge the data obtained from aggregation queries
            const mergedData = this.mergeData(workPosts, workPurchases, workSubmissions);
            return mergedData;
        }
        catch (error) {
            console.error('Error getting chart data:', error);
            throw error;
        }
    }
    // Helper function to merge data from different sources
    // mergeData(workPosts: any[], workPurchases: any[], workSubmissions: any[]): any[] {
    //     // Initialize an array to hold the past seven days
    //     const pastSevenDays = [];
    //     const today = new Date();
    //     for (let i = 0; i < 7; i++) {
    //         const date = new Date(today);
    //         date.setDate(today.getDate() - i);
    //         pastSevenDays.unshift(date.toISOString().split('T')[0]); // Add date in YYYY-MM-DD format
    //     }
    //     // Initialize the merged data array with counts set to 0
    //     const mergedData = pastSevenDays.map(date => ({
    //         date,
    //         workPosts: 0,
    //         workPurchases: 0,
    //         workSubmissions: 0
    //     }));
    //     // Iterate over the actual data and update the counts in the merged data
    //     for (const post of workPosts) {
    //         const index = pastSevenDays.indexOf(post._id);
    //         if (index !== -1) {
    //             mergedData[index].workPosts = post.count;
    //         }
    //     }
    //     for (const purchase of workPurchases) {
    //         const index = pastSevenDays.indexOf(purchase._id);
    //         if (index !== -1) {
    //             mergedData[index].workPurchases = purchase.count;
    //         }
    //     }
    //     for (const submission of workSubmissions) {
    //         const index = pastSevenDays.indexOf(submission._id);
    //         if (index !== -1) {
    //             mergedData[index].workSubmissions = submission.count;
    //         }
    //     }
    //     // console.log(mergedData);
    //     return mergedData;
    // }
    mergeData(workPosts, workPurchases, workSubmissions) {
        const pastSevenDays = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            pastSevenDays.unshift(date.toISOString().split('T')[0]);
        }
        // Initialize the merged data arrays with counts set to 0
        const mergedWorkPosts = pastSevenDays.map(date => ({
            x: date,
            y: 0
            // workPosts: 0
        }));
        const mergedWorkPurchases = pastSevenDays.map(date => ({
            x: date,
            y: 0
            // workPurchases: 0
        }));
        const mergedWorkSubmissions = pastSevenDays.map(date => ({
            x: date,
            y: 0
        }));
        for (const post of workPosts) {
            const index = pastSevenDays.indexOf(post._id);
            if (index !== -1) {
                mergedWorkPosts[index].y = post.count;
            }
        }
        for (const purchase of workPurchases) {
            const index = pastSevenDays.indexOf(purchase._id);
            if (index !== -1) {
                mergedWorkPurchases[index].y = purchase.count;
            }
        }
        for (const submission of workSubmissions) {
            const index = pastSevenDays.indexOf(submission._id);
            if (index !== -1) {
                mergedWorkSubmissions[index].y = submission.count;
                // mergedWorkSubmissions[index].workSubmissions = submission.count;
            }
        }
        const data = [
            { id: "post", data: mergedWorkPosts }, { id: "order", data: mergedWorkPurchases }, { id: "submissions", data: mergedWorkSubmissions }
        ];
        return data;
    }
    async getTopFreelancers() {
        try {
            const freelancers = await Freelancer_1.Submissions.aggregate([
                {
                    $group: {
                        _id: '$freelancerId',
                        submissionsCount: { $sum: 1 }
                    }
                },
                {
                    $lookup: {
                        from: 'freelancers',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'freelancer'
                    }
                },
                {
                    $unwind: '$freelancer'
                },
                {
                    $project: {
                        _id: 0,
                        username: '$freelancer.username',
                        email: '$freelancer.email',
                        profile: '$freelancer.profile',
                        submissionsCount: 1
                    }
                },
                {
                    $sort: {
                        submissionsCount: -1
                    }
                },
                {
                    $limit: 10
                }
            ]);
            return freelancers;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getProfit() {
        try {
            const profit = await Clients_1.Order.aggregate([
                {
                    $project: {
                        amount: 1,
                        profit: { $multiply: ["$amount", 0.05] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalProfit: { $sum: "$profit" }
                    }
                }
            ]);
            return profit[0].totalProfit;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getCountOfUsers() {
        try {
            const usersCount = await Freelancer_1.Freelancer.aggregate([
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 } // Count the documents
                    }
                }
            ]);
            return usersCount[0].count;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getCountOfOrder() {
        try {
            const OrderCount = await Clients_1.Order.aggregate([
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 }
                    }
                }
            ]);
            return OrderCount[0].count;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getCountOfPending() {
        try {
            const pendingCount = await Clients_1.Order.aggregate([
                {
                    $match: {
                        status: "pending"
                    }
                },
                {
                    $count: "count"
                }
            ]);
            console.log(pendingCount, "pending count ");
            return pendingCount[0].count;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.AdminRepositoryImpl = AdminRepositoryImpl;
