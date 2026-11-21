export const errorHandler = (error, req, res, next) => {
    if (error.name === "ValidationError") {
        return res.status(400).json({
            error: "Datos no válidos",
        });
    }

    return res.status(500).json({
        error: "Error interno del servidor",
    });
};