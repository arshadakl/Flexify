import { Router } from "express";
import { AdminRepositoryImpl } from "../repositories/adminRepositoryImpl";
import { AdminServices } from "../services/adminServices";
import { AdminController } from "../controllers/adminController";


const router = Router();
const adminRepository = new AdminRepositoryImpl();
const adminService = new AdminServices(adminRepository);
const adminController = new AdminController(adminService)

router.get('/getallusers',adminController.getAllUsers.bind(adminController));
router.patch('/blockuser',adminController.blockUser.bind(adminController));

export default router;