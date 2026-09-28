import { Request, Response } from 'express';
import axios from 'axios';
import multer from 'multer';
import FormData from 'form-data';

import { envConfig } from '../config/env.config';
import History from '../models/History.model';

const imageClassify = [
    multer({ limits: { fileSize: 25 * 1024 * 1024 } }).single('file'),
    async (req: Request, res: Response) => {
        try {
            const imageFile = req.file;
            const imageUrl = req.body.url;
            const formData = new FormData();

            if (!imageFile && !imageUrl) {
                return res.status(400).json({ success: false, statusCode: 400, message: "BadRequest", data: {} });
            };

            if (imageFile && !imageUrl) {
                formData.append('file', imageFile.buffer, imageFile.originalname);
            } else if (imageUrl) {
                const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const buffer = Buffer.from(imageResponse.data, 'binary');
                const fileName = imageUrl.split('/').pop() || 'image_from_url.png';
                formData.append('file', buffer, fileName);
            };

            const response = await axios.post(`${envConfig.services.wasteClassifierUrl}/api/classify`, formData, {
                headers: formData.getHeaders()
            });

            const { prediction, confidence, metadata } = response.data?.data;

            if (History.db.readyState === 1) {
                const historyEntry = new History({
                    imageBytes: imageFile?.buffer,
                    prediction: prediction,
                    confidence: confidence,
                    metadata: {
                        metrics: metadata.metrics,
                        properties: metadata.properties
                    }
                });
                await historyEntry.save();
            };

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ success: false, statusCode: 500, message: "InternalServerError", data: { error: String(error) } });
        }
    }
];

export default {
    imageClassify
};
