/**
 * Registro centralizado de modelos de Sequelize.
 * Al importar este archivo, todos los modelos quedan registrados en la conexión.
 */
import UserModel from '../../../modules/auth/infrastructure/persistence/models/UserModel.js';

// Los modelos se registran automáticamente al importarlos (UserModel.init se ejecuta al importar el módulo)

export const models = {
    User: UserModel,
};

export default models;