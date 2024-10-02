import User from "../models/User.js";
import {
  obterPerguntas,
  obterTopicosPorArea,
} from "../services/quizService.js";

// Controlador para buscar perguntas por área e tópico
export const getQuizQuestions = async (req, res) => {
  const { area, topico } = req.params;

  try {
    const perguntas = await obterPerguntas(area, topico);

    res.json(perguntas);
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    res.status(500).json({ message: "Erro ao buscar perguntas" });
  }
};

// Controlador para buscar tópicos por área
export const getTopicosPorArea = async (req, res) => {
  const { area } = req.params;

  try {
    const topicos = await obterTopicosPorArea(area);

    if (topicos.length === 0) {
      return res.status(404).json({ message: "Nenhum tópico encontrado" });
    }

    res.json(topicos);
  } catch (error) {
    console.error("Erro ao buscar tópicos:", error);
    res.status(500).json({ message: "Erro ao buscar tópicos" });
  }
};

// Atualizar a pontuação do usuário
export const updateScore = async (req, res) => {
  const { points } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    // Atualizar a pontuação
    const newScore = parseInt(user.pontuacao || "0") + points;
    user.pontuacao = newScore;

    // Salvar o usuário com a nova pontuação
    await user.save();

    res
      .status(200)
      .json({ message: "Pontuação atualizada com sucesso", newScore });
  } catch (error) {
    console.error("Erro ao atualizar a pontuação:", error);
    res.status(500).json({ message: "Erro ao atualizar a pontuação" });
  }
};
