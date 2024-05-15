"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModel = void 0;
const mongoose_1 = require("mongoose");
const reportSchema = new mongoose_1.Schema({
    reported_post_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Work'
    },
    reporter_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Freelancer'
    },
    reason: {
        type: String,
        required: true
    },
    admin_review: {
        type: Boolean
    },
    admin_action: {
        type: String
    },
    report_date: {
        type: Date,
        default: Date.now
    }
});
exports.ReportModel = (0, mongoose_1.model)('Report', reportSchema);
