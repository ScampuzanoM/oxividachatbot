

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

const delay = (miliseconds) =>
  new Promise((res) => setTimeout(res, miliseconds));

module.exports = { delay, listarServicios};
