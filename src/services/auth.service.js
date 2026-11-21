import bcrypt from "bcrypt";

export const registrarUsuaria = async (modelo, datos) => {
    if (typeof datos.password !== "string" || datos.password.length === 0) {
        const error = new Error("La contraseña es obligatoria");
        error.statusCode = 400;
        throw error;
    }
    const passwordHash = await bcrypt.hash(datos.password, 10);

    const usuaria = await modelo.create({
        nombre: datos.nombre,
        email: datos.email,
        password: passwordHash,
        rol: "user",
    });

    return {
        id: usuaria._id,
        nombre: usuaria.nombre,
        email: usuaria.email,
        rol: usuaria.rol,
    };
};