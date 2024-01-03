"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de fichaSocials */
const fichaSocialController = require("../controllers/ficha.controller.js");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Define las rutas para los fichaSocials
router.get("/", fichaSocialController.getFichas);
router.post("/", authorizationMiddleware.isAdmin, fichaSocialController.createFicha);
router.get("/:id", fichaSocialController.getFichaById);
router.put(
  "/:id",
  authorizationMiddleware.isAdmin,
  fichaSocialController.updateFicha,
);
router.delete(
  "/:id",
  authorizationMiddleware.isAdmin,
  fichaSocialController.deleteFicha,
);

// Exporta el enrutador
module.exports = router; 

