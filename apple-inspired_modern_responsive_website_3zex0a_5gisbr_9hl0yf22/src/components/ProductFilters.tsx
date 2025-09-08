import React from 'react';
import AdvancedFilters from './AdvancedFilters';
import { Product } from '../types';

interface ProductFiltersProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = (props) => {
  return <AdvancedFilters {...props} />;
};

export default ProductFilters;
