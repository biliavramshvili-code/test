import React from 'react';
import SmartSearch from './SmartSearch';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

const EnhancedSearchBar: React.FC = () => {
  const navigate = useNavigate();

  const handleProductSelect = (product: Product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <SmartSearch 
      onProductSelect={handleProductSelect}
      placeholder="Search products, categories, or brands..."
    />
  );
};

export default EnhancedSearchBar;
