import mongoose from "mongoose";
import Figura from "../models/figura.model.js";
import Progreso from "../models/progreso.model.js";
import {
    obtenerFiguras,
    crearFigura,
    actualizarFigura,
    eliminarFigura,
} from "../services/figura.service.js";

export const listarFiguras = async (req, res, next) => {
    try {
        const { nivel } = req.query;
        const nivelesPermitidos = ["principiante", "intermedio", "avanzado", "élite"];

        if (nivel !== undefined && !nivelesPermitidos.includes(nivel)) {
            const error = new Error("El nivel indicado no es válido");
            error.statusCode = 400;
            throw error;
        }
        const figuras = await obtenerFiguras(Figura, nivel);
        res.status(200).json(figuras);
    } catch (error) {
        next(error);
    }
};

export const registrarFigura = async (req, res, next) => {
    try {
        const figura = await crearFigura(Figura, req.body);
        res.status(201).json(figura);
    } catch (error) {
        next(error);
    }
};

export const editarFigura = async (req, res, next) => {
    try {
        const { figuraId } = req.params;

        if (!mongoose.isValidObjectId(figuraId)) {
            const error = new Error("El identificador de la figura no es válido");
            error.statusCode = 400;
            throw error;
        }

        const camposPermitidos = ["nombre", "nivel", "pasos", "descripcion", "imagenUrl"];
        const datos = {};

        for (const campo of camposPermitidos) {
            if (req.body?.[campo] !== undefined) {
                datos[campo] = req.body[campo];
            }
        }

        if (Object.keys(datos).length === 0) {
            const error = new Error("No se han enviado campos para actualizar");
            error.statusCode = 400;
            throw error;
        }

        const figura = await actualizarFigura(Figura, figuraId, datos);

        if (!figura) {
            const error = new Error("Figura no encontrada");
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json(figura);
    } catch (error) {
        next(error);
    }
};

export const borrarFigura = async (req, res, next) => {
    try {
        const { figuraId } = req.params;

        if (!mongoose.isValidObjectId(figuraId)) {
            const error = new Error("El identificador de la figura no es válido");
            error.statusCode = 400;
            throw error;
        }

        const figura = await eliminarFigura(Figura, Progreso, figuraId);

        if (!figura) {
            const error = new Error("Figura no encontrada");
            error.statusCode = 404;
            throw error;
        }

        return res.status(200).json(figura);
    } catch (error) {
        next(error);
    }
};