import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function EditarPostulante() {
  const params = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [documentos, setDocumentos] = useState('');
  const [beneficioSolicitado, setBeneficioSolicitado] = useState('');
  const [estadoPostulacion, setEstadoPostulacion] = useState('Pendiente');
  const [motivoRechazo, setMotivoRechazo] = useState('');

  useEffect(() => {
    axios
      .get(`/api/postulacion/obtenerdatapostulacion/${params.idpostulacion}`)
      .then(res => {
        console.log(res.data[0]);
        const datapostulante = res.data[0];
        setNombre(datapostulante.nombre);
        setFechaNacimiento(datapostulante.fechaNacimiento);
        setGenero(datapostulante.genero);
        setTelefono(datapostulante.telefono);
        setEmail(datapostulante.email);
        setDireccion(datapostulante.direccion);
        setDocumentos(datapostulante.documentos);
        setBeneficioSolicitado(datapostulante.beneficioSolicitado);
        setEstadoPostulacion(datapostulante.estadoPostulacion);
        setMotivoRechazo(datapostulante.motivoRechazo);
      })
      .catch(err => {
        console.log(err);
      });
  }, [params.idpostulacion]);

  function editarPostulante() {
    // Validar si el campo "nombre" está vacío antes de editar
    if (!nombre.trim()) {
      Swal.fire('Error', 'Por favor, ingrese el nombre del postulante', 'error');
      return;
    }

    const actualizarpostulante = {
      nombre: nombre,
      fechaNacimiento: fechaNacimiento,
      genero: genero,
      telefono: telefono,
      email: email,
      direccion: direccion,
      documentos: documentos,
      beneficioSolicitado: beneficioSolicitado,
      estadoPostulacion: estadoPostulacion,
      motivoRechazo: motivoRechazo,
    };

    axios
      .post(`/api/postulacion/actualizapostulacion/${params.idpostulacion}`, actualizarpostulante)
      .then(res => {
        Swal.fire('Postulante', 'El postulante se editó con éxito', 'success');
        console.log(res.data);
        // Aquí puedes navegar a la lista de postulantes después de editar exitosamente
        navigate('/listadepostulacion');
      })
      .catch(err => {
        Swal.fire('Postulante', 'Error al editar el postulante', 'error');
        console.log(err);
      });
  }

  return (
    <div className="container">
    <div className="row">
      <h2 className="mt-4">Editar Postulante</h2>
    </div>

    <div className="row">
      <div className="col-sm-6 offset-3">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fechaNacimiento" className="form-label">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            className="form-control"
            value={fechaNacimiento}
            onChange={e => setFechaNacimiento(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="genero" className="form-label">
            Género
          </label>
          <select
            className="form-control"
            value={genero}
            onChange={e => setGenero(e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono
          </label>
          <input
            type="text"
            className="form-control"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección
          </label>
          <input
            type="text"
            className="form-control"
            value={direccion}
            onChange={e => setDireccion(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="documentos" className="form-label">
            Documentos
          </label>
          <input
            type="text"
            className="form-control"
            value={documentos}
            onChange={e => setDocumentos(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="beneficioSolicitado" className="form-label">
            Beneficio Solicitado
          </label>
          <input
            type="text"
            className="form-control"
            value={beneficioSolicitado}
            onChange={e => setBeneficioSolicitado(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="estadoPostulacion" className="form-label">
            Estado de la Postulación
          </label>
          <select
            className="form-control"
            value={estadoPostulacion}
            onChange={e => setEstadoPostulacion(e.target.value)}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobada">Aprobada</option>
            <option value="Rechazada">Rechazada</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="motivoRechazo" className="form-label">
            Motivo de Rechazo
          </label>
          <input
            type="text"
            className="form-control"
            value={motivoRechazo}
            onChange={e => setMotivoRechazo(e.target.value)}
          />
        </div>

        <button
          onClick={editarPostulante}
          className="btn btn-success"
        >
          Editar Postulante
        </button>
      </div>
    </div>
  </div>
  );
}

export default EditarPostulante;
