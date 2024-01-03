const Agendamiento = require('../models/agendamiento'); // Importa el modelo de agendamiento

// Crea un nuevo agendamiento
exports.createAgendamiento = async (req, res) => {
  try {
    const nuevoAgendamiento = new Agendamiento(req.body);
    const agendamientoGuardado = await nuevoAgendamiento.save();
    res.status(201).json(agendamientoGuardado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtiene todos los agendamientos
exports.getAllAgendamientos = async (req, res) => {
  try {
    const agendamientos = await Agendamiento.find();
    res.status(200).json(agendamientos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtiene un agendamiento por su ID
exports.getAgendamientoById = async (req, res) => {
  try {
    const agendamiento = await Agendamiento.findById(req.params.id);
    if (!agendamiento) {
      return res.status(404).json({ message: 'Agendamiento no encontrado' });
    }
    res.status(200).json(agendamiento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualiza un agendamiento por su ID
exports.updateAgendamiento = async (req, res) => {
  try {
    const agendamiento = await Agendamiento.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Devuelve el documento actualizado
    });
    if (!agendamiento) {
      return res.status(404).json({ message: 'Agendamiento no encontrado' });
    }
    res.status(200).json(agendamiento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Borra un agendamiento por su ID
exports.deleteAgendamiento = async (req, res) => {
  try {
    const agendamiento = await Agendamiento.findByIdAndRemove(req.params.id);
    if (!agendamiento) {
      return res.status(404).json({ message: 'Agendamiento no encontrado' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
