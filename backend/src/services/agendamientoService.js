'use strict';

// Importa el modelo de datos de Agendamiento
const Agendamiento = require('../models/agendamiento');
const { handleError } = require('../utils/errorHandler');

// Obtiene todos los agendamientos
async function getAgendamientos() {
  try {
    const agendamientos = await Agendamiento.find();
    if (!agendamientos) return [null, 'No hay agendamientos'];

    return [agendamientos, null];
  } catch (error) {
    handleError(error, 'agendamiento.service -> getAgendamientos');
  }
}

// Crea un nuevo agendamiento
async function createAgendamiento(agendamiento) {
  try {
    const nuevoAgendamiento = new Agendamiento(agendamiento);
    await nuevoAgendamiento.save();

    return [nuevoAgendamiento, null];
  } catch (error) {
    handleError(error, 'agendamiento.service -> createAgendamiento');
  }
}

// Obtiene un agendamiento por su ID
async function getAgendamientoById(id) {
  try {
    const agendamiento = await Agendamiento.findById(id);
    if (!agendamiento) return [null, 'El agendamiento no existe'];

    return [agendamiento, null];
  } catch (error) {
    handleError(error, 'agendamiento.service -> getAgendamientoById');
  }
}

// Actualiza un agendamiento por su ID
async function updateAgendamiento(id, agendamiento) {
  try {
    const agendamientoActualizado = await Agendamiento.findByIdAndUpdate(id, agendamiento, {
      new: true,
    });

    if (!agendamientoActualizado) return [null, 'El agendamiento no existe'];

    return [agendamientoActualizado, null];
  } catch (error) {
    handleError(error, 'agendamiento.service -> updateAgendamiento');
  }
}

// Borra un agendamiento por su ID
async function deleteAgendamiento(id) {
  try {
    const agendamientoBorrado = await Agendamiento.findByIdAndRemove(id);

    if (!agendamientoBorrado) return [null, 'El agendamiento no existe'];

    return [agendamientoBorrado, null];
  } catch (error) {
    handleError(error, 'agendamiento.service -> deleteAgendamiento');
  }
}

module.exports = {
  getAgendamientos,
  createAgendamiento,
  getAgendamientoById,
  updateAgendamiento,
  deleteAgendamiento,
};