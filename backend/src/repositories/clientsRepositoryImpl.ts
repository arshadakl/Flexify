import { UpdateWriteOpResult } from "mongoose"
import { IOrder, ISubmissions, ITransaction } from "../interfaces/clientInterface"
import { IWork } from "../interfaces/freelancerInterface"
import { Freelancer } from "../models/Freelancer"
import { IReport } from "../interfaces/chatInterface"

export interface ClientRepository {
    ClientDetailsAdd(fromData:any):void
    FindWorkById(id: string): Promise<IWork | null>
    createTransaction(data:ITransaction): Promise<any>
    FindTransactionBySession(id:string): Promise<ITransaction | null>
    updateTransaction(session:string,status:string): Promise<UpdateWriteOpResult>
    createOrder(order:IOrder): Promise<IOrder>
    // getAllordersOfClient(client:string): Promise<IOrder[] | null>
    getAllOrdersOfClient(client: string, page: number): Promise<{ orders: IOrder[], totalPages: number, currentPage: number } | null>
    getSingleOrder(id:string): Promise<IOrder | null>
    addRequirements(data:any):Promise<any>
    changeRequirementStatus(orderId:string,status:Boolean):Promise<any>
    getLatestTransaction(clientId:string):Promise<ITransaction[] | null>
    addOrderIdToTransaction(sessionId:string,orderId:string):Promise<UpdateWriteOpResult>

    getDeliverdWork(clientId:string):Promise<ISubmissions | null>
    getDeliverdWorkFile(submitId: string): Promise<any | null>
    changeOrderStatus(orderId:string,status:string):Promise<UpdateWriteOpResult>
    changeSubmissionStatus(orderId:string,status:string):Promise<UpdateWriteOpResult>
    getFreelancerData(id:string):Promise<any>
    submitPostReport(formData:IReport):Promise<IReport | null>
    addRating(workId: string, userId: string, ratingValue: number): Promise<boolean>
    getRatingByUserAndWork(userId: string, workId: string): Promise<number>
    getAverageRatingForFreelancer(freelancerId: string): Promise<number | null>
}