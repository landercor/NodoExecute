import pkg from 'sequelize';
const { DataTypes } = pkg;
import { sequelize } from './src/infrastructure/database/connection.js';

console.log('sequelize type:', typeof sequelize);
console.log('sequelize.define:', typeof sequelize.define);

try {
    const UserModel = sequelize.define('User', {
        id: { type: DataTypes.UUID, primaryKey: true }
    }, { tableName: 'users' });
    console.log('UserModel:', typeof UserModel, UserModel ? UserModel.name : 'undefined');
} catch (e) {
    console.error('Error:', e.message);
}