const Joi = require('joi');

// Esquema de validación para el cuerpo de la solicitud de agendamiento
const agendamientoBodySchema = Joi.object({
  postulanteId: Joi.string().required().messages({
    "any.required": "El postulante es obligatorio.",
    "string.empty": "El postulante no puede estar vacío.",
  }),
  fechaVisita: Joi.date().required().messages({
    "any.required": "La fecha de visita es obligatoria.",
    "date.base": "La fecha de visita debe ser de tipo fecha.",
  }),
  direccion: Joi.object({
    calle: Joi.string().required().messages({
      "any.required": "La calle es obligatoria.",
      "string.empty": "La calle no puede estar vacía.",
    }),
    numero: Joi.number().required().messages({
      "any.required": "El número es obligatorio.",
      "number.base": "El número debe ser de tipo numérico.",
    }),
    ciudad: Joi.string().required().messages({
      "any.required": "La ciudad es obligatoria.",
      "string.empty": "La ciudad no puede estar vacía.",
    }),
    codigoPostal: Joi.string().required().messages({
      "any.required": "El código postal es obligatorio.",
      "string.empty": "El código postal no puede estar vacío.",
    }),
  }),
  asistenteSocialId: Joi.string().required().messages({
    "any.required": "El asistente social es obligatorio.",
    "string.empty": "El asistente social no puede estar vacío.",
  }),
  notasVisita: Joi.string(),
  documentosRecolectados: Joi.array().items(
    Joi.object({
      nombre: Joi.string(),
      tipo: Joi.string(),
      url: Joi.string(),
    })
  ),
  resultadosVisita: Joi.string(),
  motivoVisita: Joi.string().valid(
    "Evaluación Social",
    "Seguimiento",
    "Asesoramiento",
    "Otro"
  ).required().messages({
    "any.required": "El motivo de visita es obligatorio.",
    "any.only": "El motivo de visita proporcionado no es válido.",
  }),
});

// Esquema de validación para el ID de agendamiento
const agendamientoIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El ID no puede estar vacío.",
      "any.required": "El ID es obligatorio.",
      "string.base": "El ID debe ser de tipo string.",
      "string.pattern.base": "El ID proporcionado no es un ObjectId válido.",
    }),
});

module.exports = { agendamientoBodySchema, agendamientoIdSchema };