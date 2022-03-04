const { Cliente } = require("../db.js");

//Obtener todos los clientes
exports.getClientes = async (req, res) => {
  try {
    let clientes = await Cliente.findAll();
    const data = clientes.map((e) => {
      return {
        id: e.id,
        nombre: e.nombre,
        apellido: e.apellido,
        nacimiento: e.fechaNacimiento,
        edad: getEdad(e.fechaNacimiento),
      };
    });

    data.length > 0
      ? res.status(200).send(data)
      : res.status(404).send("No se encontraron clientes");
  } catch (err) {
    return "Se ha producido un error al obtener los datos, por favor, inténtelo de nuevo.";
  }
};

//Crear clientes en DB
exports.postCliente = async (req, res) => {
  try {
    const { nombre, apellido, fechaNacimiento } = req.body;
    await Cliente.create({
      nombre: nombre,
      apellido: apellido,
      fechaNacimiento: fechaNacimiento,
    });

    res.status(200).send("Cliente creado correctamente");
  } catch (error) {
    return "Se ha producido un error al obtener los datos, por favor, inténtelo de nuevo.";
  }
};

//Obtener promedio de edad de clientes, valor redondeado
exports.getPromEdad = async (req, res) => {
  try {
    let clientes = await Cliente.findAll();
    let result = 0;
    if (clientes.length) {
      const sumaEdad = clientes.reduce((acc, elem) => {
        let edad = getEdad(elem.fechaNacimiento);
        return acc + edad;
      }, 0);
      result = sumaEdad / clientes.length;
      result = result.toFixed();
    }
    result !== 0
      ? res.status(200).send(result.toString())
      : res.status(404).send("No se encontraron clientes");
  } catch (error) {
    return "Se ha producido un error al obtener los datos, por favor, inténtelo de nuevo.";
  }
};

//Utilitarios: Obtener edad a partir de fecha de nacimiento
const getEdad = (dateString) => {
  let hoy = new Date();
  let fechaNacimiento = new Date(dateString);
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
  if (
    diferenciaMeses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
  ) {
    edad--;
  }
  return edad;
};
