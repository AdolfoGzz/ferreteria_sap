const express = require("express");
const router = express.Router();
const ProveedorController = require("../controllers/proveedoresController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, ProveedorController.getAllProveedores);
router.get("/:id", authMiddleware, ProveedorController.getProveedorById);
router.post("/", authMiddleware, ProveedorController.createProveedor);
router.put("/:id", authMiddleware, ProveedorController.updateProveedor);
router.delete("/:id", authMiddleware, ProveedorController.deleteProveedor);

module.exports = router;