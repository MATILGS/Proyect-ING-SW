import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AgendamientoIndividual from './AgendamientoIndividual';  

function ListaAgendamiento() {
  const [dataAgendamiento, setDataAgendamiento] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/agendamiento/obteneragendamiento')
      .then(res => {
        console.log(res.data);

        // Verificar que la respuesta sea un array
        if (Array.isArray(res.data)) {
          setDataAgendamiento(res.data);
        } else {
          console.error('La respuesta de la API no es un array:', res.data);
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

  const listaAgendamiento = dataAgendamiento.map(agendamiento => (
    <div key={agendamiento.idAgendamiento}>
      <AgendamientoIndividual agendamiento={agendamiento} />
    </div>
  ));

  return (
    <div>
      <h2>Lista de Agendamientos</h2>
      {listaAgendamiento}
    </div>
  );
}

export default ListaAgendamiento;
