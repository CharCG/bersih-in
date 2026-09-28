import mongoose from 'mongoose';
import { envConfig } from './env.config';

export const connectDatabase = async () => {
    try {
        const uri = envConfig.database.mongoUri;
        await mongoose.connect(uri);

        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] database connected`);
    } catch (error) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] database failed to connect: ${error}`);
    };
};