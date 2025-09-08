import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, ArrowUpDown, Eye, Heart, ShoppingCart, GitCompare } from 'lucide-react';
import { products } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import { Link } from 'react-router-dom';
import AdvancedSearch from '../components/AdvancedSearch';
import ProductComparison from '../components/ProductComparison';
import SocialSharing from '../components/SocialSharing';

const Products: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();
  const { showNotification } = useNotification();

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    showNotification(`${product.name} added to cart!`, 'success');
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product);
    showNotification(`${product.name} added to wishlist!`, 'success');
  };

  const handleAddToComparison = (product: Product) => {
    if (comparisonProducts.length >= 4) {
      showNotification('You can compare up to 4 products at once', 'warning');
      return;
    }
    if (!comparisonProducts.find(p => p.id === product.id)) {
      setComparisonProducts([...comparisonProducts, product]);
      showNotification(`${product.name} added to comparison`, 'success');
    }
  };

  const removeFromComparison = (productId: number) => {
    setComparisonProducts(comparisonProducts.filter(p => p.id !== productId));
  };

  return (
    <div className="min-h-screen bg-apple-gray-50 pt-20">
      <div className="container-padding">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-apple-gray-900 mb-4">All Products</h1>
          <p className="text-lg text-apple-gray-600">Discover our complete collection of Apple products</p>
        </div>

        {/* Advanced Search */}
        {showAdvancedSearch && (
          <div className="mb-8">
            <AdvancedSearch
              onResults={setFilteredProducts}
              onClose={() => setShowAdvancedSearch(false)}
            />
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                showAdvancedSearch
                  ? 'bg-apple-blue-500 text-white border-apple-blue-500'
                  : 'bg-white text-apple-gray-700 border-apple-gray-300 hover:bg-apple-gray-50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Advanced Search</span>
            </button>

            {comparisonProducts.length > 0 && (
              <button
                onClick={() => setShowComparison(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <GitCompare className="w-4 h-4" />
                <span>Compare ({comparisonProducts.length})</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-apple-gray-600">
              {filteredProducts.length} products
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-apple-blue-500 text-white'
                    : 'bg-white text-apple-gray-600 hover:bg-apple-gray-50'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-apple-blue-500 text-white'
                    : 'bg-white text-apple-gray-600 hover:bg-apple-gray-50'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={`${
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }`}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-2xl shadow-sm border border-apple-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
              }`}
            >
              {/* Product Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0 mr-6' : 'mb-4'}`}>
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 ${
                      viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'
                    }`}
                  />
                </Link>
                
                {/* Quick Actions */}
                <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isInWishlist(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-apple-gray-600 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAddToComparison(product)}
                    className="w-8 h-8 bg-white/90 text-apple-gray-600 rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-colors"
                  >
                    <GitCompare className="w-4 h-4" />
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="w-8 h-8 bg-white/90 text-apple-gray-600 rounded-full flex items-center justify-center hover:bg-apple-blue-500 hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Product Info */}
              <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className={`${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}>
                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold text-apple-gray-900 mb-2 hover:text-apple-blue-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <p className={`text-apple-gray-600 mb-3 ${
                      viewMode === 'list' ? 'text-sm' : 'text-sm line-clamp-2'
                    }`}>
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-apple-gray-900">
                        ${product.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-apple-gray-500 bg-apple-gray-100 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={`${viewMode === 'list' ? 'flex items-center space-x-3 ml-6' : 'space-y-2'}`}>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`bg-apple-blue-500 text-white rounded-xl hover:bg-apple-blue-600 transition-colors flex items-center justify-center ${
                        viewMode === 'list' ? 'px-4 py-2' : 'w-full py-3'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </button>
                    
                    {viewMode === 'list' && (
                      <SocialSharing product={product} type="product" />
                    )}
                  </div>
                </div>

                {viewMode === 'grid' && (
                  <div className="flex items-center justify-between mt-4">
                    <SocialSharing product={product} type="product" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-apple-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-apple-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">No products found</h3>
            <p className="text-apple-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Comparison Floating Button */}
        {comparisonProducts.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setShowComparison(true)}
              className="bg-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
            >
              <GitCompare className="w-5 h-5" />
              <span>Compare ({comparisonProducts.length})</span>
            </button>
          </div>
        )}

        {/* Product Comparison Modal */}
        <ProductComparison
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
          initialProducts={comparisonProducts}
        />
      </div>
    </div>
  );
};

export default Products;
