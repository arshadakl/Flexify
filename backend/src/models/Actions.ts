import { Schema,  model } from 'mongoose';
import { IReport } from '../interfaces/chatInterface';



const reportSchema = new Schema<IReport>({
  reported_post_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Work'
  },
  reporter_id: {
    type: Schema.Types.ObjectId,
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

export const ReportModel= model('Report', reportSchema);


