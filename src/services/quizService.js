import Pergunta from "../models/Questions.js";

export const obterPerguntasPorSubtemaDificuldade = async (
  tema,
  subtema,
  dificuldade
) => {
  try {
    const perguntas = await Pergunta.find({ tema, subtema, dificuldade });

    perguntas.sort(() => 0.5 - Math.random());

    return perguntas;
  } catch (error) {
    throw new Error("Erro ao obter perguntas");
  }
};

export const obterTemasPorArea = async (tema) => {
  try {
    const subtemas = await Pergunta.find({ tema }).distinct("subtema");

    const temasComPontos = await Promise.all(
      subtemas.map(async (subtema) => {
        const perguntas = await Pergunta.find({ tema, subtema });

        const pontosTotais = perguntas.reduce((total, pergunta) => {
          switch (pergunta.dificuldade) {
            case "facil":
              return total + 1;
            case "medio":
              return total + 5;
            case "dificil":
              return total + 10;
            default:
              return total;
          }
        }, 0);

        return { subtema, pontos: pontosTotais };
      })
    );

    return temasComPontos;
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
