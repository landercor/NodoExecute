import { CataTypes, DataTypes, STRING } from 'sequelize';
import { sequelize } from '../../../../infrastructure/database/connection.js';

const UserModel = sequelize.define('User', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },

    fristName: {
        type: DataTypes.STRING(15),
        allowNull: true,
        field: 'frist_name',
    },

    lastName: {
        type: DataTypes.STRING(15),
        allowNull: true,
        field: 'last_name',
    },

    email: {
        type: DataTypes.STRING(60),
        allowNull: true,
        unique: true,
        field: 'email',
    },

    password: {
        type: DataTypes.STRING(60),
        allowNull: true,
        field: 'phone',
    },

    status: {
        type: DataTypes.ENUM('active','inactive','suspended'),
        defaultValue: 'active',
        allowNull: true,
        field: 'status',
    },

    role: {
        type: DataTypes.ENUM('user', 'administrator','moderator'),
        deafault: 'user',
        allowNull: true,
        field: 'role',
    },

    lastLogin: {
        type: DataTypes.DATE,
        timestamps: true,
        created: 'created_at',
        updateAt: 'update_At',
    },
},  {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    update: 'update_at',
});

export default UserModel;