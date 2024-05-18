import { request, response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/usuarios.js";

const handleErrorResponse = (res, error, statusCode = 500, message = "Error del servidor") => {
  console.error(error);
  res.status(statusCode).json({ msg: message });
};

export const registrarUsuarios = async (req = request, res = response) => {
  const { nombre, apellido, email, password, password_confirm, tipoUsuario } = req.body;

  if (password !== password_confirm) {
    return res.status(400).json({ ok: false, msg: "Las contraseñas no coinciden" });
  }

  try {
    const user = new User({ nombre, apellido, email, password: bcryptjs.hashSync(password, bcryptjs.genSaltSync(10)), tipoUsuario });
    await user.save();
    res.status(201).json({ ok: true, msg: "Usuario Registrado Correctamente" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const eliminarUsuario = async (req = request, res = response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({ ok: false, msg: "No tiene permisos para eliminar esta cuenta" });
    }

    await user.deleteOne();
    res.status(200).json({ ok: true, msg: "Cuenta Eliminada" });
  } catch (error) {
    handleErrorResponse(res, error, 401, error.message);
  }
};

export const actualizarUsuario = async (req = request, res = response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user._id.toString() !== req.user.id) {
      return res.status(401).json({ ok: false, msg: "No tiene permisos para actualizar la información de esta cuenta" });
    }

    Object.assign(user, req.body);
    await user.save();
    res.status(200).json({ ok: true, msg: "Cuenta Actualizada" });
  } catch (error) {
    handleErrorResponse(res, error, 401, error.message);
  }
};
