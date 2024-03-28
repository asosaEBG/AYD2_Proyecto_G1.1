const router = require("express").Router();
const authMiddleware = require("../../middlewares/tokenValidator");
const missingToken = require("../../middlewares/misingToken");
const createAdmin = require("../../components/admin/create");
const deleteAdmin = require("../../components/admin/delete");
const readAdmin = require("../../components/admin/read");
const updateAdmin = require("../../components/admin/update");
const viewAdmin = require("../../components/admin/view");
router.post("/", createAdmin.createAdmin);
router.put("/:id", updateAdmin.updateAdmin);
router.delete("/:id", deleteAdmin.deleteAdmin);
router.get("/", readAdmin.readAdmin);
router.get("/:id", viewAdmin.viewAdmin);

module.exports = router;
