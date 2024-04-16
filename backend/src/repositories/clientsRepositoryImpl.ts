import { UpdateWriteOpResult } from "mongoose"
import { IOrder, ITransaction } from "../interfaces/clientInterface"
import { IWork } from "../interfaces/freelancerInterface"

export interface ClientRepository {
    ClientDetailsAdd(fromData:any):void
    FindWorkById(id: string): Promise<IWork | null>
    createTransaction(data:ITransaction): Promise<any>
    FindTransactionBySession(id:string): Promise<ITransaction | null>
    updateTransaction(session:string,status:string): Promise<UpdateWriteOpResult>
    createOrder(order:IOrder): Promise<any>
    getAllordersOfClient(client:string): Promise<IOrder[] | null>
}