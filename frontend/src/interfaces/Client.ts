import { Freelancer, IWork } from "./Freelancer";

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
    requirementStatus?:Boolean,
    approval?:string
}   


export interface IReport extends Document {
    _id?:string,
    reported_post_id: string;
    reporter_id?: string;
    reason: string;
    admin_review?: boolean;
    admin_action?: string ;
    report_date?: Date;
    postDetails?:IWork;
    FreelancerDetails:Freelancer[];
    reporter:Freelancer[];


  }
