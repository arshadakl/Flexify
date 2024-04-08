import { Router } from "express";
import { AdminRepositoryImpl } from "../repositories/adminRepositoryImpl";
import { AdminServices } from "../services/adminServices";
import { AdminController } from "../controllers/adminController";
import { protector } from "../middlewares/adminAuth";


const router = Router();
const adminRepository = new AdminRepositoryImpl();
const adminService = new AdminServices(adminRepository);
const adminController = new AdminController(adminService)


router.post('/login',adminController.login.bind(adminController));
router.get('/getallusers',protector,adminController.getAllUsers.bind(adminController));
router.patch('/blockuser',protector,adminController.blockUser.bind(adminController));

router.post('/addcategory',protector,adminController.addCategory.bind(adminController));
router.get('/allcategories',adminController.allCategories.bind(adminController));
router.delete('/deleteCategory',protector,adminController.deleteCategory.bind(adminController));
router.post('/editcategory',protector,adminController.editCategory.bind(adminController));


router.post('/addsubcategory',protector,adminController.addSubCategory.bind(adminController));
router.get('/allsubcategories',adminController.allSubCategories.bind(adminController));
router.delete('/deletesubCategory',protector,adminController.deleteSubCategory.bind(adminController));
router.post('/editsubcategory',protector,adminController.editSubCategory.bind(adminController));

router.get('/allworks',adminController.getAllWorks.bind(adminController));
router.patch('/suspendworks',adminController.suspendWork.bind(adminController));


export default router;