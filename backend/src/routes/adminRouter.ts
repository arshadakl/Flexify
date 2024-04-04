import { Router } from "express";
import { AdminRepositoryImpl } from "../repositories/adminRepositoryImpl";
import { AdminServices } from "../services/adminServices";
import { AdminController } from "../controllers/adminController";


const router = Router();
const adminRepository = new AdminRepositoryImpl();
const adminService = new AdminServices(adminRepository);
const adminController = new AdminController(adminService)


router.post('/login',adminController.login.bind(adminController));
router.get('/getallusers',adminController.getAllUsers.bind(adminController));
router.patch('/blockuser',adminController.blockUser.bind(adminController));

router.post('/addcategory',adminController.addCategory.bind(adminController));
router.get('/allcategories',adminController.allCategories.bind(adminController));
router.delete('/deleteCategory',adminController.deleteCategory.bind(adminController));

router.post('/addsubcategory',adminController.addSubCategory.bind(adminController));
router.get('/allsubcategories',adminController.allSubCategories.bind(adminController));
router.delete('/deletesubCategory',adminController.deleteSubCategory.bind(adminController));

export default router;