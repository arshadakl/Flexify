import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IActivity {
    value: number;
    day: string;
}

export interface IFreelancerActivity extends Document {
    freelancerId: mongoose.Types.ObjectId;
    activities: IActivity[];
}


const ActivitySchema: Schema = new Schema({
    value: { type: Number, required: true },
    day: { type: String, required: true }
});

const FreelancerActivitySchema: Schema = new Schema({
    freelancerId: { type: Schema.Types.ObjectId, ref: 'Freelancer', required: true },
    activities: [ActivitySchema]
});


export const FreelancerActivity: Model<IFreelancerActivity> = mongoose.model<IFreelancerActivity>('FreelancerActivity', FreelancerActivitySchema);
