import React, { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, Search, Sliders } from 'lucide-react';
import { Product } from '../types';

interface FilterOption {
  id: string;
  label: string;
  count: number;
  selected: boolean;
}

interface PriceRange {
  min: number;
  max: number;
}

interface SmartFiltersProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
  className?: string;
}

const SmartFilters: React.FC<SmartFiltersProps> = ({ 
  products, 
  onFilterChange, 
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 5000 });
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [features, setFeatures] = useState<FilterOption[]>([]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | 'rating'>('name');

  // Initialize filter options
  useEffect(() => {
    const categoryMap = new Map<string, number>();
    const featureMap = new Map<string, number>();

    products.forEach(product => {
      // Count categories
      categoryMap.set(product.category, (categoryMap.get(product.category) || 0) + 1);
      
      // Count features
      product.features?.forEach(feature => {
        featureMap.set(feature, (featureMap.get(feature) || 0) + 1);
      });
    });

    setCategories(
      Array.from(categoryMap.entries()).map(([category, count]) => ({
        id: category,
        label: category,
        count,
        selected: false
      }))
    );

    setFeatures(
      Array.from(featureMap.entries()).map(([feature, count]) => ({
        id: feature,
        label: feature,
        count,
        selected: false
      }))
    );

    // Set initial price range
    const prices = products.map(p => p.price);
    setPriceRange({
      min: Math.min(...prices),
      max: Math.max(...prices)
    });
  }, [products]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    const selectedCategories = categories.filter(c => c.selected).map(c => c.id);
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Feature filter
    const selectedFeatures = features.filter(f => f.selected).map(f => f.id);
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(product =>
        product.features?.some(feature => selectedFeatures.includes(feature))
      );
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return 0; // Would implement rating comparison
        default:
          return 0;
      }
    });

    onFilterChange(filtered);
  }, [products, searchTerm, categories, features, priceRange, sortBy, onFilterChange]);

  const toggleCategory = (categoryId: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId ? { ...cat, selected: !cat.selected } : cat
      )
    );
  };

  const toggleFeature = (featureId: string) => {
    setFeatures(prev =>
      prev.map(feat =>
        feat.id === featureId ? { ...feat, selected: !feat.selected } : feat
      )
    );
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setCategories(prev => prev.map(cat => ({ ...cat, selected: false })));
    setFeatures(prev => prev.map(feat => ({ ...feat, selected: false })));
    const prices = products.map(p => p.price);
    setPriceRange({
      min: Math.min(...prices),
      max: Math.max(...prices)
    });
  };

  const activeFiltersCount = 
    categories.filter(c => c.selected).length +
    features.filter(f => f.selected).length +
    (searchTerm ? 1 : 0);

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-apple-gray-200 ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-6 border-b border-apple-gray-200">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-apple-gray-600" />
          <h3 className="text-lg font-semibold text-apple-gray-900">Smart Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="bg-apple-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-apple-blue-500 hover:text-apple-blue-600 transition-colors"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-apple-gray-100 rounded-lg transition-colors lg:hidden"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="p-6 space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-apple-gray-900 mb-2">
              Search Products
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-apple-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full pl-10 pr-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-medium text-apple-gray-900 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-asc">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-apple-gray-900 mb-2">
              Price Range: ${priceRange.min} - ${priceRange.max}
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min={Math.min(...products.map(p => p.price))}
                max={Math.max(...products.map(p => p.price))}
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="w-full"
              />
              <input
                type="range"
                min={Math.min(...products.map(p => p.price))}
                max={Math.max(...products.map(p => p.price))}
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-apple-gray-900 mb-3">
              Categories
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={category.selected}
                    onChange={() => toggleCategory(category.id)}
                    className="w-4 h-4 text-apple-blue-500 border-apple-gray-300 rounded focus:ring-apple-blue-500"
                  />
                  <span className="text-sm text-apple-gray-700 flex-1">
                    {category.label}
                  </span>
                  <span className="text-xs text-apple-gray-500 bg-apple-gray-100 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-apple-gray-900 mb-3">
                Features
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {features.slice(0, 10).map((feature) => (
                  <label key={feature.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={feature.selected}
                      onChange={() => toggleFeature(feature.id)}
                      className="w-4 h-4 text-apple-blue-500 border-apple-gray-300 rounded focus:ring-apple-blue-500"
                    />
                    <span className="text-sm text-apple-gray-700 flex-1">
                      {feature.label}
                    </span>
                    <span className="text-xs text-apple-gray-500 bg-apple-gray-100 px-2 py-1 rounded-full">
                      {feature.count}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartFilters;
