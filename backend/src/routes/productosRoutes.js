const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productosController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, productosController.getAllProductos);
router.post("/", authMiddleware, productosController.createProducto);
router.put("/:id", authMiddleware, productosController.updateProducto);
router.get("/categorias", authMiddleware, productosController.getCategorias);
router.post("/categorias", authMiddleware, productosController.createCategory);

module.exports = router;
