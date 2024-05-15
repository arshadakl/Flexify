"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.Requirement = void 0;
const mongoose_1 = require("mongoose");
const Works_1 = require("./Works");
const ClientDetailsSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    Country: { type: String, required: true },
    language: { type: String, required: true },
    bio: { type: String, required: true },
    user: { type: String, required: true }
});
const OrderSchema = new mongoose_1.Schema({
    workId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Work' },
    // transactionId: { type: Schema.Types.ObjectId, required: true, ref: 'Transaction' }, // Reference Transaction model
    freelancerId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Freelancer' },
    clientId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Client' },
    payment_intent: { type: String, required: true },
    category: { type: [String], required: true },
    amount: { type: Number, required: true },
    WorkDetails: { type: Works_1.WorkSchema, required: true },
    date: { type: Number, required: true, default: Date.now },
    deadline: { type: Number },
    status: { type: String, required: true },
    approval: { type: String, required: true },
    requirementStatus: { type: Boolean, required: true },
});
const answerSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true }
});
const RequirementSchema = new mongoose_1.Schema({
    orderId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Orders' },
    workId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Work' },
    freelancerId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Freelancer' },
    clientId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Client' },
    logo: { type: String },
    referenceMaterial: { type: String },
    answers: [answerSchema],
    date: { type: Number, required: true, default: Date.now }
});
exports.Requirement = (0, mongoose_1.model)('Requirement', RequirementSchema);
exports.Order = (0, mongoose_1.model)('Orders', OrderSchema);
