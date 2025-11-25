import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../components/CartContext'; // RUTA CORREGIDA

const DetalleProducto = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('pequeno');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const { addToCart } = useCart();

  // Base de datos de productos
  const products = {
    'torta-chocolate': {
      title: 'Torta de Chocolate',
      price: '$15.000',
      description: 'Deliciosa torta de chocolate con relleno de crema y cubierta de ganache. Perfecta para los amantes del chocolate, con un sabor intenso y textura suave que se derrite en la boca.',
      image: '/img/images2.jpeg',
      category: 'Tortas Cuadradas / Tradicional',
      code: 'CHOCO-001'
    },
    'torta-frutal': {
      title: 'Torta Frutal',
      price: '$18.000',
      description: 'Torta esponjosa con crema y decorada con variedad de frutas frescas de la estación. Una opción refrescante y colorida para cualquier celebración.',
      image: '/img/images12.jpeg',
      category: 'Tortas Circulares / Tradicional',
      code: 'FRUT-002'
    },
    'red-velvet': {
      title: 'Torta Red Velvet',
      price: '$20.000',
      description: 'Clásica torta roja con sabor a vainilla y chocolate, cubierta con frosting de queso crema. Su distintivo color y sabor la hacen irresistible.',
      image: '/img/images5.jpeg',
      category: 'Tortas Circulares / Especiales',
      code: 'REDV-003'
    },
    'torta-sin-azucar': {
      title: 'Torta Sin Azúcar',
      price: '$16.500',
      description: 'Exquisita torta endulzada naturalmente, ideal para personas con restricciones de azúcar. Disfruta del sabor sin preocupaciones.',
      image: '/img/images8.jpeg',
      category: 'Tortas Cuadradas / Sin Azúcar',
      code: 'SA-004'
    },
    'torta-sin-gluten': {
      title: 'Torta Sin Gluten',
      price: '$19.000',
      description: 'Deliciosa opción para celíacos, elaborada con harinas alternativas y mismo sabor exquisito. Todos pueden disfrutarla.',
      image: '/img/images4.jpeg',
      category: 'Tortas Circulares / Sin Gluten',
      code: 'SG-005'
    },
    'torta-vegana': {
      title: 'Torta Vegana',
      price: '$17.500',
      description: 'Elaborada sin productos de origen animal, pero con todo el sabor de una torta tradicional. Cruelty-free y deliciosa.',
      image: '/img/images7.jpeg',
      category: 'Tortas Circulares / Vegana',
      code: 'VEG-006'
    },
    'cheesecake': {
      title: 'Cheesecake Individual',
      price: '$5.000',
      description: 'Porción individual de cheesecake con base de galleta y topping de frutos rojos. Cremoso y con el balance perfecto de dulzura.',
      image: '/img/images13.jpeg',
      category: 'Postres Individuales',
      code: 'CHK-007'
    },
    'brownie': {
      title: 'Brownie de Chocolate',
      price: '$4.500',
      description: 'Brownie intenso de chocolate con nueces, disponible en porción individual o familiar. Perfecto para los amantes del chocolate intenso.',
      image: '/img/images15.jpeg',
      category: 'Postres Individuales',
      code: 'BRW-008'
    },
    'torta-personalizada': {
      title: 'Torta Personalizada',
      price: '$25.000+',
      description: 'Creamos la torta de tus sueños para tu ocasión especial. Consultar por diseños y precios según complejidad.',
      image: '/img/images14.jpeg',
      category: 'Tortas Especiales',
      code: 'CUST-009'
    },
    'torta-tres-leches': {
      title: 'Torta Tres Leches',
      price: '$16.000',
      description: 'Clásica torta bañada en mezcla de tres leches y decorada con merengue o crema chantillí. Húmeda y deliciosamente dulce.',
      image: '/img/images10.jpeg',
      category: 'Tortas Cuadradas / Tradicional',
      code: '3LECH-010'
    },
    'torta-zanahoria': {
      title: 'Torta de Zanahoria',
      price: '$17.000',
      description: 'Húmeda torta de zanahoria con especias, nueces y cubierta de frosting de queso crema. Un clásico que nunca pasa de moda.',
      image: '/img/images16.jpeg',
      category: 'Tortas Circulares / Tradicional',
      code: 'ZAN-011'
    },
    'tiramisu': {
      title: 'Tiramisú Individual',
      price: '$6.000',
      description: 'Clásico postre italiano en porción individual, con café, cacao y queso mascarpone. Elegante y delicioso.',
      image: '/img/images18.jpeg',
      category: 'Postres Individuales',
      code: 'TIR-012'
    }
  };

  useEffect(() => {
    if (productId && products[productId]) {
      setProduct(products[productId]);
      document.title = `${products[productId].title} - Pastelería Mil Sabores`;
    }
  }, [productId]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: productId,
      name: product.title,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
      message: message,
      image: product.image
    };

    addToCart(cartItem);
    
    alert(`¡${product.title} añadido al carrito!\n${quantity} x ${product.title}\nTamaño: ${selectedSize}\n${message ? 'Mensaje: ' + message : ''}`);
  };

  if (!product) {
    return (
      <div className="container py-5 mt-5">
        <div className="text-center">
          <h2>Producto no encontrado</h2>
          <p>El producto que buscas no está disponible.</p>
          <Link to="/productos" className="btn btn-primary">
            Volver a Productos
          </Link>
        </div>
      </div>
    );
  }

  const breadcrumbCategory = product.category.split(' / ')[0];

  return (
    <div className="detalle-producto-page">
      {/* Breadcrumb */}
      <section className="breadcrumb-section py-3 mt-5">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Inicio</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/productos">Productos</Link>
              </li>
              <li className="breadcrumb-item active">{breadcrumbCategory}</li>
              <li className="breadcrumb-item active">{product.title}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="product-detail py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="product-image text-center mb-4">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="img-fluid rounded"
                  style={{ 
                    maxHeight: '500px', 
                    width: '100%', 
                    objectFit: 'cover',
                    borderRadius: '10px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <h1 className="product-title">{product.title}</h1>
              <p className="product-price h4 text-primary">{product.price}</p>
              <div className="product-description my-4">
                {product.description}
              </div>
              
              <div className="customization-options mb-4">
                <div className="size-options mb-3">
                  <h5>Tamaño:</h5>
                  <div className="btn-group" role="group">
                    {['pequeno', 'mediano', 'grande'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`btn btn-outline-primary size-btn ${selectedSize === size ? 'active' : ''}`}
                        onClick={() => handleSizeSelect(size)}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="message-option mb-3">
                  <h5>Mensaje personalizado (opcional):</h5>
                  <textarea 
                    className="form-control message-input" 
                    placeholder="Escribe tu mensaje aquí (máx. 50 caracteres)" 
                    maxLength="50" 
                    rows="2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
              
              <div className="add-to-cart-section mb-4">
                <div className="d-flex align-items-center">
                  <div className="quantity-selector me-3">
                    <button 
                      className="btn btn-outline-secondary quantity-btn"
                      onClick={() => handleQuantityChange(-1)}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      className="quantity-input form-control text-center mx-2" 
                      value={quantity} 
                      min="1" 
                      style={{ width: '60px' }}
                      readOnly
                    />
                    <button 
                      className="btn btn-outline-secondary quantity-btn"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className="btn btn-primary btn-lg" 
                    onClick={handleAddToCart}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
              
              <div className="product-details">
                <div className="detail-item mb-2">
                  <strong>Categoría:</strong> <span>{product.category}</span>
                </div>
                <div className="detail-item mb-2">
                  <strong>Código:</strong> <span>{product.code}</span>
                </div>
                <div className="detail-item">
                  <strong>Disponibilidad:</strong> <span className="text-success">En stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetalleProducto;