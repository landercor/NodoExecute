/**
 * Caso de uso: Iniciar sessión de un usuario.
 * Orquesta: buscar usuario → verificar activo → verificar contraseña → actualizar lastLogin.
 * Depende de AuthDomainService y UserRepository (inyectados).
 */
import { AuthDomainService } from '../../domain/services/AuthDomainServices.js';

export class LoginUserUseCase {
    /**
     * @param {Object} deps - Dependencias inyectadas
     * @param {UserRepository} deps.userRepository - Repositorio de usuarios
     * @param {AuthDomainService} [deps.authDomainService] - Servicio de credenciales
     */
    constructor({ userRepository,authDomainService = new AuthDomainService() }) {
        this.userRepository = userRepository;
        this.authDomainService = authDomainService;
    }

    /**
     * Ejecuta el inicio de sessión.
     * @param {Object} credentials - Credenciales del usuario
     * @param {string} credentials.email - Correo electrónico
     * @param {string} credentials.password - Contraseña (en texto plano)
     * @returns {Promise<Object>} - Datos del usuario autenticado (sin passwordHash)
     */
    async execute({ email, password }) {
        // Buscar usuario por email (normalizado)
        const user = await this.userRepository.findByEmail(email.toLowerCase().trim());
        if (!user) {
            const error = new Error('Credenciales inválidas');
            error.status = 401;
            throw error;
        }

        // Verificar que la cuenta esté activa
        if (!user.isActive()) {
            const error = new Error('La cuenta no está activa');
            error.status = 403;
            throw error;
        }

        // Verificar la contraseña
        const isValid = await this.authDomainService.verifyPassword(password, user.passwordHash);
        if (!isValid) {
            const error = new Error('Credenciales inválidas');
            error.status = 401;
            throw error;
        }

        // Actualizar último inicio de sessión
        await this.userRepository.updateLastLogin(user.id, new Date());

        // Devolver datos seguros (sin passwordHash)
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            status: user.status,
            role: user.role,
        };
    }
}