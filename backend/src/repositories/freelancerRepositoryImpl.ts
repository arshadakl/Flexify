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
import { ChartDataResponse, DailyData, INotification, IWork, SingleWorkDetails } from "../interfaces/freelancerInterface";
import { UpdateWriteOpResult } from "mongoose";
import mongoose from 'mongoose';
import { Order, Requirement } from "../models/Clients";
import { IOrder, ISubmissions, ITransaction } from "../interfaces/clientInterface";
import { TransactionModel } from "../models/Transaction";
import { NotificationModel } from "../models/Notification";
import { FreelancerActivity, IFreelancerActivity } from "../models/Activity";
const ObjectId = mongoose.Types.ObjectId;


export class FreelancerRepositoryImpl implements FreelancerRepository {
  async findByUsername(username: string): Promise<Freelancer | null> {
    try {
      const response = await FreelancerModel.findOne({ username });
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async findByEmail(email: string): Promise<Freelancer | null> {
    try {
      const response = await FreelancerModel.findOne({ email });
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }


  async find_ById(id: string): Promise<Freelancer | undefined> {
    try {
      const res = await FreelancerModel.findById(id);
      return res
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async create(freelancer: Freelancer): Promise<void> {
    try {
      await FreelancerModel.create(freelancer);
    } catch (error: any) {
      throw new Error(error.message)
    }
  }


  async checkPassword(username: string, password: string): Promise<boolean> {
    try {
      const freelancer = await FreelancerModel.findOne({ username });
      if (!freelancer) {
        return false;
      }
      const isPasswordValid = await bcrypt.compare(password, freelancer.password);
      return isPasswordValid;
    } catch (error: any) {
      throw new Error(error.message)
    }
  }




  async clearOTP(email: string) {
    try {
      await FreelancerModel.updateOne({ email },
        {
          $set: { OTP: -1 }
        }
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async FreelancerDetailsAdd(formData: any) {
    try {
      const response = await FreelancerDetailsModel.create(formData)
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
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
    try {
      const response = await FreelancerModel.updateOne({ _id: id },
        {
          $set: { isVerified: 1 }
        }
      )
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async doRolespecify(id: String, role: string): Promise<UpdateWriteOpResult> {
    try {
      const reposnse = await FreelancerModel.updateOne({ _id: id },
        {
          $set: { role: role }
        }
      )
      return reposnse
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async setNewOTP(email: string, otp: number) {
    try {
      const response = await Freelancer.updateOne({ email: email },
        {
          $set: { OTP: otp },
        }
      )
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }

  }
  async cleanOTP(email: string) {
    try {
      const response = await Freelancer.updateOne({ email: email }, { $set: { OTP: 0 } })
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // async updatePassword(id:string, password:string):Promise<any>{
  //     return await Freelancer.updateOne({_id:id},{$set:{password:password}})
  // }

  async updatePassword(id: string, password: string): Promise<any> {
    try {
      const response = await Freelancer.updateOne(
        { _id: id },
        {
          $set: { password: password },
          $currentDate: { updatedAt: true },
        }
      );
      return response
    } catch (error:any) {
      throw new Error(error.message)
    }
  }


  async findDetailsById(id: string): Promise<FreelancerDetails | null> {
    try {
      const response = await FreelancerDetailsModel.findOne({ user: id });
    return response
    } catch (error:any) {
      throw new Error(error.message)
    }
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



  async deleteWork(id: string): Promise<DeleteResult> {
    return await WorkModel.deleteOne({ _id: id });
  }




  async getAllActiveWorksToDiscover(searchTerm: string, categoryName: string, page: number): Promise<any> {
    try {
      const limit = 6;
      const skip = (page - 1) * limit;


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

        {
          $lookup: {
            from: 'freelancers',
            localField: 'user',
            foreignField: '_id',
            as: 'user',
          },
        },
        { $unwind: '$user' },

        {
          $lookup: {
            from: 'freelancerdetails',
            localField: 'user._id',
            foreignField: 'user',
            as: 'freelancerdetails',
          },
        },

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

            averageRating: { $ifNull: ['$averageRating', 0] },
          },
        },

        { $sort: { averageRating: -1 } },

        { $skip: skip },

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
      console.log(id, "new id");

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



  async getReceivedWork(id: string, page: number): Promise<{ works: IOrder[], totalPages: number, currentPage: number } | null> {
    try {
      const limit = 6
      const skip = (page - 1) * limit;
      const count = await Order.countDocuments({ freelancerId: new mongoose.Types.ObjectId(id) });

      const totalPages = Math.ceil(count / limit);

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
        },
        {
          $sort: {
            date: -1
          }
        },
        {
          $skip: skip
        },
        {
          $limit: limit
        }
      ]);

      if (!works) throw new Error("Work not found");

      return {
        works,
        totalPages,
        currentPage: page,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }


  // get all active post
  async getAllActivepost(freelancerId: string, page: number): Promise<any | null> {
    try {

      const limit = 3;
      const skip = (page - 1) * limit;

      const totalCount = await WorkModel.countDocuments({ user: freelancerId, isActive: true });
      const totalPages = Math.ceil(totalCount / limit);

      const works = await WorkModel.aggregate([
        { $match: { user: freelancerId, isActive: true } },
        { $sort: { date: -1 } },
        { $skip: skip },
        { $limit: limit }
      ]);

      return {
        works,
        totalPages
      };
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  // get all suspended post
  async getAllSuspendedpost(freelancerId: string): Promise<IWork[] | null> {
    try {
      const works = await WorkModel.aggregate([
        { $match: { user: freelancerId, isActive: false } },
        { $sort: { date: -1 } }
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


  async getChartData(freelancerId: string): Promise<ChartDataResponse[]> {
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
      ]).exec();


      const generateDateRange = (start: Date, end: Date): string[] => {
        const dates: string[] = [];
        let currentDate = new Date(start);
        while (currentDate <= end) {
          dates.push(currentDate.toISOString().split('T')[0]);
          currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
      };


      const dateRange = generateDateRange(startDate, new Date());


      const chartDataResponses: ChartDataResponse[] = aggregationResult.map(item => {

        item.dailyData = item.dailyData || [];

        const orderCountArray = dateRange.map(date => {
          const existingData = item.dailyData.find((d: DailyData) => d.day === date);
          return { day: date, orderCount: existingData ? existingData.orderCount : 0 };
        });

        const amountArray = dateRange.map(date => {
          const existingData = item.dailyData.find((d: DailyData) => d.day === date);
          return { day: date, totalAmount: existingData ? existingData.totalAmount : 0 };
        });


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



  async getStaticsData(freelancerId: string): Promise<any> {
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
    } catch (error: any) {
      throw new Error(error.message)
    }
  }



  async getNotification(userId: string): Promise<INotification[] | null> {
    try {
      // const response = await NotificationModel.aggregate([
      //   { $match: { toUser: userId } },
      //   // { $sort: { date: -1 } }
      // ])
      console.log(userId, "User Id");

      const response = await NotificationModel.find({ toUser: userId })
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async addOrUpdateActivity(freelancerId: string): Promise<void> {
    try {
      const currentDate = new Date().toISOString().split('T')[0];

      let activityDoc = await FreelancerActivity.findOne({ freelancerId: new mongoose.Types.ObjectId(freelancerId) });

      if (!activityDoc) {
        activityDoc = new FreelancerActivity({
          freelancerId: new mongoose.Types.ObjectId(freelancerId),
          activities: [{ value: 1, day: currentDate }]
        });
      } else {
        const activityIndex = activityDoc.activities.findIndex(activity => activity.day === currentDate);

        if (activityIndex !== -1) {
          activityDoc.activities[activityIndex].value += 1;
        } else {
          activityDoc.activities.push({ value: 1, day: currentDate });
        }
      }

      await activityDoc.save();
    } catch (error: any) {
      throw new Error(`Error adding or updating activity: ${error.message}`);
    }
  }


  async getActivity(freelancerId: string): Promise<IFreelancerActivity | undefined> {
    try {
      const activityDoc = await FreelancerActivity.findOne({ freelancerId: freelancerId });
      if (activityDoc) {
        return activityDoc
      }
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

}
