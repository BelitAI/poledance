import { Router } from "express";
import {
    listarFiguras,
    registrarFigura,
    editarFigura,
    borrarFigura,
} from "../controllers/figura.controller.js";
import { verificarToken, verificarAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", listarFiguras);
router.post("/", verificarToken, verificarAdmin, registrarFigura);
// Solo las administradoras pueden editar y borrar figuras.
router.patch("/:figuraId", verificarToken, verificarAdmin, editarFigura);
router.delete("/:figuraId", verificarToken, verificarAdmin, borrarFigura);

export default router;