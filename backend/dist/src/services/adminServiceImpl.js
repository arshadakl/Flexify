"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServicesimple = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtCreation_1 = require("../utils/jwtCreation");
class AdminServicesimple {
    adminRepository;
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    //admin Login 
    async Login({ adminId, password }) {
        try {
            console.log(adminId, password);
            const admin = await this.adminRepository.findAdminByName(adminId);
            console.log(admin);
            if (!admin) {
                throw new Error("incorrect admin ID");
            }
            const isPasswordValid = await bcrypt_1.default.compare(password, admin.password);
            if (!isPasswordValid) {
                throw new Error("incorrect password");
            }
            const credentials = await (0, jwtCreation_1.AdminJwtCreation)(admin);
            return credentials;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //using for getting all users
    async getAllusers() {
        try {
            const users = await this.adminRepository.getAllUsersData();
            if (!users)
                throw new Error("No users");
            return users;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //admin user blocking actions
    async doBlockUser(id) {
        try {
            const userData = await this.adminRepository.findById(id);
            console.log(userData);
            if (userData) {
                const action = userData.isBlocked == "Block" ? "unBlock" : "Block";
                const response = await this.adminRepository.blockUser(id, action);
                console.log(response);
                if (response) {
                    const users = await this.adminRepository.getAllUsersData();
                    return users;
                }
            }
        }
        catch (error) {
            throw new Error("error");
        }
    }
    // categies
    async addCategoryServ(title, description) {
        try {
            const isCategory = await this.adminRepository.findCategoryByName(title);
            if (isCategory) {
                throw new Error("Category already exists");
            }
            const category = await this.adminRepository.addNewCategory(title, description);
            console.log(category);
            if (category) {
                return true;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //edit category
    async editCategoryServ(title, description, _id) {
        try {
            const isCategory = await this.adminRepository.findCategoryById(_id);
            if (!isCategory) {
                throw new Error("Category not exists");
            }
            const category = await this.adminRepository.editCategory(title, description, _id);
            console.log(category);
            if (category) {
                return true;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllCategories() {
        try {
            const allCategories = await this.adminRepository.getAllCategories();
            if (allCategories) {
                return allCategories;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllCategoriesPage(page) {
        try {
            const allCategories = await this.adminRepository.getAllCategoriesPagenation(page);
            if (allCategories) {
                return allCategories;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteCategoryServ(id) {
        try {
            const categories = await this.adminRepository.getOneCategorie(id);
            if (!categories) {
                throw new Error("id not found");
            }
            const deleteResponse = await this.adminRepository.deleteCategory(id);
            const deleteSubCategory = await this.adminRepository.deleteSubCategoryByMain(id);
            return await this.adminRepository.getAllCategories();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //subcategory
    async addSubCategoryServ(title, description, category) {
        try {
            const isCategory = await this.adminRepository.findCategoryById(category);
            if (!isCategory) {
                throw new Error("Main Category is not exists");
            }
            const isSubCategory = await this.adminRepository.findSubCategoryByName(title);
            if (isSubCategory) {
                throw new Error("This Subcategory already exists");
            }
            const Subcategory = await this.adminRepository.addNewSubCategory(title, description, category);
            console.log(Subcategory);
            if (Subcategory) {
                return true;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllSubCategories() {
        try {
            const allCategories = await this.adminRepository.getAllSubCategories();
            if (allCategories) {
                return allCategories;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteSubCategoryServ(id) {
        try {
            const categories = await this.adminRepository.getOneSubCategorie(id);
            if (!categories) {
                throw new Error("id not found");
            }
            const deleteResponse = await this.adminRepository.deleteSubCategory(id);
            return await this.adminRepository.getAllSubCategories();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async editSubCategoryServ(name, description, _id, category) {
        try {
            const isCategory = await this.adminRepository.findCategoryById(category);
            if (!isCategory) {
                throw new Error("Category not exists");
            }
            const isSubCategory = await this.adminRepository.findSubCategoryById(_id);
            if (!isSubCategory) {
                throw new Error("sub Category not exists");
            }
            const subcategory = await this.adminRepository.editSubCategory(name, description, _id);
            console.log(subcategory);
            if (subcategory) {
                return true;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllWorkService() {
        try {
            const worksData = await this.adminRepository.getAllWorks();
            if (worksData) {
                return worksData;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async findWorkById(id) {
        try {
            const worksData = await this.adminRepository.findWorkById(id);
            if (worksData) {
                return worksData;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async suspendWork(work) {
        try {
            const action = work.isActive ? false : true;
            const worksData = await this.adminRepository.suspendWork(work._id, action);
            console.log(worksData, "test data");
            if (worksData) {
                return true;
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //get all orders
    // ---------------
    async getAllOrders() {
        try {
            const orderData = await this.adminRepository.getAllOrders();
            if (!orderData)
                throw new Error("No order found");
            return orderData;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //get all Transactions
    // ---------------
    async getAllTransactions() {
        try {
            const transactions = await this.adminRepository.getAllTransaction();
            if (!transactions)
                throw new Error("No found");
            return transactions;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //get all Submissions
    // ---------------
    async getAllSubmissions() {
        try {
            const submissions = await this.adminRepository.getAllSubmissions();
            if (!submissions)
                throw new Error("No found");
            return submissions;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //get all flagged Post (Repoted posts)
    // ---------------
    async GetRepotedPost() {
        try {
            const flaggedContents = await this.adminRepository.GetRepotedPost();
            return flaggedContents;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //get all Dashboard chatt data
    // ---------------
    async getDashboardChartData() {
        try {
            const aggregatedData = await this.adminRepository.getDashboardChartData("last5years");
            console.log(aggregatedData);
            return aggregatedData;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    //get all get Top Freelancers List
    // ---------------
    async getTopFreelancers() {
        try {
            const aggregatedData = await this.adminRepository.getTopFreelancers();
            console.log(aggregatedData);
            return aggregatedData;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getstatistics() {
        try {
            const profit = await this.adminRepository.getProfit();
            const users = await this.adminRepository.getCountOfUsers();
            const order = await this.adminRepository.getCountOfOrder();
            const pending = await this.adminRepository.getCountOfPending();
            return { profit, users, order, pending };
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.AdminServicesimple = AdminServicesimple;
