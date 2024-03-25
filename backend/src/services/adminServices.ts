import { Admin } from "../models/Admin";
import { AdminRepository } from "../repositories/adminRepository";
import { AdminRepositoryImpl } from "../repositories/adminRepositoryImpl";

export class AdminServices {
    constructor(private readonly adminRepository: AdminRepositoryImpl) { }

    async getAllusers(): Promise<any> {
        try {
            const users = await this.adminRepository.getAllUsersData()
            if (users) {
                return users
            } else {
                throw new Error("No users found")
            }
        } catch (error) {

        }
    }

    async doBlockUser(id: string): Promise<any> {
        try {
            const userData = await this.adminRepository.findById(id)
            console.log(userData);

            if (userData) {
                const action = userData.isBlocked=="Block" ? "unBlock" : "Block"
                const response = await this.adminRepository.blockUser(id, action)
                console.log(response);
                
                if (response) {
                    const users = await this.adminRepository.getAllUsersData()
                    return users
                }
            }
        } catch (error) {
            throw new Error("error")
        }
    }
}