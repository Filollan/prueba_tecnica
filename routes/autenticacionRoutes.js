import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js"; 
import { login } from "../controllers/autenticacionController.js";

const router = Router();

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

export default router;
