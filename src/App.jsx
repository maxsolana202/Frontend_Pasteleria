// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import DetalleProducto from './pages/DetalleProducto';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Blog from './pages/Blog';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';

// Componentes de administración (crearemos estos después)
const AdminPanel = () => (
  <div className="container mt-5 pt-5">
    <h1>Panel de Administración</h1>
    <p>Bienvenido al panel de administración. Aquí puedes gestionar productos, usuarios, etc.</p>
    <div className="row">
      <div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Gestión de Productos</h5>
            <p className="card-text">Crear, editar y eliminar productos.</p>
            <a href="/admin/productos" className="btn btn-primary">Gestionar</a>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Gestión de Usuarios</h5>
            <p className="card-text">Ver y gestionar usuarios registrados.</p>
            <a href="/admin/usuarios" className="btn btn-primary">Gestionar</a>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Pedidos</h5>
            <p className="card-text">Ver y gestionar pedidos de clientes.</p>
            <a href="/admin/pedidos" className="btn btn-primary">Gestionar</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/producto/:productId" element={<DetalleProducto />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas protegidas - Solo usuarios autenticados */}
                <Route
                  path="/carrito"
                  element={
                    <ProtectedRoute>
                      <Carrito />
                    </ProtectedRoute>
                  }
                />

                {/* Rutas protegidas - Solo ADMIN */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute roles="ADMIN">
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />

                {/* Ruta 404 */}
                <Route
                  path="*"
                  element={
                    <div className="container text-center py-5 mt-5">
                      <h2>404 - Página no encontrada</h2>
                      <p>La página que buscas no existe.</p>
                      <a href="/" className="btn btn-primary">
                        Volver al Inicio
                      </a>
                    </div>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;