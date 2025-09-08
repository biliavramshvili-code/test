import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, Camera, X, Clock, TrendingUp, Filter } from 'lucide-react';
import { Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import { useSearch } from '../context/SearchContext';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'product' | 'category' | 'brand' | 'recent' | 'trending';
  count?: number;
}

interface SmartSearchProps {
  onProductSelect?: (product: Product) => void;
  placeholder?: string;
  showFilters?: boolean;
}

const SmartSearch: React.FC<SmartSearchProps> = ({
  onProductSelect,
  placeholder = "Search products, categories, or brands...",
  showFilters = true
}) => {
  const { products } = useProducts();
  const { searchQuery, setSearchQuery, searchHistory, addToHistory } = useSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      generateSuggestions(searchQuery);
    } else {
      generateDefaultSuggestions();
    }
  }, [searchQuery, products]);

  const generateSuggestions = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const newSuggestions: SearchSuggestion[] = [];

    // Product suggestions
    const matchingProducts = products
      .filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      )
      .slice(0, 5);

    matchingProducts.forEach(product => {
      newSuggestions.push({
        id: `product-${product.id}`,
        text: product.name,
        type: 'product'
      });
    });

    // Category suggestions
    const categories = [...new Set(products.map(p => p.category))];
    const matchingCategories = categories
      .filter(category => category.toLowerCase().includes(lowercaseQuery))
      .slice(0, 3);

    matchingCategories.forEach(category => {
      const count = products.filter(p => p.category === category).length;
      newSuggestions.push({
        id: `category-${category}`,
        text: category,
        type: 'category',
        count
      });
    });

    // Brand suggestions (mock data)
    const brands = ['Apple', 'Samsung', 'Google', 'Microsoft', 'Sony'];
    const matchingBrands = brands
      .filter(brand => brand.toLowerCase().includes(lowercaseQuery))
      .slice(0, 2);

    matchingBrands.forEach(brand => {
      newSuggestions.push({
        id: `brand-${brand}`,
        text: brand,
        type: 'brand'
      });
    });

    setSuggestions(newSuggestions);
  };

  const generateDefaultSuggestions = () => {
    const defaultSuggestions: SearchSuggestion[] = [];

    // Recent searches
    searchHistory.slice(0, 3).forEach((search, index) => {
      defaultSuggestions.push({
        id: `recent-${index}`,
        text: search,
        type: 'recent'
      });
    });

    // Trending searches (mock data)
    const trending = ['iPhone 15', 'MacBook Pro', 'AirPods', 'iPad Air'];
    trending.slice(0, 4).forEach((trend, index) => {
      defaultSuggestions.push({
        id: `trending-${index}`,
        text: trend,
        type: 'trending'
      });
    });

    setSuggestions(defaultSuggestions);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedIndex(-1);
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.text);
    addToHistory(suggestion.text);
    setIsOpen(false);
    
    if (suggestion.type === 'product' && onProductSelect) {
      const product = products.find(p => p.name === suggestion.text);
      if (product) {
        onProductSelect(product);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else if (searchQuery) {
          addToHistory(searchQuery);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        addToHistory(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'recent': return <Clock className="w-4 h-4 text-apple-gray-400" />;
      case 'trending': return <TrendingUp className="w-4 h-4 text-apple-blue-500" />;
      case 'category': return <Filter className="w-4 h-4 text-apple-green-500" />;
      default: return <Search className="w-4 h-4 text-apple-gray-400" />;
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-apple-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-20 py-3 bg-white border border-apple-gray-300 rounded-xl text-apple-gray-900 placeholder-apple-gray-500 focus:outline-none focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent transition-all"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-4">
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="p-1 text-apple-gray-400 hover:text-apple-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={startVoiceSearch}
            disabled={isListening}
            className={`p-1 transition-colors ${
              isListening 
                ? 'text-red-500 animate-pulse' 
                : 'text-apple-gray-400 hover:text-apple-blue-500'
            }`}
            title="Voice Search"
          >
            <Mic className="w-4 h-4" />
          </button>
          
          <button
            className="p-1 text-apple-gray-400 hover:text-apple-blue-500 transition-colors"
            title="Visual Search"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-apple-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
          {suggestions.length > 0 ? (
            <div className="py-2">
              {searchQuery.length === 0 && searchHistory.length > 0 && (
                <div className="px-4 py-2 text-xs font-medium text-apple-gray-500 uppercase tracking-wide">
                  Recent Searches
                </div>
              )}
              
              {searchQuery.length === 0 && (
                <div className="px-4 py-2 text-xs font-medium text-apple-gray-500 uppercase tracking-wide border-t border-apple-gray-100 mt-2">
                  Trending
                </div>
              )}
              
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full px-4 py-3 text-left hover:bg-apple-gray-50 transition-colors flex items-center space-x-3 ${
                    index === selectedIndex ? 'bg-apple-blue-50' : ''
                  }`}
                >
                  {getSuggestionIcon(suggestion.type)}
                  <span className="flex-1 text-apple-gray-900">{suggestion.text}</span>
                  {suggestion.count && (
                    <span className="text-xs text-apple-gray-500 bg-apple-gray-100 px-2 py-1 rounded-full">
                      {suggestion.count}
                    </span>
                  )}
                  {suggestion.type === 'trending' && (
                    <span className="text-xs text-apple-blue-500 font-medium">Trending</span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-apple-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-apple-gray-300" />
              <p>No suggestions found</p>
            </div>
          )}
        </div>
      )}

      {/* Voice Search Indicator */}
      {isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-red-600">
            <Mic className="w-5 h-5 animate-pulse" />
            <span className="font-medium">Listening...</span>
          </div>
          <p className="text-sm text-red-500 mt-1">Speak now to search</p>
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
