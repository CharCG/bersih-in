import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
    server: {
        nodeEnv: process.env.NODE_ENV || 'development',
        port: Number(process.env.PORT) || 5000,
        allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
            .split(',')
            .map(origin => origin.trim())
            .filter(Boolean),
    },
    services: {
        wasteClassifierUrl: process.env.WASTE_CLASSIFIER_URL || 'http://localhost:8000'
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'default_secret',
        jwtExpires: process.env.JWT_EXPIRES || '1h'
    }
};
