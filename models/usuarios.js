import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido."],
      trim: true,
    },
    apellido: {
      type: String,
      required: [true, "El apellido es requerido."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "El email es requerido."],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida."],
      trim: true,
    },
    tipoUsuario: {
      type: String,
      required: [true, "El tipo de usuario es requerido."],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
