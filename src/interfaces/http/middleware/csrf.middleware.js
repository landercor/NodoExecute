import { createSecret, createToken, validToken } from "../../../core/security/csrf.js";

/**
 * 
 * @param {object} req - Solicitud HTTP para obtener el token creado.
 * @param {object} res - Respuesta HTTP para enviar el token creado.
 * @param {function(): Promise<void>} next - Siguiente middleware.
 */
const csrfMiddleware = (req, res, next) => {

    if (!req.session.csrfSecret) {
        req.session.csrfSecret = createSecret();
    }

    res.locals.csrfToken = createToken(req.session.csrfSecret);

    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
        return next();
    };

    const clientToken = req.body?._csrf || req.body?.csrfToken || req.headers['x-csrf-token']; // 4. Si es POST / PUT / DELETE, buscamos el token que envió el usuario
    const isValid = validToken(req.session.csrfSecret, clientToken);

    if (!isValid) {
        return res.status(403).json({ error: 'token CSRF invalido o ausente.' });
    }
    next();
};

export default csrfMiddleware;