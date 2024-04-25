
const { addKeyword } = require("@bot-whatsapp/bot");
const { EVENTS } = require('@bot-whatsapp/bot')

const TEL = '573003278599'
const mensaje = `Envio Soporte de Pago`;
const enlaceWhatsApp = encodeURI(`https://web.whatsapp.com/send?phone=${TEL}&text=${mensaje}`);
module.exports =  addKeyword(EVENTS.MEDIA)
.addAnswer('He recibido tu foto o video. Hemos detectado que nos has enviado una imagen. Si este mensaje está relacionado con un soporte de pago, por favor, reenvíalo al siguiente número de WhatsApp para gestionar adecuadamente tu solicitud. ¡Gracias!')
.addAnswer(`**Haz clic en el siguiente enlace para contactarme:**
${enlaceWhatsApp}`)


