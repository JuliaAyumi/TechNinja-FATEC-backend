import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";
import sendPasswordResetEmail from "../services/emailService.js";
import { getUserById, updateUser } from "../services/userService.js";

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await user.save();

    await sendPasswordResetEmail(email, token);
    res.status(200).json({ message: "E-mail de recuperação enviado" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const cleanToken = token.replace(/:/g, "");

  if (!password) {
    return res.status(400).json({ message: "Nova senha é obrigatório" });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: cleanToken,
      resetPasswordExpires: { $gt: new Date(Date.now()) },
    });

    if (!user) {
      return res.status(400).json({ message: "Token inválido ou expirado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.senha = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    res.status(200).json({ message: "Senha redefinida com sucesso" });
    await user.save();
  } catch (error) {
    res.status(500).json({ message: "Erro ao redefinir a senha" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user !== id) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Erro ao buscar usuário", error: error.message });
  }
};

export const updateUserController = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  if (
    (updateData.nome !== undefined && updateData.nome.trim() === "") ||
    (updateData.email !== undefined && updateData.email.trim() === "")
  ) {
    return res
      .status(400)
      .json({ message: "Nome e email não podem ser vazios." });
  }

  try {
    const updatedUser = await updateUser(userId, updateData);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
