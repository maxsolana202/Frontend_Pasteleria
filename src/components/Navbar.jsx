import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-brown" to="/">
           Pastelería Mil Sabores
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarContent" 
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            {/* Carrito */}
            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                 Carrito
              </Link>
            </li>

            {/* Menú de usuario - Versión simple sin dropdown */}
            {isAuthenticated() ? (
              <div className="navbar-nav">
                <li className="nav-item">
                  <span className="nav-link text-dark">
                     Hola, {user?.nombre || user?.email}
                    {user?.rol === 'ADMIN' && (
                      <span className="badge bg-warning ms-1">ADMIN</span>
                    )}
                  </span>
                </li>
                {user?.rol === 'ADMIN' && (
                  <li className="nav-item">
                    <Link className="nav-link text-warning" to="/admin">
                       Panel Admin
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button 
                    className="nav-link btn btn-link text-danger" 
                    onClick={handleLogout}
                    style={{ border: 'none', background: 'none' }}
                  >
                     Cerrar Sesión
                  </button>
                </li>
              </div>
            ) : (
              <div className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link text-primary" to="/login">
                     Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-success" to="/register">
                     Registrarse
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;