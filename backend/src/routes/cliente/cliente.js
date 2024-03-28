const router = require("express").Router();
const authMiddleware = require("../../middlewares/tokenValidator");
const missingToken = require("../../middlewares/misingToken");
const createCliente = require("../../components/cliente/create");
const deleteCliente = require("../../components/cliente/delete");
const readCliente = require("../../components/cliente/read");
const updateCliente = require("../../components/cliente/update");
const viewCliente = require("../../components/cliente/view");
router.post("/", createCliente.createCliente);
router.put("/:id", updateCliente.updateCliente);
router.delete("/:id", deleteCliente.deleteCliente);
router.get("/", readCliente.readCliente);
router.get("/:id", viewCliente.viewCliente);

module.exports = router;
