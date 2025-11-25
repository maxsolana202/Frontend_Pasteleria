import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext'; // Ruta corregida

function Carrito() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice,
    getTotalItems 
  } = useCart();

  const handleQuantityChange = (productId, size, change) => {
    const item = cartItems.find(item => item.id === productId && item.size === size);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1) {
        updateQuantity(productId, size, newQuantity);
      }
    }
  };

  const handleRemoveItem = (productId, size) => {
    removeFromCart(productId, size);
  };

  const calculateShipping = () => {
    return cartItems.length > 0 ? 3000 : 0;
  };

  const calculateTotal = () => {
    return getTotalPrice() + calculateShipping();
  };

  const handleCheckout = () => {
    alert('¡Gracias por tu compra! En un futuro esto te llevará a completar tu pedido.');
  };

  const subtotal = getTotalPrice();
  const shipping = calculateShipping();
  const total = calculateTotal();

  if (cartItems.length === 0) {
    return (
      <div>
        {/* Breadcrumb */}
        <section className="breadcrumb-section py-3 mt-5">
          <div className="container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
                <li className="breadcrumb-item active">Carrito de Compras</li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Cart Content */}
        <section className="cart-content py-5">
          <div className="container">
            <h1 className="mb-4">Tu Carrito de Compras</h1>
            <div className="empty-cart text-center py-5">
              <div className="empty-cart-icon mb-3">
                <i className="fas fa-shopping-cart fa-4x text-muted"></i>
              </div>
              <h3>Tu carrito está vacío</h3>
              <p>Agrega algunos productos deliciosos para comenzar</p>
              <Link to="/productos" className="btn btn-primary mt-3">
                Ver Productos
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <section className="breadcrumb-section py-3 mt-5">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
              <li className="breadcrumb-item active">Carrito de Compras</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Cart Content */}
      <section className="cart-content py-5">
        <div className="container">
          <h1 className="mb-4">Tu Carrito de Compras</h1>
          
          <div className="row">
            <div className="col-lg-8">
              <div id="cart-items-container">
                {cartItems.map((item, index) => {
                  const itemTotal = typeof item.price === 'string' 
                    ? parseInt(item.price.replace('$', '').replace('.', '').replace('+', '')) * item.quantity
                    : item.price * item.quantity;
                  
                  return (
                    <div key={`${item.id}-${item.size}-${index}`} className="cart-item card mb-3" data-product-id={item.id}>
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-3 col-md-2">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="cart-item-image img-fluid rounded" 
                              style={{ height: '80px', objectFit: 'cover' }}
                            />
                          </div>
                          <div className="col-9 col-md-5">
                            <h5 className="mb-1">{item.name}</h5>
                            <p className="text-muted mb-0">
                              Tamaño: {item.size.charAt(0).toUpperCase() + item.size.slice(1)}
                            </p>
                            {item.message && (
                              <p className="text-muted mb-0">
                                Mensaje: {item.message}
                              </p>
                            )}
                            <p className="mb-0 product-price">
                              {typeof item.price === 'string' ? item.price : `$${item.price.toLocaleString('es-CL')}`}
                            </p>
                          </div>
                          <div className="col-6 col-md-3">
                            <div className="quantity-selector d-flex align-items-center">
                              <button 
                                className="btn btn-outline-secondary quantity-btn" 
                                onClick={() => handleQuantityChange(item.id, item.size, -1)}
                              >
                                -
                              </button>
                              <input 
                                type="number" 
                                className="quantity-input form-control text-center mx-2" 
                                value={item.quantity} 
                                min="1" 
                                style={{width: '60px'}}
                                onChange={(e) => updateQuantity(item.id, item.size, parseInt(e.target.value) || 1)}
                              />
                              <button 
                                className="btn btn-outline-secondary quantity-btn" 
                                onClick={() => handleQuantityChange(item.id, item.size, 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="col-4 col-md-2 text-end">
                            <p className="mb-1 fw-bold item-total">
                              ${itemTotal.toLocaleString('es-CL')}
                            </p>
                            <button 
                              className="btn btn-sm btn-outline-danger" 
                              onClick={() => handleRemoveItem(item.id, item.size)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-end mb-3">
                <button className="btn btn-outline-danger" onClick={clearCart}>
                  Vaciar Carrito
                </button>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="summary-card card">
                <div className="card-body">
                  <h3 className="mb-4">Resumen de Compra</h3>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Productos ({getTotalItems()}):</span>
                    <span id="subtotal">${subtotal.toLocaleString('es-CL')}</span>
                  </div>
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span>Envío:</span>
                    <span id="shipping">${shipping.toLocaleString('es-CL')}</span>
                  </div>
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between mb-4">
                    <strong>Total:</strong>
                    <strong id="total">${total.toLocaleString('es-CL')}</strong>
                  </div>
                  
                  <button 
                    id="checkout-btn" 
                    className="btn btn-primary w-100" 
                    onClick={handleCheckout}
                  >
                    Proceder al Pago
                  </button>
                  
                  <div className="mt-3 text-center">
                    <Link to="/productos" className="text-decoration-none">
                      ← Continuar comprando
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h4>Pastelería Mil Sabores</h4>
              <p>
                50 años endulzando momentos especiales con las mejores recetas 
                tradicionales y modernas de la repostería chilena.
              </p>
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
              <p>
                Av. Dulce 1234, Santiago Centro<br />
                Región Metropolitana, Chile
              </p>
              <p>
                Teléfono: +56 2 2345 6789<br />
                Email: info@pasteleriamilsabores.cl
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <p className="copyright">
                &copy; 2025 Pastelería Mil Sabores. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Carrito;