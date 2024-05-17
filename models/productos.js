import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, "El precio es requerido"],
      trim: true,
    },
    cantidad: {
      type: Number,
      required: [true, "La cantidad es requerida"],
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El id del usuario es requerido"],
    },
  },
  {
    timestamps: true,
  }
);


const Product = model("Product", productSchema);
export default Product;
