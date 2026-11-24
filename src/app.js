import express from 'express';
import { sessionMiddleware } from './interfaces/http/middleware/session.js';
import healthRoutes from './interfaces/http/routes/health.routes.js';
import authRoutes from './modules/auth/presentation/routes/auth.routes.js';
import csrfMiddleware from './interfaces/http/middleware/csrf.middleware.js';
import corsMiddleware from './interfaces/http/middleware/cors.middleware.js';
import helmet from "helmet";
import {
    notFoundHandler,
    errorHandler,
} from './core/errors/error-handler.js';

const app = express();
app.use(corsMiddleware);
app.use(helmet({
    crossOriginResourcePolicy: false,  // Desactivar solo si te bloquea estilos/scripts en tus vistas locales
}));

app.use(sessionMiddleware);
app.disable('x-powered-by');

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({
    extended: true,
    limit: '10mb',
}));

app.use(csrfMiddleware);

app.use('/health', healthRoutes);
app.use('/auth', authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;