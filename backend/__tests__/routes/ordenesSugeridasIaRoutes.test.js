const request = require('supertest');
const express = require('express');
const ordenesSugeridasIaRoutes = require('../../src/routes/ordenesSugeridasIaRoutes');
const ordenesSugeridadIaController = require('../../src/controllers/ordenesSugeridasIaController');

// Mock the ordenesSugeridasIa controller
jest.mock('../../src/controllers/ordenesSugeridasIaController', () => ({
  getAllOrdenes: jest.fn(),
  createOrden: jest.fn()
}));

jest.mock('../../src/middlewares/authMiddleware', () => ({
  authMiddleware: (req, res, next) => next()
}));

describe('AI Order Suggestions Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/ordenes-sugeridas', ordenesSugeridasIaRoutes);
    jest.clearAllMocks();
  });

  describe('GET /api/ordenes-sugeridas', () => {
    it('should get all suggested orders successfully', async () => {
      const mockSuggestedOrders = [
        { id: 1, producto: 'Product 1', cantidad_sugerida: 10 },
        { id: 2, producto: 'Product 2', cantidad_sugerida: 5 }
      ];

      ordenesSugeridadIaController.getAllOrdenes.mockImplementation((req, res) => {
        res.status(200).json(mockSuggestedOrders);
      });

      const response = await request(app).get('/api/ordenes-sugeridas');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSuggestedOrders);
      expect(ordenesSugeridadIaController.getAllOrdenes).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/ordenes-sugeridas', () => {
    it('should create suggested order successfully', async () => {
      const mockSuggestedOrder = {
        producto_id: 1,
        cantidad_sugerida: 10,
        razon: 'Stock bajo'
      };

      ordenesSugeridadIaController.createOrden.mockImplementation((req, res) => {
        res.status(201).json({ message: 'Orden sugerida creada correctamente' });
      });

      const response = await request(app)
        .post('/api/ordenes-sugeridas')
        .send(mockSuggestedOrder);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Orden sugerida creada correctamente' });
      expect(ordenesSugeridadIaController.createOrden).toHaveBeenCalledTimes(1);
    });
  });
}); 