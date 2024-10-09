//services/emailService.js

import { text } from 'express';
import nodemailer from 'nodemailer';

//Criando um transportador
const transporter = nodemailer.createTransport({
    service: 'gmail',  //Pode adicionar outros serviços de emial
    port: 587,
    secure: false,
    auth: {
        user: "techninja.suporte@gmail.com",   //Email do usuario
        pass: "hmbf rmij axqa cxtl",  //Senha do usuario
    },
});


const sendPasswordResetEmail = (email, token) => {
    const url = `https://techninjafrontend-1acbc255353f.herokuapp.com/recuperar/:${token}`;   //URL que vai ser mandanda por email. Já manda a URL com o token
    //Configuração da mensagem do email
    const mailOptions = {
        from: "techninja.suporte@gmail.com",   //Remetente
        to: email,   //Destinatario
        subject: 'Redefinição de Senha', //Assunto do email  
        text: `Olá! Você solicitou a redefinição de senha. Clique no link para redefinir: ${url}`,  //Texto do email
        html: `<b>Olá Você solicitou a redefinição de senha. Clique no link para redefinir: <a href="${url}">${url}</a></b>`
    };

    return transporter.sendMail(mailOptions);
}

export default sendPasswordResetEmail