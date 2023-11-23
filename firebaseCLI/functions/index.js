const functions = require("firebase-functions");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "brand8n123@gmail.com",
    pass: "wqupzpmnxocwbuld", //para producción se debe colocar los datos institucionales
  },
});

exports.enviarCorreo = functions.https.onRequest(async (req, res) => {
  const {destinatario, asunto, mensaje} = req.body;

  const mailOptions = {
    from: "brand8n123@gmail.com",
    to: destinatario,
    subject: asunto,
    text: mensaje,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Correo enviado con éxito");
  } catch (error) {
    console.error("Error al enviar el correo", error);
    res.status(500).send("Error al enviar el correo");
  }
});
