class MySender{
    
 sendMail = async (to, tittle, msg) => {
    try {
        console.log("Entro xxd"+to);

      const response = await fetch(
        'https://us-central1-pri-enfermeras-daaae.cloudfunctions.net/enviarCorreo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            destinatario: to,
            asunto: tittle,
            mensaje: msg,
          }),
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        console.log("Se ha enviado")
        const data = await response.text();
        return true;
      } else {
        console.log(response.status+" no se envió");
        return false;
      }
    } catch (error) {
        console.log(error);
      return false;
    }
  };

}

  export default MySender;