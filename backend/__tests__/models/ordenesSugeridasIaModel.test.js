// __tests__/models/ordenesSugeridasIaModel.test.js

jest.mock('../../src/config/db', () => ({
  exec: jest.fn(),
  prepare: jest.fn()
}));

const db = require('../../src/config/db');
const ordenesSugeridasIaModel = require('../../src/models/ordenesSugeridasIaModel');

describe('ordenesSugeridasIaModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('debería devolver todas las órdenes sugeridas por IA', async () => {
      const mockResult = [{ id: 1 }, { id: 2 }];
      db.exec.mockImplementation((query, cb) => cb(null, mockResult));

      const result = await ordenesSugeridasIaModel.getAll();

      expect(db.exec).toHaveBeenCalledWith("SELECT * FROM Ordenes_sugeridas_ia", expect.any(Function));
      expect(result).toEqual(mockResult);
    });

    it('debería rechazar en caso de error', async () => {
      const error = new Error('DB error');
      db.exec.mockImplementation((query, cb) => cb(error));

      await expect(ordenesSugeridasIaModel.getAll()).rejects.toThrow('DB error');
    });
  });

  describe('create', () => {
    it('debería insertar una nueva orden sugerida por IA correctamente', async () => {
      const execMock = jest.fn((params, cb) => cb(null, { insertId: 123 }));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      const newOrden = {
        producto_id: 10,
        cantidad_sugerida: 5,
        razon: "Stock bajo",
        estado_id: 1,
        proveedor_id: 2
      };

      const result = await ordenesSugeridasIaModel.create(newOrden);

      expect(db.prepare).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO Ordenes_sugeridas_ia"), expect.any(Function));
      expect(execMock).toHaveBeenCalledWith(
        [newOrden.producto_id, newOrden.cantidad_sugerida, newOrden.razon, newOrden.estado_id, newOrden.proveedor_id],
        expect.any(Function)
      );
      expect(result).toEqual({ insertId: 123 });
    });

    it('debería rechazar en caso de error en prepare', async () => {
      const error = new Error('Prepare error');
      db.prepare.mockImplementation((query, cb) => cb(error));

      await expect(ordenesSugeridasIaModel.create({})).rejects.toThrow('Prepare error');
    });

    it('debería rechazar en caso de error en exec', async () => {
      const error = new Error('Exec error');
      const execMock = jest.fn((params, cb) => cb(error));
      const statementMock = { exec: execMock };
      db.prepare.mockImplementation((query, cb) => cb(null, statementMock));

      await expect(ordenesSugeridasIaModel.create({
        producto_id: 1,
        cantidad_sugerida: 2,
        razon: "Razón",
        estado_id: 1,
        proveedor_id: 1
      })).rejects.toThrow('Exec error');
    });
  });
});