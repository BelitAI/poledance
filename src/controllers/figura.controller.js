import Figura from "../models/figura.model.js";
import { obtenerFiguras, crearFigura } from "../services/figura.service.js";

export const listarFiguras = async (req, res, next) => {
    try {
        const figuras = await obtenerFiguras(Figura);
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