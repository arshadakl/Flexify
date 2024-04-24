import { Router } from "express";
import { ClientRepositoryImpl } from "../repositories/clientsRepository";
import { ClientService } from "../services/clientsServices";
import { FreelancerRepositoryImpl } from "../repositories/freelancerRepositoryImpl";
import { ClientController } from "../controllers/clientsController";
import { protector } from "../middlewares/freelancerAuth";
import { multerMid } from "../middlewares/multerConfig";


const router = Router();
const clientRepository = new ClientRepositoryImpl();
const freelancerRepository = new FreelancerRepositoryImpl();
const clientService = new ClientService(clientRepository,freelancerRepository);
const clientController = new ClientController(clientService)

router.post('/profileCompletion',clientController.profileCompletion.bind(clientController));
router.post('/create-checkout-sessions',protector,clientController.checkoutPayment.bind(clientController));
router.post('/webhook',clientController.WebhookManage.bind(clientController));
router.get('/clientorders',protector,clientController.clientOrders.bind(clientController));
router.get('/singleorder',protector,clientController.getSingleOrder.bind(clientController));
router.post('/requirementsubmit',multerMid.fields([
    { name: 'referenceMaterial', maxCount: 1 },
    { name: 'logo', maxCount: 1 },
]),clientController.submitWorkRequirements.bind(clientController));
router.get('/latestorderid',protector,clientController.getLastOrder.bind(clientController));
router.get('/deliverdwork',protector,clientController.getDeliverdWork.bind(clientController));
router.get('/downloadsubmission',protector,clientController.downloadSubmissionFile.bind(clientController));
router.patch('/manageapproval',protector,clientController.manageWorkApproval.bind(clientController));





export default router;