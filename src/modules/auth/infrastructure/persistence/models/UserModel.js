/**
 * Modelo de usuario (capa de infraestructura).
 * Define la estructura de la tabla 'users' en la base de datos.
 * Se asocia con la conexión centralizada.
 */
import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from '../../../../../infrastructure/database/connection.js';

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        comment: 'Unique identifier for the user',
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'first_name',
        comment: 'the first name of the user',
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name',
        comment: 'the last name of the user',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'email',
        comment: 'the email address of the user',
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password_hash',
        comment: 'the hashed password of the user',
    },
    phone: {
        type: DataTypes.STRING(30),
        allowNull: true,
        field: 'phone',
        comment: 'the phone number of the user',
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'suspended'),
        defaultValue: 'active',
        allowNull: false,
        field: 'status',
        comment: 'the status of the user account',
    },
    role: {
        type: DataTypes.ENUM('user', 'administrator', 'moderator'),
        defaultValue: 'user',
        allowNull: false,
        field: 'role',
        comment: 'the role of the user in the system',
    },
    lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'last_login_at',
        comment: 'the timestamp of the user\'s last login',
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'created_by',
        comment: 'User ID who created this record',
    },
    updatedBy: {
        type: DataTypes.UUID,
        allowNull: true,
        field: 'updated_by',
        comment: 'User ID who last updated this record',
    },
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    comment: 'Table containing user information',
});

export default UserModel;
