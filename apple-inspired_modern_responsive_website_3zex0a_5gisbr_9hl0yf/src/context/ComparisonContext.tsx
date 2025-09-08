import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../types';

interface ComparisonContextType {
  comparisonItems: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: number) => void;
  clearComparison: () => void;
  isInComparison: (productId: number) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

interface ComparisonProviderProps {
  children: ReactNode;
}

export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({ children }) => {
  const [comparisonItems, setComparisonItems] = useState<Product[]>([]);

  const addToComparison = (product: Product) => {
    setComparisonItems(prev => {
      if (prev.length >= 4) {
        return [...prev.slice(1), product];
      }
      if (!prev.find(item => item.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromComparison = (productId: number) => {
    setComparisonItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearComparison = () => {
    setComparisonItems([]);
  };

  const isInComparison = (productId: number) => {
    return comparisonItems.some(item => item.id === productId);
  };

  return (
    <ComparisonContext.Provider value={{
      comparisonItems,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};
