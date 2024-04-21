import { IWork } from "./Freelancer";

export interface IOrder {
    _id?: string,
    workId: string,
    // transactionId: string,
    freelancerId:string,
    clientId: string,
    payment_intent:string,
    category:string[],
    amount:number,
    WorkDetails: IWork,
    date?:number,
    status:string,
    requirementStatus?:Boolean
}   
