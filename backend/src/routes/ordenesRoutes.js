const express = require('express');
const router = express.Router();
const ordenesController = require('../controllers/ordenesController');
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get('/', authMiddleware, ordenesController.getOrdenes);
router.get('/with-details', authMiddleware, ordenesController.getOrdenesWithDetails);
router.get('/estados', authMiddleware, ordenesController.getEstadosDisponibles)
router.get('/:id', authMiddleware, ordenesController.getOrdenById);
router.post('/', authMiddleware, ordenesController.createOrden);
router.put('/:id', authMiddleware, ordenesController.updateOrden);
router.patch('/:id/estado', authMiddleware, ordenesController.updateEstado); // Cambiar estado
router.delete('/:id', authMiddleware, ordenesController.deleteOrden);

module.exports = router;