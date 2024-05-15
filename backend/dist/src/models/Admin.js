"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    adminId: { type: String, required: true },
    password: { type: String, required: true }
});
exports.Admin = (0, mongoose_1.model)('Admin', AdminSchema);
