import mongoose from "mongoose";
import Usuaria from "../models/usuaria.model.js";
import Progreso from "../models/progreso.model.js";
import { eliminarUsuaria } from "../services/usuaria.service.js";

export const borrarUsuaria = async (req, res, next) => {
    try {
        const { usuariaId } = req.params;

        if (!mongoose.isValidObjectId(usuariaId)) {
            return res.status(400).json({
                error: "El identificador de la usuaria no es válido",
            });
        }

        if (req.usuario.rol !== "admin" && req.usuario.id !== usuariaId) {
            return res.status(403).json({
                error: "No tienes permiso para eliminar esta cuenta",
            });
        }

        const usuaria = await eliminarUsuaria(Usuaria, Progreso, usuariaId);

        if (!usuaria) {
            return res.status(404).json({
                error: "Usuaria no encontrada",
            });
        }

        return res.status(200).json({
            mensaje: "Cuenta y progresos eliminados",
        });
    } catch (error) {
        next(error);
    }
};