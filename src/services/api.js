import axios from 'axios';

// Configuración base de Axios
const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para agregar el token JWT automáticamente a todas las requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Servicios de Autenticación
export const authAPI = {
  // Registro de usuario
  register: (userData) => API.post('/auth/register', userData),
  
  // Login de usuario
  login: (credentials) => API.post('/auth/login', credentials),
  
  // Obtener información del usuario actual
  getCurrentUser: () => API.get('/auth/me'),
  
  // Obtener todos los usuarios (solo ADMIN)
  getUsers: () => API.get('/auth/usuarios')
};

// Servicios de Productos
export const productsAPI = {
  // Obtener todos los productos
  getAll: () => API.get('/productos'),
  
  // Obtener producto por ID
  getById: (id) => API.get(`/productos/${id}`),
  
  // Crear nuevo producto (solo ADMIN)
  create: (productData) => API.post('/productos', productData),
  
  // Actualizar producto (solo ADMIN)
  update: (id, productData) => API.put(`/productos/${id}`, productData),
  
  // Eliminar producto (solo ADMIN)
  delete: (id) => API.delete(`/productos/${id}`),
  
  // Obtener productos por categoría
  getByCategory: (category) => API.get(`/productos/categoria/${category}`),
  
  // Buscar productos por nombre
  search: (query) => API.get(`/productos/buscar?nombre=${query}`),
  
  // Obtener productos en stock
  getInStock: () => API.get('/productos/stock')
};

// Servicios de Categorías (si existen)
export const categoriesAPI = {
  getAll: () => API.get('/categorias'),
  getById: (id) => API.get(`/categorias/${id}`),
  create: (categoryData) => API.post('/categorias', categoryData),
  update: (id, categoryData) => API.put(`/categorias/${id}`, categoryData),
  delete: (id) => API.delete(`/categorias/${id}`)
};

// Servicios de Pedidos (si existen)
export const ordersAPI = {
  getAll: () => API.get('/pedidos'),
  getById: (id) => API.get(`/pedidos/${id}`),
  create: (orderData) => API.post('/pedidos', orderData),
  update: (id, orderData) => API.put(`/pedidos/${id}`, orderData),
  delete: (id) => API.delete(`/pedidos/${id}`),
  getByUser: (userId) => API.get(`/pedidos/usuario/${userId}`)
};

// Utilidad para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Utilidad para obtener el usuario actual desde localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Utilidad para obtener el token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Utilidad para hacer logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export default API;