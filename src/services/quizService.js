import Pergunta from "../models/Questions.js";

export const obterPerguntasPorSubtemaDificuldade = async (
  tema,
  subtema,
  dificuldade
) => {
  try {
    const perguntas = await Pergunta.find({ tema, subtema, dificuldade });

    // Embaralhar as perguntas
    perguntas.sort(() => 0.5 - Math.random());

    return perguntas;
  } catch (error) {
    throw new Error("Erro ao obter perguntas");
  }
};

export const obterTemasPorArea = async (tema) => {
  try {
    const temas = await Pergunta.find({ tema }).distinct("subtema"); // Remove duplicatas
    return temas;
  } catch (error) {
    throw new Error("Erro ao obter temas");
  }
};

export const obterDificuldadePorSubtema = async (tema, subtema) => {
  try {
    const dificuldades = await Pergunta.find({ tema, subtema }).distinct(
      "dificuldade"
    );
    return dificuldades;
  } catch (error) {
    throw new Error("Erro ao obter dificuldades");
  }
};
