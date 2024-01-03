import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';

function AgendamientoIndividual({ agendamiento }) {
  const navigate = useNavigate();

  // Inicializar la animación AOS en el montaje del componente
  useEffect(() => {
    AOS.init();
  }, []);

  // Función para borrar agendamiento
  function borrarAgendamiento(idAgendamiento) {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`/api/agendamiento/borraragendamiento/${idAgendamiento}`)
          .then((res) => {
            console.log(res.data);
            Swal.fire('Agendamiento', 'El agendamiento se borró con éxito').then(() => {
              navigate('/listaagendamiento');
              window.location.reload(); // Recargar la página
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  }

  // Verificar si agendamiento está definido
  if (!agendamiento) {
    return <div>No hay datos de agendamiento.</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-3" data-aos="flip-right">
          <ul className="list-group">
            <li className="list-group-item">
              <strong>ID:</strong> {agendamiento._id}
            </li>
            <li className="list-group-item">
              <strong>Postulante ID:</strong> {agendamiento.postulanteId || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Fecha de Visita:</strong> {agendamiento.fechaVisita || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Dirección:</strong> {`${agendamiento.direccion.calle} ${agendamiento.direccion.numero}, ${agendamiento.direccion.ciudad}, ${agendamiento.direccion.codigoPostal}` || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Asistente Social ID:</strong> {agendamiento.asistenteSocialId || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Notas de Visita:</strong> {agendamiento.notasVisita || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Resultados de Visita:</strong> {agendamiento.resultadosVisita || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Motivo de Visita:</strong> {agendamiento.motivoVisita || 'No disponible'}
            </li>
          </ul>

          <Link to={`/editaragendamiento/${agendamiento._id}`} className="btn btn-success">
            Editar
          </Link>
          &nbsp;
          <button className="btn btn-danger" onClick={() => borrarAgendamiento(agendamiento._id)}>
            Borrar
          </button>
          <hr className="mt-4" />
        </div>
      </div>
    </div>
  );
}

export default AgendamientoIndividual;
