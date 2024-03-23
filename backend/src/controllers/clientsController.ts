import { Request, Response } from "express";
import {ClientService} from '../services/clientsServices'

export class ClientController{
    constructor(private readonly ClientService:ClientService){}


    async profileCompletion(req: Request, res: Response): Promise<void> {
        try {
            console.log("this is clints",req.body);
            const response = await this.ClientService.profileCompletionServ(req.body);
            console.log(response,"2nd response");
            if ("token" in response && "options" in response && "freelancer" in response) {
                const { token, options, freelancer } = response;
    
                console.log("control response: ", response);
    
                if (token && options) {
                    res.status(200).cookie("token", token, options).json({
                        success: true,
                        token,
                        freelancer,
                    });
                } else {
                    throw new Error("Token or options are undefined");
                }
            } else {
                throw new Error("Response is missing required properties");
            }
        } catch (error) {
            console.error("Error in profile completion:", error);
            res.json({ status: false });
        }
    }

}