import express from "express";
import {requestPasswordReset, resetPassword} from "../controllers/userController.js";
import { getUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//Rota para solicitar o envio do email para recuperar a senha.
router.post("/esqueceu", requestPasswordReset);

// Rota para redefinir a senha
router.post("/recuperar/:token", resetPassword);

//Rota para buscar usuario
router.get("/user/:id",authMiddleware,getUser);

export default router;
