/**
 * Validadores de entrada para las rutas de autenticación.
 * Usa Zod para verificar que los datos del request cumplan el esquema.
 * Si la validación falla, pasa el error al siguiente middleware (errorHandler).
 */
import { z } from 'zod';
import { validate } from '../../../../utils/validator.js';

const registerSchema = z.object({
    firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    phone: z.string().optional(),
});

const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'La contraseña es requerida'),
});

export const registerValidator = validate(registerSchema);
export const loginValidator = validate(loginSchema);