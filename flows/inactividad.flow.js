
const { addKeyword } = require("@bot-whatsapp/bot");
const { EVENTS } = require('@bot-whatsapp/bot')

module.exports =  addKeyword(EVENTS.ACTION).addAnswer('🚫 Lamentamos informarte que la sesión se ha cancelado por inactividad. Para continuar, por favor escribe *menú* o *hola* y estaré encantado de ayudarte nuevamente. 😊')


