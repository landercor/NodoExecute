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
import { authenticateToken } from "../../../../interfaces/http/middleware/auth.middleware.js";
import { rateLimitApi, rateLimitLogin } from "../../../../interfaces/http/middleware/rate-limit.middleware.js";
const router = Router();

router.post('/register', rateLimitApi, registerValidator, authController.register);
router.post('/login', rateLimitLogin, loginValidator, authController.login);
router.post('/logout', authenticateToken, authController.logout);
router.get('/profile', authenticateToken, authController.profile);

export default router;