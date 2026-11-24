/**rutas inexistentes
 * @param {string} message
 * @param {number} statusCode
 * @param {string} method
 * @param {string} path
 */


export const notFoundHandler = (req, res, next) => {

    const error = new Error(
        ` Ruta no encontrada: ${req.method} ${req.originalUrl}`
    );
    error.status = 404;

    next(error);
}

export function errorHandler(err, req, res, next) {
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        method: req.method,
        path: req.originalUrl,
        message:
            statusCode >= 500
                ? 'Error de servidor interno'
                : err.message,
        ...(process.env.NODE_ENV === 'development' && {
            details: err.message,
            stack: err.stack,
        }),
    });
}
