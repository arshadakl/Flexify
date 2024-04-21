import { Request, Response } from "express";
import { ClientService } from '../services/clientsServices'
// const stripe = require('stripe')
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
                const orderIDResponse = await this.ClientService.updateOrderIdTotransaction(session.id,order?._id as string)
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
            const response  =  await this.ClientService.submitRequirements(data,req.files)
            if(response){
                res.json({status: true})
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
            console.log(client,"cli###############");
            
            const response  =  await this.ClientService.getLatestTransaction(client)
            
            if(response){
                res.status(200).json({status: true,orderId:response.orderId})
            }
        } catch (error: any) {
            console.error("Error:", error);
            res.json({ status: false, error: error.message });
        }
    }

}