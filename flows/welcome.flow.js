const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const menu_ppalFlow = require("./menu_ppal")
const defaultFlow = require("./default.flow");
const inactividad = require("./inactividad.flow")

/**
 * Punto de Entrada!
 * NO Inteligente (no usa intelgencia artificial)
 * Flujo de bienvenida
 */

module.exports = addKeyword(['hola', 'ole', 'alo', 'buenas', 'menu', 'holi', 'hol', 'oe'])
    // module.exports =  addKeyword('BOT')
    .addAnswer('🙌 ¡Hola bienvenid@ a Oxivida!')
    .addAnswer('🙌 ¿Cual es tu nombre?', { capture: true, idle: Number(process.env.TIEMPO_INACTIVIDAD) },
        async (ctx, { flowDynamic }) => {
            if (ctx?.idleFallBack) {
                return gotoFlow(inactividad)
            } else {
                const nombre = ctx.body
                await flowDynamic(`De ahora en adelante te llamare ${nombre}`)
            }
        })
    .addAnswer(['¿Acepta terminos y condiciones?', '1. Si', '2. No'],
        { capture: true, idle: Number(process.env.TIEMPO_INACTIVIDAD) },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {

            if (ctx?.idleFallBack) {
                return gotoFlow(inactividad)
            } else {
                const numero = ctx.body
                switch (numero) {
                    case '1': {
                        gotoFlow(menu_ppalFlow)
                        break;
                    }
                    case '2': {
                        await flowDynamic([
                            { body: 'Muchas gracias, estamos para servirte, hasta luego!' }
                        ])
                        break;
                    }
                    default: {
                        await gotoFlow(defaultFlow)
                        return fallBack()
                    }
                }
            }


        }
    )