import Figura from "../src/models/figura.model.js";

test("una figura sin nombre no es válida", async () => {
    const figura = new Figura({
        nivel: "principiante",
        pasos: [{ texto: "Primer paso" }],
    });

    await expect(figura.validate()).rejects.toMatchObject({
        errors: {
            nombre: expect.anything(),
        },
    });
});

test("una figura con un nivel incorrecto no es válida", async () => {
    const figura = new Figura({
        nombre: "Fireman",
        nivel: "experto",
        pasos: [{ texto: "Primer paso" }],
    });

    await expect(figura.validate()).rejects.toMatchObject({
        errors: {
            nivel: expect.anything(),
        },
    });
});

test.each(["principiante", "intermedio", "avanzado", "élite"])(
    "una figura con nivel %s es válida",
    async (nivel) => {
        const figura = new Figura({
            nombre: "Fireman",
            nivel,
            pasos: [{ texto: "Primer paso" }],
        });

        await expect(figura.validate()).resolves.toBeUndefined();
    }
);

test("una figura sin pasos no es válida", async () => {
    const figura = new Figura({
        nombre: "Fireman",
        nivel: "principiante",
        pasos: [],
    });

    await expect(figura.validate()).rejects.toMatchObject({
        errors: {
            pasos: expect.anything(),
        },
    });
});

test("un paso sin texto no es válido", async () => {
    const figura = new Figura({
        nombre: "Fireman",
        nivel: "principiante",
        pasos: [{ imagenUrl: "https://ejemplo.com/paso-1.jpg" }],
    });

    await expect(figura.validate()).rejects.toMatchObject({
        errors: {
            "pasos.0.texto": expect.anything(),
        },
    });
});