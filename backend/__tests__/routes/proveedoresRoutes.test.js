const request = require('supertest');
const express = require('express');
const proveedoresRoutes = require('../../src/routes/proveedoresRoutes');
const proveedoresController = require('../../src/controllers/proveedoresController');

// ✅ Mock the proveedores controller
jest.mock('../../src/controllers/proveedoresController', () => ({
  getAllProveedores: jest.fn(),
  getProveedorById: jest.fn(),
  createProveedor: jest.fn(),
  updateProveedor: jest.fn(),
  deleteProveedor: jest.fn()
}));

// ✅ Mock auth middleware to bypass JWT verification during testing
jest.mock('../../src/middlewares/authMiddleware', () => ({
  authMiddleware: (req, res, next) => next()
}));

describe('Supplier Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/proveedores', proveedoresRoutes);
    jest.clearAllMocks();
  });

  describe('GET /api/proveedores', () => {
    it('should get all suppliers successfully', async () => {
      const mockSuppliers = [
        { id: 1, nombre: 'Supplier 1', contacto: 'contact1@example.com' },
        { id: 2, nombre: 'Supplier 2', contacto: 'contact2@example.com' }
      ];

      proveedoresController.getAllProveedores.mockImplementation((req, res) => {
        res.status(200).json(mockSuppliers);
      });

      const response = await request(app).get('/api/proveedores');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSuppliers);
      expect(proveedoresController.getAllProveedores).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/proveedores/:id', () => {
    it('should get supplier by id successfully', async () => {
      const mockSupplier = { id: 1, nombre: 'Supplier 1', contacto: 'contact1@example.com' };

      proveedoresController.getProveedorById.mockImplementation((req, res) => {
        res.status(200).json(mockSupplier);
      });

      const response = await request(app).get('/api/proveedores/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSupplier);
      expect(proveedoresController.getProveedorById).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/proveedores', () => {
    it('should create supplier successfully', async () => {
      const mockSupplier = { nombre: 'New Supplier', contacto: 'new@example.com' };

      proveedoresController.createProveedor.mockImplementation((req, res) => {
        res.status(201).json({ message: 'Proveedor creado correctamente' });
      });

      const response = await request(app)
        .post('/api/proveedores')
        .send(mockSupplier);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Proveedor creado correctamente' });
      expect(proveedoresController.createProveedor).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /api/proveedores/:id', () => {
    it('should update supplier successfully', async () => {
      const mockSupplier = { nombre: 'Updated Supplier', contacto: 'updated@example.com' };

      proveedoresController.updateProveedor.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Proveedor actualizado correctamente' });
      });

      const response = await request(app)
        .put('/api/proveedores/1')
        .send(mockSupplier);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Proveedor actualizado correctamente' });
      expect(proveedoresController.updateProveedor).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /api/proveedores/:id', () => {
    it('should delete supplier successfully', async () => {
      proveedoresController.deleteProveedor.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Proveedor eliminado correctamente' });
      });

      const response = await request(app).delete('/api/proveedores/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Proveedor eliminado correctamente' });
      expect(proveedoresController.deleteProveedor).toHaveBeenCalledTimes(1);
    });
  });
});