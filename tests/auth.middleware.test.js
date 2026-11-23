import { jest } from "@jest/globals";
import { verificarToken, verificarAdmin } from "../src/middlewares/auth.middleware.js";

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