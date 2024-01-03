
"use strict";
// Importa el modelo de datos 'Reserva'
const Reserva = require("../models/reserva.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todas las reservas de la base de datos
 * @returns {Promise} Promesa con el objeto de las reservas
 */
async function getReservas() {
  try {
    const reservas = await Reserva.find().exec();
    if (!reservas) return [null, "No hay reservas"];

    return [reservas, null];
  } catch (error) {
    handleError(error, "reserva.service -> getReservas");
  }
}

/**
 * Crea una nueva reserva en la base de datos
 * @param {Object} reserva Objeto de reserva
 * @returns {Promise} Promesa con el objeto de reserva creado
 */
async function createReserva(reserva) {
  try {
    const { fichaSocial, fechaCita, horaCita, propositoCita } = reserva;

    const newReserva = new Reserva({
      fichaSocial,
      fechaCita,
      horaCita,
      propositoCita,
    });

    await newReserva.save();

    return [newReserva, null];
  } catch (error) {
    handleError(error, "reserva.service -> createReserva");
  }
}

/**
 * Obtiene una reserva por su id de la base de datos
 * @param {string} Id de la reserva
 * @returns {Promise} Promesa con el objeto de reserva
 */
async function getReservaById(id) {
  try {
    const reserva = await Reserva.findById({ _id: id }).exec();

    if (!reserva) return [null, "La reserva no existe"];

    return [reserva, null];
  } catch (error) {
    handleError(error, "reserva.service -> getReservaById");
  }
}

/**
 * Actualiza una reserva por su id en la base de datos
 * @param {string} id Id de la reserva
 * @param {Object} reserva Objeto de reserva
 * @returns {Promise} Promesa con el objeto de reserva actualizado
 */
async function updateReserva(id, reserva) {
  try {
    const reservaFound = await Reserva.findById(id);
    if (!reservaFound) return [null, "La reserva no existe"];

    const { fichaSocial, fechaCita, horaCita, propositoCita } = reserva;

    const reservaUpdated = await Reserva.findByIdAndUpdate(
      id,
      {
        fichaSocial,
        fechaCita,
        horaCita,
        propositoCita,
      },
      { new: true },
    );

    return [reservaUpdated, null];
  } catch (error) {
    handleError(error, "reserva.service -> updateReserva");
  }
}

/**
 * Elimina una reserva por su id de la base de datos
 * @param {string} Id de la reserva
 * @returns {Promise} Promesa con el objeto de reserva eliminado
 */
async function deleteReserva(id) {
  try {
    return await Reserva.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "reserva.service -> deleteReserva");
  }
}

module.exports = {
  getReservas,
  createReserva,
  getReservaById,
  updateReserva,
  deleteReserva,
};
