import React, { useState } from 'react';
import { X, Plus, Check, Minus, Star, DollarSign, Zap, Shield } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data/products';

interface ComparisonFeature {
  category: string;
  features: {
    name: string;
    key: string;
    type: 'text' | 'boolean' | 'rating' | 'price' | 'list';
  }[];
}

const ProductComparisonMatrix: React.FC<{ 
  initialProducts?: Product[];
  isOpen: boolean;
  onClose: () => void;
}> = ({ initialProducts = [], isOpen, onClose }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(initialProducts);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const comparisonFeatures: ComparisonFeature[] = [
    {
      category: 'Basic Information',
      features: [
        { name: 'Price', key: 'price', type: 'price' },
        { name: 'Category', key: 'category', type: 'text' },
        { name: 'Rating', key: 'rating', type: 'rating' }
      ]
    },
    {
      category: 'Technical Specifications',
      features: [
        { name: 'Display', key: 'specifications.Display', type: 'text' },
        { name: 'Chip', key: 'specifications.Chip', type: 'text' },
        { name: 'Storage', key: 'specifications.Storage', type: 'text' },
        { name: 'Battery', key: 'specifications.Battery', type: 'text' }
      ]
    },
    {
      category: 'Features',
      features: [
        { name: 'Customizable', key: 'customizable', type: 'boolean' },
        { name: 'Key Features', key: 'features', type: 'list' }
      ]
    }
  ];

  const addProduct = (product: Product) => {
    if (selectedProducts.length < 4 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
      setShowAddProduct(false);
    }
  };

  const removeProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const getFeatureValue = (product: Product, featureKey: string) => {
    const keys = featureKey.split('.');
    let value: any = product;
    
    for (const key of keys) {
      value = value?.[key];
    }
    
    return value;
  };

  const renderFeatureValue = (product: Product, feature: any) => {
    const value = getFeatureValue(product, feature.key);
    
    switch (feature.type) {
      case 'price':
        return (
          <div className="flex items-center space-x-1">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className="font-bold text-green-600">${value?.toLocaleString()}</span>
          </div>
        );
      
      case 'boolean':
        return value ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <Minus className="w-5 h-5 text-red-500" />
        );
      
      case 'rating':
        return (
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>4.8</span>
          </div>
        );
      
      case 'list':
        return value ? (
          <div className="space-y-1">
            {value.slice(0, 3).map((item: string, index: number) => (
              <div key={index} className="text-xs bg-apple-gray-100 px-2 py-1 rounded">
                {item}
              </div>
            ))}
            {value.length > 3 && (
              <div className="text-xs text-apple-gray-500">+{value.length - 3} more</div>
            )}
          </div>
        ) : (
          <span className="text-apple-gray-400">-</span>
        );
      
      default:
        return value || <span className="text-apple-gray-400">-</span>;
    }
  };

  const getBestValue = (feature: any) => {
    if (feature.type === 'price') {
      return Math.min(...selectedProducts.map(p => getFeatureValue(p, feature.key) || Infinity));
    }
    return null;
  };

  const isBestValue = (product: Product, feature: any) => {
    if (feature.type === 'price') {
      const bestValue = getBestValue(feature);
      return getFeatureValue(product, feature.key) === bestValue;
    }
    return false;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-apple-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-apple-gray-900">Product Comparison</h2>
            <p className="text-apple-gray-600">Compare up to 4 products side by side</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-apple-gray-400 hover:text-apple-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-auto max-h-[calc(90vh-120px)]">
          {/* Product Headers */}
          <div className="sticky top-0 bg-white border-b border-apple-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="font-medium text-apple-gray-900">Features</div>
              {selectedProducts.map((product) => (
                <div key={product.id} className="relative">
                  <div className="bg-apple-gray-50 rounded-lg p-4">
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-2 right-2 p-1 text-apple-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-apple-gray-900 text-sm mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-apple-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Add Product Button */}
              {selectedProducts.length < 4 && (
                <div>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="w-full h-full min-h-[140px] border-2 border-dashed border-apple-gray-300 rounded-lg flex flex-col items-center justify-center text-apple-gray-500 hover:border-apple-blue-500 hover:text-apple-blue-500 transition-colors"
                  >
                    <Plus className="w-8 h-8 mb-2" />
                    <span className="text-sm">Add Product</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="p-6">
            {comparisonFeatures.map((category) => (
              <div key={category.category} className="mb-8">
                <h3 className="text-lg font-bold text-apple-gray-900 mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-apple-blue-500" />
                  {category.category}
                </h3>
                
                <div className="space-y-3">
                  {category.features.map((feature) => (
                    <div key={feature.key} className="grid grid-cols-1 md:grid-cols-5 gap-4 py-3 border-b border-apple-gray-100">
                      <div className="font-medium text-apple-gray-700">
                        {feature.name}
                      </div>
                      {selectedProducts.map((product) => (
                        <div
                          key={product.id}
                          className={`p-3 rounded-lg ${
                            isBestValue(product, feature)
                              ? 'bg-green-50 border border-green-200'
                              : 'bg-apple-gray-50'
                          }`}
                        >
                          {renderFeatureValue(product, feature)}
                          {isBestValue(product, feature) && (
                            <div className="text-xs text-green-600 font-medium mt-1">
                              Best Value
                            </div>
                          )}
                        </div>
                      ))}
                      {selectedProducts.length < 4 && (
                        <div className="p-3 bg-apple-gray-50 rounded-lg opacity-50"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t border-apple-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div></div>
              {selectedProducts.map((product) => (
                <button
                  key={product.id}
                  className="px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
                >
                  Add to Cart
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-apple-gray-200">
                <h3 className="text-lg font-bold text-apple-gray-900">Add Product to Compare</h3>
                <button
                  onClick={() => setShowAddProduct(false)}
                  className="p-2 text-apple-gray-400 hover:text-apple-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products
                    .filter(p => !selectedProducts.find(sp => sp.id === p.id))
                    .map((product) => (
                      <button
                        key={product.id}
                        onClick={() => addProduct(product)}
                        className="flex items-center space-x-3 p-3 border border-apple-gray-200 rounded-lg hover:border-apple-blue-500 hover:bg-apple-blue-50 transition-colors text-left"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-apple-gray-900">{product.name}</h4>
                          <p className="text-sm text-apple-gray-600">${product.price.toLocaleString()}</p>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComparisonMatrix;
