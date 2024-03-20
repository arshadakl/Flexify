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
router.post('/signup',freelancerController.signup.bind(freelancerController))

router.post('/verification',freelancerController.OtpVerification.bind(freelancerController))
router.post('/profileCompletion',freelancerController.profileCompletion.bind(freelancerController))
// router.get('/otp',mailServices.sendOtp.bind("arshadayanikkal@gmail.com","123"))

export default router;
