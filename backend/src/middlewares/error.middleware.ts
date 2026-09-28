import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        success: false,
        statusCode: 500,
        message: "InternalServerError",
        data: { error }
    });
};