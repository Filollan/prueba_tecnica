import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { existeEmail } from "../helpers/validarDB.js";
import { actualizarUsuario,eliminarUsuario,registrarUsuarios,} from "../controllers/usuariosController.js";
import { validarJWT } from "../middlewares/validarJWT.js";

const router = Router();

router.post(
  "/",
  [
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("apellido", "El apellido es requerido").not().isEmpty(),
    check("email", "El email es requerido").isEmail(),
    check("password", "La contraseña debe tener mínimo de 7 caracteres").isLength({ min: 7 }),
    check("tipoUsuario", "El tipo de usuario es requerido").not().isEmpty(),    
    check("email").custom(existeEmail),
    validarCampos,
  ],
  registrarUsuarios
);

router.delete(
  "/:id",
  [validarJWT, check("id", "Identificador de usuario inválido").isMongoId()],
  eliminarUsuario
);

router.put(
  "/:id",
  [validarJWT, check("id", "Identificador de usuario inválido").isMongoId()],
  actualizarUsuario
);

export default router;
