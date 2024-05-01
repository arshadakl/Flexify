import { Request, Response } from "express";
import { ClientService } from '../services/clientsServices'
import axios from "axios";
import path from "path";
import { IReport } from "../interfaces/chatInterface";
import { Document, Schema } from 'mongoose';
// const stripe = require('stripe')
const cloudinary = require('cloudinary').v2;
export class ClientController {
    constructor(private readonly ClientService: ClientService) { }


    async profileCompletion(req: Request, res: Response): Promise<void> {
        try {
            console.log("this is clints", req.body);
            const response = await this.ClientService.profileCompletionServ(req.body);
            console.log(response, "2nd response");
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


    async checkoutPayment(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.body
            if (!id) {
                throw new Error("item not found")
            }
            const user = req.user._id
            console.log("############ user ID ", user);

            const stripeId = await this.ClientService.stripCheckOut(id, user)
            console.log("");

            const response = await this.ClientService.TransactionCreation(stripeId, id, user)
            if (response) {
                res.json({ id: stripeId })
            }

        } catch (error) {
            console.error("Error:", error);
            res.json({ status: false });
        }
    }

    //Stripe Webhook management
    // -----------------------------
    async WebhookManage(req: Request, res: Response): Promise<any> {


        switch (req.body.type) {
            case 'checkout.session.completed':
                const session = req.body.data.object;
                console.log(session.metadata.test_code);
                console.log(session);
                console.log(session.payment_intent);
                const response = await this.ClientService.TransactionUpdate(session.id, "success")
                const order = await this.ClientService.createNewOrder(session.id, session.payment_intent)
                const orderIDResponse = await this.ClientService.updateOrderIdTotransaction(session.id, order?._id as string)
                //now i want to create order
                console.log("Payment successful");
                break;
            case 'checkout.session.async_payment_failed':
                console.log("Payment Failed");
                break;
            default:
                // Unexpected event type
                console.log(`Unhandled event type: ${req.body.type}`);
        }
        res.status(200).end();
    }


    //get all orders for client
    // ------------------------------
    async clientOrders(req: Request, res: Response): Promise<void> {
        try {
            const user = req.user._id
            const order = await this.ClientService.getAllOrders(user)
            if (order) {
                res.status(200).json({ status: true, orders: order })
            }
        } catch (error: any) {
            console.error("Error:", error);
            res.json({ status: false, error: error.message });
        }
    }
    //get single order
    // ------------------------------
    async getSingleOrder(req: Request, res: Response): Promise<void> {
        try {
            const orderId = req.query.orderId
            const order = await this.ClientService.getSingleOrderDetails(orderId as string)
            if (order) {
                res.status(200).json({ status: true, order: order })
            }
        } catch (error: any) {
            console.error("Error:", error);
            res.json({ status: false, error: error.message });
        }
    }
    //submit wwork Requirements 
    // ------------------------------
    async submitWorkRequirements(req: Request, res: Response): Promise<void> {
        try {
            const data = req.body
            data.answers = JSON.parse(data.answers)
            const response = await this.ClientService.submitRequirements(data, req.files)
            if (response) {
                res.json({ status: true })
            }
        } catch (error: any) {
            console.error("Error:", error);
            res.json({ status: false, error: error.message });
        }
    }

    //get Latest translations
    // ------------------------------
    async getLastOrder(req: Request, res: Response): Promise<void> {
        try {
            const client = req.user._id

            const response = await this.ClientService.getLatestTransaction(client)

            if (response) {
                res.status(200).json({ status: true, orderId: response.orderId })
            }
        } catch (error: any) {
            console.error("Error:", error);
            res.json({ status: false, error: error.message });
        }
    }
    //get Latest translations
    // ------------------------------
    async getDeliverdWork(req: Request, res: Response): Promise<void> {
        try {
            const orderId = req.query.id;
            console.log(orderId, "data called");

            const response = await this.ClientService.getDeliverdWorkServ(orderId as string)
            if (response) {
                res.status(200).json({ status: true, details: response })
            }
        } catch (error: any) {
            console.error("Error:", error);
            res.json({ status: false, error: error.message });
        }
    }




    async downloadSubmissionFile(req: Request, res: Response): Promise<void> {
        try {
            const id = req.query.id
            const details = await this.ClientService.getDeliverdWorkFile(id as string)

            const url = details.file
            const filename = path.basename(new URL(url).pathname);
            console.log(filename);
            const response = await axios.get(url, { responseType: 'stream' });
            res.setHeader('Content-Disposition', `Deliverd-WorkFile-${filename}`);
            res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
            res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
            response.data.pipe(res);
        } catch (error: any) {
            console.error("Error:", error);
            res.json({ status: false, error: error.message });
        }
    }


    //work Manage Aproval
    // ------------------------------
    async manageWorkApproval(req: Request, res: Response): Promise<void> {
        try {

            const { submitId, status,orderId } = req.body

            const responseAprval = await this.ClientService.manageWorkApproval(submitId, status,orderId)
            // console.log(responseAprval);
            
            const response = await this.ClientService.getDeliverdWorkServ(orderId as string)
            if (response) {
                console.log(response, "new data");

                res.status(200).json({ status: true, details: response })
            }
        } catch (error: any) {
            console.error("Error:", error);
            res.json({ status: false, error: error.message });
        }
    }

    //work Manage Aproval
    // ------------------------------
    async getFreelancerData(req: Request, res: Response): Promise<void> {
        try {

            const { id } = req.query
            if(!id) throw new Error("Invalid id")
                
            const response = await this.ClientService.getfreelancerData(id as string)
            // console.log(responseAprval);
            if (response) {
                res.status(200).json({ status: true, details: response })
            }
        } catch (error: any) {
            console.error("Error:", error);
            res.json({ status: false, error: error.message });
        }
    }

    //work post repot
    // ------------------------------
    async reportPost(req: Request, res: Response): Promise<void> {
        try {

            const {reported_post_id,reason} = req.body
                
            const formData = {
                reported_post_id: reported_post_id, 
                reporter_id: req.user.id ,
                reason: reason ,
                admin_review: false
            }
            console.log(formData);
            
            const response = await this.ClientService.submitPostReportServ(formData as IReport)
            if (response) {
                res.status(200).json({ status: true, details: response })
            }
        } catch (error: any) {
            console.error("Error:", error);
            res.json({ status: false, error: error.message });
        }
    }


    addRatingController = async (req: Request, res: Response): Promise<void> => {
        try {
          const {workId,ratingValue} = req.body
            const userId = req.user._id
          const ratingsRespones = await this.ClientService.addRatingServ(workId,userId,ratingValue)
        //   res.status(200).json(messages);
        } catch (error:any) {
          res.status(500).json({ error: error.message });
        }
      };
    


}