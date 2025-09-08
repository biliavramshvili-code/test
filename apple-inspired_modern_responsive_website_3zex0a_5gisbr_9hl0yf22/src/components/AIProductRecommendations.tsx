import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Users, Clock, Star } from 'lucide-react';
import { Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';

interface AIRecommendation {
  product: Product;
  reason: string;
  confidence: number;
  category: 'trending' | 'personalized' | 'similar' | 'seasonal';
}

interface AIProductRecommendationsProps {
  userId?: string;
  currentProduct?: Product;
  limit?: number;
}

const AIProductRecommendations: React.FC<AIProductRecommendationsProps> = ({
  userId,
  currentProduct,
  limit = 6
}) => {
  const { products } = useProducts();
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'trending' | 'personalized' | 'similar'>('all');

  useEffect(() => {
    generateAIRecommendations();
  }, [products, userId, currentProduct]);

  const generateAIRecommendations = () => {
    setLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const aiRecommendations: AIRecommendation[] = [];
      
      // Trending products (based on simulated popularity)
      const trendingProducts = products
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(product => ({
          product,
          reason: "Trending among Apple enthusiasts this week",
          confidence: Math.floor(Math.random() * 20) + 80,
          category: 'trending' as const
        }));
      
      // Personalized recommendations (simulated based on user behavior)
      const personalizedProducts = products
        .filter(p => currentProduct ? p.category === currentProduct.category : true)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(product => ({
          product,
          reason: userId ? "Based on your browsing history and preferences" : "Popular choice for new customers",
          confidence: Math.floor(Math.random() * 15) + 85,
          category: 'personalized' as const
        }));
      
      // Similar products (if current product exists)
      const similarProducts = currentProduct
        ? products
            .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
            .slice(0, 2)
            .map(product => ({
              product,
              reason: `Similar to ${currentProduct.name}`,
              confidence: Math.floor(Math.random() * 10) + 90,
              category: 'similar' as const
            }))
        : [];
      
      // Seasonal recommendations
      const seasonalProducts = products
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map(product => ({
          product,
          reason: "Perfect for the current season",
          confidence: Math.floor(Math.random() * 25) + 75,
          category: 'seasonal' as const
        }));
      
      aiRecommendations.push(
        ...trendingProducts,
        ...personalizedProducts,
        ...similarProducts,
        ...seasonalProducts
      );
      
      // Remove duplicates and limit results
      const uniqueRecommendations = aiRecommendations
        .filter((rec, index, self) => 
          index === self.findIndex(r => r.product.id === rec.product.id)
        )
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, limit);
      
      setRecommendations(uniqueRecommendations);
      setLoading(false);
    }, 1500);
  };

  const filteredRecommendations = activeTab === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.category === activeTab);

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'trending': return <TrendingUp className="w-4 h-4" />;
      case 'personalized': return <Users className="w-4 h-4" />;
      case 'similar': return <Star className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-apple-blue-100 rounded-lg">
            <Brain className="w-6 h-6 text-apple-blue-600 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-apple-gray-900">AI Recommendations</h3>
            <p className="text-apple-gray-600">Analyzing your preferences...</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-apple-gray-200 h-48 rounded-xl mb-4"></div>
              <div className="bg-apple-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-apple-gray-200 h-3 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-apple-blue-100 rounded-lg">
            <Brain className="w-6 h-6 text-apple-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-apple-gray-900">AI Recommendations</h3>
            <p className="text-apple-gray-600">Powered by machine learning</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {['all', 'trending', 'personalized', 'similar'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-apple-blue-500 text-white'
                  : 'bg-apple-gray-100 text-apple-gray-600 hover:bg-apple-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations.map((recommendation, index) => (
          <div key={`${recommendation.product.id}-${index}`} className="relative">
            <ProductCard product={recommendation.product} />
            <div className="mt-3 p-3 bg-apple-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getIconForCategory(recommendation.category)}
                  <span className="text-sm font-medium text-apple-gray-700 capitalize">
                    {recommendation.category}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-apple-gray-600">
                    {recommendation.confidence}% match
                  </span>
                </div>
              </div>
              <p className="text-sm text-apple-gray-600">{recommendation.reason}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-apple-gray-400 mx-auto mb-4" />
          <p className="text-apple-gray-600">No recommendations available for this category.</p>
        </div>
      )}
    </div>
  );
};

export default AIProductRecommendations;
