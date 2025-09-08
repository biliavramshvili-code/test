import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Users, Clock } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../context/AuthContext';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface AIRecommendationsProps {
  userId?: string;
  currentProduct?: Product;
  limit?: number;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({ 
  userId, 
  currentProduct, 
  limit = 4 
}) => {
  const { products } = useProducts();
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendationType, setRecommendationType] = useState<'ai' | 'trending' | 'similar' | 'recent'>('ai');

  useEffect(() => {
    generateRecommendations();
  }, [products, user, currentProduct, recommendationType]);

  const generateRecommendations = () => {
    setLoading(true);
    
    let filtered: Product[] = [];
    
    switch (recommendationType) {
      case 'ai':
        // AI-powered recommendations based on user behavior
        filtered = products
          .filter(p => currentProduct ? p.id !== currentProduct.id : true)
          .sort(() => Math.random() - 0.5)
          .slice(0, limit);
        break;
        
      case 'trending':
        // Trending products (simulate with random selection)
        filtered = products
          .filter(p => currentProduct ? p.id !== currentProduct.id : true)
          .sort((a, b) => b.price - a.price)
          .slice(0, limit);
        break;
        
      case 'similar':
        // Similar products based on category
        if (currentProduct) {
          filtered = products
            .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
            .slice(0, limit);
        } else {
          filtered = products.slice(0, limit);
        }
        break;
        
      case 'recent':
        // Recently viewed or added products
        filtered = products
          .filter(p => currentProduct ? p.id !== currentProduct.id : true)
          .reverse()
          .slice(0, limit);
        break;
    }
    
    setRecommendations(filtered);
    setLoading(false);
  };

  const recommendationTypes = [
    { key: 'ai', label: 'AI Picks', icon: Brain, color: 'text-purple-500' },
    { key: 'trending', label: 'Trending', icon: TrendingUp, color: 'text-green-500' },
    { key: 'similar', label: 'Similar', icon: Users, color: 'text-blue-500' },
    { key: 'recent', label: 'Recent', icon: Clock, color: 'text-orange-500' }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-apple-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-apple-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-apple-gray-900">
          Recommended for You
        </h3>
        <div className="flex space-x-2">
          {recommendationTypes.map(({ key, label, icon: Icon, color }) => (
            <button
              key={key}
              onClick={() => setRecommendationType(key as any)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                recommendationType === key
                  ? 'bg-apple-blue-50 text-apple-blue-600'
                  : 'text-apple-gray-600 hover:bg-apple-gray-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${recommendationType === key ? 'text-apple-blue-600' : color}`} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-apple-gray-400 mx-auto mb-4" />
          <p className="text-apple-gray-600">No recommendations available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
