import express from 'express';
import dotenv from 'dotenv';
import conection_DB from './config/conection_BD.js';
import authRoutes from './routes/autenticacionRoutes.js';
import productRoutes from './routes/productosRoutes.js';
import userRoutes from './routes/usuariosRoutes.js';

dotenv.config();

const app = express();

conection_DB();

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());

// Apis
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el ${PORT}`));