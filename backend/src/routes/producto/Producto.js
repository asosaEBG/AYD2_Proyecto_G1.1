const router = require("express").Router();
const authMiddleware = require("../../middlewares/tokenValidator");
const createProducto = require("../../components/producto/create");
const deleteProducto = require("../../components/producto/delete");
const readProducto = require("../../components/producto/read");
const updateProducto = require("../../components/producto/update");
const viewProducto = require("../../components/producto/view");
router.post("/", authMiddleware.authorize, createProducto.createProducto);
router.put("/:id", authMiddleware.authorize, updateProducto.updateProducto);
router.delete("/:id", authMiddleware.authorize, deleteProducto.deleteProducto);
router.get("/", authMiddleware.authorize, readProducto.readProducto);
router.get("/:id", authMiddleware.authorize, viewProducto.viewProducto);

module.exports = router;
