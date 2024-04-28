const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const defaultFlow = require("./default.flow");
const inactividad = require("./inactividad.flow")
const reserva_citasFlow = require("./reserva_cita")

/**
 * FLujo Inteligente (va a ser activado por una intencion de una persona o por palabra clave)
 * Flujo de bienvenida
 */
const json = require("../enfermedades.json")
let servicio = null
mensaje_ppal = json.menu;

module.exports = addKeyword('ENFERMEDADES_')
    .addAnswer([mensaje_ppal],
        { capture: true, idle: Number(process.env.TIEMPO_INACTIVIDAD) },
        async (ctx, { state, gotoFlow, fallBack , flowDynamic}) => {

            if (ctx?.idleFallBack) {
                return gotoFlow(inactividad)
            } else {
                opcion = ctx.body;
                detalle_menu = json.detalle_menu.find((data) => data.id === Number(opcion));
                
                if (opcion > detalle_menu.length){
                    await gotoFlow(defaultFlow)
                    return fallBack()
                } else {
                    await state.update({ detalle_menu: detalle_menu })
                    await flowDynamic([
                        {body:  detalle_menu.descripcion}
                    ])
                    return gotoFlow(reserva_citasFlow);
                }
            }

        })

