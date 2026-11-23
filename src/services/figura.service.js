// La función recibe un modelo y le pide sus figuras mediante find(). 
// En el test le pasamos el modelo simulado; cuando conectemos la ruta, 
// le pasaremos el modelo real Figura.

export const obtenerFiguras = async (modelo) => {
    return await modelo.find();
};

export const crearFigura = async (modelo, datos) => {
    return await modelo.create(datos);
};

export const actualizarFigura = async (modelo, figuraId, datos) => {
    return await modelo.findByIdAndUpdate(
        figuraId,
        datos,
        { new: true, runValidators: true }
    );
};

export const eliminarFigura = async (modelo, modeloProgreso, figuraId) => {
    const tieneProgresos = await modeloProgreso.exists({ figura: figuraId });

    if (tieneProgresos) {
        const error = new Error("No se puede eliminar una figura con progresos asociados");
        error.statusCode = 409;
        throw error;
    }

    return await modelo.findByIdAndDelete(figuraId);
};