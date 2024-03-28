const router = require("express").Router();
const authMiddleware = require("../../middlewares/tokenValidator");
const missingToken = require("../../middlewares/misingToken");
const createColaborador = require("../../components/colaborador/create");
const deleteColaborador = require("../../components/colaborador/delete");
const readColaborador = require("../../components/colaborador/read");
const updateColaborador = require("../../components/colaborador/update");
const viewColaborador = require("../../components/colaborador/view");
router.post("/", authMiddleware.authorize, createColaborador.createColaborador);
router.put(
  "/:id",
  authMiddleware.authorize,
  updateColaborador.updateColaborador
);
router.delete(
  "/:id",
  authMiddleware.authorize,
  deleteColaborador.deleteColaborador
);
router.get("/", authMiddleware.authorize, readColaborador.readColaborador);
router.get("/:id", authMiddleware.authorize, viewColaborador.viewColaborador);

module.exports = router;
