import session from 'express-session';
import Config from '../../../config/Config.js';

export const sessionMiddleware = session({
    secret: Config.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: Config.cookieHttpOnly,
        secure: process.env.NODE_ENV === 'production',
        maxAge: Config.sessionMaxAge,
        sameSite: Config.cookieSameSite,
    },
});