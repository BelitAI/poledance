import express from "express";

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
    res.send("¡Bienvenida a la API de Pole Dance!");
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});