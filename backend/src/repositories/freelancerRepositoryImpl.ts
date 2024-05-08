// freelancerRepositoryImpl.ts
import { error } from "console";
import { Freelancer, FreelancerDetails, Submissions } from "../models/Freelancer";
import { FreelancerRepository } from "./freelancerRepository";
// import {FreelancerModel} from "../models/Freelancer";
const FreelancerModel = require('../models/Freelancer').Freelancer
const FreelancerDetailsModel = require('../models/Freelancer').FreelancerDetails
import bcrypt from "bcrypt"
import { Category, Subcategory } from "../models/Category";
import { WorkModel } from "../models/Works";
import { DeleteResult, ICategory, ISubcategory } from "../interfaces/adminInterface";
import {  ChartDataResponse, DailyData, IWork, SingleWorkDetails } from "../interfaces/freelancerInterface";
import { UpdateWriteOpResult } from "mongoose";
import mongoose from 'mongoose';
import { Order, Requirement } from "../models/Clients";
import { IOrder, ISubmissions, ITransaction } from "../interfaces/clientInterface";
import { TransactionModel } from "../models/Transaction";
const ObjectId = mongoose.Types.ObjectId;


export class FreelancerRepositoryImpl implements FreelancerRepository {
    async findByUsername(username: string): Promise<Freelancer | null> {
        return await FreelancerModel.findOne({ username });
    }

    async findByEmail(email: string): Promise<Freelancer | null> {
        return await FreelancerModel.findOne({ email });
    }


    async find_ById(id: string): Promise<Freelancer | undefined> {
        console.log(id, "in implements FreelancerRepository");

        const res = await FreelancerModel.findById(id);
        console.log(res, "imp");

        return res
    }

    async create(freelancer: Freelancer): Promise<void> {
        await FreelancerModel.create(freelancer);
    }


    async checkPassword(username: string, password: string): Promise<boolean> {
        const freelancer = await FreelancerModel.findOne({ username });
        if (!freelancer) {
            return false; // User not found
        }
        const isPasswordValid = await bcrypt.compare(password, freelancer.password);
        return isPasswordValid;
        // return false; 
    }




    async clearOTP(email: string) {
        await FreelancerModel.updateOne({ email },
            {
                $set: { OTP: -1 }
            }
        )
    }

    async FreelancerDetailsAdd(formData: any) {
        return await FreelancerDetailsModel.create(formData)
    }



    async FreelancerDetailsupdate(formData: any) {
        try {
            console.log('Updating freelancer details for user:', formData.user);
            console.log('New data:', formData);

            const result = await FreelancerDetailsModel.updateOne(
                { user: formData.user },
                {
                    $set: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        Country: formData.Country,
                        language: formData.language,
                        skillsList: formData.skillsList,
                        bio: formData.bio
                    }
                }
            );

            console.log('Update result:', result);
            return result;
        } catch (error) {
            console.error('Error updating freelancer details:', error);
            throw error;
        }
    }



    async doVerification(id: String) {
        return await FreelancerModel.updateOne({ _id: id },
            {
                $set: { isVerified: 1 }
            }
        )
    }

    async doRolespecify(id: String, role: string): Promise<UpdateWriteOpResult> {
        return await FreelancerModel.updateOne({ _id: id },
            {
                $set: { role: role }
            }
        )
    }

    async setNewOTP(email: string, otp: number) {
        return await Freelancer.updateOne({ email: email },
            {
                $set: { OTP: otp },

            }
        )

    }
    async cleanOTP(email: string) {
        return await Freelancer.updateOne({ email: email }, { $set: { OTP: 0 } })
    }

    // async updatePassword(id:string, password:string):Promise<any>{
    //     return await Freelancer.updateOne({_id:id},{$set:{password:password}})
    // }

    async updatePassword(id: string, password: string): Promise<any> {
        return await Freelancer.updateOne(
            { _id: id },
            {
                $set: { password: password },
                $currentDate: { updatedAt: true }, // Update the updatedAt field with the current timestamp
            }
        );
    }


    async findDetailsById(id: string): Promise<FreelancerDetails | null> {
        console.log("implement id", id);
        return await FreelancerDetailsModel.findOne({ user: id });
    }

    async updateProfileImage(id: string, filepath: string): Promise<Freelancer | null> {
        const response = await Freelancer.updateOne({ _id: id },
            {
                $set: { profile: filepath }
            }
        )
        if (response) {
            console.log(id);
            const data = await Freelancer.findById(id);
            if (data) {
                console.log(data, "updated profile image data");
                return data
            } else {
                throw new Error("data not found");
            }
        } else {
            throw new Error("Failed to update profile image")
        }

    }


    async getAllCategories(): Promise<ICategory[] | undefined> {
        return await Category.find({})
    }

    async getAllSubCategories(): Promise<ISubcategory[] | undefined> {
        return await Subcategory.find({})
    }

    async findCategoriesById(id: string): Promise<ICategory | null> {
        return await Category.findOne({ _id: id })
    }

    async findSubCategoriesById(id: string): Promise<ISubcategory | null> {
        return await Subcategory.findOne({ _id: id })
    }

    async createWorkPost(workData: IWork): Promise<IWork> {
        return await WorkModel.create(workData)
    }

    async getAllWorkOfUser(id: string): Promise<IWork[] | null> {
        return await WorkModel.find({ user: id });
    }

    // async getAllActiveWorksToDiscover(): Promise<IWork[]> {
    //     return await WorkModel.find({ isActive: true });
    // }

    async deleteWork(id: string): Promise<DeleteResult> {
        return await WorkModel.deleteOne({ _id: id });
    }



    // async getAllActiveWorksToDiscover(): Promise<any> {
    //     try {
    //         const works = await WorkModel.aggregate([
    //             {
    //                 $match: {
    //                     isActive: true
    //                 }
    //             },
    //             // Lookup user details
    //             {
    //                 $lookup: {
    //                     from: "freelancers",
    //                     localField: "user",
    //                     foreignField: "_id",
    //                     as: "user"
    //                 }
    //             },
    //             { $unwind: "$user" },
    //             // Lookup freelancer details
    //             {
    //                 $lookup: {
    //                     from: "freelancerdetails",
    //                     localField: "user._id",
    //                     foreignField: "user",
    //                     as: "freelancerdetails"
    //                 }
    //             },
    //             // Project only the required fields
    //             {
    //                 $project: {
    //                     user: {
    //                         _id: 1,
    //                         username: 1,
    //                         email: 1,
    //                         profile: 1,
    //                         role: 1
    //                     },
    //                     title: 1,
    //                     category: 1,
    //                     subcategory: 1,
    //                     categoryNames: 1,
    //                     tags: 1,
    //                     image1: 1,
    //                     image2: 1,
    //                     image3: 1,
    //                     deliveryPeriod: 1,
    //                     referenceMaterial: 1,
    //                     logo: 1,
    //                     description: 1,
    //                     questionnaire: 1,
    //                     amount: 1,
    //                     isActive: 1,
    //                     freelancerdetails: 1,
    //                     // Include averageRating field for sorting
    //                     averageRating: { $ifNull: ["$averageRating", 0] } // Use 0 if averageRating is null
    //                 }
    //             },
    //             // Sort works based on averageRating in descending order
    //             { $sort: { averageRating: -1 } }
    //         ]);

    //         console.log(works, "Sorted works"); // Log the sorted works to verify

    //         return works;

    //     } catch (error) {
    //         console.log(error);

    //         throw new Error(`Error getting all active work details: ${error}`);
    //     }
    // }



    async getAllActiveWorksToDiscover(searchTerm: string, categoryName: string, page: number): Promise<any> {
        try {
          const limit = 6;
          const skip = (page - 1) * limit;
      
          // Define the regular expression for searching
          const searchRegex = new RegExp(searchTerm, 'i');
          const categoryRegex = new RegExp(categoryName, 'i');
      
          const works = await WorkModel.aggregate([
            {
              $match: {
                isActive: true,
                ...(searchTerm || categoryName
                  ? {
                      $or: [
                        ...(searchTerm
                          ? [
                              { title: { $regex: searchRegex } },
                              { categoryNames: { $elemMatch: { $regex: searchRegex } } },
                              { tags: { $elemMatch: { $regex: searchRegex } } },
                            ]
                          : []),
                        ...(categoryName
                          ? [{ categoryNames: { $elemMatch: { $regex: categoryRegex } } }]
                          : []),
                      ],
                    }
                  : {}),
              },
            },
            // Lookup user details
            {
              $lookup: {
                from: 'freelancers',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
              },
            },
            { $unwind: '$user' },
            // Lookup freelancer details
            {
              $lookup: {
                from: 'freelancerdetails',
                localField: 'user._id',
                foreignField: 'user',
                as: 'freelancerdetails',
              },
            },
            // Project only the required fields
            {
              $project: {
                user: { _id: 1, username: 1, email: 1, profile: 1, role: 1 },
                title: 1,
                category: 1,
                subcategory: 1,
                categoryNames: 1,
                tags: 1,
                image1: 1,
                image2: 1,
                image3: 1,
                deliveryPeriod: 1,
                referenceMaterial: 1,
                logo: 1,
                description: 1,
                questionnaire: 1,
                amount: 1,
                isActive: 1,
                freelancerdetails: 1,
                // Include averageRating field for sorting
                averageRating: { $ifNull: ['$averageRating', 0] }, // Use 0 if averageRating is null
              },
            },
            // Sort works based on averageRating in descending order
            { $sort: { averageRating: -1 } },
            // Skip documents based on the page number
            { $skip: skip },
            // Limit the number of documents to retrieve
            { $limit: limit },
          ]);
      
          // Get the total count of documents
          const count = await WorkModel.countDocuments({
            isActive: true,
            ...(searchTerm || categoryName
              ? {
                  $or: [
                    ...(searchTerm
                      ? [
                          { title: { $regex: searchRegex } },
                          { categoryNames: { $elemMatch: { $regex: searchRegex } } },
                          { tags: { $elemMatch: { $regex: searchRegex } } },
                        ]
                      : []),
                    ...(categoryName
                      ? [{ categoryNames: { $elemMatch: { $regex: categoryRegex } } }]
                      : []),
                  ],
                }
              : {}),
          });
      
          const totalPages = Math.ceil(count / limit);
      
          console.log(works, 'Sorted works');
          return { works, totalPages };
        } catch (error) {
          console.log(error);
          throw new Error(`Error getting all active work details: ${error}`);
        }
      }


    // async getAllActiveWorksToDiscover(searchTerm: string,filter:string, page: number): Promise<any> {
    //     try {
    //       const limit = 6;
    //       const skip = (page - 1) * limit;
      
    //       // Define the regular expression for searching
    //       const regex = new RegExp(searchTerm, 'i');
      
    //       const works = await WorkModel.aggregate([
    //         {
    //           $match: searchTerm
    //             ? {
    //                 isActive: true,
    //                 $or: [
    //                   { title: { $regex: regex } },
    //                   { categoryNames: { $elemMatch: { $regex: regex } } },
    //                   { tags: { $elemMatch: { $regex: regex } } },
    //                 ],
    //               }
    //             : { isActive: true }, // If searchTerm is empty, match only active works
    //         },
    //         // Lookup user details
    //         {
    //           $lookup: {
    //             from: 'freelancers',
    //             localField: 'user',
    //             foreignField: '_id',
    //             as: 'user',
    //           },
    //         },
    //         { $unwind: '$user' },
    //         // Lookup freelancer details
    //         {
    //           $lookup: {
    //             from: 'freelancerdetails',
    //             localField: 'user._id',
    //             foreignField: 'user',
    //             as: 'freelancerdetails',
    //           },
    //         },
    //         // Project only the required fields
    //         {
    //           $project: {
    //             user: { _id: 1, username: 1, email: 1, profile: 1, role: 1 },
    //             title: 1,
    //             category: 1,
    //             subcategory: 1,
    //             categoryNames: 1,
    //             tags: 1,
    //             image1: 1,
    //             image2: 1,
    //             image3: 1,
    //             deliveryPeriod: 1,
    //             referenceMaterial: 1,
    //             logo: 1,
    //             description: 1,
    //             questionnaire: 1,
    //             amount: 1,
    //             isActive: 1,
    //             freelancerdetails: 1,
    //             // Include averageRating field for sorting
    //             averageRating: { $ifNull: ['$averageRating', 0] }, // Use 0 if averageRating is null
    //           },
    //         },
    //         // Sort works based on averageRating in descending order
    //         { $sort: { averageRating: -1 } },
    //         // Skip documents based on the page number
    //         { $skip: skip },
    //         // Limit the number of documents to retrieve
    //         { $limit: limit },
    //       ]);
      
    //       // Get the total count of documents
    //       const count = await WorkModel.countDocuments(
    //         searchTerm
    //           ? {
    //               isActive: true,
    //               $or: [
    //                 { title: { $regex: regex } },
    //                 { categoryNames: { $elemMatch: { $regex: regex } } },
    //                 { tags: { $elemMatch: { $regex: regex } } },
    //               ],
    //             }
    //           : { isActive: true }
    //       );
      
    //       const totalPages = Math.ceil(count / limit);
      
    //       console.log(works, 'Sorted works');
    //       return { works, totalPages };
    //     } catch (error) {
    //       console.log(error);
    //       throw new Error(`Error getting all active work details: ${error}`);
    //     }
    //   }

    // for search 
    async getAllActiveWorksToDiscoverSearch(searchTerm: string): Promise<any> {
        try {
          // Define the regular expression for searching
          const regex = new RegExp(searchTerm, 'i');
      
          const works = await WorkModel.aggregate([
            {
              $match: {
                isActive: true,
                $or: [
                  { title: { $regex: regex } },
                  { categoryNames: { $elemMatch: { $regex: regex } } },
                  { tags: { $elemMatch: { $regex: regex } } },
                ],
              },
            },
            // Lookup user details
            {
              $lookup: {
                from: 'freelancers',
                localField: 'user',
                foreignField: '_id',
                as: 'user',
              },
            },
            { $unwind: '$user' },
            // Lookup freelancer details
            {
              $lookup: {
                from: 'freelancerdetails',
                localField: 'user._id',
                foreignField: 'user',
                as: 'freelancerdetails',
              },
            },
            // Project only the required fields
            {
              $project: {
                user: { _id: 1, username: 1, email: 1, profile: 1, role: 1 },
                title: 1,
                category: 1,
                subcategory: 1,
                categoryNames: 1,
                tags: 1,
                image1: 1,
                image2: 1,
                image3: 1,
                deliveryPeriod: 1,
                referenceMaterial: 1,
                logo: 1,
                description: 1,
                questionnaire: 1,
                amount: 1,
                isActive: 1,
                freelancerdetails: 1,
                // Include averageRating field for sorting
                averageRating: { $ifNull: ['$averageRating', 0] }, // Use 0 if averageRating is null
              },
            },
            // Sort works based on averageRating in descending order
            { $sort: { averageRating: -1 } },
          ]);
      
          console.log(works, 'Sorted works');
          return works;
        } catch (error) {
          console.log(error);
          throw new Error(`Error getting all active work details: ${error}`);
        }
      }



    async getWorkDetails(id: string): Promise<any> {
        try {
            console.log(id);

            const response = await WorkModel.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "freelancers",
                        localField: "user",
                        foreignField: "_id",
                        as: "user"
                    }
                },

                { $unwind: "$user" },
                {
                    $lookup: {
                        from: "freelancerdetails",
                        localField: "user._id",
                        foreignField: "user",
                        as: "freelancerdetails"
                    }
                },
                { $unwind: "$freelancerdetails" },
                {
                    $project: {
                        user: {
                            _id: 1,
                            username: 1,
                            email: 1,
                            profile: 1,
                            role: 1
                        },
                        title: 1,
                        category: 1,
                        subcategory: 1,
                        categoryNames: 1,
                        tags: 1,
                        image1: 1,
                        image2: 1,
                        image3: 1,
                        deliveryPeriod: 1,
                        referenceMaterial: 1,
                        logo: 1,
                        description: 1,
                        questionnaire: 1,
                        amount: 1,
                        isActive: 1,
                        freelancerdetails: 1
                    }
                }

            ]);

            console.log(response, "first reposnse");

            return response
        } catch (error) {
            console.log(error);

            throw new Error(`Error getting work details: ${error}`);
        }
    };



    async getOrderDetails(id: string): Promise<any> {
        try {
            console.log(id,"new id");
            
            const response = await Order.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "freelancers",
                        localField: "clientId",
                        foreignField: "_id",
                        as: "client"
                    }
                },
                {
                    $project: {
                        client: {
                            _id: 1,
                            username: 1,
                            email: 1,
                            profile: 1,
                        },
                        workId: 1,
                        freelancerId: 1,
                        clientId: 1,
                        category: 1,
                        amount: 1,
                        WorkDetails: 1,
                        date: 1,
                        status: 1,
                        requirementStatus: 1,
                        deadline: 1
                    }
                }

            ]);

            return response
        } catch (error) {
            console.log(error);

            throw new Error(`Error getting work details: ${error}`);
        }
    };


    async getRecivedWork(id: string): Promise<IOrder[] | null> {
        try {
            // const works = await Order.find({freelancerId: id});
            const works = await Order.aggregate([
                { $match: { freelancerId: new mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "freelancers",
                        localField: "clientId",
                        foreignField: "_id",
                        as: "client"
                    }
                },
                {
                    $project: {
                        client: {
                            username: 1,
                            profile: 1,
                            email: 1
                        },
                        workId: 1,
                        freelancerId: 1,
                        clientId: 1,
                        category: 1,
                        amount: 1,
                        WorkDetails: 1,
                        date: 1,
                        status: 1,
                        requirementStatus: 1,
                        deadline: 1

                    }
                }, {
                    $sort: {
                        date: -1 // Sort by date in descending order (reverse order)
                    }
                }
            ])
            if (!works) throw new Error("Work not found");
            return works
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


    // get all active post
    async getAllActivepost(freelancerId: string): Promise<IWork[] | null> {
        try {
            const works = await WorkModel.aggregate([
                { $match: { user: freelancerId, isActive: true } },
            ])
            if (!works) throw new Error("Work not found");
            return works
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    // get all suspended post
    async getAllSuspendedpost(freelancerId: string): Promise<IWork[] | null> {
        try {
            const works = await WorkModel.aggregate([
                { $match: { user: freelancerId, isActive: false } },
            ])
            return works
        } catch (error: any) {
            throw new Error(error.message)
        }
    }


    async getSingleWork(workId: string): Promise<IWork | null> {
        try {
            const response = await WorkModel.findById(workId)
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async updateWork(data: any, workId: string): Promise<UpdateWriteOpResult> {
        try {
            console.log(data);

            const response = await WorkModel.updateOne(
                { _id: workId },
                {
                    $set: data
                }
            )
            console.log(response);

            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async createSubmission(data: any): Promise<ISubmissions | null> {
        try {
            const response = await Submissions.create(data)
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }


    async changeWorkStatus(orderId: string, status: string): Promise<UpdateWriteOpResult> {
        try {

            const response = await Order.updateOne({ _id: orderId }, {
                $set: { status: status }
            })

            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }


    async getRequirements(id: string): Promise<any> {
        try {
            const response = await Requirement.aggregate([
                { $match: { orderId: new mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: "workmodels",
                        localField: "workId",
                        foreignField: "_id",
                        as: "workData"
                    }
                },
                // {
                //     $project: {
                //         client: {
                //             _id: 1,
                //             username: 1,
                //             email: 1,
                //             profile: 1,
                //         },
                //         workId:1,
                //         freelancerId:1,
                //         clientId:1,
                //         category:1,
                //         amount:1,
                //         WorkDetails: 1,
                //         date:1,
                //         status: 1,
                //         requirementStatus:1,
                //         deadline:1
                //     }
                // }

            ]);

            return response
        } catch (error) {
            console.log(error);

            throw new Error(`Error getting work details: ${error}`);
        }
    };



    async getUserAllTransaction(userId: string): Promise<ITransaction[] | null> {
        try {
            const response = await TransactionModel.aggregate([
                { $match: { user: userId } }
            ])
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }


    // async getChartData(freelancerId:string):Promise<any> {
    //     try {
    //       const endDate = new Date();
    //       const startDate = new Date(endDate.getTime() - (7 * 24 * 60 * 60 * 1000)); // 7 days ago

    //       const response = await Order.aggregate([
    //         {
    //           $match: {
    //             freelancerId: new mongoose.Types.ObjectId(freelancerId),
    //             date: { $gte: startDate, $lte: endDate }
    //           }
    //         },
    //         {
    //           $lookup: {
    //             from: 'freelancers',
    //             localField: 'freelancerId',
    //             foreignField: '_id',
    //             as: 'freelancer'
    //           }
    //         },
    //         {
    //           $unwind: '$freelancer'
    //         },
    //         {
    //           $group: {
    //             _id: {
    //               day: { $dateToString: { format: '%Y-%m-%d', date: '$date' } }
    //             },
    //             orderCount: { $sum: 1 },
    //             totalAmount: { $sum: '$amount' }
    //           }
    //         },
    //         {
    //           $project: {
    //             _id: 0,
    //             day: '$_id.day',
    //             orderCount: 1,
    //             totalAmount: 1
    //           }
    //         },
    //         {
    //           $sort: { day: 1 }
    //         }
    //       ]);

    //       // Fill in missing days with zeros
    //       const filledResponse = [];
    //       for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    //         const dateString = d.toISOString().split('T')[0];
    //         const dataForDay = response.find((data) => data.day === dateString);
    //         filledResponse.push({
    //           day: dateString,
    //           orderCount: dataForDay ? dataForDay.orderCount : 0,
    //           totalAmount: dataForDay ? dataForDay.totalAmount : 0
    //         });
    //       }

    //       return filledResponse;
    //     } catch (error:any) {
    //       throw new Error(error.message);
    //     }
    //   }

    
    // async getChartData(freelancerId: string): Promise<ChartDataResponse[]> {
    //     try {
    //       const startDate = new Date();
    //       startDate.setDate(startDate.getDate() - 7); // Set the start date to 7 days ago
      
    //       const aggregationResult: any[] = await Order.aggregate([
    //         {
    //           $match: {
    //             freelancerId: new mongoose.Types.ObjectId(freelancerId),
    //             date: { $gte: startDate.getTime() }
    //           }
    //         },
    //         {
    //           $lookup: {
    //             from: 'freelancers',
    //             localField: 'freelancerId',
    //             foreignField: '_id',
    //             as: 'freelancer'
    //           }
    //         },
    //         { $unwind: '$freelancer' },
    //         {
    //           $group: {
    //             _id: {
    //               freelancerId: '$freelancer._id',
    //               day: {
    //                 $dateToString: {
    //                   format: '%Y-%m-%d',
    //                   date: { $toDate: '$date' }
    //                 }
    //               }
    //             },
    //             freelancerDetails: { $first: '$freelancer' },
    //             orderCount: { $sum: 1 },
    //             totalAmount: { $sum: '$amount' }
    //           }
    //         },
    //         { $sort: { '_id.day': 1 } },
    //         {
    //           $group: {
    //             _id: '$_id.freelancerId',
    //             freelancerDetails: { $first: '$freelancerDetails' },
    //             dailyData: {
    //               $push: {
    //                 day: '$_id.day',
    //                 orderCount: '$orderCount',
    //                 totalAmount: '$totalAmount'
    //               }
    //             }
    //           }
    //         }
    //       ]).exec(); // Execute the aggregation pipeline
      
    //       // Helper function to generate a range of dates
    //       const generateDateRange = (start: Date, end: Date): string[] => {
    //         const dates: string[] = [];
    //         let currentDate = new Date(start);
    //         while (currentDate <= end) {
    //           dates.push(currentDate.toISOString().split('T')[0]); // Format date as 'YYYY-MM-DD'
    //           currentDate.setDate(currentDate.getDate() + 1);
    //         }
    //         return dates;
    //       };
      
    //       // Generate the date range array
    //       const dateRange = generateDateRange(startDate, new Date());
      
    //       // Map the aggregation result to the ChartDataResponse type
    //       const chartDataResponses: ChartDataResponse[] = aggregationResult.map(item => {
    //         // Initialize dailyData as an empty array if it's undefined
    //         item.dailyData = item.dailyData || [];
      
    //         // Fill in missing days with zeros
    //         const filledDailyData = dateRange.map(date => {
    //             const existingData = item.dailyData.find((d: DailyData) => d.day === date);
    //             return existingData || { day: date, orderCount: 0, totalAmount: 0 };
    //           });
      
    //         // Replace dailyData with filledDailyData
    //         item.dailyData = filledDailyData;
      
    //         return item as ChartDataResponse; // Cast the item to ChartDataResponse
    //       });
      
    //       return chartDataResponses;
    //     } catch (error: any) {
    //       throw new Error(error.message);
    //     }
    //   }

    async  getChartData(freelancerId: string): Promise<ChartDataResponse[]> {
        try {
          const startDate = new Date();
          startDate.setDate(startDate.getDate() - 7); // Set the start date to 7 days ago
      
          const aggregationResult: any[] = await Order.aggregate([
            {
              $match: {
                freelancerId: new mongoose.Types.ObjectId(freelancerId),
                date: { $gte: startDate.getTime() }
              }
            },
            {
              $lookup: {
                from: 'freelancers',
                localField: 'freelancerId',
                foreignField: '_id',
                as: 'freelancer'
              }
            },
            { $unwind: '$freelancer' },
            {
              $group: {
                _id: {
                  freelancerId: '$freelancer._id',
                  day: {
                    $dateToString: {
                      format: '%Y-%m-%d',
                      date: { $toDate: '$date' }
                    }
                  }
                },
                freelancerDetails: { $first: '$freelancer' },
                orderCount: { $sum: 1 },
                totalAmount: { $sum: '$amount' }
              }
            },
            { $sort: { '_id.day': 1 } },
            {
              $group: {
                _id: '$_id.freelancerId',
                freelancerDetails: { $first: '$freelancerDetails' },
                dailyData: {
                  $push: {
                    day: '$_id.day',
                    orderCount: '$orderCount',
                    totalAmount: '$totalAmount'
                  }
                }
              }
            }
          ]).exec(); // Execute the aggregation pipeline
      
          // Helper function to generate a range of dates
          const generateDateRange = (start: Date, end: Date): string[] => {
            const dates: string[] = [];
            let currentDate = new Date(start);
            while (currentDate <= end) {
              dates.push(currentDate.toISOString().split('T')[0]); // Format date as 'YYYY-MM-DD'
              currentDate.setDate(currentDate.getDate() + 1);
            }
            return dates;
          };
      
          // Generate the date range array
          const dateRange = generateDateRange(startDate, new Date());
      
          // Map the aggregation result to the ChartDataResponse type
          const chartDataResponses: ChartDataResponse[] = aggregationResult.map(item => {
            // Initialize dailyData as an empty array if it's undefined
            item.dailyData = item.dailyData || [];
      
            // Separate orderCount and totalAmount into their own arrays
            const orderCountArray = dateRange.map(date => {
              const existingData = item.dailyData.find((d: DailyData) => d.day === date);
              return { day: date, orderCount: existingData ? existingData.orderCount : 0 };
            });
      
            const amountArray = dateRange.map(date => {
              const existingData = item.dailyData.find((d: DailyData) => d.day === date);
              return { day: date, totalAmount: existingData ? existingData.totalAmount : 0 };
            });
      
            // Construct the final response object
            return {
              _id: item._id,
              freelancerDetails: item.freelancerDetails,
              orderCount: orderCountArray,
              Amount: amountArray
            };
          });
      
          return chartDataResponses;
        } catch (error: any) {
          throw new Error(error.message);
        }
      }
      


      async getStaticsData(freelancerId:string):Promise<any>{
        try {
            const result = await Order.aggregate([
                { $match: { freelancerId: freelancerId } },
                {
                  $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' },
                  },
                },
                {
                  $project: {
                    earnings: {
                      $multiply: [{ $divide: [{ $multiply: ['$totalAmount', 95] }, 100] }, 1],
                    },
                    charges: { $multiply: [{ $divide: ['$totalAmount', 100] }, 5] },
                  },
                },
              ]);
            
              if (result.length === 0) {
                return { earnings: 0, charges: 0 };
              }
            
              const { earnings, charges } = result[0];
              return { earnings, charges };
        } catch (error:any) {
            throw new Error(error.message)
        }
      }


}
