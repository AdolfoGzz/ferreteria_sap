const request = require('supertest');
const express = require('express');
const ventasRoutes = require('../../src/routes/ventasRoutes');
const ventasController = require('../../src/controllers/ventasController');

// ✅ Mock the ventas controller
jest.mock('../../src/controllers/ventasController', () => ({
  getAllVentas: jest.fn(),
  createVenta: jest.fn()
}));

// ✅ Mock the auth middleware to bypass authentication
jest.mock('../../src/middlewares/authMiddleware', () => ({
  authMiddleware: (req, res, next) => next()
}));

describe('Sales Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/ventas', ventasRoutes);
    jest.clearAllMocks();
  });

  describe('GET /api/ventas', () => {
    it('should get all sales successfully', async () => {
      const mockSales = [
        { id: 1, fecha: '2024-03-20', total: 150.00 },
        { id: 2, fecha: '2024-03-21', total: 200.00 }
      ];

      ventasController.getAllVentas.mockImplementation((req, res) => {
        res.status(200).json(mockSales);
      });

      const response = await request(app).get('/api/ventas');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSales);
      expect(ventasController.getAllVentas).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/ventas', () => {
    it('should create sale successfully', async () => {
      const mockSale = {
        cliente_id: 1,
        productos: [
          { producto_id: 1, cantidad: 2, precio: 50.00 },
          { producto_id: 2, cantidad: 1, precio: 50.00 }
        ]
      };

      ventasController.createVenta.mockImplementation((req, res) => {
        res.status(201).json({ message: 'Venta creada correctamente' });
      });

      const response = await request(app)
        .post('/api/ventas')
        .send(mockSale);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Venta creada correctamente' });
      expect(ventasController.createVenta).toHaveBeenCalledTimes(1);
    });
  });
});