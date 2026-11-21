export const errorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        return res.status(400).json({
            error: "Datos no válidos",
        });
    }

    if (error.statusCode === 400 || error.statusCode === 401) {
        return res.status(error.statusCode).json({
            error: error.message,
        });
    }

    if (error.code === 11000 && error.keyPattern?.email) {
        return res.status(409).json({
            error: "El email ya está registrado",
        });
    }

    return res.status(500).json({
        error: "Error interno del servidor",
    });
};