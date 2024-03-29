const router = require("express").Router();
const authMiddleware = require("../../middlewares/tokenValidator");
const createCliente = require("../../components/cliente/create");
const deleteCliente = require("../../components/cliente/delete");
const readCliente = require("../../components/cliente/read");
const updateCliente = require("../../components/cliente/update");
const viewCliente = require("../../components/cliente/view");
router.post("/", createCliente.createCliente);
router.put("/:id", authMiddleware.authorize, updateCliente.updateCliente);
router.delete("/:id", authMiddleware.authorize, deleteCliente.deleteCliente);
router.get("/", authMiddleware.authorize, readCliente.readCliente);
router.get("/:id", authMiddleware.authorize, viewCliente.viewCliente);

module.exports = router;
