const router = require("express").Router();
const colaborador = require("./colaborador/colaborador");
const cliente = require("./cliente/cliente");
const admin = require("./admin/admin");
const auth = require("./auth/auth");

router.use("/colaborador", colaborador);
router.use("/cliente", cliente);
router.use("/admin", admin);
router.use("/auth", auth);

module.exports = router;
