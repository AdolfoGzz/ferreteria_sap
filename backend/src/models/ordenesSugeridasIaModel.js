const db = require("../config/db");

const ordenesSugeridadIaModel = {
  getAll: async () => {
    return new Promise((resolve, reject) => {
      db.exec("SELECT * FROM Ordenes_sugeridas_ia", (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  create: async ({
    producto_id,
    cantidad_sugerida,
    razon,
    estado_id,
    proveedor_id,
  }) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Ordenes_sugeridas_ia
        (producto_id, cantidad_sugerida, razon, estado_id, proveedor_id, creada_en)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `;
      db.prepare(query, (err, statement) => {
        if (err) return reject(err);
        statement.exec(
          [producto_id, cantidad_sugerida, razon, estado_id, proveedor_id],
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          },
        );
      });
    });
  },
};

module.exports = ordenesSugeridadIaModel;
