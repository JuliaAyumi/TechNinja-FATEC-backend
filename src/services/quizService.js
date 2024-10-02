import Pergunta from "../models/Questions.js";

export const obterPerguntas = async (area, topico) => {
  try {
    const perguntas = await Pergunta.find({ area, topico });

    // Embaralhar as perguntas
    perguntas.sort(() => 0.5 - Math.random());

    return perguntas;
  } catch (error) {
    throw new Error("Erro ao obter perguntas");
  }
};

export const obterTopicosPorArea = async (area) => {
  try {
    const topicos = await Pergunta.find({ area })
      .select("topico")
      .distinct("topico");
    return topicos;
  } catch (error) {
    throw new Error("Erro ao obter tópicos");
  }
};
