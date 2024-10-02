//services/emailService.js

import { text } from 'express';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',  //Pode adicionar outros serviços de emial
    auth: {
        user: process.env.EMAIL_USER,   //Email do usuario
        pass: process.env.EMAIL_PASS,  //Senha do usuario
    },
});

const sendPasswordResetEmail = (email, token) => {
    const url = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Redefinição de Senha',
        text: `Você solicitou a redefinição de senha. Clique no link para redefinir: ${url}`,
    };

    return transporter.sendMail(mailOptions);
}

export default sendPasswordResetEmail