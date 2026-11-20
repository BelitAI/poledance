// Prepara la aplicación: crea Express y configura sus rutas y middlewares.

import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("¡Bienvenida a la API de Pole Dance!");
});

export default app;