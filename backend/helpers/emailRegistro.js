import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
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
        subject: 'Valida tu cuenta en APV',
        text: 'Valida tu cuenta en APV',
        html: `<p> Hola ${nombre}, valida tu cuenta en APV.</p>
        <p>Tu cuenta ya está lista, solo debes validarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Validar cuenta</a></p>
        <p>Si tu no creaste esta cuenta, ignora este mensaje.`
      })  
      console.log("mensaje enviado : %s", info.messageId)
}

export default emailRegistro;