// Prepara la aplicación: crea Express y configura sus rutas y middlewares.

import express from "express";
import figuraRouter from "./routes/figura.routes.js";

const app = express();

app.get("/", (req, res) => {
  res.send("¡Bienvenida a la API de Pole Dance!");
});

app.use("/figuras", figuraRouter);
export default app;