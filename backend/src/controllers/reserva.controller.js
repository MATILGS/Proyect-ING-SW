"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const ReservaService = require("../services/reserva.service");
const { reservaBodySchema, reservaIdSchema } = require("../schema/reserva.schema");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todas las reservas
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getReservas(req, res) {
  try {
    const [reservas, errorReservas] = await ReservaService.getReservas();
    if (errorReservas) return respondError(req, res, 404, errorReservas);

    reservas.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, reservas);
  } catch (error) {
    handleError(error, "reserva.controller -> getReservas");
    respondError(req, res, 500, "No se pudieron obtener las reservas");
  }
}

/**
 * Crea una nueva reserva
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createReserva(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = reservaBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newReserva, reservaError] = await ReservaService.createReserva(body);

    if (reservaError) return respondError(req, res, 400, reservaError);
    if (!newReserva) {
      return respondError(req, res, 400, "No se creó la reserva");
    }

    respondSuccess(req, res, 201, newReserva);
  } catch (error) {
    handleError(error, "reserva.controller -> createReserva");
    respondError(req, res, 500, "No se creó la reserva");
  }
}

/**
 * Obtiene una reserva por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getReservaById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = reservaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [reserva, errorReserva] = await ReservaService.getReservaById(params.id);

    if (errorReserva) return respondError(req, res, 404, errorReserva);

    respondSuccess(req, res, 200, reserva);
  } catch (error) {
    handleError(error, "reserva.controller -> getReservaById");
    respondError(req, res, 500, "No se pudo obtener la reserva");
  }
}

/**
 * Actualiza una reserva por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateReserva(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = reservaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = reservaBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [reserva, reservaError] = await ReservaService.updateReserva(params.id, body);

    if (reservaError) return respondError(req, res, 400, reservaError);

    respondSuccess(req, res, 200, reserva);
  } catch (error) {
    handleError(error, "reserva.controller -> updateReserva");
    respondError(req, res, 500, "No se pudo actualizar la reserva");
  }
}

/**
 * Elimina una reserva por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteReserva(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = reservaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const reserva = await ReservaService.deleteReserva(params.id);
    !reserva
      ? respondError(
          req,
          res,
          404,
          "No se encontró la reserva solicitada",
          "Verifique el id ingresado",
        )
      : respondSuccess(req, res, 200, reserva);
  } catch (error) {
    handleError(error, "reserva.controller -> deleteReserva");
    respondError(req, res, 500, "No se pudo eliminar la reserva");
  }
}

module.exports = {
  getReservas,
  createReserva,
  getReservaById,
  updateReserva,
  deleteReserva,
};
