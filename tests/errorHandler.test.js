import { jest } from "@jest/globals";
import { errorHandler } from "../src/middlewares/errorHandler.js";

test("responde con 400 ante un error de validación", () => {
    const error = new Error("Datos no válidos");
    error.name = "ValidationError";

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    errorHandler(error, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
        error: "Datos no válidos",
    });
});

test("responde con 400 cuando el servicio indica datos incorrectos", () => {
    const error = new Error("La contraseña es obligatoria");
    error.statusCode = 400;

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    errorHandler(error, {}, res, jest.fn());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
        error: "La contraseña es obligatoria",
    });
});