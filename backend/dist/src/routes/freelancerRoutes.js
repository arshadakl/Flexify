"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const freelancerController_1 = require("../controllers/freelancerController");
const freelancerServiceImpl_1 = require("../services/freelancerServiceImpl");
const freelancerRepositoryImpl_1 = require("../repositories/freelancerRepositoryImpl");
const multerConfig_1 = require("../middlewares/multerConfig");
const freelancerAuth_1 = require("../middlewares/freelancerAuth");
const router = (0, express_1.Router)();
const freelancerRepository = new freelancerRepositoryImpl_1.FreelancerRepositoryImpl();
const freelancerService = new freelancerServiceImpl_1.FreelancerService(freelancerRepository);
const freelancerController = new freelancerController_1.FreelancerController(freelancerService);
router.post("/login", freelancerController.login.bind(freelancerController));
router.post('/signup', freelancerController.signup.bind(freelancerController));
router.post('/forgotpassword', freelancerController.forgotpassword.bind(freelancerController));
router.post('/forgotpasswordotp', freelancerController.forgotPasswordOTP.bind(freelancerController));
router.post('/passwordreset', freelancerController.resetPassword.bind(freelancerController));
router.post('/googleauth', freelancerController.GoogleAuthentication.bind(freelancerController));
router.post('/googleauthLogin', freelancerController.GoogleAuthLogin.bind(freelancerController));
router.post('/verification', freelancerController.OtpVerification.bind(freelancerController));
router.post('/resendotp', freelancerController.reSendOtp.bind(freelancerController));
router.post('/profileCompletion', freelancerController.profileCompletion.bind(freelancerController));
router.post('/profileupdate', freelancerController.profileUpdate.bind(freelancerController));
router.post('/rolespecify', freelancerController.rolespecify.bind(freelancerController));
router.post('/changerole', freelancerAuth_1.protector, freelancerController.changeRole.bind(freelancerController));
// router.get('/otp',mailServices.sendOtp.bind("arshadayanikkal@gmail.com","123"))
router.get('/profiledata', freelancerAuth_1.protector, freelancerController.profiledata.bind(freelancerController));
router.post('/uploadProfileImage', multerConfig_1.multerMid.single('file'), freelancerController.uploadImage.bind(freelancerController));
router.get('/allcategories', freelancerController.allCategories.bind(freelancerController));
router.get('/allsubcategories', freelancerController.allSubCategories.bind(freelancerController));
router.post('/worksubmit', freelancerAuth_1.protector, multerConfig_1.multerMid.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
]), freelancerController.WorkSubmit.bind(freelancerController));
router.get('/getuserwork', freelancerAuth_1.protector, freelancerController.getallWorksOfUser.bind(freelancerController));
router.get('/getAllWorks', freelancerController.getallWorksToDiscover.bind(freelancerController));
router.get('/singlework/:id', freelancerController.getallSingleWorkDetails.bind(freelancerController));
router.get('/singleorder/:id', freelancerController.getallSingleOrderDetails.bind(freelancerController));
router.delete('/deletework', freelancerAuth_1.protector, freelancerController.deleteworkWork.bind(freelancerController));
router.get('/recivedorders', freelancerAuth_1.protector, freelancerController.getRecivedWork.bind(freelancerController));
router.get('/allpost', freelancerAuth_1.protector, freelancerController.getPosts.bind(freelancerController));
router.get('/getSingleWork', freelancerAuth_1.protector, freelancerController.getSingleWork.bind(freelancerController));
router.patch('/updatework', freelancerAuth_1.protector, freelancerController.updateWorkData.bind(freelancerController));
router.post('/submitorderwork', freelancerAuth_1.protector, multerConfig_1.multerMid.single('file'), freelancerController.submitWork.bind(freelancerController));
router.get('/getrequirements', freelancerAuth_1.protector, freelancerController.getRequirements.bind(freelancerController));
router.get('/downloadFile', freelancerAuth_1.protector, freelancerController.downloadSubmissionFile.bind(freelancerController));
router.get('/alltransactions', freelancerAuth_1.protector, freelancerController.getTransactions.bind(freelancerController));
router.get('/videocall-auth', freelancerController.genarateVideoCallToken.bind(freelancerController));
router.get('/getchartdata', freelancerAuth_1.protector, freelancerController.getchartData.bind(freelancerController));
router.get('/getnotification', freelancerAuth_1.protector, freelancerController.getNotification.bind(freelancerController));
router.get('/getactivity', freelancerController.getActivity.bind(freelancerController));
exports.default = router;
