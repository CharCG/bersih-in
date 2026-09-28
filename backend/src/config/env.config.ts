import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
    server: {
        nodeEnv: process.env.NODE_ENV || 'development',
        port: Number(process.env.PORT) || 5000,
    },
    database: {
        mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/'
    },
    services: {
        wasteClassifierUrl: process.env.WASTE_CLASSIFIER_URL || 'http://localhost:8000'
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'default_secret',
        jwtExpires: process.env.JWT_EXPIRES || '1h'
    }
};