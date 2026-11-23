import { jest } from "@jest/globals";
import { eliminarUsuaria } from "../src/services/usuaria.service.js";

test("al eliminar una usuaria también elimina sus progresos", async () => {
    const usuaria = { id: "usuaria-de-prueba" };

    const modeloUsuaria = {
        findById: jest.fn().mockResolvedValue(usuaria),
        findByIdAndDelete: jest.fn().mockResolvedValue(usuaria),
    };

    const modeloProgreso = {
        deleteMany: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    };

    await eliminarUsuaria(modeloUsuaria, modeloProgreso, usuaria.id);

    expect(modeloProgreso.deleteMany).toHaveBeenCalledWith({
        usuaria: usuaria.id,
    });

    expect(modeloUsuaria.findByIdAndDelete).toHaveBeenCalledWith(usuaria.id);
});