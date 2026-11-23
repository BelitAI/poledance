export const iniciarProgreso = async (modelo, usuariaId, figuraId) => {
    return await modelo.create({
        usuaria: usuariaId,
        figura: figuraId,
        estado: "practicando",
    });
};

export const actualizarEstado = async (modelo, progresoId, usuariaId, rol, estado) => {
    const filtro = { _id: progresoId };

    if (rol !== "admin") {
        filtro.usuaria = usuariaId;
    }

    return await modelo.findOneAndUpdate(
        filtro,
        { estado },
        { new: true, runValidators: true }
    );
};

export const obtenerProgresos = async (modelo, usuariaId) => {
    return await modelo.find({ usuaria: usuariaId }).populate("figura");
};