import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Eye, ShoppingCart, Star, Zap, Target, Brain } from 'lucide-react';
import { Product } from '../types';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

interface RecommendationSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  products: Product[];
  algorithm: string;
}

const RecommendationEngine: React.FC<{ userId?: string; currentProduct?: Product }> = ({ 
  userId, 
  currentProduct 
}) => {
  const [recommendations, setRecommendations] = useState<RecommendationSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAlgorithm, setActiveAlgorithm] = useState('all');

  useEffect(() => {
    // Simulate AI recommendation engine
    const generateRecommendations = () => {
      const sections: RecommendationSection[] = [
        {
          id: 'personalized',
          title: 'Recommended for You',
          description: 'Based on your browsing history and preferences',
          icon: <Target className="w-5 h-5" />,
          products: products.slice(0, 4),
          algorithm: 'collaborative-filtering'
        },
        {
          id: 'trending',
          title: 'Trending Now',
          description: 'Popular products among customers like you',
          icon: <TrendingUp className="w-5 h-5" />,
          products: products.slice(2, 6),
          algorithm: 'popularity-based'
        },
        {
          id: 'similar',
          title: 'Similar Products',
          description: currentProduct ? `Products similar to ${currentProduct.name}` : 'Products you might like',
          icon: <Brain className="w-5 h-5" />,
          products: products.slice(1, 5),
          algorithm: 'content-based'
        },
        {
          id: 'frequently-bought',
          title: 'Frequently Bought Together',
          description: 'Customers who bought this item also bought',
          icon: <Users className="w-5 h-5" />,
          products: products.slice(3, 7),
          algorithm: 'market-basket'
        },
        {
          id: 'recently-viewed',
          title: 'Continue Shopping',
          description: 'Pick up where you left off',
          icon: <Eye className="w-5 h-5" />,
          products: products.slice(0, 3),
          algorithm: 'session-based'
        },
        {
          id: 'ai-curated',
          title: 'AI Curated Selection',
          description: 'Handpicked by our AI based on your unique profile',
          icon: <Zap className="w-5 h-5" />,
          products: products.slice(4, 8),
          algorithm: 'deep-learning'
        }
      ];

      setRecommendations(sections);
      setIsLoading(false);
    };

    // Simulate API delay
    setTimeout(generateRecommendations, 1000);
  }, [userId, currentProduct]);

  const filteredRecommendations = activeAlgorithm === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.algorithm === activeAlgorithm);

  const algorithms = [
    { id: 'all', name: 'All Recommendations' },
    { id: 'collaborative-filtering', name: 'Collaborative Filtering' },
    { id: 'content-based', name: 'Content-Based' },
    { id: 'popularity-based', name: 'Popularity-Based' },
    { id: 'deep-learning', name: 'Deep Learning' }
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-8 border border-apple-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-apple-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-32 bg-apple-gray-200 rounded-lg"></div>
                <div className="h-4 bg-apple-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-apple-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Algorithm Filter */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-apple-gray-900">Smart Recommendations</h2>
            <p className="text-apple-gray-600">Powered by advanced AI algorithms</p>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-apple-blue-500" />
            <span className="text-sm text-apple-gray-600">AI Engine Active</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {algorithms.map((algorithm) => (
            <button
              key={algorithm.id}
              onClick={() => setActiveAlgorithm(algorithm.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeAlgorithm === algorithm.id
                  ? 'bg-apple-blue-500 text-white'
                  : 'bg-apple-gray-100 text-apple-gray-700 hover:bg-apple-gray-200'
              }`}
            >
              {algorithm.name}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendation Sections */}
      {filteredRecommendations.map((section) => (
        <div key={section.id} className="bg-white rounded-xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-apple-blue-50 rounded-lg text-apple-blue-600">
                {section.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-apple-gray-900">{section.title}</h3>
                <p className="text-apple-gray-600">{section.description}</p>
              </div>
            </div>
            <div className="text-xs text-apple-gray-500 bg-apple-gray-100 px-2 py-1 rounded">
              {section.algorithm.replace('-', ' ').toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {section.products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-apple-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium">4.8</span>
                    </div>
                  </div>
                </div>
                
                <h4 className="font-semibold text-apple-gray-900 mb-2 group-hover:text-apple-blue-600 transition-colors">
                  {product.name}
                </h4>
                
                <p className="text-sm text-apple-gray-600 mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-apple-gray-900">
                    ${product.price.toLocaleString()}
                  </span>
                  <button className="p-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors opacity-0 group-hover:opacity-100">
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>

                {/* Recommendation Score */}
                <div className="mt-3 flex items-center justify-between text-xs text-apple-gray-500">
                  <span>Match Score</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-16 h-1 bg-apple-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                      ></div>
                    </div>
                    <span className="font-medium">{Math.floor(Math.random() * 40) + 60}%</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View More */}
          <div className="text-center mt-6">
            <button className="px-6 py-2 text-apple-blue-600 hover:text-apple-blue-700 font-medium transition-colors">
              View More Recommendations
            </button>
          </div>
        </div>
      ))}

      {/* Recommendation Insights */}
      <div className="bg-gradient-to-r from-apple-blue-50 to-purple-50 rounded-xl p-6 border border-apple-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-white rounded-lg">
            <Brain className="w-6 h-6 text-apple-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-apple-gray-900">AI Insights</h3>
            <p className="text-apple-gray-600">Understanding your preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-apple-blue-600 mb-1">87%</div>
            <div className="text-sm text-apple-gray-600">Recommendation Accuracy</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 mb-1">iPhone</div>
            <div className="text-sm text-apple-gray-600">Top Interest Category</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 mb-1">$999</div>
            <div className="text-sm text-apple-gray-600">Preferred Price Range</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationEngine;
