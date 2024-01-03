"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const fichaService = require("../services/ficha.service.js");
const { fichaBodySchema, fichaIdSchema } = require("../schema/ficha.schema.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todas las fichas sociales
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getFichas(req, res) {
  try {
    const [fichaSocial, errorFichaSocial] = await fichaService.getFichas();
    if (errorFichaSocial) return respondError(req, res, 404, errorFichaSocial);

    fichaSocial.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, fichaSocial);
  } catch (error) {
    handleError(error, "ficha.controller -> getFichas");
    respondError(req, res, 400, error.message);
  }
}

/**
 * Crea una nueva ficha social
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createFicha(req, res) {
  try {
    const { body } = req;
    const { error: bodyError } = fichaBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [newFicha, fichaError] = await fichaService.createFicha(body);

    if (fichaError) return respondError(req, res, 400, fichaError);
    if (!newFicha) {
      return respondError(req, res, 400, "No se creo la ficha social");
    }

    respondSuccess(req, res, 201, newFicha);
  } catch (error) {
    handleError(error, "ficha.controller -> createFicha");
    respondError(req, res, 500, "No se creo la ficha social");
  }
}

/**
 * Obtiene un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getFichaById(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = fichaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const [ficha, errorFicha] = await fichaService.getFichaById(params.id);

    if (errorFicha) return respondError(req, res, 404, errorFicha);

    respondSuccess(req, res, 200, ficha);
  } catch (error) {
    handleError(error, "ficha.controller -> getFichaById");
    respondError(req, res, 500, "No se pudo obtener la ficha social");
  }
}

/**
 * Actualiza un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateFicha(req, res) {
  try {
    const { params, body } = req;
    const { error: paramsError } = fichaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const { error: bodyError } = fichaBodySchema.validate(body);
    if (bodyError) return respondError(req, res, 400, bodyError.message);

    const [ficha, fichaError] = await fichaService.updateFicha(params.id, body);

    if (fichaError) return respondError(req, res, 400, fichaError);

    respondSuccess(req, res, 200, ficha);
  } catch (error) {
    handleError(error, "ficha.controller -> updateFicha");
    respondError(req, res, 500, "No se pudo actualizar la ficha social");
  }
}

/**
 * Elimina una ficha social por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteFicha(req, res) {
  try {
    const { params } = req;
    const { error: paramsError } = fichaIdSchema.validate(params);
    if (paramsError) return respondError(req, res, 400, paramsError.message);

    const ficha = await fichaService.deleteFicha(params.id);
    !ficha
      ? respondError(
          req,
          res,
          404,
          "No se encontro la ficha social solicitada",
          "Verifique el id ingresado",
        )
      : respondSuccess(req, res, 200, ficha);
  } catch (error) {
    handleError(error, "ficha.controller -> deleteFicha");
    respondError(req, res, 500, "No se pudo eliminar la ficha social");
  }
}

module.exports = {
  getFichas,
  createFicha,
  getFichaById,
  updateFicha,
  deleteFicha,
};
