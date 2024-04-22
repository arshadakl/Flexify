import { Schema } from "mongoose";
import { IWork } from "./freelancerInterface";

export interface ITransaction{
    _id?:string ,
    session_id:string,
    work_id:Schema.Types.ObjectId | string,
    amount:number,
    purpose:string,
    payment_status:string,
    user:string,
    date?:number,
    orderId?:Schema.Types.ObjectId | string
    
}

type statusType = "pending" | "completed" | "cancelled"

export interface IOrder {
    _id?:Schema.Types.ObjectId | string,
    workId:Schema.Types.ObjectId | string,
    freelancerId:Schema.Types.ObjectId | string,
    clientId:Schema.Types.ObjectId | string,
    payment_intent:string,
    category:string[],
    amount:number,
    WorkDetails: IWork,
    date?:number,
    status: statusType,
    requirementStatus?:Boolean,
    deadline?:number
}   

export interface IRequirement {
    _id?:Schema.Types.ObjectId | string,
    workId:Schema.Types.ObjectId | string,
    freelancerId:Schema.Types.ObjectId | string,
    clientId:Schema.Types.ObjectId | string,
    logo:string,
    referenceMaterial:string,
    description:string
    answers:string[],
    date?:number,
    status: statusType,
    orderId:Schema.Types.ObjectId | string,
}   

export interface ISubmissions  {
    _id?:Schema.Types.ObjectId | string,
    workId:Schema.Types.ObjectId | string,
    freelancerId:Schema.Types.ObjectId | string,
    clientId:Schema.Types.ObjectId | string,
    description:string,
    date?:number,
    file:string,
    status: statusType,
    revise: number,
    orderId:Schema.Types.ObjectId | string,
}   
