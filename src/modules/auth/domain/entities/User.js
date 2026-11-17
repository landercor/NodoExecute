/**
 * Entidad de dominio: Representa un usuario del sistema.
 * Contiene las reglas de negocio puras relacionadas con el usuario.
 * No depende de Express, Sequelize ni de tecnologías externas.
 */
export class User {
    constructor({
        id = null,
        firstName,
        lastName,
        email,
        passwordHash,
        phone = null,
        status = 'active',
        role = 'user',
        lastLoginAt = null,
        createdAt = null,
        updatedAt = null,
        createdBy = null,
        updatedBy = null,
    }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwordHash = passwordHash;
        this.phone = phone;
        this.status = status;
        this.role = role;
        this.lastLoginAt = lastLoginAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
    }

    /**
     * Verifica si la cuenta del usuario está activa.
     * @returns {boolean} - true si el estado es 'active'
     */
    isActive() {
        return this.status === 'active';
    }

    /**
     * Obtiene el nombre completo del usuario (nombre + apellido).
     * @returns {string} - Nombre completo
     */
    get fullName() {
        const first = this.firstName || '';
        const last = this.lastName || '';
        return `${first} ${last}`.trim();
    }
}