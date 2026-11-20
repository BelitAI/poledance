import { Router } from "express";
import { listarFiguras } from "../controllers/figura.controller.js";

const router = Router();

router.get("/", listarFiguras);

export default router;