const request = require('supertest');
const express = require('express');
const usuariosRoutes = require('../../src/routes/usuariosRoutes');
const usuariosController = require('../../src/controllers/usuariosController');

// ✅ Mock the usuarios controller
jest.mock('../../src/controllers/usuariosController', () => ({
  getAllUsuarios: jest.fn(),
  createUsuario: jest.fn(),
  getRoles: jest.fn(),
  updateUsuario: jest.fn(),
  deleteUsuario: jest.fn()
}));

// ✅ Mock the auth middleware to bypass authentication
jest.mock('../../src/middlewares/authMiddleware', () => ({
  authMiddleware: (req, res, next) => next()
}));

describe('User Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/usuarios', usuariosRoutes);
    jest.clearAllMocks();
  });

  describe('GET /api/usuarios', () => {
    it('should get all users successfully', async () => {
      const mockUsers = [
        { id: 1, username: 'user1', role: 'admin' },
        { id: 2, username: 'user2', role: 'user' }
      ];

      usuariosController.getAllUsuarios.mockImplementation((req, res) => {
        res.status(200).json(mockUsers);
      });

      const response = await request(app).get('/api/usuarios');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
      expect(usuariosController.getAllUsuarios).toHaveBeenCalledTimes(1);
    });

    it('should handle error when getting users', async () => {
      usuariosController.getAllUsuarios.mockImplementation((req, res) => {
        res.status(500).json({ error: 'Internal server error' });
      });

      const response = await request(app).get('/api/usuarios');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal server error' });
    });
  });

  describe('POST /api/usuarios', () => {
    it('should create user successfully', async () => {
      const mockUser = { username: 'newuser', password: 'password123', role: 'user' };

      usuariosController.createUsuario.mockImplementation((req, res) => {
        res.status(201).json({ message: 'Usuario creado correctamente' });
      });

      const response = await request(app)
        .post('/api/usuarios')
        .send(mockUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Usuario creado correctamente' });
      expect(usuariosController.createUsuario).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /api/usuarios/roles', () => {
    it('should get all roles successfully', async () => {
      const mockRoles = ['admin', 'user', 'manager'];

      usuariosController.getRoles.mockImplementation((req, res) => {
        res.status(200).json(mockRoles);
      });

      const response = await request(app).get('/api/usuarios/roles');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockRoles);
      expect(usuariosController.getRoles).toHaveBeenCalledTimes(1);
    });
  });

  describe('PUT /api/usuarios/:id', () => {
    it('should update user successfully', async () => {
      const mockUser = { username: 'updateduser', role: 'admin' };

      usuariosController.updateUsuario.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Usuario actualizado correctamente' });
      });

      const response = await request(app)
        .put('/api/usuarios/1')
        .send(mockUser);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Usuario actualizado correctamente' });
      expect(usuariosController.updateUsuario).toHaveBeenCalledTimes(1);
    });
  });

  describe('DELETE /api/usuarios/:id', () => {
    it('should delete user successfully', async () => {
      usuariosController.deleteUsuario.mockImplementation((req, res) => {
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
      });

      const response = await request(app).delete('/api/usuarios/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Usuario eliminado correctamente' });
      expect(usuariosController.deleteUsuario).toHaveBeenCalledTimes(1);
    });
  });
});