import { request, response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/usuarios.js";
import { generarJWT } from "../helpers/generarJWT.js";

export const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario || !bcryptjs.compareSync(password, usuario.password)) {
      return res
        .status(400)
        .json({ ok: false, msg: "Credenciales incorrectas" });
    }

    const token = await generarJWT(usuario.id);

    res.cookie("token", token);

    res.json({ usuario, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Hable con el administrador" });
  }
};
