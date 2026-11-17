/**
 * Rutas de autenticación (capa de presentación).
 * Define los endpoints HTTP y asocia validadores + controladores.
 */
import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import {
    registerValidator,
    loginValidator,
} from '../validators/auth.validators.js';

const router = Router();

router.post('/register', registerValidator, authController.register);
router.post('/login', loginValidator, authController.login);
router.post('/logout', authController.logout);
router.get('/profile', authController.profile);

export default router;