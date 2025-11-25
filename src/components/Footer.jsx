// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h4>Pastelería Mil Sabores</h4>
            <p>50 años endulzando momentos especiales con las mejores recetas tradicionales y modernas de la repostería chilena.</p>
            <div className="social-links">
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Twitter</a>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <h4>Enlaces Rápidos</h4>
            <ul className="footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h4>Contacto</h4>
            <p>Av. Dulce 1234, Santiago Centro<br />
            Región Metropolitana, Chile</p>
            <p>Teléfono: +56 2 2345 6789<br />
            Email: info@pasteleriamilsabores.cl</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p className="copyright">&copy; 2023 Pastelería Mil Sabores. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;