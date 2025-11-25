import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * Componente para proteger rutas que requieren autenticación y/o roles específicos
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - Componente a renderizar si está autenticado
 * @param {string|Array} props.roles - Rol o array de roles permitidos (opcional)
 * @param {string} props.redirectTo - Ruta a redirigir si no tiene acceso (opcional)
 */
const ProtectedRoute = ({ 
  children, 
  roles = null, 
  redirectTo = "/login" 
}) => {
  const { isAuthenticated, user, loading } = useAuth();

  // Mostrar loading mientras verifica autenticación
  if (loading) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verificando acceso...</span>
        </div>
        <p className="mt-3">Verificando acceso...</p>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si se especificaron roles, verificar que el usuario tenga al menos uno
  if (roles) {
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    const userRole = user?.rol;
    
    if (!userRole || !allowedRoles.includes(userRole)) {
      return (
        <div className="container mt-5 pt-5">
          <div className="alert alert-danger text-center">
            <h4>Acceso Denegado</h4>
            <p>
              No tienes permisos para acceder a esta página. 
              Se requiere uno de los siguientes roles: {allowedRoles.join(', ')}
            </p>
            <p>
              <small>Tu rol actual: {userRole || 'No asignado'}</small>
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => window.history.back()}
            >
              Volver Atrás
            </button>
          </div>
        </div>
      );
    }
  }

  // Si pasa todas las validaciones, renderizar el children
  return children;
};

export default ProtectedRoute;