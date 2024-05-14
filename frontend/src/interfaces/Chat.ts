
export interface IChatMessage{
    body:string | number,
    conversation:string,
    date:number,
    from:string,
    to:string,
    __v?:number,
    _id?:string,
    status?: "unread" | "read" 
}