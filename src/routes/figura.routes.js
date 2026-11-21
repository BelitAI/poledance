import { Router } from "express";
import { listarFiguras, registrarFigura } from "../controllers/figura.controller.js";

const router = Router();

router.get("/", listarFiguras);
router.post("/", registrarFigura);

export default router;