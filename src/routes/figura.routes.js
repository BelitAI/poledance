import { Router } from "express";
import { listarFiguras, registrarFigura } from "../controllers/figura.controller.js";
import { verificarToken, verificarAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", listarFiguras);
router.post("/", verificarToken, verificarAdmin, registrarFigura);

export default router;