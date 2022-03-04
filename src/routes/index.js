const { Router } = require("express");
const clienteRouter = require("./cliente.js");

const router = Router();

router.use("/clientes", clienteRouter);

module.exports = router;
