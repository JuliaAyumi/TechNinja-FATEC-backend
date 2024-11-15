import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: "techninja.suporte@gmail.com",
        pass: "hmbf rmij axqa cxtl",
    },
});


const sendPasswordResetEmail = (email, token) => {
    const url = `https://techninjafrontend-1acbc255353f.herokuapp.com/recuperar/:${token}`;  
    const mailOptions = {
        from: "techninja.suporte@gmail.com", 
        to: email,
        subject: 'Redefinição de Senha', 
        text: `Olá! Você solicitou a redefinição de senha. Clique no link para redefinir: ${url}`,
        html: `<b>Olá Você solicitou a redefinição de senha. Clique no link para redefinir: <a href="${url}">${url}</a></b>`
    };

    return transporter.sendMail(mailOptions);
}

export default sendPasswordResetEmail