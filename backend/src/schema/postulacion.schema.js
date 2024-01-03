const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de postulación.
 */
const postulacionBodySchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "any.required": "El nombre es obligatorio.",
    "string.base": "El nombre debe ser de tipo string.",
  }),
  fechaNacimiento: Joi.date().required().messages({
    "date.empty": "La fecha de nacimiento no puede estar vacía.",
    "any.required": "La fecha de nacimiento es obligatoria.",
    "date.base": "La fecha de nacimiento debe ser de tipo fecha.",
  }),
  genero: Joi.string().valid("Masculino", "Femenino").required().messages({
    "string.empty": "El género no puede estar vacío.",
    "any.required": "El género es obligatorio.",
    "string.base": "El género debe ser de tipo string.",
    "any.only": "El género proporcionado no es válido.",
  }),
  telefono: Joi.string().allow("").required().messages({
    "string.base": "El telefono debe ser de tipo string.",
    "any.required": "El telefono es obligatorio.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "El email no puede estar vacío.",
    "any.required": "El email es obligatorio.",
    "string.base": "El email debe ser de tipo string.",
    "string.email": "El email debe tener un formato válido.",
  }),
  direccion: Joi.string().allow("").required().messages({
    "string.base": "La direccion debe ser de tipo string.",
    "any.required": "La direccion es obligatoria.",
  }),
  documentos: Joi.string().allow("").required().messages({
    "array.base": "Los documentos deben ser de tipo array.",
    "array.includes": "Los documentos deben ser de tipo string.",
    "any.required": "Los documentos son obligatorios.",
  }),
  
  beneficioSolicitado: Joi.string().required().messages({
    "string.empty": "El beneficio solicitado no puede estar vacío.",
    "any.required": "El beneficio solicitado es obligatorio.",
    "string.base": "El beneficio solicitado debe ser de tipo string.",
  }),
  estadoPostulacion: Joi.string().valid("Pendiente", 
  "Aprobada", "Rechazada").default("Pendiente").required().messages({
    "string.empty": "El estado de postulacinn no puede estar vacío.",
    "string.base": "El estado de postulacinn debe ser de tipo string.",
    "any.only": "El estado proporcionado no es valido.",
    "any.required": "El estado de postulacion solicitado es obligatorio.",
  }),
  motivoRechazo: Joi.string().allow("").required().messages({
    "string.base": "El motivo de rechazo debe ser de tipo string.",
    "any.required": "El motivo de rechazo es obligatorio.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de postulación.
 */
const postulacionIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

module.exports = { postulacionBodySchema, postulacionIdSchema };
