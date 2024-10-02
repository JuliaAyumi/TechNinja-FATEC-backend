import mongoose from "mongoose";

const alternativaSchema = new mongoose.Schema({
  opcao: String,
  textoOpcao: String,
});

const perguntaSchema = new mongoose.Schema(
  {
    area: { type: String, required: true },
    topico: { type: String, required: true },
    dificuldade: { type: String, required: true },
    pergunta: { type: String, required: true },
    alternativas: { type: [alternativaSchema], required: true },
    resposta: { type: String, required: true },
  },
  { collection: "Perguntas" }
);

const Pergunta = mongoose.model("Pergunta", perguntaSchema);

export default Pergunta;
