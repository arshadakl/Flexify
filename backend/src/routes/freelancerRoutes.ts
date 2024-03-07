// src/routes/freelancerRoutes.ts

import { Router } from "express";
import { FreelancerController } from "../controllers/freelancerController";
import { FreelancerService } from "../services/freelancerService";
import { FreelancerRepositoryImpl } from "../repositories/freelancerRepositoryImpl";

const router = Router();
const freelancerRepository = new FreelancerRepositoryImpl();
const freelancerService = new FreelancerService(freelancerRepository);
const freelancerController = new FreelancerController(freelancerService);

router.post("/login", freelancerController.login.bind(freelancerController));

export default router;
