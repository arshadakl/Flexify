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