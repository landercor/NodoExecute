/*rutas inexistentes*/

export const notFoundHandler = (req, res, next) => {

    const error = new Error(
        ` Ruta no encontrada: ${req.method} ${req.originalUrl}`
    );
    error.status = 404;

    next(error);
}

export function errorHandler(err, req, res, next) {

    const statusCode = err.status || 500;

    const message = err.message || "Error de servidor interno";

    res.status(statusCode).json ({

        message: err.message,
        method: req.method,
        path: req.originalUrl,
        status: statusCode,
    });

    res.status(statusCode).json({
        success: false,
        message: 
            statusCode >= 500
            ? 'Error de servidor interno'
            : err.message,
        ...(process.env.NODE_ENV === 'develoment' && {
            details: err.message,
        }),
    });
}
