import { UpdateWriteOpResult } from "mongoose"
import { IOrder, ITransaction } from "../interfaces/clientInterface"
import { IWork } from "../interfaces/freelancerInterface"

export interface ClientRepository {
    ClientDetailsAdd(fromData:any):void
    FindWorkById(id: string): Promise<IWork | null>
    createTransaction(data:ITransaction): Promise<any>
    FindTransactionBySession(id:string): Promise<ITransaction | null>
    updateTransaction(session:string,status:string): Promise<UpdateWriteOpResult>
    createOrder(order:IOrder): Promise<IOrder>
    getAllordersOfClient(client:string): Promise<IOrder[] | null>
    getSingleOrder(id:string): Promise<IOrder | null>
    addRequirements(data:any):Promise<any>
    changeRequirementStatus(orderId:string,status:Boolean):Promise<any>
    getLatestTransaction(clientId:string):Promise<ITransaction[] | null>
    addOrderIdToTransaction(sessionId:string,orderId:string):Promise<UpdateWriteOpResult>
}