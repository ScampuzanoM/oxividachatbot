const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const defaultFlow = require("./default.flow");
const inactividad = require("./inactividad.flow")

/**
 * FLujo Inteligente (va a ser activado por una intencion de una persona o por palabra clave)
 * Flujo de bienvenida
 */

const json = require("../Servicios.json")
let mensaje = null

module.exports = addKeyword('RESERVAR_CITA')
    .addAnswer(['¿desea agendar una cita?','1. Si ','2. No'],
        { capture: true, idle: Number(process.env.TIEMPO_INACTIVIDAD) },
        async (ctx, { state, flowDynamic, gotoFlow, fallBack }) => {

            if (ctx?.idleFallBack) {
                return gotoFlow(inactividad)
            } else {
                opcion = ctx.body;
                const servicio = state.get('servicio')
                switch (opcion) {
                    case '1': {
                        await flowDynamic([
                            {body:`Perfecto, la ${servicio.titulo} tiene un costo de ${servicio.costo}`}
                        ])
                        await flowDynamic([
                            {body:`la disponibilidad que tenemos es la siguiente:`}
                        ])
                        await flowDynamic([
                            {body:`https://bit.ly/44mGGCT`}
                        ])
                        break;
                    }
                    case '2': {
                        await flowDynamic([
                            {body:'Muchas gracias, estamos para servirte, hasta luego!'}
                        ])
                        break;
                    }
                    default: {
                        await gotoFlow(defaultFlow)
                        return fallBack()
                    }
                }
            }

        })
    .addAnswer(null, { capture: false },
        async (ctx, { flowDynamic }) => {
            await flowDynamic([
                {body:  mensaje.mensaje}
            ])
            return null;
        }
    )

