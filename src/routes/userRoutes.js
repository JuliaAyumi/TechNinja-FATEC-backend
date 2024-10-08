import express from "express";
import {requestPasswordReset, resetPassword} from "../controllers/userController.js";

const router = express.Router();

//Rota para solicitar o envio do email para recuperar a senha.
router.post("/esqueceu", requestPasswordReset);

// Rota para redefinir a senha
router.post("/recuperar/:token", resetPassword);

export default router;
