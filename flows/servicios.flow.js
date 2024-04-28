const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const defaultFlow = require("./default.flow");
const inactividad = require("./inactividad.flow")
const reserva_citasFlow = require("./reserva_cita")

/**
 * FLujo Inteligente (va a ser activado por una intencion de una persona o por palabra clave)
 * Flujo de bienvenida
 */
const json = require("../servicios.json")
let mensaje_ppal = json.detalle_menu;

function listarServicios(servicios) {
    // Verificamos que servicios es un array y que todos los elementos tienen un id numérico
    if (!Array.isArray(servicios) || !servicios.every(servicio => typeof servicio.id === 'number')) {
        console.error('El argumento proporcionado debe ser un array de objetos, y cada objeto debe tener un id numérico.');
        return; // Detenemos la ejecución de la función
    }
    // Ordenamos los servicios por ID
    servicios.sort((a, b) => a.id - b.id);
    // Creamos un texto con cada servicio, mostrando su ID y su título
    const resultado = servicios.map(servicio => `${servicio.id}. ${servicio.titulo}`).join('\n');

    return resultado;
}


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
                    await state.update({ detalle_menu: detalle_menu })
                    await flowDynamic([
                        {body:  detalle_menu.descripcion}
                    ])
                    return gotoFlow(reserva_citasFlow);
                }
            }

        })

