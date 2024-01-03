const express = require("express");
const postulacionController = require("../controllers/postulacion.controller.js");

const router = express.Router();

// Ruta sin middleware de autenticación
router.post("/agregarpostulacion", postulacionController.createPostulacion);

// Otras rutas sin middleware de autenticación
router.get("/obtenerpostulaciones", postulacionController.getPostulacion);
router.get("/obtenerdatapostulacion/:id", postulacionController.getPostulacionById);
router.post("/actualizapostulacion/:id", postulacionController.updatePostulacion);
router.delete("/borrarpostulacion/:id", postulacionController.deletePostulacion);

module.exports = router;
