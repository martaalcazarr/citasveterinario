import nodemailer from "nodemailer";

const emailPasswordOlvidada = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      const {email, nombre, token} = datos;
      
      //enviar el email
      const info = await transport.sendMail({
        from: "APVeterinaria",
        to: email,
        subject: 'Restablece tu contraseña en APV',
        text: 'Restablece tu contraseña en APV',
        html: `<p> Hola ${nombre}, has solicitado restablecer tu contraseña.</p>
        <p>Para generar una nueva contraseña, accede al siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/password-olvidada/${token}">Restablecer contraseña</a></p>
        <p>Si tu no solicitaste este cambio de contraseña, ignora este mensaje.`
      })  
      console.log("mensaje enviado : %s", info.messageId)
}

export default emailPasswordOlvidada;