"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminRepositoryImpl_1 = require("../repositories/adminRepositoryImpl");
const adminServiceImpl_1 = require("../services/adminServiceImpl");
const adminController_1 = require("../controllers/adminController");
const adminAuth_1 = require("../middlewares/adminAuth");
const router = (0, express_1.Router)();
const adminRepository = new adminRepositoryImpl_1.AdminRepositoryImpl();
const adminService = new adminServiceImpl_1.AdminServicesimple(adminRepository);
const adminController = new adminController_1.AdminController(adminService);
router.post('/login', adminController.login.bind(adminController));
router.get('/getallusers', adminAuth_1.protector, adminController.getAllUsers.bind(adminController));
router.patch('/blockuser', adminAuth_1.protector, adminController.blockUser.bind(adminController));
router.post('/addcategory', adminAuth_1.protector, adminController.addCategory.bind(adminController));
router.get('/allcategories', adminController.allCategories.bind(adminController));
router.get('/allcategoriespagenation', adminController.allCategoriesPage.bind(adminController));
router.delete('/deleteCategory', adminAuth_1.protector, adminController.deleteCategory.bind(adminController));
router.post('/editcategory', adminAuth_1.protector, adminController.editCategory.bind(adminController));
router.post('/addsubcategory', adminAuth_1.protector, adminController.addSubCategory.bind(adminController));
router.get('/allsubcategories', adminController.allSubCategories.bind(adminController));
router.delete('/deletesubCategory', adminAuth_1.protector, adminController.deleteSubCategory.bind(adminController));
router.post('/editsubcategory', adminAuth_1.protector, adminController.editSubCategory.bind(adminController));
router.get('/allworks', adminController.getAllWorks.bind(adminController));
router.patch('/suspendworks', adminAuth_1.protector, adminController.suspendWork.bind(adminController));
router.get('/getallorders', adminAuth_1.protector, adminController.getallOrders.bind(adminController));
router.get('/getalltransaction', adminAuth_1.protector, adminController.getallTransaction.bind(adminController));
router.get('/getallSubmissions', adminAuth_1.protector, adminController.getAllSubmissions.bind(adminController));
router.get('/repotedpost', adminAuth_1.protector, adminController.GetRepotedPost.bind(adminController));
//dashboard
router.get('/dashboardchartdata', adminAuth_1.protector, adminController.GetDashboardChartData.bind(adminController));
router.get('/topfreelancers', adminAuth_1.protector, adminController.getTopFreelancers.bind(adminController));
router.get('/getstatistics', adminAuth_1.protector, adminController.statistics.bind(adminController));
exports.default = router;
