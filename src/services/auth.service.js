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

export const iniciarSesion = async (modelo, datos) => {

    if (
        typeof datos?.email !== "string" ||
        datos.email.trim().length === 0 ||
        typeof datos.password !== "string" ||
        datos.password.length === 0
    ) {
        const error = new Error("El email y la contraseña son obligatorios");
        error.statusCode = 400;
        throw error;
    }
    const usuaria = await modelo.findOne({ email: datos.email }).select("+password");

    if (!usuaria || !(await bcrypt.compare(datos.password, usuaria.password))) {
        const error = new Error("Credenciales incorrectas");
        error.statusCode = 401;
        throw error;
    }

    return {
        id: usuaria._id,
        nombre: usuaria.nombre,
        email: usuaria.email,
        rol: usuaria.rol,
    };
};