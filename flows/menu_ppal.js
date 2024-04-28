const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const serviciosFlow = require("./servicios.flow");
const defaultFlow = require("./default.flow");
const inactividad = require("./inactividad.flow");
const enfermedadesFlow = require("./enfermedades.flow");

/**
 * Punto de Entrada!
 * NO Inteligente (no usa intelgencia artificial)
 * Flujo de bienvenida
 */

module.exports = addKeyword('MENU_PPAL')
    // module.exports =  addKeyword('BOT')
    .addAnswer(['1. Servicios - Terapias','2. Enfermedades','3. Especialista - Servicios'],
        { capture: true, idle: Number(process.env.TIEMPO_INACTIVIDAD) },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {

            if (ctx?.idleFallBack) {
                return gotoFlow(inactividad)
            } else {
                const numero = ctx.body
                switch (numero) {
                    case '1': {
                        gotoFlow(serviciosFlow)
                        break;
                    }
                    case '2': {
                        gotoFlow(enfermedadesFlow)
                        break;
                    }
                    case '3': {
                        gotoFlow(serviciosFlow)
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