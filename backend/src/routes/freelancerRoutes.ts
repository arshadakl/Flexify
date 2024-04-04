// src/routes/freelancerRoutes.ts

import { Router } from "express";
import { FreelancerController } from "../controllers/freelancerController";
import { FreelancerService } from "../services/freelancerService";
import { FreelancerRepositoryImpl } from "../repositories/freelancerRepositoryImpl";
import { multerMid } from "../middlewares/multerConfig";
import { protector } from "../middlewares/freelancerAuth";

const router = Router();
const freelancerRepository = new FreelancerRepositoryImpl();
const freelancerService = new FreelancerService(freelancerRepository);
const freelancerController = new FreelancerController(freelancerService);


router.post("/login", freelancerController.login.bind(freelancerController));
router.post('/signup',freelancerController.signup.bind(freelancerController))
router.post('/forgotpassword',freelancerController.forgotpassword.bind(freelancerController))
router.post('/forgotpasswordotp',freelancerController.forgotPasswordOTP.bind(freelancerController))
router.post('/passwordreset',freelancerController.resetPassword.bind(freelancerController))
router.post('/googleauth',freelancerController.GoogleAuthentication.bind(freelancerController))
router.post('/googleauthLogin',freelancerController.GoogleAuthLogin.bind(freelancerController))


router.post('/verification',freelancerController.OtpVerification.bind(freelancerController))
router.post('/resendotp',freelancerController.reSendOtp.bind(freelancerController))
router.post('/profileCompletion',freelancerController.profileCompletion.bind(freelancerController))
router.post('/profileupdate',freelancerController.profileUpdate.bind(freelancerController))
// router.get('/otp',mailServices.sendOtp.bind("arshadayanikkal@gmail.com","123"))

router.get('/profiledata',protector,freelancerController.profiledata.bind(freelancerController))
router.post('/uploadProfileImage',multerMid.single('file'),freelancerController.uploadImage.bind(freelancerController))

export default router;
