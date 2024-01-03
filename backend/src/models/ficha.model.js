
const mongoose = require("mongoose");

const fichaSchema = mongoose.Schema(
  {
    // Informacion personal
    nombre: {
      type: String,
      required: true,
    },
    rut: {
      type: Number,
      required: true,
      unique: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    genero: {
      type: String,
      enum: ["Masculino", "Femenino", "Otro"],
      required: true,
    },
    direccion: {
      calle: {
        type: String,
        required: true,
      },
      numero: {
        type: Number,
        required: true,
      },
      ciudad: {
        type: String,
        required: true,
      },
      codigoPostal: {
        type: Number,
        required: true,
      },
    },
    telefono: {
      type: Number,
      required: true,
    },
    correoElectronico: {
      type: String,
      required: true,
      unique: true,
    },
    // Antecedentes familiares
    estadoCivil: {
      type: String,
      enum: ["Soltero(a)", "Casado(a)", "Divorciado(a)", "Viudo(a)", "Unión libre"],
      required: true,
    },
    conyuge: {
      nombre: String,
      fechaNacimiento: Date,
      genero: String,
    },
    hijos: [
      {
        nombre: String,
        fechaNacimiento: Date,
        genero: String,
      },
    ],
    // Situacion economica
    ingresos: {
      tipo: {
        type: String,
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
      },
    },
    gastos: {
      tipo: String,
      cantidad: Number,
    },
    empleo: {
      actual: {
        empresa: String,
        cargo: String,
        fechaInicio: Date,
      },
      historial: [
        {
          empresa: String,
          cargo: String,
          fechaInicio: Date,
          fechaFin: Date,
        },
      ],
    },
    // Antecedentes de salud
    historialMedico: {
      alergias: String,
      condicionesMedicas: String,
      medicamentos: String,
      hospitalizaciones: [
        {
          motivo: String,
          fecha: Date,
        },
      ],
    },
    situacionFamiliar: {
      problemasFamiliares: String,
      historialViolencia: String,
    },
    historialEducacion: [
      {
        institucion: String,
        nivelEducativo: String,
        fechaInicio: Date,
        fechaFin: Date,
      },
    ],
    necesidades: {
      vivienda: String,
      salud: String,
      educacion: String,
      otros: String,
    },
    observaciones: String,
  },
  {
    versionKey: false,
  },
);


/** Modelo de datos 'Ficha' */
const Ficha = mongoose.model("Ficha", fichaSchema);


module.exports = Ficha;

