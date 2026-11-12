import express from 'express';
import {sessionMiddleware} from "./interfaces/http/middleware/session.js";
import healthRoutes from './interfaces/http/routes/health.routes.js';

import {
    notFoundHandler,
    errorHandler,
} from './core/errors/error-handler.js';

const app = express();
app.use(sessionMiddleware);
app.disable('x-powered-by');

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({
    extended: true,
    limit: '10mb',
}));

app.use('/health', healthRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;