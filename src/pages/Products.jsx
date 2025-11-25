import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useAuth } from '../components/AuthContext';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const { isAuthenticated, isAdmin } = useAuth();

  // Cargar productos del backend
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await productsAPI.getAll();
      const productsData = response.data;
      
      setProducts(productsData);
      setFilteredProducts(productsData);
    } catch (error) {
      console.error('Error cargando productos:', error);
      
      if (error.response?.status === 403) {
        setError('No tienes permisos para ver los productos. Por favor inicia sesión.');
      } else if (error.response?.status === 401) {
        setError('Sesión expirada. Por favor inicia sesión nuevamente.');
      } else {
        setError('Error al cargar los productos desde el servidor.');
        // Podrías cargar productos de respaldo aquí si es necesario
      }
    } finally {
      setLoading(false);
    }
  };

  // Filtrar productos por búsqueda y categoría
  useEffect(() => {
    let filtered = products;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product =>
        product.categoria?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  // Obtener categorías únicas
  const categories = ['todos', ...new Set(products.map(product => product.categoria).filter(Boolean))];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Función para formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mt-5 pt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando productos...</span>
          </div>
          <p className="mt-3">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4">Nuestros Productos</h1>
            
            {/* Mostrar error si existe */}
            {error && (
              <div className="alert alert-danger">
                {error}
                <div className="mt-2">
                  <button className="btn btn-primary btn-sm" onClick={loadProducts}>
                    Reintentar
                  </button>
                </div>
              </div>
            )}

            {/* Controles de búsqueda y filtro */}
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <span className="input-group-text">
                    <i className="bi bi-search"></i>
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'todos' ? 'Todas las categorías' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Botón para admin para agregar productos */}
            {isAuthenticated() && isAdmin() && (
              <div className="row mb-3">
                <div className="col-12">
                  <Link to="/admin/productos/nuevo" className="btn btn-success">
                    <i className="bi bi-plus-circle"></i> Agregar Producto
                  </Link>
                </div>
              </div>
            )}

            {/* Grid de productos */}
            <div className="row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                    <div className="card h-100 product-card">
                      <img
                        src={product.imagen || '/placeholder-product.jpg'}
                        className="card-img-top"
                        alt={product.nombre}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{product.nombre}</h5>
                        <p className="card-text flex-grow-1">{product.descripcion}</p>
                        {product.categoria && (
                          <span className="badge bg-secondary mb-2">{product.categoria}</span>
                        )}
                        <div className="mt-auto">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="h5 mb-0 text-primary">
                              {formatPrice(product.precio)}
                            </span>
                            {product.stock !== undefined && (
                              <small className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                                {product.stock > 0 ? `Stock: ${product.stock}` : 'Agotado'}
                              </small>
                            )}
                          </div>
                          <div className="mt-3">
                            <Link 
                              to={`/producto/${product.id}`} 
                              className="btn btn-primary w-100"
                            >
                              Ver Detalles
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <div className="alert alert-info">
                    {searchTerm || selectedCategory !== 'todos' 
                      ? 'No se encontraron productos que coincidan con los filtros.'
                      : 'No hay productos disponibles en este momento.'
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;