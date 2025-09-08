import React, { createContext, useContext, useState, useEffect } from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchHistory: string[];
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  trendingSearches: string[];
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

const STORAGE_KEY = 'searchHistory';
const MAX_HISTORY = 10;

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [trendingSearches] = useState([
    'iPhone 15 Pro',
    'MacBook Pro',
    'AirPods Pro',
    'Apple Watch',
    'iPad Pro',
    'Mac Studio'
  ]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSearchHistory(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing search history:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const addToHistory = (query: string) => {
    if (!query.trim()) return;

    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== query.toLowerCase());
      const updated = [query, ...filtered].slice(0, MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      searchHistory,
      addToHistory,
      clearHistory,
      trendingSearches
    }}>
      {children}
    </SearchContext.Provider>
  );
};
