import { Router } from "express";
import { ClientRepositoryImpl } from "../repositories/clientsRepository";
import { ClientService } from "../services/clientsServices";
import { FreelancerRepositoryImpl } from "../repositories/freelancerRepositoryImpl";
import { ClientController } from "../controllers/clientsController";


const router = Router();
const clientRepository = new ClientRepositoryImpl();
const freelancerRepository = new FreelancerRepositoryImpl();
const clientService = new ClientService(clientRepository,freelancerRepository);
const clientController = new ClientController(clientService)

router.post('/profileCompletion',clientController.profileCompletion.bind(clientController));

export default router;