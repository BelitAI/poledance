import jwt from "jsonwebtoken";
import Usuaria from "../models/usuaria.model.js";

export const verificarToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    let payload;

    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({ error: "Token inválido o expirado" });
    }

    try {
        const usuaria = await Usuaria.findById(payload.id);

        if (!usuaria) {
            return res.status(401).json({ error: "La cuenta ya no existe" });
        }

        req.usuario = { id: usuaria.id, rol: usuaria.rol };
        next();
    } catch (error) {
        next(error);
    }
};

export const verificarAdmin = (req, res, next) => {
    if (req.usuario?.rol !== "admin") {
        return res.status(403).json({ error: "Acceso reservado a administradoras" });
    }

    next();
};