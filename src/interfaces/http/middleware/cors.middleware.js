import cors from 'cors';

const corsMiddleware = cors({
    origin: (origin, callback) => {

        const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') ||
            ['http://localhost:3000', 'http://localhost:5173'];

        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('bloqueado por politicas de CORS'));
        }

    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
    optionsSuccessStatus: 200,
});
/**
 * Configuración del middleware CORS solo descripciones de los parámetros:
 * @param {object} 
 * @param {origin}
 * @param {credentials}
 * @param {methods}
 * @param {allowedHeaders}
 * @param {exposedHeaders}
 * @param {maxAge}
 * @param {optionsSuccessStatus}
 */

export default corsMiddleware;