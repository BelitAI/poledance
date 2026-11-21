import Usuaria from "../models/usuaria.model.js";
import { registrarUsuaria, iniciarSesion } from "../services/auth.service.js";

export const registrar = async (req, res, next) => {
    try {
        const usuaria = await registrarUsuaria(Usuaria, req.body);
        return res.status(201).json(usuaria);
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const usuaria = await iniciarSesion(Usuaria, req.body);
        return res.status(200).json(usuaria);
    } catch (error) {
        next(error);
    }
};