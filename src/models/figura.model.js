import mongoose from "mongoose";

const figuraSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },

    nivel: {
        type: String,
        required: true,
        enum: ["principiante", "intermedio", "avanzado", "élite"],
    },

    pasos: {
        type: [
            {
                texto: {
                    type: String,
                    required: true,
                    trim: true,
                },
                imagenUrl: String,
            },
        ],
        validate: {
            validator: (listaDePasos) => listaDePasos.length > 0,
            message: "La figura debe tener al menos un paso",
        },
    },

    descripcion: String,
    imagenUrl: String,
});

const Figura = mongoose.model("Figura", figuraSchema);

export default Figura;