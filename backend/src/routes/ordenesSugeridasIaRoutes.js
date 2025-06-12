const express = require("express");
const router = express.Router();
const ordenesSugeridadIaController = require("../controllers/ordenesSugeridasIaController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, ordenesSugeridadIaController.getAllOrdenes);
router.post("/", authMiddleware, ordenesSugeridadIaController.createOrden);

module.exports = router;
