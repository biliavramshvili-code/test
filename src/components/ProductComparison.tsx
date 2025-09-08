import React, { useState } from 'react';
import { X, Plus, Check, Minus, Star, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

interface ComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  initialProducts?: Product[];
}

const ProductComparison: React.FC<ComparisonProps> = ({ isOpen, onClose, initialProducts = [] }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(initialProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const { addItem } = useCart();
  const { showNotification } = useNotification();

  const addProduct = (product: Product) => {
    if (selectedProducts.length >= 4) {
      showNotification("You can compare up to 4 products at once", 'warning');
      return;
    }
    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
    setShowAddModal(false);
  };

  const removeProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    showNotification(`${product.name} added to cart!`, 'success');
  };

  const getComparisonRows = () => {
    const rows = [
      { key: 'price', label: 'Price', type: 'price' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'description', label: 'Description', type: 'text' },
      { key: 'specifications', label: 'Specifications', type: 'specs' },
      { key: 'features', label: 'Key Features', type: 'features' }
    ];

    return rows;
  };

  const renderCellContent = (product: Product, row: any) => {
    switch (row.type) {
      case 'price':
        return (
          <div className="text-center">
            <span className="text-2xl font-bold text-apple-gray-900">${product.price.toLocaleString()}</span>
          </div>
        );
      case 'text':
        return (
          <div className="text-sm text-apple-gray-700">
            {product[row.key as keyof Product] as string}
          </div>
        );
      case 'specs':
        return (
          <div className="space-y-2">
            {product.specifications ? Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="text-sm">
                <span className="font-medium text-apple-gray-900">{key}:</span>
                <span className="text-apple-gray-700 ml-1">{value}</span>
              </div>
            )) : <span className="text-apple-gray-500">No specifications available</span>}
          </div>
        );
      case 'features':
        return (
          <div className="space-y-1">
            {product.features ? product.features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-apple-gray-700">
                <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                {feature}
              </div>
            )) : <span className="text-apple-gray-500">No features listed</span>}
          </div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-apple-gray-200">
          <h2 className="text-2xl font-bold text-apple-gray-900">Product Comparison</h2>
          <button
            onClick={onClose}
            className="text-apple-gray-400 hover:text-apple-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          {selectedProducts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-apple-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-apple-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">No products to compare</h3>
              <p className="text-apple-gray-600 mb-6">Add products to start comparing their features and specifications</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-apple-blue-500 text-white rounded-xl hover:bg-apple-blue-600 transition-colors"
              >
                Add Products
              </button>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 gap-6" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}>
                {/* Header Row */}
                <div className="font-semibold text-apple-gray-900">Products</div>
                {selectedProducts.map((product) => (
                  <div key={product.id} className="text-center">
                    <div className="relative mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="font-semibold text-apple-gray-900 mb-2">{product.name}</h3>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
                {selectedProducts.length < 4 && (
                  <div className="text-center">
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="w-full h-32 border-2 border-dashed border-apple-gray-300 rounded-lg flex items-center justify-center hover:border-apple-blue-500 hover:bg-apple-blue-50 transition-colors"
                    >
                      <Plus className="w-8 h-8 text-apple-gray-400" />
                    </button>
                    <p className="text-sm text-apple-gray-500 mt-2">Add Product</p>
                  </div>
                )}

                {/* Comparison Rows */}
                {getComparisonRows().map((row) => (
                  <React.Fragment key={row.key}>
                    <div className="font-medium text-apple-gray-900 py-4 border-t border-apple-gray-200">
                      {row.label}
                    </div>
                    {selectedProducts.map((product) => (
                      <div key={`${product.id}-${row.key}`} className="py-4 border-t border-apple-gray-200">
                        {renderCellContent(product, row)}
                      </div>
                    ))}
                    {selectedProducts.length < 4 && (
                      <div className="py-4 border-t border-apple-gray-200"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add Product Modal */}
        {showAddModal && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-apple-gray-200">
                <h3 className="text-lg font-semibold text-apple-gray-900">Add Product to Compare</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-apple-gray-400 hover:text-apple-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.filter(p => !selectedProducts.find(sp => sp.id === p.id)).map((product) => (
                    <div key={product.id} className="border border-apple-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h4 className="font-medium text-apple-gray-900 mb-1">{product.name}</h4>
                      <p className="text-sm text-apple-gray-600 mb-2">${product.price.toLocaleString()}</p>
                      <button
                        onClick={() => addProduct(product)}
                        className="w-full px-3 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors text-sm"
                      >
                        Add to Compare
                      </button>
                    </div>
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

export default ProductComparison;
