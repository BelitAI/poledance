import { jest } from "@jest/globals";
import { verificarToken, verificarAdmin } from "../src/middlewares/auth.middleware.js";
import jwt from "jsonwebtoken";
import Usuaria from "../src/models/usuaria.model.js";

test("rechaza una petición sin token", () => {
    const req = { headers: {} };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    const next = jest.fn();

    verificarToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
});

test("impide el acceso a una usuaria que no es administradora", () => {
    const req = { usuario: { rol: "user" } };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    const next = jest.fn();

    verificarAdmin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
});

test("rechaza el token de una cuenta que ya no existe", async () => {
    const secretoAnterior = process.env.JWT_SECRET;
    process.env.JWT_SECRET = "secreto-de-prueba";

    const token = jwt.sign(
        { id: "507f1f77bcf86cd799439011", rol: "user" },
        process.env.JWT_SECRET
    );

    const buscarUsuaria = jest
        .spyOn(Usuaria, "findById")
        .mockResolvedValue(null);

    const req = {
        headers: { authorization: `Bearer ${token}` },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    const next = jest.fn();

    try {
        await verificarToken(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            error: "La cuenta ya no existe",
        });
        expect(next).not.toHaveBeenCalled();
    } finally {
        buscarUsuaria.mockRestore();

        if (secretoAnterior === undefined) {
            delete process.env.JWT_SECRET;
        } else {
            process.env.JWT_SECRET = secretoAnterior;
        }
    }
});