import React, { useState } from 'react';
import { X, ShoppingCart, Heart, Eye, Star, Plus, Minus } from 'lucide-react';
import { Product, ProductConfiguration } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [configuration, setConfiguration] = useState<ProductConfiguration>({});

  if (!isOpen || !product) return null;

  const images = product.gallery || [product.image];
  
  // Calculate configured price
  const getConfiguredPrice = () => {
    if (!product.customizable || !product.options) return product.price;
    
    let totalPrice = product.price;
    product.options.forEach(option => {
      const selectedVariantId = configuration[option.id];
      if (selectedVariantId) {
        const variant = option.variants.find(v => v.id === selectedVariantId);
        if (variant) {
          totalPrice = variant.price;
        }
      }
    });
    return totalPrice;
  };

  const handleAddToCart = () => {
    addItem({
      product,
      quantity,
      configuration: product.customizable ? configuration : undefined,
      configuredPrice: getConfiguredPrice()
    });
    onClose();
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  const updateConfiguration = (optionId: string, variantId: string) => {
    setConfiguration(prev => ({
      ...prev,
      [optionId]: variantId
    }));
  };

  // Check if all required options are selected
  const canAddToCart = !product.customizable || 
    !product.options ||
    product.options.filter(opt => opt.required).every(opt => configuration[opt.id]);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-apple-gray-200">
          <h2 className="text-xl font-semibold text-apple-gray-900">Quick View</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-apple-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 overflow-auto max-h-[calc(90vh-120px)]">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-apple-gray-100 rounded-2xl overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-apple-blue-500'
                        : 'border-apple-gray-200 hover:border-apple-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-apple-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-2xl font-bold text-apple-blue-600">
                  ${getConfiguredPrice().toLocaleString()}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-apple-gray-600">4.8 (124 reviews)</span>
                </div>
              </div>
              <p className="text-apple-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Options */}
            {product.customizable && product.options && (
              <div className="space-y-4">
                {product.options.map(option => (
                  <div key={option.id}>
                    <h3 className="font-medium text-apple-gray-900 mb-2">
                      {option.name}
                      {option.required && <span className="text-red-500 ml-1">*</span>}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {option.variants.map(variant => (
                        <button
                          key={variant.id}
                          onClick={() => updateConfiguration(option.id, variant.id)}
                          className={`p-3 text-left border rounded-lg transition-colors ${
                            configuration[option.id] === variant.id
                              ? 'border-apple-blue-500 bg-apple-blue-50 text-apple-blue-700'
                              : 'border-apple-gray-200 hover:border-apple-gray-300'
                          }`}
                        >
                          <div className="font-medium">{variant.name}</div>
                          {variant.price !== product.price && (
                            <div className="text-sm text-apple-gray-600">
                              ${variant.price.toLocaleString()}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="font-medium text-apple-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-apple-gray-300 rounded-lg hover:bg-apple-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-apple-gray-300 rounded-lg hover:bg-apple-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
                  canAddToCart
                    ? 'bg-apple-blue-500 text-white hover:bg-apple-blue-600'
                    : 'bg-apple-gray-200 text-apple-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={handleAddToWishlist}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 border rounded-lg font-semibold transition-colors ${
                    isInWishlist(product.id)
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-apple-gray-300 text-apple-gray-700 hover:bg-apple-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  <span>{isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 px-6 border border-apple-gray-300 text-apple-gray-700 rounded-lg font-semibold hover:bg-apple-gray-50 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
