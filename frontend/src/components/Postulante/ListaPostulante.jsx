import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PostulanteIndividual from './PostulanteIndividual';

function ListaPostulante() {
  const [datapostulante, setdatapostulante] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('api/postulacion/obtenerpostulaciones')
      .then(res => {
        console.log(res.data);

        // Verificar que la respuesta tenga la propiedad "data" y sea un array
        if (res.data && Array.isArray(res.data.data)) {
          setdatapostulante(res.data.data);
        } else {
          console.error('La respuesta de la API no contiene un array de datos:', res.data);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Si está cargando, puedes mostrar un mensaje de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  const listapostulante = datapostulante.map(postulacion => (
    <div key={postulacion.idpostulacion}>
      <PostulanteIndividual postulacion={postulacion} />
    </div>
  ));

  return (
    <div>
      <h2>Lista de Postulantes</h2>
      {listapostulante}
    </div>
  );
}

export default ListaPostulante;
