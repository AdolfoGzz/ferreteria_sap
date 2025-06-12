const request = require('supertest');
const express = require('express');
const inventarioRoutes = require('../../src/routes/inventarioRoutes');
const inventarioController = require('../../src/controllers/inventarioController');

// Mock the inventario controller
jest.mock('../../src/controllers/inventarioController', () => ({
  getAllInventario: jest.fn(),
  getAllInventarioWithDetails: jest.fn(),
  createInventario: jest.fn(),
  updateCantidad: jest.fn(),
  updateUbicacion: jest.fn(),
  updateInventarioAndProducto: jest.fn()
}));

jest.mock('../../src/middlewares/authMiddleware', () => ({
  authMiddleware: (req, res, next) => next()
}));

describe('Inventory Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/inventario', inventarioRoutes);
    jest.clearAllMocks();
  });

  describe('GET /api/inventario', () => {
    it('should get all inventory successfully', async () => {
      const mockInventory = [
        { id: 1, producto_id: 1, cantidad: 100 },
        { id: 2, producto_id: 2, cantidad: 200 }
      ];

      inventarioController.getAllInventario.mockImplementation((req, res) => {
        res.status(200).json(mockInventory);
      });

      const response = await request(app).get('/api/inventario');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockInventory);
      expect(inventarioController.getAllInventario).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/inventario/with-details', () => {
    it('should get all inventory with details successfully', async () => {
      const mockInventoryWithDetails = [
        { id: 1, producto: { nombre: 'Product 1' }, cantidad: 100 },
        { id: 2, producto: { nombre: 'Product 2' }, cantidad: 200 }
      ];

      inventarioController.getAllInventarioWithDetails.mockImplementation((req, res) => {
        res.status(200).json(mockInventoryWithDetails);
      });

      const response = await request(app).get('/api/inventario/with-details');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockInventoryWithDetails);
      expect(inventarioController.getAllInventarioWithDetails).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/inventario', () => {
    it('should create inventory successfully', async () => {
      const mockInventory = { producto_id: 1, cantidad: 100, ubicacion: 'A1' };

      inventarioController.createInventario.mockImplementation((req, res) => {
        res.status(201).json({ message: 'Inventario creado correctamente' });
      });

      const response = await request(app)
        .post('/api/inventario')
        .send(mockInventory);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Inventario creado correctamente' });
      expect(inventarioController.createInventario).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /api/inventario/update-cantidad', () => {
    it('should update inventory quantity successfully', async () => {
      const mockUpdate = { id: 1, cantidad: 150 };

      inventarioController.updateCantidad.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Cantidad actualizada correctamente' });
      });

      const response = await request(app)
        .put('/api/inventario/update-cantidad')
        .send(mockUpdate);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Cantidad actualizada correctamente' });
      expect(inventarioController.updateCantidad).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /api/inventario/update-ubicacion', () => {
    it('should update inventory location successfully', async () => {
      const mockUpdate = { id: 1, ubicacion: 'B2' };

      inventarioController.updateUbicacion.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Ubicación actualizada correctamente' });
      });

      const response = await request(app)
        .put('/api/inventario/update-ubicacion')
        .send(mockUpdate);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Ubicación actualizada correctamente' });
      expect(inventarioController.updateUbicacion).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /api/inventario/update-inventario-producto', () => {
    it('should update inventory and product successfully', async () => {
      const mockUpdate = { 
        inventario_id: 1,
        producto_id: 1,
        cantidad: 150,
        ubicacion: 'B2'
      };

      inventarioController.updateInventarioAndProducto.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Inventario y producto actualizados correctamente' });
      });

      const response = await request(app)
        .put('/api/inventario/update-inventario-producto')
        .send(mockUpdate);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Inventario y producto actualizados correctamente' });
      expect(inventarioController.updateInventarioAndProducto).toHaveBeenCalledTimes(1);
    });
  });
}); 