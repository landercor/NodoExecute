import {JwtServices} from "../../../core/security/jwt.js";

export const authenticateToken = (req, res, next) => {

    /**
     * @param {Express.Request} - extraer el header: 'Authorization' en formato 'Bearer <token>'
     * @param {Express.Response} res - responder con un error 401 si no se proporciona el token
     * @param {Express.NextFunction} next - continuar con la ejecucion de la peticion
     */
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de acceso no proporcionado' });
    }
    try {
        const decoded = JwtServices.verifyToken(token);
        res.status(200).json({ user: req.user });

        next();

    } catch (err) {
        return res.status(403).json({ error: "Token invalido o expirado" });
    };

    /**
     * @param {express.Request} - adjuntar el token decodificado a la peticion
     * @param {express.Response} res - responder con un error 403 si el token no es valido
     * @return {Express.NextFunction} - continuar con la ejecucion de la peticion
     */
}