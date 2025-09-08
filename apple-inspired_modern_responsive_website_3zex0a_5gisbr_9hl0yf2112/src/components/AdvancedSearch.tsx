import React, { useState } from 'react';
import { Search, Filter, Camera, Mic, X, Star, DollarSign, Palette, Zap } from 'lucide-react';

interface SearchFilters {
  category: string;
  priceRange: [number, number];
  rating: number;
  brand: string;
  color: string;
  features: string[];
  availability: string;
  sortBy: string;
}

const AdvancedSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showVisualSearch, setShowVisualSearch] = useState(false);
  
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    priceRange: [0, 5000],
    rating: 0,
    brand: 'all',
    color: 'all',
    features: [],
    availability: 'all',
    sortBy: 'relevance'
  });

  const [searchSuggestions] = useState([
    'iPhone 15 Pro Max',
    'MacBook Pro M3',
    'iPad Air',
    'Apple Watch Series 9',
    'AirPods Pro',
    'Mac Studio'
  ]);

  const [recentSearches] = useState([
    'iPhone camera comparison',
    'MacBook for video editing',
    'Best Apple accessories'
  ]);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'iphone', name: 'iPhone' },
    { id: 'mac', name: 'Mac' },
    { id: 'ipad', name: 'iPad' },
    { id: 'watch', name: 'Apple Watch' },
    { id: 'airpods', name: 'AirPods' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const brands = [
    { id: 'all', name: 'All Brands' },
    { id: 'apple', name: 'Apple' },
    { id: 'belkin', name: 'Belkin' },
    { id: 'otterbox', name: 'OtterBox' },
    { id: 'anker', name: 'Anker' }
  ];

  const colors = [
    { id: 'all', name: 'All Colors' },
    { id: 'black', name: 'Black', color: '#000000' },
    { id: 'white', name: 'White', color: '#FFFFFF' },
    { id: 'blue', name: 'Blue', color: '#007AFF' },
    { id: 'red', name: 'Red', color: '#FF3B30' },
    { id: 'purple', name: 'Purple', color: '#AF52DE' },
    { id: 'gold', name: 'Gold', color: '#FFD700' }
  ];

  const features = [
    'Face ID',
    'Touch ID',
    'Wireless Charging',
    'Water Resistant',
    '5G Compatible',
    'MagSafe Compatible',
    'Retina Display',
    'ProMotion'
  ];

  const startVoiceSearch = () => {
    setIsListening(true);
    // Implement voice search functionality
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('iPhone 15 Pro camera features');
    }, 2000);
  };

  const handleVisualSearch = (file: File) => {
    // Implement visual search functionality
    console.log('Processing image for visual search:', file.name);
    setShowVisualSearch(false);
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFilters(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 5000],
      rating: 0,
      brand: 'all',
      color: 'all',
      features: [],
      availability: 'all',
      sortBy: 'relevance'
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <div className="relative">
          <div className="flex items-center space-x-2 p-4 border border-apple-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-apple-blue-500 focus-within:border-transparent">
            <Search className="w-5 h-5 text-apple-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, features, or specifications..."
              className="flex-1 outline-none text-apple-gray-900 placeholder-apple-gray-500"
            />
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowVisualSearch(true)}
                className="p-2 text-apple-gray-400 hover:text-apple-blue-500 transition-colors"
                title="Visual Search"
              >
                <Camera className="w-5 h-5" />
              </button>
              <button
                onClick={startVoiceSearch}
                className={`p-2 transition-colors ${
                  isListening 
                    ? 'text-red-500 animate-pulse' 
                    : 'text-apple-gray-400 hover:text-apple-blue-500'
                }`}
                title="Voice Search"
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 text-apple-gray-400 hover:text-apple-blue-500 transition-colors"
                title="Advanced Filters"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search Suggestions */}
          {searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-apple-gray-200 rounded-xl shadow-lg z-10">
              <div className="p-4">
                <h4 className="text-sm font-medium text-apple-gray-900 mb-2">Suggestions</h4>
                <div className="space-y-2">
                  {searchSuggestions
                    .filter(suggestion => 
                      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setSearchQuery(suggestion)}
                        className="block w-full text-left px-3 py-2 text-apple-gray-700 hover:bg-apple-gray-50 rounded-lg transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Searches */}
        {!searchQuery && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-apple-gray-900 mb-2">Recent Searches</h4>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="px-3 py-1 bg-apple-gray-100 text-apple-gray-700 rounded-full text-sm hover:bg-apple-gray-200 transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-apple-gray-900">Advanced Filters</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-apple-gray-600 hover:text-apple-gray-800 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 text-apple-gray-400 hover:text-apple-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="w-full px-3 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="50"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Minimum Rating
              </label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => updateFilter('rating', rating)}
                    className={`p-1 ${
                      rating <= filters.rating ? 'text-yellow-400' : 'text-apple-gray-300'
                    }`}
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Brand
              </label>
              <select
                value={filters.brand}
                onChange={(e) => updateFilter('brand', e.target.value)}
                className="w-full px-3 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
              >
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => updateFilter('color', color.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                      filters.color === color.id
                        ? 'border-apple-blue-500 bg-apple-blue-50'
                        : 'border-apple-gray-300 hover:border-apple-gray-400'
                    }`}
                  >
                    {color.color && (
                      <div
                        className="w-4 h-4 rounded-full border border-apple-gray-300"
                        style={{ backgroundColor: color.color }}
                      />
                    )}
                    <span className="text-sm">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Availability
              </label>
              <select
                value={filters.availability}
                onChange={(e) => updateFilter('availability', e.target.value)}
                className="w-full px-3 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
              >
                <option value="all">All Products</option>
                <option value="in-stock">In Stock</option>
                <option value="pre-order">Pre-order</option>
                <option value="coming-soon">Coming Soon</option>
              </select>
            </div>
          </div>

          {/* Features Filter */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">
              Features
            </label>
            <div className="flex flex-wrap gap-2">
              {features.map(feature => (
                <button
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                    filters.features.includes(feature)
                      ? 'border-apple-blue-500 bg-apple-blue-50 text-apple-blue-700'
                      : 'border-apple-gray-300 text-apple-gray-700 hover:border-apple-gray-400'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">
              Sort By
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'relevance', name: 'Relevance' },
                { id: 'price-low', name: 'Price: Low to High' },
                { id: 'price-high', name: 'Price: High to Low' },
                { id: 'rating', name: 'Customer Rating' },
                { id: 'newest', name: 'Newest First' },
                { id: 'popular', name: 'Most Popular' }
              ].map(option => (
                <button
                  key={option.id}
                  onClick={() => updateFilter('sortBy', option.id)}
                  className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
                    filters.sortBy === option.id
                      ? 'border-apple-blue-500 bg-apple-blue-50 text-apple-blue-700'
                      : 'border-apple-gray-300 text-apple-gray-700 hover:border-apple-gray-400'
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Visual Search Modal */}
      {showVisualSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-apple-gray-900">Visual Search</h3>
              <button
                onClick={() => setShowVisualSearch(false)}
                className="p-2 text-apple-gray-400 hover:text-apple-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="border-2 border-dashed border-apple-gray-300 rounded-lg p-8 text-center">
              <Camera className="w-12 h-12 text-apple-gray-400 mx-auto mb-4" />
              <p className="text-apple-gray-600 mb-4">
                Upload an image to find similar products
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleVisualSearch(e.target.files[0])}
                className="hidden"
                id="visual-search-input"
              />
              <label
                htmlFor="visual-search-input"
                className="px-6 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors cursor-pointer"
              >
                Choose Image
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
