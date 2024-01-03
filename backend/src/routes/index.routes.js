"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");
/** Enrutador de fichas sociales  */
const fichasRoutes = require("./ficha.routes.js");
/** Enrutador de reservas */
const reservaRoutes = require("./reserva.routes.js");
/** Enrutador de postulaciones */
const postulacionRoutes = require("./postulacion.routes.js");
/** Enrutador de agendamientos */
const agendamientosRoutes= require("./agendamientoRoutes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);
// Define las rutas para la autenticación /api/fichasSociales
router.use("/fichas", fichasRoutes);
// Define las rutas para los agendamientos
router.use("/agendamiento", agendamientosRoutes);
// Define las rutas para las reservas
router.use("/reservas", reservaRoutes);
// Define las rutas para las postulaciones
router.use("/postulacion", postulacionRoutes);

// Exporta el enrutador
module.exports = router;
