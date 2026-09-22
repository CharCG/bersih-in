import express, { Request, Response } from 'express';

import classifyController from '../../controllers/classify.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json({
        success: true,
        statusCode: 200,
        message: 'Welcome to Bersih-In API v1!',
        data: {
            endpoints: ['classify']
        }
    });
});
router.post('/classify', classifyController.imageClassify);

export default router;