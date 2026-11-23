export const eliminarUsuaria = async (modeloUsuaria, modeloProgreso, usuariaId) => {
    const usuaria = await modeloUsuaria.findById(usuariaId);

    if (!usuaria) {
        return null;
    }

    await modeloProgreso.deleteMany({ usuaria: usuariaId });
    await modeloUsuaria.findByIdAndDelete(usuariaId);

    return usuaria;
};