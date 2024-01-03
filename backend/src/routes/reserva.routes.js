
"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de reservas */
const reservaController = require("../controllers/reserva.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para las reservas
router.get("/", reservaController.getReservas);
router.post("/", authorizationMiddleware.isAdmin, reservaController.createReserva);
router.get("/:id", reservaController.getReservaById);
router.put("/:id", authorizationMiddleware.isAdmin, reservaController.updateReserva);
router.delete("/:id", authorizationMiddleware.isAdmin, reservaController.deleteReserva);

// Exporta el enrutador
module.exports = router;
