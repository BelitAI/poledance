import mongoose from "mongoose";

const usuariaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    rol: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

const Usuaria = mongoose.model("Usuaria", usuariaSchema);

export default Usuaria;