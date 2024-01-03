const mongoose = require("mongoose");

const agendamientoSchema = mongoose.Schema({
  postulanteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo User con rol "user"
    required: true,
  },
  fechaVisita: {
    type: Date,
    required: true,
  },
  direccion: {
    calle: String,
    numero: Number,
    ciudad: String,
    codigoPostal: Number,
  },
  asistenteSocialId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Referencia al modelo User con rol "admin"
    required: true,
  },
  notasVisita: String,
  documentosRecolectados: [{
    nombre: String,
    tipo: String,
    url: String,
  }],
  resultadosVisita: String,
  motivoVisita: String,
});

module.exports = mongoose.model('Agendamiento', agendamientoSchema);