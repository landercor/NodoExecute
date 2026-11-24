import crypto from "crypto";
import Tokens from "csrf";

const tokens = new Tokens();

/**
 * @param {string} a - Primer string a comparar
 * @param {string} b - Segundo string a comparar
 * @returns {boolean} - Verdadero si los strings son iguales, falso en caso contrario
 */

const timingSafeWatch = (a, b) => {
    if (typeof a !== 'string' || typeof b !== 'string') return false
    const bufA = Buffer.from(a);
    const bufB = Buffer.from(b);
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Genera secreto para el token csrf.
 * @returns {Promise<string>} - Secreto generado.
 */
export const createSecret = () => {

    const secret = tokens.secretSync(); // Guardamos el secreto generado
    if (!secret) {
        throw new Error('Error al generar el secreto');
    }
    return secret; // retornamos el secreto generado.
}

/**
 * genera el token csrf
 * @param {string} secret - Secreto generado.
 * @returns {Promise<string>} - Token csrf generado.
 */

export const createToken = (secret) => {
    const token = tokens.create(secret); // generar token con el secreto generado.

    if (token) {
        return token; // retornamos el token generado
    }

    throw new Error('Error al generar el token');
}

/**
 * @param {string} - validacion del token generado.
 * @return {promesa<string>} - token.
 */

export const validToken = (secret, token) => {

    if (!secret || !token) {
        return false;
    }
    return tokens.verify(secret, token)
}


