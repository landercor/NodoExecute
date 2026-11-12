import { registerUser, loginUser } from ""
import { error } from "node:console";
import ErrorGoals from "../../../../../utils/ErrorGoals"

export const register = (req, res) => {
    try {
        const {  username, email, password } = req.body;
        const user = registerUser(username, email, password);

        res.status(201).json({ message: ErrorGoals[201], user});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = (req, res) => {
    try {
        const { email, password } = req.body;
        const user = loginUser(email, password);

        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.role = user.role;
        
        res.status(200).json({ message: error.message });
    }catch (error) {
        res.status(400).json({ error: error.message});
    }
};

export const logout = (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'logout fialed'});
        }

        res.clearCookie('connect.sid',  {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameTime: 'lax'
        });
        res.status(200).json({ message: 'logout successful'});
    });
};

export const profile = (req, res) => {
    // 1. Verificar que el usuario este autenticado revisando la sesion
    // Si no hay userId en la sesion, no esta logueado
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ error: ErrorGoals[401] });
    }

    // 2. Si esta autenticado, devolver los datos de la sesion (sin password)
    res.status(200).json({
        user: {
            id: req.session.userId,
            username: req.session.username,
            role: req.session.role
        }
    });
};