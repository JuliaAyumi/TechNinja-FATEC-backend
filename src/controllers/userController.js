import bcrypt from 'bcryptjs'
// import { send } from 'process';
import User from '../models/User.js';
import crypto from 'crypto';
import userRoutes from "../routes/userRoutes.js";
import sendPasswordResetEmail from '../services/emailService.js'
import { getUserById } from '../services/userService.js';
import { updateUser } from '../services/userService.js';


export const requestPasswordReset = async (req, res) => {
    const {email} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) {
            return res.status(404).json({ message: 'Usuário não encontrado'});
        }

        //Gera um token e define um tempo de expiração
        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = new Date(Date.now() + 3600000);  //Define a expiração do token para até 1 hora
        await user.save();

        await sendPasswordResetEmail(email, token);
        res.status(200).json({message: 'E-mail de recuperação enviado'});
    } catch (error) {
        //res.status(500).json({message: 'Erro ao enviar e-mail'});
        res.status(500).json({message: error})
        
    }
};

//Função para redefinir a senha
export const resetPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;

    const cleanToken = token.replace(/:/g, '');


    //Verifica se a senha foi inserida
    if(!password){
        return res.status(400).json({message: 'Nova senha é obrigatório'});
    }

    try {
        //Busca o usuario pelo token e verifica se o token ainda válido.
        const user = await User.findOne({
            resetPasswordToken: cleanToken,
            resetPasswordExpires: {$gt: new Date(Date.now())},
        });


        if (!user){
            return res.status(400).json({message: 'Token inválido ou expirado'});
            
        }

        //Hasheando a nova senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);
        user.senha = hashedPassword;  //Salva a nova senha já hasheada no banco
        user.resetPasswordToken = undefined;  //Define novamente os valores de recuperação de senha para undefined
        user.resetPasswordExpires = undefined;
        
        res.status(200).json({message: 'Senha redefinida com sucesso'});
        await user.save();
    } catch (error) {
        res.status(500).json({message: 'Erro ao redefinir a senha'});
    }
};

// Função para o endpoint de busca de usuário
export const getUser = async (req, res) => {
    const { id } = req.params; // Pega o ID do usuário da URL
    try {
        // Verifica se o ID no token corresponde ao ID na URL
        if (req.user !== id) {
            return res.status(403).json({ message: 'Acesso negado' });
        }

        // Chama a função do userService
        const user = await getUserById(id); 

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        return res.status(200).json(user); // Retorna o usuário encontrado
    } catch (error) {
        console.error(error); // Log do erro para depuração
        return res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
    }
};

//Função para atualizar dados do usuario
export const updateUserController = async (req, res) => {
    const userId = req.params.id; // Obtém o ID do usuário da URL
    const updateData = req.body; // Obtém os dados a serem atualizados do corpo da requisição

    try {
        const updatedUser = await updateUser(userId, updateData);
        res.status(200).json(updatedUser); // Retorna o usuário atualizado
    } catch (error) {
        res.status(400).json({ message: error.message }); // Retorna um erro se houver
    }
};




// export default {requestPasswordReset, resetPassword};