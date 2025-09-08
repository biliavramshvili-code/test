import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star, Zap } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import VirtualTryOn from './VirtualTryOn';
import QuickView from './QuickView';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const [showVirtualTryOn, setShowVirtualTryOn] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleVirtualTryOn = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowVirtualTryOn(true);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  // Check if product supports virtual try-on
  const supportsVirtualTryOn = ['Apple Watch', 'AirPods', 'iPhone'].includes(product.category);

  return (
    <>
      <div
        className={`group relative bg-white rounded-2xl shadow-sm border border-apple-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden ${
          compact ? 'p-4' : 'p-6'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="block">
          <div className={`relative ${compact ? 'h-32' : 'h-48'} mb-4 overflow-hidden rounded-xl bg-apple-gray-50`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Overlay Actions */}
            <div className={`absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2 ${compact ? 'hidden' : ''}`}>
              <button
                onClick={handleQuickView}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                title="Quick View"
              >
                <Eye className="w-4 h-4 text-apple-gray-700" />
              </button>
              
              {supportsVirtualTryOn && (
                <button
                  onClick={handleVirtualTryOn}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
                  title="Virtual Try-On"
                >
                  <Zap className="w-4 h-4 text-purple-500" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-sm transition-all ${
                isWishlisted
                  ? 'bg-red-500 text-white'
                  : 'bg-white/80 text-apple-gray-600 hover:bg-white hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>

            {/* New/Featured Badge */}
            {product.id <= 3 && (
              <div className="absolute top-3 left-3 bg-apple-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                New
              </div>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="space-y-2">
          <Link to={`/product/${product.id}`}>
            <h3 className={`font-semibold text-apple-gray-900 group-hover:text-apple-blue-500 transition-colors ${
              compact ? 'text-sm' : 'text-lg'
            }`}>
              {product.name}
            </h3>
          </Link>
          
          {!compact && (
            <p className="text-sm text-apple-gray-600 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? 'text-yellow-400 fill-current' : 'text-apple-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-apple-gray-500 ml-1">(4.0)</span>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className={`font-bold text-apple-gray-900 ${compact ? 'text-lg' : 'text-xl'}`}>
                ${product.price}
              </span>
              {!compact && product.price > 1000 && (
                <div className="text-xs text-apple-gray-500">
                  or ${Math.round(product.price / 12)}/mo
                </div>
              )}
            </div>
            
            <button
              onClick={handleAddToCart}
              className={`flex items-center space-x-2 bg-apple-blue-500 text-white rounded-lg font-medium hover:bg-apple-blue-600 transition-colors ${
                compact ? 'px-3 py-2 text-sm' : 'px-4 py-2'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {!compact && <span>Add</span>}
            </button>
          </div>

          {/* Features Preview */}
          {!compact && product.features && product.features.length > 0 && (
            <div className="pt-2">
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-apple-gray-100 text-apple-gray-600 px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 2 && (
                  <span className="text-xs text-apple-gray-500">
                    +{product.features.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Hover Animation */}
        <div className={`absolute inset-0 border-2 border-apple-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'animate-pulse' : ''
        }`} />
      </div>

      {/* Modals */}
      <VirtualTryOn
        product={product}
        isOpen={showVirtualTryOn}
        onClose={() => setShowVirtualTryOn(false)}
      />
      
      <QuickView
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
