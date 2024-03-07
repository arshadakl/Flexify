// config/mongoConfig.ts

import mongoose from 'mongoose';

const MONGODB_URI  = process.env.MONGODB_URI  

export async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(`${MONGODB_URI}?useNewUrlParser=true`, {});
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if unable to connect to MongoDB
    }
}
