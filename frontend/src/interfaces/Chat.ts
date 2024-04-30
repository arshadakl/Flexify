// body
// : 
// "sdsd"
// conversation
// : 
// "662ce75dd5ffa299782e4649"
// date
// : 
// 1714220755655
// from
// : 
// "661e98313b4154eee9d66a38"
// to
// : 
// "661e9aa03b4154eee9d66aae"
// __v
// : 
// 0
// _id
// : 
// "662ceed35bf41767d5ec2cb3"'

export interface IChatMessage{
    body:string | number,
    conversation:string,
    date:number,
    from:string,
    to:string,
    __v?:number,
    _id?:string
}