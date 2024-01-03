import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ListaPostulante from './components/Postulante/ListaPostulante';
import AgregarPostulante from './components/Postulante/AgregarPostulante';
import EditarPostulante from './components/Postulante/EditarPostulante';
import ListaAgendamiento from './components/Agendamiento/ListaAgendamiento';
import AgregarAgendamiento from './components/Agendamiento/AgregarAgendamiento';
import EditarAgendamiento from './components/Agendamiento/EditarAgendamiento';
import Home from './components/Login y Registro/Home';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <div className="navbar-brand">Proyecto Ing SW</div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="agregarpostulante">
                  Agregar Postulante
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="listadepostulacion">
                  Lista de Postulante
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="agregaragendamiento">
                  Agregar Agendamiento
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="listaagendamiento">
                  Lista de Agendamientos
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact></Route>
          <Route
            path="/listadepostulacion"
            element={<ListaPostulante />}
            exact
          ></Route>
          <Route
            path="/agregarpostulante"
            element={<AgregarPostulante />}
            exact
          ></Route>
          <Route
            path="/editarpostulante/:idpostulacion"
            element={<EditarPostulante />}
            exact
          ></Route>
          <Route
            path="/agregaragendamiento"
            element={<AgregarAgendamiento />}
            exact
          ></Route>
          <Route
            path="/listaagendamiento"
            element={<ListaAgendamiento />}
            exact
          ></Route>
          <Route
            path="/editaragendamiento/:idagendamiento"
            element={<EditarAgendamiento />}
            exact
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
