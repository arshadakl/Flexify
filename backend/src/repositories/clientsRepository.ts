import { ClientDetails } from "../models/Clients";
import { ClientRepository } from "./clientsRepositoryImpl";
const ClientDetailsModel = require('../models/Clients').ClientDetails

export class ClientRepositoryImpl implements ClientRepository {


    async ClientDetailsAdd(formData: any) {
        return await ClientDetailsModel.create(formData)
    }

}