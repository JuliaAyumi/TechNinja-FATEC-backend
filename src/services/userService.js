import User from "../models/User.js"; // Certifique-se de que o caminho está correto

// Função para buscar usuário por ID
const getUserById = async (id) => {
    console.log(id); // Log do ID recebido
    try {
        // Busca o usuário pelo ID
        const user = await User.findById(id);
        return user; // Retorna o usuário encontrado ou null
    } catch (error) {
        throw new Error('Erro ao buscar usuário');
    }
};

export default getUserById;
