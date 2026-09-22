import express, { Request, Response } from 'express';
import v1Router from './v1';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json({
        success: true,
        statusCode: 200,
        message: 'Welcome to Bersih-In API!',
        data: {
            versions: ['health', 'v1']
        }
    });
});

router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: '',
        data: {
            uptime: process.uptime(),
        }
    });
});

router.use('/v1', v1Router);

export default router;