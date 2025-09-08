import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Share2, Heart } from 'lucide-react';
import { Product, ProductOption, ProductConfiguration } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';

interface ProductCustomizerProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductCustomizer: React.FC<ProductCustomizerProps> = ({
  product,
  isOpen,
  onClose
}) => {
  const [configuration, setConfiguration] = useState<ProductConfiguration>({});
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const { addItem } = useCart();
  const { addItem: addToWishlist } = useWishlist();
  const { showNotification } = useNotification();

  useEffect(() => {
    if (product.options) {
      const defaultConfig: ProductConfiguration = {};
      let price = product.price;

      product.options.forEach(option => {
        if (option.required && option.variants.length > 0) {
          defaultConfig[option.id] = option.variants[0].id;
          price += option.variants[0].price;
        }
      });

      setConfiguration(defaultConfig);
      setTotalPrice(price);
    }
  }, [product]);

  const handleOptionChange = (optionId: string, variantId: string) => {
    const newConfig = { ...configuration, [optionId]: variantId };
    setConfiguration(newConfig);

    // Calculate new price
    let price = product.price;
    if (product.options) {
      product.options.forEach(option => {
        const selectedVariantId = newConfig[option.id];
        if (selectedVariantId) {
          const variant = option.variants.find(v => v.id === selectedVariantId);
          if (variant) {
            price += variant.price;
          }
        }
      });
    }
    setTotalPrice(price);
  };

  const handleAddToCart = () => {
    addItem({
      product,
      quantity: 1,
      configuration,
      configuredPrice: totalPrice
    });
    showNotification("Product added to cart with custom configuration!", "success");
    onClose();
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    showNotification("Product added to wishlist!", "success");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this customized ${product.name}`,
          url: window.location.href
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showNotification("Product link copied to clipboard!", "success");
    }
  };

  const resetConfiguration = () => {
    if (product.options) {
      const defaultConfig: ProductConfiguration = {};
      let price = product.price;

      product.options.forEach(option => {
        if (option.required && option.variants.length > 0) {
          defaultConfig[option.id] = option.variants[0].id;
          price += option.variants[0].price;
        }
      });

      setConfiguration(defaultConfig);
      setTotalPrice(price);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="inline-block w-full max-w-6xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-apple-gray-200">
            <h2 className="text-2xl font-bold text-apple-gray-900">
              Customize {product.name}
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="p-2 text-apple-gray-600 hover:text-apple-blue-500 transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={handleAddToWishlist}
                className="p-2 text-apple-gray-600 hover:text-red-500 transition-colors"
                title="Add to Wishlist"
              >
                <Heart className="w-5 h-5" />
              </button>
              <button
                onClick={resetConfiguration}
                className="p-2 text-apple-gray-600 hover:text-apple-blue-500 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-apple-gray-600 hover:text-apple-gray-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Preview */}
            <div className="space-y-4">
              <div className="aspect-square bg-apple-gray-50 rounded-2xl overflow-hidden">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.gallery && (
                <div className="flex space-x-2 overflow-x-auto">
                  {[product.image, ...product.gallery].map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === image
                          ? 'border-apple-blue-500'
                          : 'border-apple-gray-200 hover:border-apple-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Price Display */}
              <div className="bg-apple-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-apple-gray-900">
                    Total Price:
                  </span>
                  <span className="text-2xl font-bold text-apple-blue-500">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                {totalPrice > product.price && (
                  <div className="text-sm text-apple-gray-600 mt-1">
                    Base price: ${product.price.toLocaleString()} + ${(totalPrice - product.price).toLocaleString()} customization
                  </div>
                )}
              </div>
            </div>

            {/* Configuration Options */}
            <div className="space-y-6">
              {product.options?.map((option) => (
                <div key={option.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-apple-gray-900">
                      {option.name}
                    </h3>
                    {option.required && (
                      <span className="text-xs text-red-500 font-medium">Required</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {option.variants.map((variant) => {
                      const isSelected = configuration[option.id] === variant.id;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => handleOptionChange(option.id, variant.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            isSelected
                              ? 'border-apple-blue-500 bg-apple-blue-50'
                              : 'border-apple-gray-200 hover:border-apple-gray-300 bg-white'
                          }`}
                        >
                          <div className="font-medium text-apple-gray-900">
                            {variant.name}
                          </div>
                          {variant.description && (
                            <div className="text-sm text-apple-gray-600 mt-1">
                              {variant.description}
                            </div>
                          )}
                          <div className="text-sm font-semibold text-apple-blue-500 mt-2">
                            {variant.price > 0 ? `+$${variant.price.toLocaleString()}` : 'Included'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-apple-blue-500 text-white rounded-xl font-semibold hover:bg-apple-blue-600 transition-colors"
              >
                Add to Cart - ${totalPrice.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;
