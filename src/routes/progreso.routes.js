import { Router } from "express";
import {
    registrarProgreso,
    cambiarEstado,
    listarMisProgresos,
} from "../controllers/progreso.controller.js";
import { verificarToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verificarToken, registrarProgreso);
router.patch("/:progresoId", verificarToken, cambiarEstado);
router.get("/", verificarToken, listarMisProgresos);

export default router;