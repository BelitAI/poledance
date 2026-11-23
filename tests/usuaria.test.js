import Usuaria from "../src/models/usuaria.model.js";

test("una usuaria sin email no es válida", async () => {
    const usuaria = new Usuaria({
        nombre: "Ana",
        password: "hash-de-ejemplo",
    });

    await expect(usuaria.validate()).rejects.toMatchObject({
        errors: {
            email: expect.anything(),
        },
    });
});

test("una usuaria tiene el rol user por defecto", () => {
    const usuaria = new Usuaria({
        nombre: "Ana",
        email: "ana@ejemplo.com",
        password: "hash-de-ejemplo",
    });

    expect(usuaria.rol).toBe("user");
});