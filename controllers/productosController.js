import { request, response } from "express";
import Product from "../models/productos.js";

const handleErrorResponse = (res, error, statusCode = 500, message = "Error del servidor") => {
  console.error(error);
  res.status(statusCode).json({ msg: message });
};

export const registrarProducto = async (req = request, res = response) => {
  const { nombre, precio, cantidad } = req.body;
  const { _id: user } = req.user;

  try {
    const product = new Product({ nombre, precio, cantidad, user });
    await product.save();
    res.status(201).json({ ok: true, msg: "Producto Agregado Correctamente" });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const obtenerProductos = async (req = request, res = response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const obtenerProducto = async (req = request, res = response) => {
  try {
    const product = await Product.findById(req.params.id).populate("user", "nombre apellido");
    res.status(200).json(product);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const obtenerProductsByUser = async (req = request, res = response) => {
  try {
    const productos = await Product.find({ user: req.params.id });
    res.status(200).json(productos);
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

export const actualizarProducto = async (req = request, res = response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ ok: false, msg: "No tiene permisos para actualizar este producto" });
    }

    Object.assign(product, req.body);
    await product.save();
    res.status(201).json({ ok: true, msg: "Producto Actualizado Correctamente" });
  } catch (error) {
    handleErrorResponse(res, error, 401, error.message);
  }
};

export const eliminarProducto = async (req = request, res = response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ ok: false, msg: "No tiene permisos para eliminar este producto" });
    }

    await product.deleteOne();
    res.status(200).json({ ok: true, msg: "Producto Eliminado" });
  } catch (error) {
    handleErrorResponse(res, error, 401, error.message);
  }
};
