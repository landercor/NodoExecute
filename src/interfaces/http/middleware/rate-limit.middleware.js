import rateLimit from "express-rate-limit";

export const rateLimitLogin = rateLimit({

    windowMs: 10 * 60 * 1000,
    max: 20,
    message: { error: 'Demasiados intentos de inicio de sesión. Por favor, intenta de nuevo en 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
});

export const rateLimitApi = rateLimit({

    windowMs: 10 * 60 * 1000,
    max: 15,
    message: { error: 'Demaciados intentos de acceder a la funcion. Poravor, intenta de nuevo en 15 minutos.' },
    standardHeaders: true,
    legacyHeaders: false,
});

export const rateLimitExecute = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Demaciadas peticiones, intenta más tarde' },
    standardHeaders: true,
    legacyHeaders: false,
});
