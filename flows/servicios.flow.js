const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const defaultFlow = require("./default.flow");
const inactividad = require("./inactividad.flow")
const reserva_citasFlow = require("./reserva_cita")

/**
 * FLujo Inteligente (va a ser activado por una intencion de una persona o por palabra clave)
 * Flujo de bienvenida
 */
const json = require("../Servicios.json")
let servicio = null
mensaje_ppal = json.lista_servicios;

module.exports = addKeyword('servicios')
    .addAnswer([mensaje_ppal],
        { capture: true, idle: Number(process.env.TIEMPO_INACTIVIDAD) },
        async (ctx, { state, gotoFlow, fallBack , flowDynamic}) => {

            if (ctx?.idleFallBack) {
                return gotoFlow(inactividad)
            } else {
                opcion = ctx.body;
                if (opcion != '1' && opcion != '2' && opcion != '3') {
                    await gotoFlow(defaultFlow)
                    return fallBack()
                } else {
                    servicio = json.detalle_servicios.find((servicio) => servicio.id === Number(opcion));
                    await state.update({ servicio: servicio })
                    await flowDynamic([
                        {body:  servicio.descripcion}
                    ])
                    return gotoFlow(reserva_citasFlow);
                }
            }

        })

