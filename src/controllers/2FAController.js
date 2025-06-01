import { generateSecret, verifyToken } from '../services/2FAService.js';

export const handleGenerateSecret = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email é obrigatório" });
    }

    const secret = await generateSecret(email);

    res.status(200).json({ secret: secret });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const handleVerifyToken = async (req, res) => {
  try {
    const { token, email } = req.body;

    if (!email || !token) {
      return res.status(400).json({ message: "Email e token são obrigatórios" });
    }

    const valid = await verifyToken(token, email);

    res.status(200).json({ valid });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};