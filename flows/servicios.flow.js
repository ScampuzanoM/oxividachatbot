const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const defaultFlow = require("./default.flow");
const inactividad = require("./inactividad.flow")
const reserva_citasFlow = require("./reserva_cita")
const { listarServicios } = require('../utils/utils.js');

/**
 * FLujo Inteligente (va a ser activado por una intencion de una persona o por palabra clave)
 * Flujo de bienvenida
 */
const json = require("../servicios.json")
let mensaje_ppal = json.detalle_menu;




module.exports = addKeyword('SERVICIOS_')
    .addAnswer([listarServicios(mensaje_ppal)],
        { capture: true, idle: Number(process.env.TIEMPO_INACTIVIDAD) },
        async (ctx, { state, gotoFlow, fallBack , flowDynamic}) => {

            if (ctx?.idleFallBack) {
                return gotoFlow(inactividad)
            } else {
                opcion = ctx.body;
                detalle_menu = json.detalle_menu.find((data) => data.id === Number(opcion));
                if (opcion > detalle_menu.length) {
                    await gotoFlow(defaultFlow)
                    return fallBack()
                } else {
                    const myState = state.getMyState();

                    await state.update({ detalle_menu: detalle_menu })
                    await flowDynamic([
                        {body: myState.nombre +', '+ detalle_menu.descripcion}
                    ])
                    return gotoFlow(reserva_citasFlow);
                }
            }

        })

