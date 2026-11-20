import Figura from "../models/figura.model.js";
import { obtenerFiguras } from "../services/figura.service.js";

export const listarFiguras = async (req, res, next) => {
    try {
        const figuras = await obtenerFiguras(Figura);
        res.status(200).json(figuras);
    } catch (error) {
        next(error);
    }
};