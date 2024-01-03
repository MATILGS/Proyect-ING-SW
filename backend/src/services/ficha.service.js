"use strict";
// Importa el modelo de datos 'Ficha'
const Ficha = require("../models/ficha.model.js");
// const Role = require("../models/role.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los usuarios de la base de datos
 * @returns {Promise} Promesa con el objeto de los usuarios
 */
async function getFichas() {
  try {
    const fichas = await Ficha.find()
      .select("-rut")
      .populate("nombre")
      .exec();
    if (!fichas) return [null, "No hay fichas sociales"];

    return [fichas, null];
  } catch (error) {
    handleError(error, "ficha.service -> getFichas");
  }
}

/**
 * Crea un nuevo usuario en la base de datos
 * @param {Object} ficha Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
async function createFicha(ficha) {
  try {
    const { 
        nombre, 
        rut, 
        fechaNacimiento, 
        genero, 
        direccion, 
        telefono, 
        correoElectronico, 
        estadoCivil, 
        conyuge, 
        hijos, 
        ingresos, 
        gastos, 
        empleo, 
        historialMedico, 
        situacionFamiliar, 
        historialEducacion, 
        necesidades, 
        observaciones, 
      } = ficha;

    const fichaFound = await Ficha.findOne({ rut: ficha.rut });
    if (fichaFound) return [null, "La ficha social ya existe"];

    const newFicha = new Ficha({
        nombre,
        rut,
        fechaNacimiento,
        genero,
        direccion,
        telefono,
        correoElectronico,
        estadoCivil,
        conyuge,
        hijos,
        ingresos,
        gastos,
        empleo,
        historialMedico,
        situacionFamiliar,
        historialEducacion,
        necesidades,
        observaciones,
      });
    await newFicha.save();

    return [newFicha, null];
  } catch (error) {
    handleError(error, "ficha.service -> createficha");
  }
}

/**
 * Obtiene una ficha social por su id de la base de datos
 * @param {string} Id de la ficha social
 * @returns {Promise} Promesa con el objeto de fihca social
 */
async function getFichaById(id) {
  try {
    const ficha = await Ficha.findById({ _id: id })
      .select("-rut")
      .populate("nombre")
      .exec();

    if (!ficha) return [null, "La ficha social no existe"];

    return [ficha, null];
  } catch (error) {
    handleError(error, "ficha.service -> getFichaById");
  }
}

/**
 * Actualiza una ficha social por su id en la base de datos
 * @param {string} id Id del la ficha social
 * @param {Object} ficha Objeto de ficha social
 * @returns {Promise} Promesa con el objeto de ficha social actualizada
 */
async function updateFicha(id, ficha) {
  try {
    const fichaFound = await Ficha.findById(id);
    if (!fichaFound) return [null, "la ficha social no existe"];

    const { 
        nombre,
        rut,
        fechaNacimiento,
        genero,
        direccion,
        telefono,
        correoElectronico,
        estadoCivil,
        conyuge,
        hijos,
        ingresos,
        gastos,
        empleo,
        historialMedico,
        situacionFamiliar,
        historialEducacion,
        necesidades,
        observaciones,
     } = ficha;

/**    const matchPassword = await Ficha.comparePassword(
      password,
      fichaFound.password,
    );

    if (!matchPassword) {
      return [null, "La contraseña no coincide"];
    } */

    const fichaUpdated = await Ficha.findByIdAndUpdate(
      id,
      {
        nombre,
        rut,
        fechaNacimiento,
        genero,
        direccion,
        telefono,
        correoElectronico,
        estadoCivil,
        conyuge,
        hijos,
        ingresos,
        gastos,
        empleo,
        historialMedico,
        situacionFamiliar,
        historialEducacion,
        necesidades,
        observaciones,
      },
      { new: true },
    );

    return [fichaUpdated, null];
  } catch (error) {
    handleError(error, "ficha.service -> updateficha");
  }
}

/**
 * Elimina una ficha social por su id de la base de datos
 * @param {string} Id de la ficha social
 * @returns {Promise} Promesa con el objeto de ficha social eliminada
 */
async function deleteFicha(id) {
  try {
    return await Ficha.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "ficha.service -> deleteFicha");
  }
}

module.exports = {
  getFichas,
  createFicha,
  getFichaById,
  updateFicha,
  deleteFicha,
};
