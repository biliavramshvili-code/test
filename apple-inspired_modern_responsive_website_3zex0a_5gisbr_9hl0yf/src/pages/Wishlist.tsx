import React, { useState } from 'react';
import { Heart, ShoppingCart, Trash2, GitCompare } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import ProductComparison from '../components/ProductComparison';

const Wishlist: React.FC = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const [selectedForComparison, setSelectedForComparison] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const handleAddToCart = (product: any) => {
    addItem(product);
    // Optionally remove from wishlist after adding to cart
    // removeItem(product.id);
  };

  const handleCompareToggle = (productId: number) => {
    setSelectedForComparison(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleCompare = () => {
    const productsToCompare = items.filter(item => selectedForComparison.includes(item.id));
    setShowComparison(true);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-16">
        <div className="section-padding">
          <div className="container-padding">
            <div className="text-center py-16">
              <Heart className="w-16 h-16 text-apple-gray-300 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-apple-gray-700 mb-4">
                Your Wishlist is Empty
              </h1>
              <p className="text-apple-gray-500 mb-8 max-w-md mx-auto">
                Save items you love to your wishlist. Review them anytime and easily move them to your cart.
              </p>
              <Link to="/products" className="btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="section-padding">
        <div className="container-padding">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-apple-gray-700 mb-2">
                My Wishlist
              </h1>
              <p className="text-apple-gray-500">
                {items.length} {items.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {selectedForComparison.length > 1 && (
                <button
                  onClick={handleCompare}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <GitCompare className="w-4 h-4" />
                  <span>Compare ({selectedForComparison.length})</span>
                </button>
              )}
              
              <button
                onClick={clearWishlist}
                className="text-red-500 hover:text-red-600 text-sm font-medium"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <div key={product.id} className="card group">
                {/* Product Image */}
                <div className="relative">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  {/* Remove from Wishlist */}
                  <button
                    onClick={() => removeItem(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  
                  {/* Compare Checkbox */}
                  <div className="absolute top-3 left-3">
                    <label className="flex items-center space-x-2 bg-white/90 rounded-full px-3 py-1 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedForComparison.includes(product.id)}
                        onChange={() => handleCompareToggle(product.id)}
                        className="rounded border-apple-gray-300 text-apple-blue-500 focus:ring-apple-blue-500"
                      />
                      <span className="text-xs text-apple-gray-600">Compare</span>
                    </label>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-bold text-apple-gray-700 mb-2 hover:text-apple-blue-500 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-apple-gray-500 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-apple-blue-500">
                      ${product.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-apple-gray-400">
                      {product.category}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 btn-primary flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                    
                    <Link
                      to={`/product/${product.id}`}
                      className="px-4 py-2 border border-apple-gray-200 rounded-full text-sm font-medium text-apple-gray-600 hover:bg-apple-gray-50 transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Modal */}
          <ProductComparison
            isOpen={showComparison}
            onClose={() => setShowComparison(false)}
            initialProducts={items.filter(item => selectedForComparison.includes(item.id))}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
