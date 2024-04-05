const router = require("express").Router();
const createCarrito = require("../../components/carrito/create");
const deleteCarrito = require("../../components/carrito/delete");
const readCarrito = require("../../components/carrito/read");
const updateCarrito = require("../../components/carrito/update");
const viewCarrito = require("../../components/carrito/view");
router.post("/", createCarrito.createCarrito);
router.put("/:id", updateCarrito.updateCarrito);
router.delete("/:id", deleteCarrito.deleteCarrito);
router.get("/", readCarrito.readCarrito);
router.get("/:id", viewCarrito.viewCarrito);

module.exports = router;
