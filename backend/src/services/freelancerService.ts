import { JwtPayload } from "jsonwebtoken";
import { Freelancer, FreelancerDetails } from "../models/Freelancer";
import { ICategory, ISubcategory } from "../interfaces/adminInterface";
import { INotification, IWork } from "../interfaces/freelancerInterface";
import { IOrder, ISubmissions, ITransaction } from "../interfaces/clientInterface";
import { IFreelancerActivity } from "../models/Activity";

export interface freelancerService{
    login(username: string, password: string): Promise<Freelancer | null>
    signup(freelancer: Freelancer): Promise<string | undefined>
    OTPVerificationServ(email: string, code: number): Promise<any>
    doVerifyOtp(id: string): Promise<string | undefined>
    reSendotpServ(email: string): Promise<void>
    profileCompletionServ(formData: any): Promise<Freelancer | FreelancerDetails>
    profileUpdateServ(formData: any): Promise<Freelancer | FreelancerDetails>
    doRoleSpecify(id:string,role:string): Promise<Boolean>
    doRoleChange(id:string,role:string): Promise<Freelancer>
    GoogleKeyValidation(key: string): Promise<JwtPayload>
    GoogleLoginEmailValidation(email: string): Promise<any>
    profiledataService(id: string):Promise<FreelancerDetails | null>
    updatePrfileImage(token: string, file: string): Promise<any>
    forgotPass(email: string): Promise<Boolean>
    jwtCreation(freelancer: Freelancer): Promise<any>
    securityCode(freelancer: Freelancer): Promise<any>
    validateJWT(token: string): Promise<any>
    managePreResetpassword(email: string): Promise<string>
    managePostResetpassword(password: string, token: string): Promise<string>
    getAllCategories(): Promise<ICategory[] | undefined>
    getAllSubCategories(): Promise<ISubcategory[] | undefined>
    WorkSubmitService(workData:IWork): Promise<any>
    uploadMultiFiles(filePaths: string[], folderName: string):Promise<any>
    CategoryDataFetch(categoryId: string, subCategoryId: string): Promise<any>
    getallWorksOfUserServ(id:string): Promise<IWork[] | null>
    getallWorksToDiscoverService(searchKey:string,filter:string,page:number): Promise<any>
    deleteWorkPost(id:string): Promise<any>
    getSingleWorkDetails(id:string): Promise<any>
    getRecivedWorkDetails(id:string): Promise<IOrder[] | null >

    getActivePosts(freelancerId:string): Promise<IWork[] | null>
    getSuspendedPosts(freelancerId:string): Promise<IWork[] | null>

    getSingleWork(workId:string):Promise<IWork | null>
    updateWorkDetails(data:any,workId:string):Promise<any>
    submitWorkServ(data: any, filePath: string): Promise<ISubmissions | null>
    getRequirementsServ(orderId: string): Promise<any>

    getTransaction(userId: string): Promise<ITransaction[] | null>
    getchartData(freelancerId:string):Promise<any>

    getNotification(userId: string): Promise<INotification[] | null>

    getActivity(freelancerId: string): Promise<IFreelancerActivity | [] >
}