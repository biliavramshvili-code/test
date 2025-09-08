import React, { useState } from 'react';
import { Package, Plus, Minus, ShoppingCart, Star, Percent } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { Product } from '../types';

interface Bundle {
  id: string;
  name: string;
  description: string;
  products: Product[];
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  image: string;
  popular?: boolean;
}

const bundles: Bundle[] = [
  {
    id: 'productivity-pro',
    name: 'Productivity Pro Bundle',
    description: 'Everything you need for professional work',
    products: [
      { id: 1, name: 'MacBook Pro 16-inch', price: 2499, image: '', description: '', category: 'Laptops' },
      { id: 7, name: 'Studio Display', price: 1599, image: '', description: '', category: 'Displays' },
      { id: 8, name: 'Magic Keyboard', price: 99, image: '', description: '', category: 'Accessories' }
    ],
    originalPrice: 4197,
    bundlePrice: 3799,
    savings: 398,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    popular: true
  },
  {
    id: 'mobile-essentials',
    name: 'Mobile Essentials',
    description: 'Complete mobile experience package',
    products: [
      { id: 2, name: 'iPhone 15 Pro', price: 999, image: '', description: '', category: 'Smartphones' },
      { id: 5, name: 'AirPods Pro (2nd generation)', price: 249, image: '', description: '', category: 'Audio' },
      { id: 4, name: 'Apple Watch Series 9', price: 399, image: '', description: '', category: 'Wearables' }
    ],
    originalPrice: 1647,
    bundlePrice: 1499,
    savings: 148,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    description: 'Professional creative workflow setup',
    products: [
      { id: 6, name: 'Mac Studio', price: 1999, image: '', description: '', category: 'Desktops' },
      { id: 3, name: 'iPad Pro 12.9-inch', price: 1099, image: '', description: '', category: 'Tablets' },
      { id: 7, name: 'Studio Display', price: 1599, image: '', description: '', category: 'Displays' }
    ],
    originalPrice: 4697,
    bundlePrice: 4299,
    savings: 398,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const ProductBundles: React.FC = () => {
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const { addItem } = useCart();
  const { showNotification } = useNotification();

  const handleAddBundle = (bundle: Bundle) => {
    bundle.products.forEach(product => {
      addItem(product, 1);
    });
    showNotification(`${bundle.name} added to cart!`, 'success');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-apple-gray-900 mb-4">Product Bundles</h2>
        <p className="text-lg text-apple-gray-600">Save more with our curated product combinations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bundles.map((bundle) => (
          <div key={bundle.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {bundle.popular && (
              <div className="bg-apple-blue-500 text-white text-center py-2 text-sm font-semibold">
                Most Popular
              </div>
            )}
            
            <div className="relative">
              <img 
                src={bundle.image} 
                alt={bundle.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                <Percent className="w-4 h-4 mr-1" />
                Save ${bundle.savings}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-apple-gray-900 mb-2">{bundle.name}</h3>
              <p className="text-apple-gray-600 mb-4">{bundle.description}</p>

              <div className="space-y-2 mb-4">
                {bundle.products.map((product, index) => (
                  <div key={index} className="flex items-center text-sm text-apple-gray-700">
                    <Package className="w-4 h-4 mr-2 text-apple-blue-500" />
                    {product.name}
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-apple-gray-500 line-through">
                    ${bundle.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-green-600 font-semibold">
                    Save ${bundle.savings}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-apple-gray-900">
                    ${bundle.bundlePrice.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => handleAddBundle(bundle)}
                  className="w-full bg-apple-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-apple-blue-600 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add Bundle to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bundle Details Modal */}
      {selectedBundle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-apple-gray-900">{selectedBundle.name}</h3>
                <button
                  onClick={() => setSelectedBundle(null)}
                  className="text-apple-gray-400 hover:text-apple-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {selectedBundle.products.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-xl">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 mr-3 text-apple-blue-500" />
                      <div>
                        <h4 className="font-semibold text-apple-gray-900">{product.name}</h4>
                        <p className="text-sm text-apple-gray-600">{product.category}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-apple-gray-900">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-apple-gray-900">Bundle Total:</span>
                  <div className="text-right">
                    <div className="text-sm text-apple-gray-500 line-through">
                      ${selectedBundle.originalPrice.toLocaleString()}
                    </div>
                    <div className="text-2xl font-bold text-apple-gray-900">
                      ${selectedBundle.bundlePrice.toLocaleString()}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAddBundle(selectedBundle);
                    setSelectedBundle(null);
                  }}
                  className="w-full bg-apple-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-apple-blue-600 transition-colors"
                >
                  Add Bundle to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductBundles;
