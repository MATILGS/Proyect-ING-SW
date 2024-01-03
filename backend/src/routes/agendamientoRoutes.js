const express = require("express");
const agendamientoController = require("../controllers/agendamientoController");

const router = express.Router();

// Rutas sin middleware de autenticación
router.post("/agregaragendamiento", agendamientoController.createAgendamiento);
router.get("/obteneragendamiento", agendamientoController.getAllAgendamientos);
router.get("/obtenerdataagendamiento/:id", agendamientoController.getAgendamientoById);
router.put("/actualizaagendamiento/:id", agendamientoController.updateAgendamiento); 
router.delete("/borraragendamiento/:id", agendamientoController.deleteAgendamiento);

module.exports = router;
