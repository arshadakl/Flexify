"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreelancerDetails = exports.Freelancer = exports.Submissions = void 0;
const mongoose_1 = require("mongoose");
const FreelancerSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    OTP: { type: Number, required: true },
    token: { type: String },
    isVerified: { type: Number, required: true },
    profile: { type: String },
    isBlocked: { type: String },
    role: { type: String, enum: ['freelancer', 'client', 'notspecified'], default: 'notspecified' }
});
const FreelancerDetailsSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    Country: { type: String, required: true },
    language: { type: String, required: true },
    skillsList: { type: [String], required: true },
    bio: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true }
});
const SubmissionsSchema = new mongoose_1.Schema({
    workId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Work' },
    freelancerId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Freelancer' },
    clientId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Client' },
    orderId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'orders' },
    description: { type: String, required: true },
    file: { type: String, required: true },
    date: { type: Number, required: true, default: Date.now },
    status: { type: String, required: true },
    revise: { type: Number, required: true },
});
exports.Submissions = (0, mongoose_1.model)('Submissions ', SubmissionsSchema);
exports.Freelancer = (0, mongoose_1.model)('Freelancer', FreelancerSchema);
exports.FreelancerDetails = (0, mongoose_1.model)('FreelancerDetails', FreelancerDetailsSchema);
// export default model<FreelancerDetails>('FreelancerDetails', FreelancerDetailsSchema);
