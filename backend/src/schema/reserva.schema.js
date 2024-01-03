const Joi = require("joi");

// Definir el esquema de validación para la reserva
const reservaBodySchema = Joi.object({
  fichaSocial: Joi.string().required(),
  fechaCita: Joi.date().iso().required(),
  horaCita: Joi.string().required(),
  propositoCita: Joi.string().required(),

  // Puedes agregar validaciones para otros campos aquí si es necesario
});

  /**
 * Esquema de validación para el id de usuario.
 * @constant {Object}
 */
  const reservaIdSchema = Joi.object({
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

module.exports = { reservaBodySchema, reservaIdSchema };
