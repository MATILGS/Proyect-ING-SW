// Registro.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistroClick = () => {
    if (!email || !password) {
      Swal.fire('Registro', 'Por favor, complete todos los campos antes de registrarse', 'error');
      return;
    }

    axios.post('/api/auth/register', { email, password })
      .then(res => {
        if (res.data.message) {
          Swal.fire('Registro', 'Registro exitoso, por favor inicie sesión', 'success');
          navigate('/');
        } else {
          Swal.fire('Registro', 'Ocurrió un error durante el registro, por favor intente de nuevo', 'error');
        }
      })
      .catch(err => {
        console.log(err);
        Swal.fire('Error', 'Ocurrió un error al procesar la solicitud, por favor intente de nuevo', 'error');
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="col-sm-6">
        <h2 className="text-center mb-4">Registro</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button onClick={handleRegistroClick} className="btn btn-primary">Registrarse</button>
        </div>
      </div>
    </div>
  );
}

export default Registro;
