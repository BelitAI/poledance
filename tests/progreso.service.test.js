import { jest } from "@jest/globals";
import { actualizarEstado } from "../src/services/progreso.service.js";

test("una usuaria solo busca progresos que le pertenecen", async () => {
    const modelo = {
        findOneAndUpdate: jest.fn().mockResolvedValue(null),
    };

    await actualizarEstado(
        modelo,
        "progreso-1",
        "ana",
        "user",
        "lograda"
    );

    expect(modelo.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: "progreso-1", usuaria: "ana" },
        { estado: "lograda" },
        { new: true, runValidators: true }
    );
});

test("una administradora puede buscar cualquier progreso", async () => {
    const modelo = {
        findOneAndUpdate: jest.fn().mockResolvedValue(null),
    };

    await actualizarEstado(
        modelo,
        "progreso-1",
        "belit",
        "admin",
        "lograda"
    );

    expect(modelo.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: "progreso-1" },
        { estado: "lograda" },
        { new: true, runValidators: true }
    );
});