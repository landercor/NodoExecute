/**
 * Implementación del repositorio de usuarios usando Sequelize.
 * Extiende el contrato (UserRepository) definido en domain/repositories/.
 * Convierte registros de BD a entidades de dominio (User).
 */
import { User } from '../../../domain/entities/User.js';
import { UserRepository } from '../../../domain/repositories/UserRepository.js';
import UserModel from '../models/UserModel.js';

export class UserRepositoryImpl extends UserRepository {
    /**
     * Convierte un registro de Sequelize a una entidad de dominio User.
     * @param {Object} row - Registro de la BD
     * @returns {User} - Entidad de dominio
     */
    toEntity(row) {
        const p = row.get ? row.get({ plain: true }) : row;
        return new User({
            id: p.id,
            firstName: p.firstName,
            lastName: p.lastName,
            email: p.email,
            passwordHash: p.passwordHash,
            phone: p.phone,
            status: p.status,
            role: p.role,
            lastLoginAt: p.lastLoginAt,
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            createdBy: p.createdBy,
            updatedBy: p.updatedBy,
        });
    }

    /**
     * Busca un usuario por su ID.
     * @param {string} id - Identificador del usuario
     * @returns {Promise<User|null>}
     */
    async findById(id) {
        const row = await UserModel.findByPk(id);
        return row ? this.toEntity(row) : null;
    }

    /**
     * Busca un usuario por su correo electrónico.
     * @param {string} email - Correo electrónico
     * @returns {Promise<User|null>}
     */
    async findByEmail(email) {
        const row = await UserModel.findOne({
            where: { email: email.toLowerCase().trim() },
        });
        return row ? this.toEntity(row) : null;
    }

    /**
     * Crea un nuevo usuario en la base de datos.
     * @param {Object} userData - Datos del usuario
     * @returns {Promise<User>}
     */
    async create(userData) {
        const row = await UserModel.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            passwordHash: userData.passwordHash,
            phone: userData.phone ?? null,
            status: userData.status ?? 'active',
            role: userData.role ?? 'user',
        });
        return this.toEntity(row);
    }

    /**
     * Actualiza la fecha del último inicio de sessión del usuario.
     * @param {string} id - Identificador del usuario
     * @param {Date} date - Fecha del último login
     * @returns {Promise<void>}
     */
    async updateLastLogin(id, date) {
        await UserModel.update(
            { lastLoginAt: date },
            { where: { id } }
        );
    }
}
