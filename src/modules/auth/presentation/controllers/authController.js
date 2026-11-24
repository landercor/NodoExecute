/**
 * Controlador de autenticación (capa de presentación).
 * Recibe req/res, llama a los casos de uso y devuelve respuestas HTTP.
 */

import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase.js';
import { LoginUserUseCase } from '../../application/use-cases/LoginUserUseCase.js';
import { UserRepositoryImpl } from '../../infrastructure/persistence/repositories/UserRepositoryImpl.js';

// Inyección de dependencias: el controlador recibe los casos de uso
// que a su vez reciben el repositorio de persistencia.
const userRepository = new UserRepositoryImpl();
const registerUserUseCase = new RegisterUserUseCase({ userRepository });
const loginUserUseCase = new LoginUserUseCase({ userRepository });

export const register = async (req, res) => {
    try {
        const { user, token} = await registerUserUseCase.execute(req.body);
        res.status(201).json({ message: 'Usuario registrado con éxito', token, user });
    } catch (error) {
        const status = error.status || 401;
        res.status(status).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const user = await loginUserUseCase.execute(req.body);
        
        res.status(200).json({ message: 'Sessión iniciada con éxito', user });
    } catch (error) {
        const status = error.status || 401;
        res.status(status).json({ error: error.message });
    }
};

    /**
     * 
     * @param {object} req  - verificacion exitosa de la sesion.
     * @param {promise(string)} res - se generara una promesa del red.sesionToken.
     */

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al cerrar sessión' });
        }
        res.clearCookie('connect.sid', {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        res.status(200).json({ message: 'Sessión cerrada con éxito' });
    });
};

export const profile = (req, res) => {
    res.status(200).json({ user: req.user
    });
};