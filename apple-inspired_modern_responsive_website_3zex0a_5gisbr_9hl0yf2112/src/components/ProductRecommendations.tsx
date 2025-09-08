import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, TrendingUp, Users, Clock } from 'lucide-react';
import { Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAnalytics } from '../context/AnalyticsContext';

interface ProductRecommendationsProps {
  currentProduct?: Product;
  userId?: string;
  type?: 'similar' | 'trending' | 'personalized' | 'frequently-bought';
  title?: string;
  maxItems?: number;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  currentProduct,
  userId,
  type = 'similar',
  title,
  maxItems = 8
}) => {
  const { products } = useProducts();
  const { addItem } = useCart();
  const { addItem: addToWishlist } = useWishlist();
  const { trackEvent } = useAnalytics();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateRecommendations();
  }, [products, currentProduct, type, userId]);

  const generateRecommendations = () => {
    setLoading(true);
    let recommended: Product[] = [];

    switch (type) {
      case 'similar':
        if (currentProduct) {
          recommended = products.filter(p => 
            p.id !== currentProduct.id && 
            p.category === currentProduct.category
          ).slice(0, maxItems);
        }
        break;
      
      case 'trending':
        // Simulate trending products (in real app, this would come from analytics)
        recommended = [...products]
          .sort(() => Math.random() - 0.5)
          .slice(0, maxItems);
        break;
      
      case 'personalized':
        // Simulate personalized recommendations based on user behavior
        recommended = [...products]
          .sort(() => Math.random() - 0.5)
          .slice(0, maxItems);
        break;
      
      case 'frequently-bought':
        if (currentProduct) {
          // Simulate frequently bought together
          recommended = products.filter(p => 
            p.id !== currentProduct.id
          ).slice(0, Math.min(4, maxItems));
        }
        break;
    }

    setRecommendations(recommended);
    setLoading(false);
  };

  const getTitle = () => {
    if (title) return title;
    
    switch (type) {
      case 'similar': return 'Similar Products';
      case 'trending': return 'Trending Now';
      case 'personalized': return 'Recommended for You';
      case 'frequently-bought': return 'Frequently Bought Together';
      default: return 'You Might Like';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'trending': return <TrendingUp className="w-5 h-5" />;
      case 'personalized': return <Users className="w-5 h-5" />;
      case 'frequently-bought': return <Clock className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
    trackEvent('add_to_cart', { product_id: product.id, source: 'recommendations' });
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product);
    trackEvent('add_to_wishlist', { product_id: product.id, source: 'recommendations' });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 4 >= recommendations.length ? 0 : prev + 4
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - 4 < 0 ? Math.max(0, recommendations.length - 4) : prev - 4
    );
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-apple-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-6">
                <div className="bg-apple-gray-200 h-48 rounded-xl mb-4"></div>
                <div className="bg-apple-gray-200 h-6 rounded mb-2"></div>
                <div className="bg-apple-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-apple-blue-100 rounded-lg text-apple-blue-600">
            {getIcon()}
          </div>
          <h2 className="text-2xl font-bold text-apple-gray-900">{getTitle()}</h2>
        </div>
        
        {recommendations.length > 4 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white border border-apple-gray-200 hover:bg-apple-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-apple-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white border border-apple-gray-200 hover:bg-apple-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-apple-gray-600" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendations.slice(currentIndex, currentIndex + 4).map((product) => (
          <div key={product.id} className="group bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="relative mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => handleAddToWishlist(product)}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              >
                <Star className="w-4 h-4 text-apple-gray-600" />
              </button>
            </div>
            
            <h3 className="font-semibold text-apple-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-apple-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-apple-gray-900">
                ${product.price.toLocaleString()}
              </span>
              <button
                onClick={() => handleAddToCart(product)}
                className="px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors text-sm font-medium"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {type === 'frequently-bought' && recommendations.length > 0 && (
        <div className="mt-6 p-4 bg-apple-blue-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-apple-gray-900">Bundle Deal</h4>
              <p className="text-sm text-apple-gray-600">
                Buy all {recommendations.length + 1} items together and save 15%
              </p>
            </div>
            <button className="px-6 py-3 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors font-medium">
              Add Bundle to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductRecommendations;
