const request = require('supertest');
const express = require('express');
const ordenesRoutes = require('../../src/routes/ordenesRoutes');
const ordenesController = require('../../src/controllers/ordenesController');

// Mock the ordenes controller
jest.mock('../../src/controllers/ordenesController', () => ({
  getOrdenes: jest.fn(),
  getOrdenesWithDetails: jest.fn(),
  getEstadosDisponibles: jest.fn(),
  getOrdenById: jest.fn(),
  createOrden: jest.fn(),
  updateOrden: jest.fn(),
  updateEstado: jest.fn(),
  deleteOrden: jest.fn()
}));

jest.mock('../../src/middlewares/authMiddleware', () => ({
  authMiddleware: (req, res, next) => next()
}));

describe('Order Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/ordenes', ordenesRoutes);
    jest.clearAllMocks();
  });

  describe('GET /api/ordenes', () => {
    it('should get all orders successfully', async () => {
      const mockOrders = [
        { id: 1, estado: 'Pendiente' },
        { id: 2, estado: 'Completada' }
      ];

      ordenesController.getOrdenes.mockImplementation((req, res) => {
        res.status(200).json(mockOrders);
      });

      const response = await request(app).get('/api/ordenes');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrders);
      expect(ordenesController.getOrdenes).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/ordenes/with-details', () => {
    it('should get all orders with details successfully', async () => {
      const mockOrdersWithDetails = [
        { id: 1, estado: 'Pendiente', detalles: [{ producto: 'Product 1', cantidad: 2 }] },
        { id: 2, estado: 'Completada', detalles: [{ producto: 'Product 2', cantidad: 1 }] }
      ];

      ordenesController.getOrdenesWithDetails.mockImplementation((req, res) => {
        res.status(200).json(mockOrdersWithDetails);
      });

      const response = await request(app).get('/api/ordenes/with-details');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrdersWithDetails);
      expect(ordenesController.getOrdenesWithDetails).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/ordenes/estados', () => {
    it('should get available states successfully', async () => {
      const mockEstados = ['Pendiente', 'En Proceso', 'Completada', 'Cancelada'];

      ordenesController.getEstadosDisponibles.mockImplementation((req, res) => {
        res.status(200).json(mockEstados);
      });

      const response = await request(app).get('/api/ordenes/estados');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockEstados);
      expect(ordenesController.getEstadosDisponibles).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/ordenes/:id', () => {
    it('should get order by id successfully', async () => {
      const mockOrder = { id: 1, estado: 'Pendiente', detalles: [{ producto: 'Product 1', cantidad: 2 }] };

      ordenesController.getOrdenById.mockImplementation((req, res) => {
        res.status(200).json(mockOrder);
      });

      const response = await request(app).get('/api/ordenes/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockOrder);
      expect(ordenesController.getOrdenById).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/ordenes', () => {
    it('should create order successfully', async () => {
      const mockOrder = {
        proveedor_id: 1,
        detalles: [{ producto_id: 1, cantidad: 2 }]
      };

      ordenesController.createOrden.mockImplementation((req, res) => {
        res.status(201).json({ message: 'Orden creada correctamente' });
      });

      const response = await request(app)
        .post('/api/ordenes')
        .send(mockOrder);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Orden creada correctamente' });
      expect(ordenesController.createOrden).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /api/ordenes/:id', () => {
    it('should update order successfully', async () => {
      const mockOrder = {
        proveedor_id: 1,
        detalles: [{ producto_id: 1, cantidad: 3 }]
      };

      ordenesController.updateOrden.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Orden actualizada correctamente' });
      });

      const response = await request(app)
        .put('/api/ordenes/1')
        .send(mockOrder);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Orden actualizada correctamente' });
      expect(ordenesController.updateOrden).toHaveBeenCalledTimes(1);
    });
  });

  describe('PATCH /api/ordenes/:id/estado', () => {
    it('should update order state successfully', async () => {
      const mockUpdate = { estado: 'En Proceso' };

      ordenesController.updateEstado.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Estado actualizado correctamente' });
      });

      const response = await request(app)
        .patch('/api/ordenes/1/estado')
        .send(mockUpdate);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Estado actualizado correctamente' });
      expect(ordenesController.updateEstado).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /api/ordenes/:id', () => {
    it('should delete order successfully', async () => {
      ordenesController.deleteOrden.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Orden eliminada correctamente' });
      });

      const response = await request(app).delete('/api/ordenes/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Orden eliminada correctamente' });
      expect(ordenesController.deleteOrden).toHaveBeenCalledTimes(1);
    });
  });
}); 