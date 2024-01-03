// PostulanteIndividual.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';

function PostulanteIndividual({ postulacion }) {
  const navigate = useNavigate();

  // Para animación de scroll al bajar
  useEffect(() => {
    AOS.init();
  }, []);

// Función para borrar postulante
function borrarPostulante(idPostulacion) {
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
        .delete(`/api/postulacion/borrarpostulacion/${idPostulacion}`)
        .then((res) => {
          console.log(res.data);
          Swal.fire('Postulante', 'La postulación se borró con éxito').then(() => {
            navigate('/listadepostulacion');
            window.location.reload(); // Recargar la página
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
}


  // Verificar si postulante está definido
  if (!postulacion) {
    return <div>No hay datos de postulante.</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 offset-3" data-aos="flip-right">
          <ul className="list-group">
            <li className="list-group-item">
              <strong>ID:</strong> {postulacion._id}
            </li>
            <li className="list-group-item">
              <strong>Nombre:</strong> {postulacion.nombre || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Fecha de Nacimiento:</strong> {postulacion.fechaNacimiento || 'No disponible'}
              </li>
            <li className="list-group-item">
              <strong>Género:</strong> {postulacion.genero || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Teléfono:</strong> {postulacion.telefono || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {postulacion.email || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Dirección:</strong> {postulacion.direccion || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Documentos:</strong> {postulacion.documentos || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Fecha de Postulación:</strong> {new Date(postulacion.fechaPostulacion).toLocaleDateString() || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Beneficio Solicitado:</strong> {postulacion.beneficioSolicitado || 'No disponible'}
            </li>
            <li className="list-group-item">
              <strong>Estado de Postulación:</strong> {postulacion.estadoPostulacion || 'No disponible'}
            </li>
            {postulacion.estadoPostulacion === 'Rechazada' && (
              <li className="list-group-item">
                <strong>Motivo de Rechazo:</strong> {postulacion.motivoRechazo || 'No disponible'}
              </li>
            )}
          </ul>

          <Link to={`/editarpostulante/${postulacion._id}`} className="btn btn-success">
            Editar
          </Link>
          &nbsp;
          <button className="btn btn-danger" onClick={() => borrarPostulante(postulacion._id)}>
            Borrar
          </button>
          <hr className="mt-4" />
        </div>
      </div>
    </div>
  );
}

export default PostulanteIndividual;