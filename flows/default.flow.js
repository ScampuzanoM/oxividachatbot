const { addKeyword } = require("@bot-whatsapp/bot");
const welcomeFlow = require("./welcome.flow");
/**
 * FLujo Inteligente (va a ser activado por una intencion de una persona o por palabra clave)
 * Flujo de bienvenida
 */
module.exports = addKeyword('DEFAULT').addAnswer(
    [
        '¡por favor ingresa una opcion valida! 🌟'
    ]
)

