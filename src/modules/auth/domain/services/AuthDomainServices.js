// domain/services/AuthDomainService.js
import argon2 from 'argon2';

export class AuthDomainService {
    /**
     * Genera el hash seguro de la contraseña usando Argon2id
     * @param {string} plainPassword - Contraseña en texto plano
     * @returns {Promise<string>} - Hash generado para guardar en BD (password_hash)
     */
    static async hashPassword(plainPassword) {
        if (!plainPassword || typeof plainPassword !== 'string') {
            throw new Error('La contraseña debe ser una cadena de texto válida');
        }
        // Argon2 aplica automáticamente un salt seguro y utiliza Argon2id por defecto
        return await argon2.hash(plainPassword, {
            type: argon2.argon2id
        });
    }

    /**
     * Verifica si la contraseña ingresada coincide con el hash almacenado
     * @param {string} plainPassword - Contraseña introducida en el login
     * @param {string} passwordHash - Hash recuperado de la base de datos
     * @returns {Promise<boolean>}
     */
    static async verifyPassword(plainPassword, passwordHash) {
        if (!plainPassword || !passwordHash) {
            return false;
        }
        try {
            return await argon2.verify(passwordHash, plainPassword);
        } catch {
            return false;
        }
    }
}