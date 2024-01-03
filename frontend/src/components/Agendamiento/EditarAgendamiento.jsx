import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

function EditarAgendamiento() {
  const params = useParams();
  const navigate = useNavigate();

  const [postulanteId, setPostulanteId] = useState('');
  const [fechaVisita, setFechaVisita] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [nombreDocumento, setNombreDocumento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [urlDocumento, setUrlDocumento] = useState('');
  const [asistenteSocialId, setAsistenteSocialId] = useState('');
  const [notasVisita, setNotasVisita] = useState('');
  const [resultadosVisita, setResultadosVisita] = useState('');
  const [motivoVisita, setMotivoVisita] = useState('');

  useEffect(() => {
    axios
      .get(`/api/agendamiento/obteneragendamiento/${params.idagendamiento}`)
      .then(res => {
        const agendamiento = res.data;
        setPostulanteId(agendamiento.postulanteId);
        setFechaVisita(agendamiento.fechaVisita);
        setCalle(agendamiento.direccion.calle);
        setNumero(agendamiento.direccion.numero);
        setCiudad(agendamiento.direccion.ciudad);
        setCodigoPostal(agendamiento.direccion.codigoPostal);
        setNombreDocumento(agendamiento.documentosRecolectados[0].nombre);
        setTipoDocumento(agendamiento.documentosRecolectados[0].tipo);
        setUrlDocumento(agendamiento.documentosRecolectados[0].url);
        setAsistenteSocialId(agendamiento.asistenteSocialId);
        setNotasVisita(agendamiento.notasVisita);
        setResultadosVisita(agendamiento.resultadosVisita);
        setMotivoVisita(agendamiento.motivoVisita);
      })
      .catch(err => {
        console.error('Error al obtener datos del agendamiento:', err);
      });
  }, [params.idagendamiento]);

  function editarAgendamiento() {
    // Validar si el campo "postulanteId" está vacío antes de editar
    if (!postulanteId.trim()) {
      Swal.fire('Error', 'Por favor, ingrese el ID del postulante', 'error');
      return;
    }

    const agendamientoEditado = {
      postulanteId,
      fechaVisita,
      direccion: {
        calle,
        numero,
        ciudad,
        codigoPostal,
      },
      documentosRecolectados: [
        {
          nombre: nombreDocumento,
          tipo: tipoDocumento,
          url: urlDocumento,
        },
      ],
      asistenteSocialId,
      notasVisita,
      resultadosVisita,
      motivoVisita,
    };

    axios
      .put(`/api/agendamiento/actualizaagendamiento/${params.idagendamiento}`, agendamientoEditado)
      .then(res => {
        Swal.fire('Agendamiento', 'El agendamiento se editó con éxito', 'success');
        console.log(res.data);
        // Navegar a la lista de agendamientos después de editar exitosamente
        navigate('/listaagendamiento');
      })
      .catch(err => {
        Swal.fire('Agendamiento', 'Error al editar el agendamiento', 'error');
        console.error(err);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <h2 className="mt-4">Agregar un nuevo agendamiento</h2>
      </div>

      <div className="row">
        <div className="col-sm-6 offset-3">
          <div className="mb-3">
            <label htmlFor="postulanteId" className="form-label">
              ID del Postulante
            </label>
            <input
              type="text"
              className="form-control"
              value={postulanteId}
              onChange={e => setPostulanteId(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="fechaVisita" className="form-label">
              Fecha de Visita
            </label>
            <input
              type="datetime-local"
              className="form-control"
              value={fechaVisita}
              onChange={e => setFechaVisita(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="calle" className="form-label">
              Calle
            </label>
            <input
              type="text"
              className="form-control"
              value={calle}
              onChange={e => setCalle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="numero" className="form-label">
              Número
            </label>
            <input
              type="text"
              className="form-control"
              value={numero}
              onChange={e => setNumero(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="ciudad" className="form-label">
              Ciudad
            </label>
            <input
              type="text"
              className="form-control"
              value={ciudad}
              onChange={e => setCiudad(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="codigoPostal" className="form-label">
              Código Postal
            </label>
            <input
              type="text"
              className="form-control"
              value={codigoPostal}
              onChange={e => setCodigoPostal(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nombreDocumento" className="form-label">
              Nombre del Documento
            </label>
            <input
              type="text"
              className="form-control"
              value={nombreDocumento}
              onChange={e => setNombreDocumento(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tipoDocumento" className="form-label">
              Tipo de Documento
            </label>
            <input
              type="text"
              className="form-control"
              value={tipoDocumento}
              onChange={e => setTipoDocumento(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="urlDocumento" className="form-label">
              URL del Documento
            </label>
            <input
              type="text"
              className="form-control"
              value={urlDocumento}
              onChange={e => setUrlDocumento(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="asistenteSocialId" className="form-label">
              ID del Asistente Social
            </label>
            <input
              type="text"
              className="form-control"
              value={asistenteSocialId}
              onChange={e => setAsistenteSocialId(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="notasVisita" className="form-label">
              Notas de la Visita
            </label>
            <input
              type="text"
              className="form-control"
              value={notasVisita}
              onChange={e => setNotasVisita(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="resultadosVisita" className="form-label">
              Resultados de la Visita
            </label>
            <input
              type="text"
              className="form-control"
              value={resultadosVisita}
              onChange={e => setResultadosVisita(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="motivoVisita" className="form-label">
              Motivo de la Visita
            </label>
            <input
              type="text"
              className="form-control"
              value={motivoVisita}
              onChange={e => setMotivoVisita(e.target.value)}
            />
          </div>

          <button
            onClick={editarAgendamiento}
            className="btn btn-success"
          >
            Editar Agendamiento
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarAgendamiento;
