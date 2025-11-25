// src/pages/Contacto.jsx
import React, { useState } from 'react';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prevState => ({
        ...prevState,
        [id]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Por favor ingresa tu nombre';
    }
    
    if (!formData.correo.trim()) {
      newErrors.correo = 'Por favor ingresa tu correo electrónico';
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'Por favor ingresa un email válido';
    }
    
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'Por favor ingresa tu mensaje';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aquí puedes agregar la lógica para enviar el formulario
      setAlert('Mensaje enviado correctamente. Te contactaremos pronto.');
      setFormData({
        nombre: '',
        correo: '',
        telefono: '',
        mensaje: ''
      });
      
      // Limpiar alerta después de 5 segundos
      setTimeout(() => {
        setAlert('');
      }, 5000);
    } else {
      setAlert('Por favor corrige los errores en el formulario.');
    }
  };

  return (
    <div className="contacto-page">
      {/* Header */}
      <section className="contact-header py-5 mt-5">
        <div className="container text-center">
          <h1 className="display-4">Contáctanos</h1>
          <p className="lead">Estamos aquí para responder todas tus preguntas y tomar tus pedidos especiales</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mb-5">
              <h2 className="mb-4">Información de Contacto</h2>
              
              <div className="info-item d-flex mb-4">
                <div className="info-icon me-3"></div>
                <div className="info-content">
                  <h5>Dirección</h5>
                  <p>Av. Dulce 1234, Santiago Centro<br />Región Metropolitana, Chile</p>
                </div>
              </div>
              
              <div className="info-item d-flex mb-4">
                <div className="info-icon me-3"></div>
                <div className="info-content">
                  <h5>Teléfonos</h5>
                  <p>+56 2 2345 6789<br />+56 9 8765 4321</p>
                </div>
              </div>
              
              <div className="info-item d-flex mb-4">
                <div className="info-icon me-3"></div>
                <div className="info-content">
                  <h5>Email</h5>
                  <p>info@pasteleriamilsabores.cl<br />pedidos@pasteleriamilsabores.cl</p>
                </div>
              </div>
              
              <div className="info-item d-flex mb-4">
                <div className="info-icon me-3"></div>
                <div className="info-content">
                  <h5>Horario de Atención</h5>
                  <p>Lunes a Viernes: 9:00 - 20:00 hrs<br />Sábados: 10:00 - 18:00 hrs<br />Domingos: Cerrado</p>
                </div>
              </div>
              
              <div className="info-item d-flex">
                <div className="info-icon me-3">🔗</div>
                <div className="info-content">
                  <h5>Síguenos en redes</h5>
                  <div className="social-links">
                    <a href="#" className="social-link me-3">Facebook</a>
                    <a href="#" className="social-link me-3">Instagram</a>
                    <a href="#" className="social-link">Twitter</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <h2 className="mb-4">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre completo *</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                    id="nombre" 
                    value={formData.nombre}
                    onChange={handleChange}
                    required 
                  />
                  {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">Correo electrónico *</label>
                  <input 
                    type="email" 
                    className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                    id="correo" 
                    value={formData.correo}
                    onChange={handleChange}
                    required 
                  />
                  {errors.correo && <div className="invalid-feedback">{errors.correo}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">Teléfono</label>
                  <input 
                    type="tel" 
                    className="form-control"
                    id="telefono" 
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="mensaje" className="form-label">Mensaje *</label>
                  <textarea 
                    className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`}
                    id="mensaje" 
                    rows="5" 
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                  ></textarea>
                  {errors.mensaje && <div className="invalid-feedback">{errors.mensaje}</div>}
                </div>
                {alert && (
                  <div className={`alert ${alert.includes('correctamente') ? 'alert-success' : 'alert-danger'} mb-3`}>
                    {alert}
                  </div>
                )}
                <button type="submit" className="btn btn-primary btn-lg">Enviar mensaje</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Nuestra Ubicación</h2>
          <div className="map-frame ratio ratio-16x9">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.395036846736!2d-70.6500003242681!3d-33.44310797367225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a5a0a0a0a0%3A0x1d0b0b0b0b0b0b0b!2sAv.%20Dulce%201234%2C%20Santiago%20Centro%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2ses!4v1620000000000!5m2!1ses!2ses" 
              allowFullScreen 
              loading="lazy"
              title="Ubicación de Pastelería Mil Sabores"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;