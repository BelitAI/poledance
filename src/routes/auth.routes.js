import { Router } from "express";
import { registrar } from "../controllers/auth.controller.js";

const router = Router();

router.post("/registro", registrar);

export default router;