import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    avatar: { type: String, default: "" },
    pontuacao: { type: Number, default: 0 },
    nivelmodulo: { type: String, default: "" },
    ranking: { type: String, default: "" },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    quizzesCompletados: { type: [String], default: [] },
    badges: { type: [String], default: [] },
    secret: {type: String, default: null} //armazena codigo de validação 2FA
  },
  { collection: "Usuarios" }
);

const User = mongoose.model("Usuário", userSchema, "Usuarios");

export default User