import React from 'react';
import { ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';

const ProductGrid: React.FC = () => {
  const { products, loading, error } = useProducts();
  const { dispatch } = useCart();

  const addToCart = (product: any) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    dispatch({ type: 'OPEN_CART' });
  };

  if (loading) {
    return (
      <section id="products" className="section-padding bg-white">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="text-display font-bold text-apple-gray-700 mb-6">
              Our Products
            </h2>
            <p className="text-xl text-apple-gray-500 max-w-3xl mx-auto">
              Discover our complete lineup of innovative products designed to enhance your digital lifestyle.
            </p>
          </div>
          
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-apple-blue-500" />
            <span className="ml-3 text-apple-gray-500">Loading products...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="products" className="section-padding bg-white">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="text-display font-bold text-apple-gray-700 mb-6">
              Our Products
            </h2>
            <p className="text-xl text-apple-gray-500 max-w-3xl mx-auto">
              Discover our complete lineup of innovative products designed to enhance your digital lifestyle.
            </p>
          </div>
          
          <div className="text-center py-16">
            <p className="text-red-500 mb-4">Error loading products: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="section-padding bg-white">
      <div className="container-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-display font-bold text-apple-gray-700 mb-6">
            Our Products
          </h2>
          <p className="text-xl text-apple-gray-500 max-w-3xl mx-auto">
            Discover our complete lineup of innovative products designed to enhance your digital lifestyle.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-apple-gray-500 mb-4">No products available at the moment.</p>
            <p className="text-sm text-apple-gray-400">Please check back later or contact support.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 6).map((product, index) => (
                <div
                  key={product.id}
                  className="card hover-lift animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-w-16 aspect-h-12 overflow-hidden rounded-t-3xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-apple-blue-500 uppercase tracking-wide">
                        {product.category}
                      </span>
                      <span className="text-sm font-semibold text-apple-gray-600">
                        ${product.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-apple-gray-700 mb-3">
                      {product.name}
                    </h3>
                    
                    <p className="text-apple-gray-500 mb-6 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Link
                        to={`/product/${product.id}`}
                        className="group/btn flex items-center space-x-2 text-apple-blue-500 hover:text-apple-blue-600 font-semibold transition-colors duration-300"
                      >
                        <span>Learn more</span>
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                      
                      <button
                        onClick={() => addToCart(product)}
                        className="flex items-center space-x-2 bg-apple-blue-500 hover:bg-apple-blue-600 text-white px-4 py-2 rounded-full font-medium transition-colors duration-300"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/products" className="btn-primary">
                <span>View All Products</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
