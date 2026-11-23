import { Router } from "express";
import { verificarToken } from "../middlewares/auth.middleware.js";
import { borrarUsuaria } from "../controllers/usuaria.controller.js";

const router = Router();

router.delete("/:usuariaId", verificarToken, borrarUsuaria);

export default router;