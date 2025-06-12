const express = require("express");
const router = express.Router();
const ventasController = require("../controllers/ventasController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, ventasController.getAllVentas);
router.post("/", authMiddleware, ventasController.createVenta);

module.exports = router;
