import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, Check, Info, GitCompare } from 'lucide-react';
import { products } from '../data/products';
import { Product, ProductConfiguration } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import CustomerReviews from '../components/CustomerReviews';
import SocialSharing from '../components/SocialSharing';
import ProductComparison from '../components/ProductComparison';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [configuration, setConfiguration] = useState<ProductConfiguration>({});
  const [configuredPrice, setConfiguredPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showComparison, setShowComparison] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const { showNotification } = useNotification();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id || '0'));
    if (foundProduct) {
      setProduct(foundProduct);
      setConfiguredPrice(foundProduct.price);
      
      // Set default configuration
      if (foundProduct.options) {
        const defaultConfig: ProductConfiguration = {};
        foundProduct.options.forEach(option => {
          if (option.required && option.variants.length > 0) {
            defaultConfig[option.id] = option.variants[0].id;
          }
        });
        setConfiguration(defaultConfig);
      }
    }
  }, [id]);

  useEffect(() => {
    if (product && product.options) {
      let totalPrice = product.price;
      
      Object.entries(configuration).forEach(([optionId, variantId]) => {
        const option = product.options?.find(opt => opt.id === optionId);
        const variant = option?.variants.find(v => v.id === variantId);
        if (variant) {
          totalPrice += variant.price;
        }
      });
      
      setConfiguredPrice(totalPrice);
    }
  }, [configuration, product]);

  const handleConfigurationChange = (optionId: string, variantId: string) => {
    setConfiguration(prev => ({
      ...prev,
      [optionId]: variantId
    }));
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem(product, quantity, configuration, configuredPrice);
    showNotification(`${product.name} added to cart!`, 'success');
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    
    addToWishlist(product);
    showNotification(`${product.name} added to wishlist!`, 'success');
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-apple-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-apple-gray-900 mb-4">Product not found</h2>
          <Link to="/products" className="text-apple-blue-500 hover:text-apple-blue-600">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.gallery || [product.image];

  return (
    <div className="min-h-screen bg-apple-gray-50 pt-20">
      <div className="container-padding">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/products"
            className="flex items-center text-apple-blue-500 hover:text-apple-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border border-apple-gray-200">
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
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
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

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-apple-gray-500 bg-apple-gray-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowComparison(true)}
                    className="p-2 text-apple-gray-600 hover:text-purple-600 transition-colors"
                  >
                    <GitCompare className="w-5 h-5" />
                  </button>
                  <SocialSharing product={product} type="product" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-apple-gray-900 mb-4">{product.name}</h1>
              <p className="text-lg text-apple-gray-600 mb-6">{product.description}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-apple-gray-900">
                  ${configuredPrice.toLocaleString()}
                </span>
                {configuredPrice > product.price && (
                  <span className="text-lg text-apple-gray-500 line-through">
                    ${product.price.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Product Configuration */}
            {product.customizable && product.options && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-apple-gray-900">Customize your {product.name}</h3>
                
                {product.options.map((option) => (
                  <div key={option.id} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-apple-gray-900">{option.name}</h4>
                      {option.required && (
                        <span className="text-xs text-red-500">Required</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      {option.variants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => handleConfigurationChange(option.id, variant.id)}
                          className={`p-4 text-left border-2 rounded-xl transition-colors ${
                            configuration[option.id] === variant.id
                              ? 'border-apple-blue-500 bg-apple-blue-50'
                              : 'border-apple-gray-200 hover:border-apple-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium text-apple-gray-900">{variant.name}</span>
                              {variant.description && (
                                <p className="text-sm text-apple-gray-600 mt-1">{variant.description}</p>
                              )}
                            </div>
                            <div className="text-right">
                              {variant.price > 0 && (
                                <span className="text-sm font-medium text-apple-gray-900">
                                  +${variant.price}
                                </span>
                              )}
                              {configuration[option.id] === variant.id && (
                                <Check className="w-5 h-5 text-apple-blue-500 mt-1" />
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-medium text-apple-gray-900">Quantity:</label>
                <div className="flex items-center border border-apple-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-apple-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-apple-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-apple-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-apple-blue-500 text-white py-4 rounded-xl hover:bg-apple-blue-600 transition-colors flex items-center justify-center font-semibold"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                
                <button
                  onClick={handleAddToWishlist}
                  className={`px-6 py-4 rounded-xl border-2 transition-colors flex items-center justify-center ${
                    isInWishlist(product.id)
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-apple-gray-300 text-apple-gray-700 hover:border-red-500 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-apple-gray-200 overflow-hidden">
          <div className="border-b border-apple-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview' },
                { id: 'specs', name: 'Specifications' },
                { id: 'reviews', name: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-apple-blue-500 text-apple-blue-600'
                      : 'border-transparent text-apple-gray-500 hover:text-apple-gray-700 hover:border-apple-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {product.features && (
                  <div>
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-apple-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Product Description</h3>
                  <p className="text-apple-gray-700 leading-relaxed">{product.description}</p>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div>
                <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Technical Specifications</h3>
                {product.specifications ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center p-4 bg-apple-gray-50 rounded-lg">
                        <span className="font-medium text-apple-gray-900">{key}</span>
                        <span className="text-apple-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-apple-gray-600">No specifications available for this product.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <CustomerReviews productId={product.id} productName={product.name} />
            )}
          </div>
        </div>

        {/* Product Comparison Modal */}
        <ProductComparison
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
          initialProducts={[product]}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
