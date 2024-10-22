import User from "../models/User.js"; // Certifique-se de que o caminho está correto
import bcrypt from 'bcryptjs'

// Função para buscar usuário por ID
export const getUserById = async (id) => {
    console.log(id); // Log do ID recebido
    try {
        // Busca o usuário pelo ID
        const user = await User.findById(id).select("-senha");
        return user; // Retorna o usuário encontrado ou null
    } catch (error) {
        throw new Error('Erro ao buscar usuário');
    }
};

export const updateUser = async (id, updateData) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('Usuário não encontrado');
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
  
      if (updateData.avatar) { // Adiciona o avatar
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
  

