// Prepara la aplicación: crea Express y configura sus rutas y middlewares.

import express from "express";
import figuraRouter from "./routes/figura.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.routes.js";
import progresoRouter from "./routes/progreso.routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡Bienvenida a la API de Pole Dance!");
});

app.use("/figuras", figuraRouter);
app.use("/auth", authRouter);
app.use("/progresos", progresoRouter);
app.use(errorHandler);
export default app;