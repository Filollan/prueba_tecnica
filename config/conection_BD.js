import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Conectado a BD");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    //Forzamos el cierre de los otros procesos en caso de error
    process.exit(1);  
  }
};
export default conectarDB;
