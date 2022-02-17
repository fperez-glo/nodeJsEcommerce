import nodemailer from 'nodemailer';
import 'dotenv/config';

const { NODE_MAILER_EMAIL } = process.env;

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: NODE_MAILER_EMAIL,
        pass: 'mbxlrlkkzdwuxqmu'
    }
});

export const sendEmail = async (email) => {
    const { subject, html } = email;
    await transport.sendMail({
        from: '"Notificacion de registro 👻" <nodeNotification@node.com>', // sender address
        to: NODE_MAILER_EMAIL, // list of receivers
        subject, // Subject line
        //text: "El usuario ha sido registrado.", // plain text body
        html, // html body
})}

