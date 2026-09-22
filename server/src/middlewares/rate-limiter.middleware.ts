import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 10,
    legacyHeaders: false,
    message: {
        success: false,
        statusCode: 429,
        message: "TooManyRequests",
        data: {}
    },
});