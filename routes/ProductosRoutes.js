import { Router } from "express";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validarJWT.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import {
  actualizarProducto,
  eliminarProducto,
  obtenerProducto,
  obtenerProductos,
  obtenerProductsByUser,
  registrarProducto,
} from "../controllers/productosController.js";
import { existeProducto } from "../helpers/validarDB.js";

const router = Router();

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("precio", "El precio es requerido").not().isEmpty(),
    check("cantidad", "La cantidad es requerida").not().isEmpty(),
    validarCampos,
  ],
  registrarProducto
);

router.get("/", obtenerProductos);

router.delete(
  "/:id",
  [validarJWT, check("id").custom(existeProducto), validarCampos],
  eliminarProducto
);

router.get(
  "/:id",
  [check("id").custom(existeProducto), validarCampos],
  obtenerProducto
);

router.put("/:id", [validarJWT, actualizarProducto]);

router.get(
  "/user/:id",
  [
    check("id", "Identificador de usuario inválido").isMongoId(),
    validarCampos,
  ],
  obtenerProductsByUser
);

export default router;
