import User from "../models/User.js";
import {
  obterDificuldadePorSubtema,
  obterPerguntasPorSubtemaDificuldade,
  obterTemasPorArea,
} from "../services/quizService.js";

// Controlador para buscar perguntas por área e tópico
export const getQuizQuestions = async (req, res) => {
  const { tema, subtema, dificuldade } = req.params;

  try {
    const perguntas = await obterPerguntasPorSubtemaDificuldade(
      tema,
      subtema,
      dificuldade
    );

    res.json(perguntas);
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    res.status(500).json({ message: "Erro ao buscar perguntas" });
  }
};

// Controlador para buscar subtemas por área
export const getTemasPorArea = async (req, res) => {
  const { area } = req.params;

  try {
    const subtemas = await obterTemasPorArea(area);

    if (subtemas.length === 0) {
      return res.status(404).json({ message: "Nenhum subtema encontrado" });
    }

    res.json(subtemas);
  } catch (error) {
    console.error("Erro ao buscar subtemas:", error);
    res.status(500).json({ message: "Erro ao buscar subtemas" });
  }
};

// Controlador para buscar dificuldades por subtema
export const getDificuldadesPorSubtema = async (req, res) => {
  const { tema, subtema } = req.params;

  try {
    const dificuldades = await obterDificuldadePorSubtema(tema, subtema);

    if (dificuldades.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhuma dificuldade encontrada" });
    }

    res.json(dificuldades);
  } catch (error) {
    console.error("Erro ao buscar dificuldades:", error);
    res.status(500).json({ message: "Erro ao buscar dificuldades" });
  }
};

export const getPerguntasPorDificuldadeSubtema = async (req, res) => {
  const { tema, subtema, dificuldade } = req.params;

  try {
    const perguntas = await getQuizQuestions(tema, subtema, dificuldade);

    if (perguntas.length === 0) {
      return res.status(404).json({ message: "Nenhuma pergunta encontrada" });
    }

    res.json(perguntas);
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    res.status(500).json({ message: "Erro ao buscar perguntas" });
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

// Controlador para marcar quiz como completado
export const markQuizCompleted = async (req, res) => {
  const { area, topico } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const quizId = `${area}-${topico}`;
    if (!user.quizzesCompletados.includes(quizId)) {
      user.quizzesCompletados.push(quizId);
      await user.save();
    }

    res.status(200).json({ message: "Quiz marcado como completado" });
  } catch (error) {
    console.error("Erro ao marcar quiz como completado:", error);
    res.status(500).json({ message: "Erro ao marcar quiz como completado" });
  }
};

export const getCompletedQuizzes = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select("quizzesCompletados");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ quizzesCompletados: user.quizzesCompletados || [] });
  } catch (error) {
    console.error("Erro ao buscar quizzes completados:", error);
    res.status(500).json({ message: "Erro ao buscar quizzes completados" });
  }
};
