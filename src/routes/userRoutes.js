import express from "express";
import requestPasswordReset from "../controllers/userController.js";

const router = express.Router();

//Rota para solicitar o envio do email para recuperar a senha.
router.post("/request-password-reset", requestPasswordReset);

// Rota para redefinir a senha
router.post("/reset-password/:token", resetPassword);

export default router;
