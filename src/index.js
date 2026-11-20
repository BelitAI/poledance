// Prepara Express con la ruta de bienvenida y arranca el servidor.
// Importa esa aplicación y la pone a escuchar en un puerto.

import app from "./app.js";

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});