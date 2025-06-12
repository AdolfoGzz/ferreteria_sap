const express = require("express");
const router = express.Router();
const inventarioController = require("../controllers/inventarioController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, inventarioController.getAllInventario);
router.get("/with-details", authMiddleware, inventarioController.getAllInventarioWithDetails);
router.post("/", authMiddleware, inventarioController.createInventario);
router.put("/update-cantidad", authMiddleware, inventarioController.updateCantidad);
router.put("/update-ubicacion", authMiddleware, inventarioController.updateUbicacion);
router.put("/update-inventario-producto", authMiddleware, inventarioController.updateInventarioAndProducto);

module.exports = router;
