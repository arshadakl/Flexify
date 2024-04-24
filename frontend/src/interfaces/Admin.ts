export interface Admin{
    adminId: string
    password: string
    tokane?: string
}

export interface CategoryInter{
    _id?: string
    title:string
    description:string
}
export interface SubategoryInter{
    _id?: string
    name:string
    description:string,
    category:string
}

export interface ITransaction{
    _id?:string ,
    session_id:string,
    work_id: string,
    amount:number,
    purpose:string,
    payment_status:string
    user:string,
    date?:Number
    
}