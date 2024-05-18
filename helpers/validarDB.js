import Product from "../models/productos.js";
import User from "../models/usuarios.js";

export const existeEmail = async (email = "") => {
  if (await User.findOne({ email })) {
    throw new Error(`El email ya está registrado`);
  }
};

export const existeProducto = async (id) => {
  if (!await Product.findById(id)) {
    throw new Error(`El id no existe`);
  }
};
