import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getUserById = async (id) => {
  try {
    const user = await User.findById(id).select("-senha");
    return user;
  } catch (error) {
    throw new Error("Erro ao buscar usuário");
  }
};

export const updateUser = async (id, updateData) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const updates = {};

    if (updateData.senha) {
      const isMatch = await bcrypt.compare(updateData.senha, user.senha);
      if (!isMatch) {
        const salt = await bcrypt.genSalt(10);
        updates.senha = await bcrypt.hash(updateData.senha, salt);
      }
    }

    if (updateData.nome && updateData.nome !== user.nome) {
      updates.nome = updateData.nome.trim();
    }

    if (updateData.email && updateData.email !== user.email) {
      updates.email = updateData.email.trim();
    }

    if (updateData.avatar) {
      updates.avatar = updateData.avatar;
    }

    if (Object.keys(updates).length > 0) {
      const updatedUser = await User.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
      return updatedUser;
    }

    return user;
  } catch (error) {
    throw new Error(`Erro ao atualizar usuário: ${error.message}`);
  }
};

export const getTopUsers = async() => {
  try {
    // Buscando os 7 maiores usuários, ordenando pela pontuação de forma decrescente
    const topUsers = await User.find()
      .sort({ pontuacao: -1 })  // Ordenando por pontuacao em ordem decrescente
      .limit(7)                // Limitando a 7 usuários
      .select('nome pontuacao avatar ranking');

      // Atualizar o campo "ranking" com base na posição
    for (let i = 0; i < topUsers.length; i++) {
      const user = topUsers[i];
      const posicao = i + 1; // ranking começa do 1

      await User.updateOne(
        { _id: user._id },
        { $set: { ranking: posicao } }
      );
    }

    return topUsers; // Retorna os 7 maiores usuários
  } catch (error) {
    throw new Error(`Erro ao buscar os 7 maiores usuários: ${error.message}`);
  }
}
