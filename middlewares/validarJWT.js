import jwt from "jsonwebtoken";
import User from "../models/usuarios.js";

export const validarJWT = async (req, res, next) => {
  const { cookie } = req.headers;
  const token = cookie.split("=")[1];

  if (!token) {
    return res.status(401).json({ msg: "No hay token en la petición" });
  }

  try {
    const { id: uid } = jwt.verify(token, process.env.JWT_SECRET);

    console.log(uid)

    const usuario = await User.findById(uid);
    if (!usuario) {
      return res
        .status(401)
        .json({ msg: "Token no válido - usuario no existe en BD" });
    }

    req.user = usuario;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: "Token no válido" });
  }
};
