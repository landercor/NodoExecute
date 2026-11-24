import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION =  process.env.JWT_EXPIRATION;

export class JwtServices {
    /**
     * Genera un tokne con los datos del usuarios.
     * @param {object} payload - datos del usuario.
     * @param {object} options - El etoken esta o no expirado. 
     * @return {promise(string)} - Genera y retorna el token.
    */

    static sign(payload) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    }
    /**
     * @param {object} - token de verificacion o autenticacion.
     * @return {promise<string>} Retorna el token de verificacion.
     */

    static verifyToken(token) {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            throw new Error(error.message);
        }
    };
}