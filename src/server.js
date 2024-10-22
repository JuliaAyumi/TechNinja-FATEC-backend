import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({limit: '3mb'}));

// Conectar ao MongoDB
connectDB();

// Rotas
app.use("/api", authRoutes);
app.use("/api", quizRoutes);
app.use("/api/users", userRoutes);

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em ${process.env.NODE_ENV === 'production' ? `https://techninjabackend-d9ff0d7afc03.herokuapp.com` : `http://localhost:${PORT}`}`);
});
