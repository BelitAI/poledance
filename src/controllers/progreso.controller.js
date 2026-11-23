import Progreso from "../models/progreso.model.js";
import {
    iniciarProgreso,
    actualizarEstado,
    obtenerProgresos,
} from "../services/progreso.service.js";
import Figura from "../models/figura.model.js";
import mongoose from "mongoose";

export const registrarProgreso = async (req, res, next) => {
    try {
        const usuariaId = req.usuario.id;
        const figuraId = req.body?.figuraId;

        if (!mongoose.isValidObjectId(figuraId)) {
            const error = new Error("El identificador de la figura no es válido");
            error.statusCode = 400;
            throw error;
        }

        const figura = await Figura.findById(figuraId);

        if (!figura) {
            const error = new Error("Figura no encontrada");
            error.statusCode = 404;
            throw error;
        }

        const progreso = await iniciarProgreso(
            Progreso,
            usuariaId,
            figuraId
        );

        return res.status(201).json(progreso);
    } catch (error) {
        next(error);
    }
};

export const cambiarEstado = async (req, res, next) => {
    try {
        const { progresoId } = req.params;
        const estado = req.body?.estado;

        if (!mongoose.isValidObjectId(progresoId)) {
            const error = new Error("El identificador del progreso no es válido");
            error.statusCode = 400;
            throw error;
        }

        if (!["practicando", "lograda"].includes(estado)) {
            const error = new Error("El estado no es válido");
            error.statusCode = 400;
            throw error;
        }

        const progreso = await actualizarEstado(
            Progreso,
            progresoId,
            req.usuario.id,
            req.usuario.rol,
            estado
        );

        if (!progreso) {
            const error = new Error("Progreso no encontrado");
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json(progreso);
    } catch (error) {
        next(error);
    }
};

export const listarMisProgresos = async (req, res, next) => {
    try {
        const progresos = await obtenerProgresos(Progreso, req.usuario.id);
        return res.status(200).json(progresos);
    } catch (error) {
        next(error);
    }
};