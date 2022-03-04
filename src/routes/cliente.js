const { Router } = require("express");
const {
  getClientes,
  getCliente,
  postCliente,
  getPromEdad,
} = require("../controllers/clientes");
const server = Router();

server.get("/", getClientes);
server.get("/cliente/:id", getCliente);
server.get("/promedio-edad", getPromEdad);
server.post("/", postCliente);

module.exports = server;
