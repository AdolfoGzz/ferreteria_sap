// routes/iaRoutes.js
const express = require('express');
const router = express.Router();
const iaController = require('../controllers/iaController');
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post('/predict', authMiddleware, iaController.predecirOrdenes);

module.exports = router;