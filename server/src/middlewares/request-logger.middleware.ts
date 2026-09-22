import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const timestamp = new Date().toISOString();
        const method = req.method;
        const url = req.originalUrl;
        const ip = req.ip;
        const status = res.statusCode;
        const time = `${Date.now() - startTime}ms`;
        console.log(`[${timestamp}] ${method} ${url} ${status} ${time} ${ip}  `)
    });

    next();
};