//La prueba prepara dos figuras de ejemplo. 
// modeloSimulado sustituye al modelo real durante el test: 
// su función find devuelve esos datos sin consultar MongoDB. 
// Después comprobamos que obtenerFiguras llama una vez a find y devuelve la lista.

import { jest } from "@jest/globals";
import { obtenerFiguras, crearFigura } from "../src/services/figura.service.js";

test("devuelve las figuras del catálogo", async () => {
    const figuras = [
        { nombre: "Fireman", nivel: "principiante" },
        { nombre: "Otra figura", nivel: "intermedio" },
    ];

    const modeloSimulado = {
        find: jest.fn().mockResolvedValue(figuras),
    };

    const resultado = await obtenerFiguras(modeloSimulado);

    expect(modeloSimulado.find).toHaveBeenCalledTimes(1);
    expect(resultado).toEqual(figuras);
});

test("crea una figura con los datos recibidos", async () => {
    const datos = {
        nombre: "Fireman",
        nivel: "principiante",
        pasos: [{ texto: "Primer paso" }],
    };

    const modeloSimulado = {
        create: jest.fn().mockResolvedValue(datos),
    };

    const resultado = await crearFigura(modeloSimulado, datos);

    expect(modeloSimulado.create).toHaveBeenCalledWith(datos);
    expect(resultado).toEqual(datos);
});