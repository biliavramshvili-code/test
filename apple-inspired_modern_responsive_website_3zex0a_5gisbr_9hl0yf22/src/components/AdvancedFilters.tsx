import React, { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp, Star, DollarSign, Palette, Zap } from 'lucide-react';
import { Product } from '../types';

interface FilterOption {
  id: string;
  label: string;
  count: number;
  checked: boolean;
}

interface PriceRange {
  min: number;
  max: number;
}

interface AdvancedFiltersProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  products,
  onFilterChange,
  isOpen,
  onToggle
}) => {
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 10000 });
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>({ min: 0, max: 10000 });
  const [ratings, setRatings] = useState<FilterOption[]>([]);
  const [features, setFeatures] = useState<FilterOption[]>([]);
  const [availability, setAvailability] = useState<FilterOption[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['categories', 'price']));

  useEffect(() => {
    initializeFilters();
  }, [products]);

  useEffect(() => {
    applyFilters();
  }, [categories, selectedPriceRange, ratings, features, availability, sortBy, sortOrder]);

  const initializeFilters = () => {
    // Initialize categories
    const categoryMap = new Map<string, number>();
    products.forEach(product => {
      categoryMap.set(product.category, (categoryMap.get(product.category) || 0) + 1);
    });
    
    const categoryOptions: FilterOption[] = Array.from(categoryMap.entries()).map(([category, count]) => ({
      id: category,
      label: category,
      count,
      checked: false
    }));
    setCategories(categoryOptions);

    // Initialize price range
    const prices = products.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setPriceRange({ min: minPrice, max: maxPrice });
    setSelectedPriceRange({ min: minPrice, max: maxPrice });

    // Initialize ratings (mock data)
    const ratingOptions: FilterOption[] = [
      { id: '5', label: '5 Stars', count: Math.floor(products.length * 0.3), checked: false },
      { id: '4', label: '4+ Stars', count: Math.floor(products.length * 0.5), checked: false },
      { id: '3', label: '3+ Stars', count: Math.floor(products.length * 0.7), checked: false },
      { id: '2', label: '2+ Stars', count: Math.floor(products.length * 0.9), checked: false }
    ];
    setRatings(ratingOptions);

    // Initialize features
    const featureMap = new Map<string, number>();
    products.forEach(product => {
      product.features?.forEach(feature => {
        featureMap.set(feature, (featureMap.get(feature) || 0) + 1);
      });
    });
    
    const featureOptions: FilterOption[] = Array.from(featureMap.entries())
      .slice(0, 10) // Limit to top 10 features
      .map(([feature, count]) => ({
        id: feature,
        label: feature,
        count,
        checked: false
      }));
    setFeatures(featureOptions);

    // Initialize availability
    const availabilityOptions: FilterOption[] = [
      { id: 'in_stock', label: 'In Stock', count: Math.floor(products.length * 0.8), checked: false },
      { id: 'low_stock', label: 'Low Stock', count: Math.floor(products.length * 0.15), checked: false },
      { id: 'pre_order', label: 'Pre-order', count: Math.floor(products.length * 0.05), checked: false }
    ];
    setAvailability(availabilityOptions);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Apply category filters
    const selectedCategories = categories.filter(c => c.checked).map(c => c.id);
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category));
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
    );

    // Apply feature filters
    const selectedFeatures = features.filter(f => f.checked).map(f => f.id);
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(product => 
        product.features?.some(feature => selectedFeatures.includes(feature))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    onFilterChange(filtered);
  };

  const handleCategoryChange = (categoryId: string) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  const handleFeatureChange = (featureId: string) => {
    setFeatures(prev => 
      prev.map(feature => 
        feature.id === featureId ? { ...feature, checked: !feature.checked } : feature
      )
    );
  };

  const handleAvailabilityChange = (availabilityId: string) => {
    setAvailability(prev => 
      prev.map(avail => 
        avail.id === availabilityId ? { ...avail, checked: !avail.checked } : avail
      )
    );
  };

  const clearAllFilters = () => {
    setCategories(prev => prev.map(cat => ({ ...cat, checked: false })));
    setFeatures(prev => prev.map(feature => ({ ...feature, checked: false })));
    setAvailability(prev => prev.map(avail => ({ ...avail, checked: false })));
    setSelectedPriceRange(priceRange);
    setSortBy('name');
    setSortOrder('asc');
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const getActiveFilterCount = () => {
    return (
      categories.filter(c => c.checked).length +
      features.filter(f => f.checked).length +
      availability.filter(a => a.checked).length +
      (selectedPriceRange.min !== priceRange.min || selectedPriceRange.max !== priceRange.max ? 1 : 0)
    );
  };

  const FilterSection: React.FC<{
    title: string;
    icon: React.ReactNode;
    sectionId: string;
    children: React.ReactNode;
  }> = ({ title, icon, sectionId, children }) => {
    const isExpanded = expandedSections.has(sectionId);
    
    return (
      <div className="border-b border-apple-gray-200 pb-4">
        <button
          onClick={() => toggleSection(sectionId)}
          className="flex items-center justify-between w-full py-2 text-left"
        >
          <div className="flex items-center space-x-2">
            <div className="text-apple-gray-600">{icon}</div>
            <span className="font-medium text-apple-gray-900">{title}</span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-apple-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-apple-gray-600" />
          )}
        </button>
        {isExpanded && <div className="mt-3">{children}</div>}
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-2xl border border-apple-gray-200 transition-all duration-300 ${
      isOpen ? 'opacity-100' : 'opacity-100'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-apple-blue-100 rounded-lg">
              <Filter className="w-5 h-5 text-apple-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-apple-gray-900">Advanced Filters</h3>
              {getActiveFilterCount() > 0 && (
                <p className="text-sm text-apple-blue-600">
                  {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} active
                </p>
              )}
            </div>
          </div>
          
          {getActiveFilterCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-apple-gray-600 hover:text-red-600 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Sort Options */}
        <div className="mb-6 p-4 bg-apple-gray-50 rounded-xl">
          <h4 className="font-medium text-apple-gray-900 mb-3">Sort By</h4>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-apple-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue-500"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="category">Category</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="px-3 py-2 border border-apple-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {/* Categories */}
          <FilterSection title="Categories" icon={<Palette className="w-4 h-4" />} sectionId="categories">
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={category.checked}
                    onChange={() => handleCategoryChange(category.id)}
                    className="w-4 h-4 text-apple-blue-600 border-apple-gray-300 rounded focus:ring-apple-blue-500"
                  />
                  <span className="text-sm text-apple-gray-700 flex-1">{category.label}</span>
                  <span className="text-xs text-apple-gray-500 bg-apple-gray-100 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range" icon={<DollarSign className="w-4 h-4" />} sectionId="price">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-xs text-apple-gray-600 mb-1">Min</label>
                  <input
                    type="number"
                    value={selectedPriceRange.min}
                    onChange={(e) => setSelectedPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-apple-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-apple-gray-600 mb-1">Max</label>
                  <input
                    type="number"
                    value={selectedPriceRange.max}
                    onChange={(e) => setSelectedPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-apple-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-apple-blue-500"
                  />
                </div>
              </div>
              <div className="text-sm text-apple-gray-600 text-center">
                ${selectedPriceRange.min.toLocaleString()} - ${selectedPriceRange.max.toLocaleString()}
              </div>
            </div>
          </FilterSection>

          {/* Ratings */}
          <FilterSection title="Customer Rating" icon={<Star className="w-4 h-4" />} sectionId="ratings">
            <div className="space-y-2">
              {ratings.map((rating) => (
                <label key={rating.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-apple-blue-600 border-apple-gray-300 rounded focus:ring-apple-blue-500"
                  />
                  <div className="flex items-center space-x-1">
                    {[...Array(parseInt(rating.id))].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-apple-gray-700 flex-1">{rating.label}</span>
                  <span className="text-xs text-apple-gray-500 bg-apple-gray-100 px-2 py-1 rounded-full">
                    {rating.count}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Features */}
          {features.length > 0 && (
            <FilterSection title="Features" icon={<Zap className="w-4 h-4" />} sectionId="features">
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {features.map((feature) => (
                  <label key={feature.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={feature.checked}
                      onChange={() => handleFeatureChange(feature.id)}
                      className="w-4 h-4 text-apple-blue-600 border-apple-gray-300 rounded focus:ring-apple-blue-500"
                    />
                    <span className="text-sm text-apple-gray-700 flex-1">{feature.label}</span>
                    <span className="text-xs text-apple-gray-500 bg-apple-gray-100 px-2 py-1 rounded-full">
                      {feature.count}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>
          )}

          {/* Availability */}
          <FilterSection title="Availability" icon={<Filter className="w-4 h-4" />} sectionId="availability">
            <div className="space-y-2">
              {availability.map((avail) => (
                <label key={avail.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={avail.checked}
                    onChange={() => handleAvailabilityChange(avail.id)}
                    className="w-4 h-4 text-apple-blue-600 border-apple-gray-300 rounded focus:ring-apple-blue-500"
                  />
                  <span className="text-sm text-apple-gray-700 flex-1">{avail.label}</span>
                  <span className="text-xs text-apple-gray-500 bg-apple-gray-100 px-2 py-1 rounded-full">
                    {avail.count}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
