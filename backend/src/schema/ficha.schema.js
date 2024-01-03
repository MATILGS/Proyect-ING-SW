"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de la ficha social.
 * @constant {Object}
 */
const fichaBodySchema = Joi.object({
    nombre: Joi.string().required().messages({
      "any.required": "El nombre es obligatorio.",
      "string.empty": "El nombre no puede estar vacío.",
      "string.base": "El nombre debe ser de tipo string.",
    }),
    rut: Joi.string().required().min(9).max(9).messages({
      "any.required": "El RUT es obligatorio.",
      "number.empty": "El RUT no puede estar vacío.",
      "number.base": "El RUT debe ser de tipo numérico.",
      "number.min": "El RUT debe der se al menos 9 numeros.",
      "number.max": "El RUT debe der se a lo mas 9 numeros.",
    }),
    fechaNacimiento: Joi.date().required().messages({
      "date.base": "La fecha debe ser de tipo AAAA-MM-DD.",
      "date.empty": "La fecha no puede estar vacía.",
      "any.required": "La fecha es obligatoria.",
    }),
    genero: Joi.string()
      .valid("Masculino", "Femenino", "Otro")
      .required()
      .messages({
        "any.required": "El género es obligatorio.",
        "any.only": "El género proporcionado no es válido.",
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
    telefono: Joi.string().required().messages({
      "any.required": "El teléfono es obligatorio.",
      "string.empty": "El teléfono no puede estar vacío.",
    }),
    correoElectronico: Joi.string().required().messages({
      "any.required": "El correo electrónico es obligatorio.",
      "string.empty": "El correo electrónico no puede estar vacío.",
    }),
    estadoCivil: Joi.string()
      .valid("Soltero(a)", "Casado(a)", "Divorciado(a)", "Viudo(a)", "Unión libre")
      .required()
      .messages({
        "any.required": "El estado civil es obligatorio.",
        "any.only": "El estado civil proporcionado no es válido.",
      }),
    conyuge: Joi.object({
      nombre: Joi.string().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
      }),
      fechaNacimiento: Joi.date().messages({
        "date.base": "La fecha debe ser de tipo AAAA-MM-DD.",
        "date.empty": "La fecha no puede estar vacía.",
        "any.required": "La fecha es obligatoria.",
      }),
      genero: Joi.string().messages({
        "any.only": "El género proporcionado no es válido.",
      }),
    }),
    hijos: Joi.array().items(
      Joi.object({
        nombre: Joi.string().messages({
          "any.required": "El nombre es obligatorio.",
          "string.empty": "El nombre no puede estar vacío.",
          "string.base": "El nombre debe ser de tipo string.",
        }),
        fechaNacimiento: Joi.date().messages({
          "date.base": "La fecha debe ser de tipo AAAA-MM-DD.",
          "date.empty": "La fecha no puede estar vacía.",
          "any.required": "La fecha es obligatoria.",
        }),
        genero: Joi.string().messages({
          "any.only": "El género proporcionado no es válido.",
          "any.required": "El género es obligatorio.",
          "string.empty": "El género no puede estar vacío.",
          "string.base": "El género debe ser de tipo string.",
          }),

      }),
    ),
    ingresos: Joi.object({
      tipo: Joi.string().required().messages({
        "any.only": "El tipo de dato proporcionado no es válido.",
        "any.required": "El tipo de dato es obligatorio.",
        "string.empty": "El tipo de dato no puede estar vacío.",
        "string.base": "El tipo de dato debe ser de tipo string.",
      }),
      cantidad: Joi.number().required().messages({
        "any.only": "La cantidad proporcionada no es válida.",
        "any.required": "La cantidad es obligatoria.",
        "number.empty": "La cantidad no puede estar vacía.",
        "number.base": "La cantidad debe ser de tipo numerico.",
      }),        
    }),
    gastos: Joi.object({
      tipo: Joi.string().required().messages({
        "any.only": "El tipo de dato proporcionado no es válido.",
        "any.required": "El tipo de dato es obligatorio.",
        "string.empty": "El tipo de dato no puede estar vacío.",
        "string.base": "El tipo de dato debe ser de tipo string.",
      }),
      cantidad: Joi.number().required().messages({
        "any.only": "La cantidad proporcionada no es válida.",
        "any.required": "La cantidad es obligatoria.",
        "number.empty": "La cantidad no puede estar vacía.",
        "number.base": "La cantidad debe ser de tipo numerico.",
      }),
    }),
    empleo: Joi.object({
      actual: Joi.object({
        empresa: Joi.string().required().messages({
          "any.only": "La empresa proporcionada no es válido.",
          "any.required": "La empresa es obligatoria.",
          "string.empty": "La empresa no puede estar vacío.",
          "string.base": "La empresa debe ser de tipo string.",
          }),
        cargo: Joi.string().required().messages({
          "any.only": "El cargo proporcionado no es válido.",
          "any.required": "El cargo es obligatorio.",
          "string.empty": "El cargo no puede estar vacío.",
          "string.base": "El cargo debe ser de tipo string.",
          }),
        fechaInicio: Joi.date().required().messages({
          "date.base": "La fecha debe ser de tipo AAAA-MM-DD.",
          "date.empty": "La fecha no puede estar vacía.",
          "any.required": "La fecha es obligatoria.",
        }),
      }),
      historial: Joi.array().items(
        Joi.object({
          empresa: Joi.string().required().messages({
            "any.required": "La empresa es obligatoria.",
            "string.empty": "La empresa no puede estar vacía.",
            "string.base": "La empresa debe ser de tipo string.",
            }),
          cargo: Joi.string().required().messages({
            "any.only": "El cargo proporcionado no es válido.",
            "any.required": "El cargo es obligatorio.",
            "string.empty": "El cargo no puede estar vacío.",
            "string.base": "El cargo debe ser de tipo string.",
            }),
          fechaInicio: Joi.date().required().messages({
            "date.base": "La fecha de inicio debe ser de tipo AAAA-MM-DD.",
            "date.empty": "La fecha no puede estar vacía.",
            "any.required": "La fecha de inicio es obligatoria.",
            }),
          fechaFin: Joi.date().required().messages({
            "date.base": "La fecha de fin debe ser de tipo AAAA-MM-DD.",
            "date.empty": "La fecha no puede estar vacía.",
            "any.required": "La fecha de inicio es obligatoria.",
            }),
        }),
      ),
    }),
    historialMedico: Joi.object({
      alergias: Joi.string().required().messages({
        "any.only": "El tipo de dato proporcionado no es válido.",
        "any.required": "este campo es obligatorio.",
        "string.empty": "este campo no puede estar vacío.",
        "string.base": "este campo debe ser de tipo string.",
        }),
      condicionesMedicas: Joi.string().required().messages({
        "any.only": "El tipo de dato proporcionado no es válido.",
        "any.required": "este campo es obligatorio.",
        "string.empty": "este campo no puede estar vacío.",
        "string.base": "este campo debe ser de tipo string.",
        }),
      medicamentos: Joi.string().required().messages({
        "any.only": "El tipo de dato proporcionado no es válido.",
        "any.required": "este campo es obligatorio.",
        "string.empty": "este campo no puede estar vacío.",
        "string.base": "este campo debe ser de tipo string.",
        }),
      hospitalizaciones: Joi.array().items(
        Joi.object({
          motivo: Joi.string().required().messages({
            "any.only": "El tipo de dato proporcionado no es válido.",
            "any.required": "este campo es obligatorio.",
            "string.empty": "este campo no puede estar vacío.",
            "string.base": "este campo debe ser de tipo string.",
            }),
          fecha: Joi.date().required().messages({
            "date.base": "La fecha debe ser de tipo AAAA-MM-DD.",
            "date.empty": "La fecha no puede estar vacía.",
            "any.required": "La fecha es obligatoria.",
            }),
        }),
      ),
    }),
    situacionFamiliar: Joi.object({
      problemasFamiliares: Joi.string().required().messages({
        "any.only": "El tipo de dato proporcionado no es válido.",
        "any.required": "este campo es obligatorio.",
        "string.empty": "este campo no puede estar vacío.",
        "string.base": "este campo debe ser de tipo string.",
        }),
      historialViolencia: Joi.string().required().messages({
        "any.only": "El tipo de dato proporcionado no es válido.",
        "any.required": "este campo es obligatorio.",
        "string.empty": "este campo no puede estar vacío.",
        "string.base": "este campo debe ser de tipo string.",
      }),
    }),
    historialEducacion: Joi.array().items(
      Joi.object({
        institucion: Joi.string().required().messages({
          "any.only": "El tipo de dato proporcionado no es válido.",
          "any.required": "este campo es obligatorio.",
          "string.empty": "este campo no puede estar vacío.",
          "string.base": "este campo debe ser de tipo string.",
          }),
        nivelEducativo: Joi.string().required().messages({
        "any.only": "El tipo de dato proporcionado no es válido.",
        "any.required": "este campo es obligatorio.",
        "string.empty": "este campo no puede estar vacío.",
        "string.base": "este campo debe ser de tipo string.",
        }),
        fechaInicio: Joi.date().required().messages({
          "date.base": "La fecha debe ser de tipo AAAA-MM-DD.",
          "date.empty": "La fecha no puede estar vacía.",
          "any.required": "La fecha es obligatoria.",
          }),
        fechaFin: Joi.date().required().messages({
          "date.base": "La fecha debe ser de tipo AAAA-MM-DD.",
          "date.empty": "La fecha no puede estar vacía.",
          "any.required": "La fecha es obligatoria.",
          }),
      }),
    ),
    necesidades: Joi.object({
      vivienda: Joi.string().required().messages({
        "any.only": "El tipo de dato proporcionado no es válido.",
        "any.required": "este campo es obligatorio.",
        "string.empty": "este campo no puede estar vacío.",
        "string.base": "este campo debe ser de tipo string.",
          }),
      salud: Joi.string().required().messages({
        "any.only": "El tipo de dato proporcionado no es válido.",
        "any.required": "este campo es obligatorio.",
        "string.empty": "este campo no puede estar vacío.",
        "string.base": "este campo debe ser de tipo string.",
         }),
      educacion: Joi.string().required().messages({
        "any.only": "El tipo de dato proporcionado no es válido.",
        "any.required": "este campo es obligatorio.",
        "string.empty": "este campo no puede estar vacío.",
        "string.base": "este campo debe ser de tipo string.",
         }),
      otros: Joi.string().messages({
        "any.only": "El tipo de dato proporcionado no es válido.",
        "string.base": "este campo debe ser de tipo string.",
      }),
    }),
    observaciones: Joi.string().messages({
      "any.only": "El tipo de dato proporcionado no es válido.",
      "string.base": "este campo debe ser de tipo string.",
      }),
  });

  /**
 * Esquema de validación para el id de usuario.
 * @constant {Object}
 */
const fichaIdSchema = Joi.object({
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

  module.exports = { fichaBodySchema, fichaIdSchema };
