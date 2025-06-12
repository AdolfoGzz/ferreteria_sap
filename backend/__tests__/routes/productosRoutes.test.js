const request = require('supertest');
const express = require('express');
const productosRoutes = require('../../src/routes/productosRoutes');
const productosController = require('../../src/controllers/productosController');

// Mock the productos controller
jest.mock('../../src/controllers/productosController', () => ({
  getAllProductos: jest.fn(),
  createProducto: jest.fn(),
  updateProducto: jest.fn(),
  getCategorias: jest.fn(),
  createCategory: jest.fn()
}));

jest.mock('../../src/middlewares/authMiddleware', () => ({
  authMiddleware: (req, res, next) => next()
}));

describe('Product Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/productos', productosRoutes);
    jest.clearAllMocks();
  });

  describe('GET /api/productos', () => {
    it('should get all products successfully', async () => {
      const mockProducts = [
        { id: 1, nombre: 'Product 1', precio: 100 },
        { id: 2, nombre: 'Product 2', precio: 200 }
      ];

      productosController.getAllProductos.mockImplementation((req, res) => {
        res.status(200).json(mockProducts);
      });

      const response = await request(app).get('/api/productos');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockProducts);
      expect(productosController.getAllProductos).toHaveBeenCalledTimes(1);
    });

    it('should handle error when getting products', async () => {
      productosController.getAllProductos.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Internal server error' });
      });

      const response = await request(app).get('/api/productos');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });

  describe('POST /api/productos', () => {
    it('should create product successfully', async () => {
      const mockProduct = { nombre: 'New Product', precio: 150, categoria: 'Tools' };

      productosController.createProducto.mockImplementation((req, res) => {
        res.status(201).json({ message: 'Producto creado correctamente' });
      });

      const response = await request(app)
        .post('/api/productos')
        .send(mockProduct);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Producto creado correctamente' });
      expect(productosController.createProducto).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /api/productos/:id', () => {
    it('should update product successfully', async () => {
      const mockProduct = { nombre: 'Updated Product', precio: 200 };

      productosController.updateProducto.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Producto actualizado correctamente' });
      });

      const response = await request(app)
        .put('/api/productos/1')
        .send(mockProduct);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Producto actualizado correctamente' });
      expect(productosController.updateProducto).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/productos/categorias', () => {
    it('should get all categories successfully', async () => {
      const mockCategories = ['Tools', 'Hardware', 'Electrical'];

      productosController.getCategorias.mockImplementation((req, res) => {
        res.status(200).json(mockCategories);
      });

      const response = await request(app).get('/api/productos/categorias');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockCategories);
      expect(productosController.getCategorias).toHaveBeenCalledTimes(1);
    });
  });

  describe('POST /api/productos/categorias', () => {
    it('should create category successfully', async () => {
      const mockCategory = { nombre: 'New Category' };

      productosController.createCategory.mockImplementation((req, res) => {
        res.status(201).json({ message: 'Categoría creada correctamente' });
      });

      const response = await request(app)
        .post('/api/productos/categorias')
        .send(mockCategory);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Categoría creada correctamente' });
      expect(productosController.createCategory).toHaveBeenCalledTimes(1);
    });
  });
}); 