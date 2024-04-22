
import { Router } from "express";
import { FreelancerController } from "../controllers/freelancerController";
import { FreelancerService } from "../services/freelancerServiceImpl";
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
router.post('/rolespecify',freelancerController.rolespecify.bind(freelancerController))
router.post('/changerole',protector,freelancerController.changeRole.bind(freelancerController))
// router.get('/otp',mailServices.sendOtp.bind("arshadayanikkal@gmail.com","123"))

router.get('/profiledata',protector,freelancerController.profiledata.bind(freelancerController))
router.post('/uploadProfileImage',multerMid.single('file'),freelancerController.uploadImage.bind(freelancerController))

router.get('/allcategories',freelancerController.allCategories.bind(freelancerController));
router.get('/allsubcategories',freelancerController.allSubCategories.bind(freelancerController));


router.post('/worksubmit',protector,multerMid.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]),freelancerController.WorkSubmit.bind(freelancerController));

router.get('/getuserwork',protector,freelancerController.getallWorksOfUser.bind(freelancerController));
router.get('/getAllWorks',freelancerController.getallWorksToDiscover.bind(freelancerController))
router.get('/singlework/:id',freelancerController.getallSingleWorkDetails.bind(freelancerController))
router.get('/singleorder/:id',freelancerController.getallSingleOrderDetails.bind(freelancerController))
router.delete('/deletework',protector,freelancerController.deleteworkWork.bind(freelancerController))
router.get('/recivedorders',protector,freelancerController.getRecivedWork.bind(freelancerController))
router.get('/allpost',protector,freelancerController.getPosts.bind(freelancerController))
router.get('/getSingleWork',protector,freelancerController.getSingleWork.bind(freelancerController))
router.patch('/updatework',protector,freelancerController.updateWorkData.bind(freelancerController))

router.post('/submitorderwork',protector,multerMid.single('file'),freelancerController.submitWork.bind(freelancerController))

export default router;
