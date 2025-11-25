import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, getCurrentUser, isAuthenticated, logout as apiLogout } from '../services/api';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Verificar si hay un usuario autenticado al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && isAuthenticated()) {
          // Intentar obtener información del usuario desde el backend
          try {
            const response = await authAPI.getCurrentUser();
            setUser(response.data);
          } catch (error) {
            // Si falla, usar la información guardada en localStorage
            const savedUser = getCurrentUser();
            if (savedUser) {
              setUser(savedUser);
            }
          }
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        // Limpiar datos inválidos
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función para login
  const login = async (email, password) => {
    try {
      setError('');
      setLoading(true);

      const response = await authAPI.login({
        email: email,
        password: password
      });

      const { token, user: userData } = response.data;

      // Guardar token y usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      // Actualizar estado
      setUser(userData);

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al iniciar sesión';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Función para registro
  const register = async (userData) => {
    try {
      setError('');
      setLoading(true);

      const response = await authAPI.register({
        email: userData.correo,
        password: userData.password,
        nombre: userData.nombre,
        apellido: userData.apellido || '',
        telefono: userData.telefono || '',
        rol: 'USER' // Rol por defecto
      });

      const { token, user: newUser } = response.data;

      // Guardar token y usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));

      // Actualizar estado
      setUser(newUser);

      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al registrar usuario';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Función para logout
  const logout = () => {
    setUser(null);
    setError('');
    apiLogout(); // Limpiar localStorage y redirigir
  };

  // Función para limpiar errores
  const clearError = () => setError('');

  // Verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return user?.rol === role;
  };

  // Verificar si el usuario es ADMIN
  const isAdmin = () => {
    return user?.rol === 'ADMIN';
  };

  // Verificar si el usuario está autenticado
  const isUserAuthenticated = () => {
    return !!user && isAuthenticated();
  };

  // Valores que estarán disponibles en el contexto
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    hasRole,
    isAdmin,
    isAuthenticated: isUserAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;