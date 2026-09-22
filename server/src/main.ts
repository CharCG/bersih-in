import App from './app';
import { envConfig } from './config/env.config';

const port = envConfig.server.port;
const server = new App().listen(port);