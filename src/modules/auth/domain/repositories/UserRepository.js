/**
 * Contrato/Interfaz del repositorio de usuarios.
 * Define las operaciones de persistencia que el dominio necesita.
 * No implementa nada: lanza error "not implemented".
 * La implementación real vive en infrastructure/persistence/repositories/UserRepositoryImpl.js
 */
export class UserRepository {
    /**
     * Busca un usuario por su ID.
     * @param {string} id - Identificador del usuario
     * @returns {Promise<User|null>} - El usuario encontrado o null
     */
    async findById(id) {
        throw new Error('UserRepository.findById not implemented');
    }

    /**
     * Busca un usuario por su correo electrónico.
     * @param {string} email - Correo electrónico del usuario
     * @returns {Promise<User|null>} - El usuario encontrado o null
     */
    async findByEmail(email) {
        throw new Error('UserRepository.findByEmail not implemented');
    }

    /**
     * Crea un nuevo usuario en el sistema.
     * @param {Object} userData - Datos del usuario a crear
     * @returns {Promise<User>} - El usuario creado
     */
    async create(userData) {
        throw new Error('UserRepository.create not implemented');
    }

    /**
     * Actualiza la fecha del último inicio de sessión del usuario.
     * @param {string} id - Identificador del usuario
     * @param {Date} date - Fecha del último login
     * @returns {Promise<void>}
     */
    async updateLastLogin(id, date) {
        throw new Error('UserRepository.updateLastLogin not implemented');
    }
}