export default function defineUserModel(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
            comment: 'Unique identifier for the user'
        },

        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'first_name',
            comment: 'the first name of the user'
        },

        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'last_name',
            comment: 'the last name of the user'

        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'email',
            comment: 'the email address of the user'
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password_hash',
            comment: 'the hashed password of the user'
        },
        phone: {
            type: DataTypes.STRING(30),
            allowNull: true,
            field: 'phone',
            comment: 'the phone number of the user'
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive', 'suspended'),
            defaultValue: 'active',
            allowNull: false,
            field: 'status',
            comment: 'the status of the user account'
        },
        role: {
            type: DataTypes.ENUM('user', 'administrator', 'moderator'),
            defaultValue: 'user',
            allowNull: false,
            field: 'role',
            comment: 'the role of the user in the system'
        },
        lastLoginAt: {
            type: DataTypes.DATE_TIME,
            allowNull: true,
            field: 'last_login_at',
            comment: 'the timestamp of the user\'s last login'
        },
    }, {
        tableName: 'users',
        timestamps: true, // Gestiona created_at y updated_at automáticamente
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        comment: 'Table containing user information'
    });

    User.prototype.isActive = function () {
        return this.status === 'active';
    };

    User.prototype.fullname = function () {
        const first = this.firstName || '';
        const last = this.lastName || '';
        return `${first} ${last}`.trim();
    };

    return User;
}