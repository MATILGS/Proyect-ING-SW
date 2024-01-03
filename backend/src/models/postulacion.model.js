const mongoose = require("mongoose");

const postulacionSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
    fechaNacimiento: {
      type: Date,  
      required: true,
    },
    genero: {
      type: String,
      enum: ["Masculino", "Femenino"],
      required: true,
    },
    telefono: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    documentos: {
      type: String,
      required: true,
    },
    fechaPostulacion: {
      type: Date,
      default: Date.now,
    },
    beneficioSolicitado: {
      type: String,
      required: true,
    },
    estadoPostulacion: {
      type: String,
      enum: ["Pendiente", "Aprobada", "Rechazada"],
      default: "Pendiente",
      required: true,
    },
    motivoRechazo: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

/** Modelo de datos 'Postulacion' */
const Postulacion = mongoose.model("Postulacion", postulacionSchema);

// Exporta el modelo de datos 'Postulacion'
module.exports = Postulacion;
