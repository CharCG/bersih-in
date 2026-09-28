import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import router from './routes';

import { notFoundMiddleware } from './middlewares/not-found.middleware';
import { requestLogger } from './middlewares/request-logger.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { rateLimiter } from './middlewares/rate-limiter.middleware';


import { envConfig } from './config/env.config';
import { connectDatabase } from './config/db.config';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger.config.json';

export default class App {
    private app;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.initDatabase();
        this.initPreMiddlewares();
        this.initRoutes();
        this.initPostMiddlewares();
    };

    private async initDatabase() {
        await connectDatabase();
    };

    private initPreMiddlewares() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            if (req.path.startsWith('/docs')) return next();
            rateLimiter(req, res, next);
        });
        this.app.use(requestLogger);
    };

    private initPostMiddlewares() {
        this.app.use(notFoundMiddleware);
        this.app.use(errorMiddleware);
    };

    private initRoutes() {
        this.app.use('/api', router);
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    };

    public listen(port: number) {
        this.app.listen(port, '0.0.0.0', () => {
            const timestamp = new Date().toISOString();
            const environment = envConfig.server.nodeEnv;
            console.log(`[${timestamp}] server listening on http://localhost:${port}`);
            console.log(`[${timestamp}] server started on ${environment} mode (ctrl + c to quit)`);
        });
    };
};