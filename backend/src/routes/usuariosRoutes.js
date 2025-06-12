// routes/usuarioRoutes.js
const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/usuariosController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, UsuarioController.getAllUsuarios);
router.post("/", authMiddleware, UsuarioController.createUsuario);
router.get("/roles", authMiddleware, UsuarioController.getRoles);
router.put("/:id", authMiddleware, UsuarioController.updateUsuario);
router.delete("/:id", authMiddleware, UsuarioController.deleteUsuario);

module.exports = router;
