// ts-check
/**
 * Middleware de validación genérico usando Zod.
 * Usa un esquema de Zod para verificar el body del request.
 * Si la validación falla, pasa el error al siguiente middleware (errorHandler).
 * @param {import('zod').ZodSchema} schema - Esquema de Zod a usar
 * @returns {import('express').RequestHandler}
 */
import { ZodError } from 'zod';


export const validate = (schema) => {
    return (req, res, next) => {
        try {
            const result = schema.parse(req.body);
            req.validatedData = result;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
                const err = new Error('Error de validación: ' + messages.join('; '));
                err.status = 400;
                return next(err);
            }
            next(error);
        }
    };
};