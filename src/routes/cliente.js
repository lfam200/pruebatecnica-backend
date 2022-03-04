const { Router } = require("express");
const {
  getClientes,
  postCliente,
  getPromEdad,
} = require("../controllers/clientes");
const server = Router();

server.post("/", postCliente); // API #1: Crear cliente
server.get("/promedio-edad", getPromEdad); // API #2: Promedio de edad de clientes
server.get("/", getClientes); //  API #3: Lista de clientes

module.exports = server;
