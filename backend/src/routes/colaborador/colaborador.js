const router = require("express").Router();
const authMiddleware = require("../../middlewares/tokenValidator");
const missingToken = require("../../middlewares/misingToken");
const createColaborador = require("../../components/colaborador/create");
const deleteColaborador = require("../../components/colaborador/delete");
const readColaborador = require("../../components/colaborador/read");
const updateColaborador = require("../../components/colaborador/update");
const viewColaborador = require("../../components/colaborador/view");
router.post("/", createColaborador.createColaborador);
router.put("/:id", updateColaborador.updateColaborador);
router.delete("/:id", deleteColaborador.deleteColaborador);
router.get("/", readColaborador.readColaborador);
router.get("/:id", viewColaborador.viewColaborador);

module.exports = router;
