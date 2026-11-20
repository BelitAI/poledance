// Carga las variables del archivo .env
import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = 3001;

// Conecta con MongoDB y después arranca el servidor
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error.message);
        process.exit(1);
    }
};

startServer();