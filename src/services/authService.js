import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { base64URL } from "../utils/base64URL.js";

export const registerUser = async (nome, email, senha) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("Usuário já existe");
  }

  const hashedPassword = await bcrypt.hash(senha, 10);
  const newUser = new User({
    nome,
    email,
    senha: hashedPassword,
    avatar: base64URL,
    pontuacao: 0,
  });

  await newUser.save();
  return newUser;
};

export const loginUser = async (email, senha) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isMatch = await bcrypt.compare(senha, user.senha);
  if (!isMatch) {
    throw new Error("Senha incorreta");
  }

  const token = jwt.sign({ id: user._id }, "secreto", {
    expiresIn: "1h",
  });
  return token;
};
