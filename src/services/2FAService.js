import { authenticator } from 'otplib';
import { encrypt, decrypt } from '../utils/2FACrypto.js';
import User from '../models/User.js';

authenticator.options = {
  step: 30,         // tempo de expiração do token (em segundos)
  window: [6, 6],   // tolera ate 180s(30*6) de diferença entre relogio servidor e relogio celular
};

export const generateSecret = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const secret = authenticator.generateSecret(); //biblioteca otplib gera o secret
  const encryptedSecret = encrypt(secret);

  await User.updateOne({ email }, { $set: { secret: encryptedSecret } });

  return secret;
};

export const verifyToken = async (token, email) => {
  if (!token || typeof token !== 'string') {
    throw new Error("Token inválido.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  try {
    const decryptedSecret = decrypt(user.secret);
    console.log(decryptedSecret);

    // verifica se o token é válido
    const valid = authenticator.check(token, decryptedSecret);
    return valid;
  } catch (error) {
    console.error("Erro ao descriptografar ou verificar token:", error.message);
    throw new Error("Erro ao verificar token TOTP.");
  }
};