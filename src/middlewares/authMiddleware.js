import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, "secreto");
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido." });
  }
};

export default authMiddleware;
