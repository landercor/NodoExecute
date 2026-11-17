import { object } from "zod";

export const HttpStatus = Object.freeze ({
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
});

export const DefaultMessages = object.freeze({
    [HttpStatus.BAD_REQUEST]: 'Solicitud incorrecta',
    [HttpStatus.UNAUTHORIZED]: 'No autorizado',
    [HttpStatus.FORBIDDEN]: 'Acceso denegado',
    [HttpStatus.NOT_FOUND]: 'Recurso no encontrado',
    [HttpStatus.CONFLICT]: 'Conflicto con la información',
    [HttpStatus.INTERNAL_SERVER_ERROR]: 'Error interno del servidor'
});
