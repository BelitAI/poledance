import mongoose from "mongoose";

const progresoSchema = new mongoose.Schema({
    usuaria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuaria",
        required: true,
    },

    figura: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Figura",
        required: true,
    },

    estado: {
        type: String,
        enum: ["practicando", "lograda"],
        default: "practicando",
    },
});

progresoSchema.index({ usuaria: 1, figura: 1 }, { unique: true });

const Progreso = mongoose.model("Progreso", progresoSchema);

export default Progreso;