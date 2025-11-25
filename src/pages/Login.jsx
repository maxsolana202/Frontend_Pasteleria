import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login, user, loading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Limpiar errores del contexto cuando el componente se monta
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
    
    if (id === 'email') validarEmail(value);
    if (id === 'password') validarPassword(value);
  };

  const setOK = (field) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
    setIsValid(prev => ({ ...prev, [field]: true }));
  };

  const setError = (field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }));
    setIsValid(prev => ({ ...prev, [field]: false }));
  };

  const validarEmail = (email = formData.email) => {
    const emailValue = email.trim();
    const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rx.test(emailValue)) {
      setError('email', 'Ingrese un correo electrónico válido');
      return false;
    }
    setOK('email');
    return true;
  };

  const validarPassword = (password = formData.password) => {
    const pass = password;
    if (pass.length < 6) {
      setError('password', 'La contraseña debe tener al menos 6 caracteres');
      return false;
    }
    setOK('password');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();

    const emailValido = validarEmail();
    const passwordValido = validarPassword();

    if (!emailValido || !passwordValido) {
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Login exitoso - la redirección se maneja en el useEffect
        console.log('Login exitoso:', result.data);
      } else {
        // Error del servidor
        setErrors(prev => ({ 
          ...prev, 
          general: result.error 
        }));
      }
    } catch (error) {
      // Error de conexión
      setErrors(prev => ({ 
        ...prev, 
        general: 'Error de conexión con el servidor' 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      {/* QUITAMOS EL NAVBAR DUPLICADO - Ahora usa el navbar global */}
      
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="card-title">Iniciar Sesión</h2>
                  <p className="text-muted">Accede a tu cuenta de Pastelería Mil Sabores</p>
                </div>
                
                {/* Mostrar error del contexto */}
                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}
                
                {/* Mostrar error de validación del formulario */}
                {errors.general && (
                  <div className="alert alert-danger">
                    {errors.general}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input 
                      type="email" 
                      className={`form-control ${errors.email ? 'is-invalid' : isValid.email ? 'is-valid' : ''}`}
                      id="email" 
                      placeholder="ejemplo@correo.com" 
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required 
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input 
                      type="password" 
                      className={`form-control ${errors.password ? 'is-invalid' : isValid.password ? 'is-valid' : ''}`}
                      id="password" 
                      placeholder="Ingresa tu contraseña" 
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required 
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                  </div>
                  
                  <div className="d-grid gap-2">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg"
                      disabled={isSubmitting || loading}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Iniciando sesión...
                        </>
                      ) : (
                        'Iniciar Sesión'
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="text-center mt-4">
                  <p className="mb-0">
                    ¿No tienes cuenta? <Link to="/register" className="text-decoration-none">Regístrate aquí</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;