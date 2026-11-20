// La función recibe un modelo y le pide sus figuras mediante find(). 
// En el test le pasamos el modelo simulado; cuando conectemos la ruta, 
// le pasaremos el modelo real Figura.

export const obtenerFiguras = async (modelo) => {
  return await modelo.find();
};