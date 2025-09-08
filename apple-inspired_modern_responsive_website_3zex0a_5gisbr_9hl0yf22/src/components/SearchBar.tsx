import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Clock } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { searchQuery, setSearchQuery, searchResults, isSearching, clearSearch } = useSearch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    
    setSearchQuery(query);
    
    // Add to recent searches
    const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    
    // Navigate to products page with search
    navigate('/products', { state: { searchQuery: query } });
    setIsOpen(false);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setIsOpen(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full md:w-80 pl-10 pr-10 py-2 bg-apple-gray-100 border border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue-500 focus:bg-white focus:border-apple-blue-200 transition-all duration-200"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-apple-gray-400" />
        {searchQuery && (
          <button
            onClick={() => {
              clearSearch();
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-apple-gray-400 hover:text-apple-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-apple-gray-200 z-50 max-h-96 overflow-y-auto">
          {searchQuery ? (
            <div className="p-4">
              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-apple-blue-500"></div>
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  <h3 className="text-sm font-semibold text-apple-gray-700 mb-3">
                    Search Results ({searchResults.length})
                  </h3>
                  <div className="space-y-2">
                    {searchResults.slice(0, 5).map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-apple-gray-50 transition-colors text-left"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-apple-gray-700">
                            {product.name}
                          </p>
                          <p className="text-xs text-apple-gray-500">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                  {searchResults.length > 5 && (
                    <button
                      onClick={() => handleSearch(searchQuery)}
                      className="w-full mt-3 py-2 text-sm text-apple-blue-500 hover:text-apple-blue-600 font-medium"
                    >
                      View all {searchResults.length} results
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-apple-gray-500">No products found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-apple-gray-700">
                      Recent Searches
                    </h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-apple-gray-400 hover:text-apple-gray-600"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-apple-gray-50 transition-colors text-left"
                      >
                        <Clock className="w-4 h-4 text-apple-gray-400" />
                        <span className="text-sm text-apple-gray-600">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
