//ts-check
/**
 * Caso de uso: Registrar un nuevo usuario.
 */
import { AuthDomainService } from '../../domain/services/AuthDomainServices.js';

export class RegisterUserUseCase {
    /**
     * @param {Object} deps - Dependencias inyectadas
     * @param {UserRepository} deps.userRepository - Repositorio de usuarios
     * @param {AuthDomainService} [deps.authDomainService] - Servicio de credenciales
     */
    constructor({ userRepository,authDomainService = new AuthDomainService() }) {
        this.userRepository = userRepository;
        this.authDomainService =authDomainService;
    }


    /**
     * Ejecuta el registro de un nuevo usuario.
     * @param {Object} userData - Datos del usuario
     * @param {string} userData.firstName - Nombre
     * @param {string} userData.lastName - Apellido
     * @param {string} userData.email - Correo electrónico
     * @param {string} userData.password - Contraseña (en texto plano)
     * @param {string} [userData.phone] - Teléfono
     * @returns {Promise<Object>} - Datos del usuario creado (sin passwordHash)
     */
    async execute({ firstName, lastName, email, password, phone }) {
        // Normalizar email (minúsculas, sin espacios)
        const normalizedEmail = email.toLowerCase().trim();

        // Verificar que el email no esté registrado
        const existing = await this.userRepository.findByEmail(normalizedEmail);
        if (existing) {
            const error = new Error('El correo ya está registrado');
            error.status = 409;
            throw error;
        }

        // Hashear la contraseña
        const passwordHash = await this.authDomainService.hashPassword(password);

        // Crear el usuario
        const user = await this.userRepository.create({
            firstName,
            lastName,
            email: normalizedEmail,
            passwordHash,
            phone,
            status: 'active',
        });

        // Devolver datos seguros (sin passwordHash)
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            status: user.status,
        };
    }
}