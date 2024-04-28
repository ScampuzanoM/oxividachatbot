require('dotenv').config()
const {
  createBot,
  createProvider,
  createFlow,
} = require("@bot-whatsapp/bot");

const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const welcomeFlow = require("./flows/welcome.flow");
const ServerAPI = require('./http');
const servicios_Flow = require('./flows/servicios.flow');
const media_flow =  require('./flows/media.flow');
const reserva_citaFlow = require('./flows/reserva_cita')
const menu_ppalFlow = require('./flows/menu_ppal');
const enfermedadesFlow = require('./flows/enfermedades.flow');

/**
 * Configuracion de Plugin
 */




/**
 *
 */


const main = async () => {
  const adapterDB = new MockAdapter();
  const adapterFlow = createFlow([
    welcomeFlow,
    servicios_Flow,
    enfermedadesFlow,
    media_flow,
    reserva_citaFlow,
    menu_ppalFlow
  ]);

  const adapterProvider = createProvider(BaileysProvider);

  const httpServer = new ServerAPI(adapterProvider, adapterDB)

  const configBot = {
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  }



  await createBot(configBot);
  httpServer.start()
};

main();
