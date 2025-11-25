// src/pages/Blog.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      id: "receta-red-velvet",
      image: "/img/images1.jpeg",
      title: "Torta Red Velvet",
      description: "Aprende a preparar una deliciosa Torta Red Velvet con esta receta fácil y rápida.",
      category: "tortas"
    },
    {
      id: "receta-chocolate-torta",
      image: "/img/images2.jpeg",
      title: "Torta de Chocolate",
      description: "Descubre cómo hacer una irresistible Torta de Chocolate con esta receta sencilla.",
      category: "tortas"
    },
    {
      id: "receta-tres-leches",
      image: "/img/images3.jpeg",
      title: "Torta de Tres Leches",
      description: "No te pierdas esta deliciosa Torta de Tres Leches, un postre clásico y esponjoso.",
      category: "tortas"
    },
    {
      id: "receta-frambuesa",
      image: "/img/images4.jpeg",
      title: "Cupcake de Frambuesa",
      description: "Deliciosos cupcakes con el sabor dulce y ligeramente ácido de las frambuesas frescas. Con un frosting cremoso decorado con frambuesas naturales.",
      category: "cupcakes"
    },
    {
      id: "receta-arandano",
      image: "/img/images5.jpeg",
      title: "Cupcake de Arándano",
      description: "Exquisitos cupcakes repletos de jugosos arándanos que explotan de sabor en cada bocado. Un frosting suave corona estos deliciosos postres antioxidantes.",
      category: "cupcakes"
    },
    {
      id: "receta-oreo",
      image: "/img/images6.jpeg",
      title: "Cupcake de Oreo",
      description: "Irresistibles cupcakes de chocolate con trozos de galletas Oreo incorporados en la masa. Coronados con un cremoso frosting y más galletas Oreo trituradas.",
      category: "cupcakes"
    }
  ];

  const tortasPosts = blogPosts.filter(post => post.category === "tortas");
  const cupcakesPosts = blogPosts.filter(post => post.category === "cupcakes");

  return (
    <div className="blog-page">
      {/* Header */}
      <div className="tituloBlog text-center mb-3 mt-5 pt-5">
        <h1>Blog del Rincón Dulce</h1>
      </div>

      {/* Sección Tortas */}
      <div className="container mb-5">
        <h2 className="text-center mb-4">Tortas</h2>
        <div className="row justify-content-center g-4">
          {tortasPosts.map((post) => (
            <div key={post.id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card pastel h-100" style={{ width: '18rem' }}>
                <img 
                  src={post.image} 
                  className="card-img-top" 
                  alt={post.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text flex-grow-1">{post.description}</p>
                  <Link 
                    to={`/recetas#${post.id}`} 
                    className="btn btn-primary mt-auto"
                  >
                    Ver receta
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección Cupcakes */}
      <div className="container mb-5">
        <h2 className="text-center mb-4">Cupcakes</h2>
        <div className="row justify-content-center g-4">
          {cupcakesPosts.map((post) => (
            <div key={post.id} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card pastel h-100" style={{ width: '18rem' }}>
                <img 
                  src={post.image} 
                  className="card-img-top" 
                  alt={post.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text flex-grow-1">{post.description}</p>
                  <Link 
                    to={`/recetas#${post.id}`} 
                    className="btn btn-primary mt-auto"
                  >
                    Ver receta
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;