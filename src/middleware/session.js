import session from 'express-session';
import { JWT_SECRET, NODE_ENV, SESS_LIFETIME } from '../config/Config.js'; // Usar MemoryStore por defecto de express-session

export const sessionMiddleware = session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        maxAge: SESS_LIFETIME,
        sameSite: 'lax'
    }
});