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
        // Busca o usuário atual para comparar os dados
        const user = await User.findById(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Cria um objeto para armazenar os dados a serem atualizados
        const updates = {};

        const isMatch = await bcrypt.compare(updateData.senha, user.senha)

        // Verifica cada campo que pode ser atualizado
        if (updateData.nome && updateData.nome !== user.nome) {
            updates.nome = updateData.nome;
        }

        if (updateData.email && updateData.email !== user.email) {
            updates.email = updateData.email;
        }

        if (isMatch == false) {
            // Hasheia a nova senha se for fornecida
            const salt = await bcrypt.genSalt(10);
            updates.senha = await bcrypt.hash(updateData.senha, salt);
        }

        // Se houver atualizações, aplica as mudanças
        if (Object.keys(updates).length > 0) {
            const updatedUser = await User.findByIdAndUpdate(id, updates, {
                new: true,
                runValidators: true,
            });
            return updatedUser; // Retorna o usuário atualizado
        }

        return user; // Retorna o usuário original se não houver atualizações
    } catch (error) {
        throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
};

;
