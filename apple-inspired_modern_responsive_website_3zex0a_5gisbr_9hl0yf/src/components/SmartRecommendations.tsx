import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Users, Clock, Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types';

interface RecommendationEngine {
  type: 'ai' | 'trending' | 'collaborative' | 'behavioral' | 'seasonal';
  title: string;
  description: string;
  icon: React.ReactNode;
  products: Product[];
  confidence: number;
}

interface UserBehavior {
  viewedProducts: number[];
  searchQueries: string[];
  categoryPreferences: Record<string, number>;
  priceRange: { min: number; max: number };
  timeSpent: Record<number, number>;
}

const SmartRecommendations: React.FC = () => {
  const [engines, setEngines] = useState<RecommendationEngine[]>([]);
  const [activeEngine, setActiveEngine] = useState<string>('ai');
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    viewedProducts: [1, 3, 5, 7],
    searchQueries: ['iPhone', 'MacBook', 'wireless headphones'],
    categoryPreferences: { 'Smartphones': 0.8, 'Laptops': 0.6, 'Audio': 0.4 },
    priceRange: { min: 500, max: 2000 },
    timeSpent: { 1: 120, 3: 95, 5: 180 }
  });
  const [loading, setLoading] = useState(true);
  const { products } = useProducts();
  const { addItem } = useCart();
  const { addItem: addToWishlist } = useWishlist();

  useEffect(() => {
    generateRecommendations();
  }, [products]);

  const generateRecommendations = async () => {
    setLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const recommendationEngines: RecommendationEngine[] = [
      {
        type: 'ai',
        title: 'AI-Powered Recommendations',
        description: 'Machine learning algorithms analyze your behavior patterns',
        icon: <Brain className="w-6 h-6 text-purple-500" />,
        products: products.slice(0, 4),
        confidence: 94
      },
      {
        type: 'trending',
        title: 'Trending Products',
        description: 'Popular items based on real-time market data',
        icon: <TrendingUp className="w-6 h-6 text-green-500" />,
        products: products.slice(4, 8),
        confidence: 87
      },
      {
        type: 'collaborative',
        title: 'Users Like You Bought',
        description: 'Recommendations from similar customer profiles',
        icon: <Users className="w-6 h-6 text-blue-500" />,
        products: products.slice(8, 12),
        confidence: 91
      },
      {
        type: 'behavioral',
        title: 'Based on Your Activity',
        description: 'Personalized suggestions from your browsing history',
        icon: <Eye className="w-6 h-6 text-orange-500" />,
        products: products.slice(12, 16),
        confidence: 89
      },
      {
        type: 'seasonal',
        title: 'Seasonal Picks',
        description: 'Curated selections for current season and trends',
        icon: <Clock className="w-6 h-6 text-pink-500" />,
        products: products.slice(16, 20),
        confidence: 82
      }
    ];

    setEngines(recommendationEngines);
    setLoading(false);
  };

  const activeEngineData = engines.find(engine => engine.type === activeEngine);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Recommendations</h1>
        <p className="text-gray-600">AI-powered product suggestions tailored just for you</p>
      </div>

      {/* Engine Selection */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {engines.map((engine) => (
          <button
            key={engine.type}
            onClick={() => setActiveEngine(engine.type)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 ${
              activeEngine === engine.type
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              {engine.icon}
              <h3 className="font-semibold text-sm">{engine.title}</h3>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <span className="text-xs text-gray-600">{engine.confidence}%</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Active Engine Display */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your preferences...</p>
        </div>
      ) : activeEngineData ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              {activeEngineData.icon}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{activeEngineData.title}</h2>
                <p className="text-gray-600">{activeEngineData.description}</p>
              </div>
              <div className="ml-auto">
                <div className="bg-white rounded-lg px-3 py-1">
                  <span className="text-sm font-semibold text-gray-900">
                    {activeEngineData.confidence}% Match
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeEngineData.products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => addToWishlist(product)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>
                  <button
                    onClick={() => addItem(product)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* User Behavior Insights */}
      <div className="mt-12 bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Your Shopping Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Top Categories</h4>
            <div className="space-y-2">
              {Object.entries(userBehavior.categoryPreferences).map(([category, score]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{category}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${score * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{Math.round(score * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Recent Searches</h4>
            <div className="space-y-1">
              {userBehavior.searchQueries.map((query, index) => (
                <div key={index} className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {query}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Price Range</h4>
            <div className="text-sm text-gray-600">
              <p>Preferred: ${userBehavior.priceRange.min} - ${userBehavior.priceRange.max}</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartRecommendations;
