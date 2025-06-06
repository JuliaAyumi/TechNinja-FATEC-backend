import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import totpRoutes from "./routes/2FARoutes.js";
import * as totpCrypto from './utils/2FACrypto.js';

dotenv.config();
totpCrypto.setCryptoKey(process.env.CRYPTO_SECRET);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({limit: '3mb'}));

// Conectar ao MongoDB
connectDB();

// Rotas
app.use("/api", authRoutes);
app.use("/api", quizRoutes);
app.use("/api/users", userRoutes);
app.use("/api", totpRoutes);

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em ${process.env.NODE_ENV === 'production' ? `https://techninjabackend-d9ff0d7afc03.herokuapp.com` : `http://localhost:${PORT}`}`);
});