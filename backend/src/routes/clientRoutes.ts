import { Router } from "express";
import { ClientRepositoryImpl } from "../repositories/clientsRepository";
import { ChatRepository, ChatRepositoryImp } from "../repositories/chatRepository";
import { ClientService } from "../services/clientsServices";
import { FreelancerRepositoryImpl } from "../repositories/freelancerRepositoryImpl";
import { ClientController } from "../controllers/clientsController";
import { protector } from "../middlewares/freelancerAuth";
import { multerMid } from "../middlewares/multerConfig";
import { ChatService } from "../services/chatService";
import { ChatController } from "../controllers/chatController";


const router = Router();
const clientRepository = new ClientRepositoryImpl();
const freelancerRepository = new FreelancerRepositoryImpl();
const clientService = new ClientService(clientRepository,freelancerRepository);
const clientController = new ClientController(clientService)

const chatRepository = new ChatRepository();
const chatService = new ChatService(chatRepository)
const chatController = new ChatController(chatService)

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
router.get('/getfreelancerdata',protector,clientController.getFreelancerData.bind(clientController));
router.get('/getConversations',protector,chatController.getConversationsByUser.bind(chatController));
router.post('/reportpost',protector,clientController.reportPost.bind(clientController));
router.post ('/addRating',protector,clientController.addRatingController.bind(chatController));







export default router;