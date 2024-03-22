const router = require("express").Router();
const colaborador = require("./colaborador/colaborador");
router.use("/colaborador", colaborador);

module.exports =router;
