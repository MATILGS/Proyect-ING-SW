// Importa el modelo de datos 'Postulacion'
const Postulacion = require("../models/postulacion.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todas las postulaciones de la base de datos
 * @returns {Promise} Promesa con el objeto de las postulaciones
 */
async function getPostulaciones() {
  try {
    const postulaciones = await Postulacion.find().exec();
    return [postulaciones, null];
  } catch (error) {
    handleError(error, "postulacion.service -> getPostulaciones");
  }
}

/**
 * Crea una nueva postulación en la base de datos
 * @param {Object} postulacion Objeto de postulación
 * @returns {Promise} Promesa con el objeto de postulación creada
 */
async function createPostulacion(postulacion) {
  try {
    // Verificar si la postulación ya existe
    const postulacionFound = await Postulacion.findOne({ email: postulacion.email });
    if (postulacionFound) return [null, "La postulación ya existe"];

    const newPostulacion = new Postulacion(postulacion);
    await newPostulacion.save();
    return [newPostulacion, null];
  } catch (error) {
    handleError(error, "postulacion.service -> createPostulacion");
  }
}

/**
 * Obtiene una postulación por su id de la base de datos
 * @param {string} Id de la postulación
 * @returns {Promise} Promesa con el objeto de postulación
 */
async function getPostulacionById(id) {
  try {
    const postulacion = await Postulacion.findById(id).exec();
    if (!postulacion) return [null, "La postulación no existe"];
    return [postulacion, null];
  } catch (error) {
    handleError(error, "postulacion.service -> getPostulacionById");
  }
}

/**
 * Actualiza una postulación por su id en la base de datos
 * @param {string} id Id de la postulación
 * @param {Object} postulacion Objeto de postulación
 * @returns {Promise} Promesa con el objeto de postulación actualizada
 */
async function updatePostulacion(id, postulacion) {
  try {
    const options = { new: true };
    const postulacionUpdated = await Postulacion.findByIdAndUpdate(id, postulacion, options).exec();
    return [postulacionUpdated, null];
  } catch (error) {
    handleError(error, "postulacion.service -> updatePostulacion");
  }
}

/**
 * Elimina una postulación por su id de la base de datos
 * @param {string} Id de la postulación
 * @returns {Promise} Promesa con el objeto de postulación eliminada
 */
async function deletePostulacion(id) {
  try {
    return await Postulacion.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "postulacion.service -> deletePostulacion");
  }
}

module.exports = {
  getPostulaciones,
  createPostulacion,
  getPostulacionById,
  updatePostulacion,
  deletePostulacion,
};
