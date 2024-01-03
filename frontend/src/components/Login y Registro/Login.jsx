// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (!email || !password) {
      Swal.fire('Inicio de Sesión', 'Por favor, complete todos los campos antes de iniciar sesión', 'error');
      return;
    }

    axios.post('/api/auth/login', { email, password })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          navigate('/home');
        } else {
          Swal.fire('Inicio de Sesión', 'Credenciales inválidas, por favor verifique sus datos', 'error');
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
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
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
        <div className="d-grid gap-2">
          <button onClick={handleLoginClick} className="btn btn-primary">Iniciar Sesión</button>
          <Link to="/registro" className="btn btn-secondary">Registrarse</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
