import express, { Request, Response } from 'express';
import classifyController from '../controllers/classify.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json({
        success: true,
        statusCode: 200,
        message: 'Welcome to Bersih-In API!',
        data: {
            endpoints: ['health', 'classify']
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

router.post('/classify', classifyController.imageClassify);

export default router;
