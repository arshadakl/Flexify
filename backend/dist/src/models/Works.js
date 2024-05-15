"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkModel = exports.WorkSchema = void 0;
const mongoose_1 = require("mongoose");
exports.WorkSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Freelancer',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Subcategory',
        required: true
    },
    categoryNames: [String],
    tags: [String],
    image1: {
        type: String,
        required: true
    },
    image2: String,
    image3: String,
    deliveryPeriod: {
        type: Number,
        required: true
    },
    referenceMaterial: {
        type: Boolean,
        default: false
    },
    logo: {
        type: Boolean,
        default: false
    },
    description: String,
    questionnaire: [String],
    date: {
        type: Number,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    ratings: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User'
            },
            value: {
                type: Number,
                required: true
            }
        }
    ],
    averageRating: {
        type: Number,
        default: 0
    }
});
const WorkModel = (0, mongoose_1.model)('WorkModel', exports.WorkSchema);
exports.WorkModel = WorkModel;
