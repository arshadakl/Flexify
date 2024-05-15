"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = void 0;
const mongoose_1 = require("mongoose");
const TransactionSchema = new mongoose_1.Schema({
    session_id: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "freelancer", required: true },
    work_id: { type: mongoose_1.Schema.Types.ObjectId, ref: "WorkModel", required: true },
    orderId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Order" },
    amount: { type: Number, required: true },
    purpose: { type: String, required: true },
    payment_status: { type: String, required: true },
    date: { type: Number, required: true, default: Date.now }
});
exports.TransactionModel = (0, mongoose_1.model)('Transaction', TransactionSchema);
