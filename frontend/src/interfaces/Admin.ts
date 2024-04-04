export interface Admin{
    adminId: string
    password: string
    tokane?: string
}

export interface CategoryInter{
    title:string
    description:string
}
export interface SubategoryInter{
    name:string
    description:string,
    category:string
}