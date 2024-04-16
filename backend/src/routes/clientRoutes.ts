import { Router } from "express";
import { ClientRepositoryImpl } from "../repositories/clientsRepository";
import { ClientService } from "../services/clientsServices";
import { FreelancerRepositoryImpl } from "../repositories/freelancerRepositoryImpl";
import { ClientController } from "../controllers/clientsController";
import { protector } from "../middlewares/freelancerAuth";


const router = Router();
const clientRepository = new ClientRepositoryImpl();
const freelancerRepository = new FreelancerRepositoryImpl();
const clientService = new ClientService(clientRepository,freelancerRepository);
const clientController = new ClientController(clientService)

router.post('/profileCompletion',clientController.profileCompletion.bind(clientController));
router.post('/create-checkout-sessions',protector,clientController.checkoutPayment.bind(clientController));
router.post('/webhook',clientController.WebhookManage.bind(clientController));
router.get('/clientorders',protector,clientController.clientOrders.bind(clientController));


export default router;