import React, { useState, useEffect } from 'react';
import { Search, Filter, Zap, Target, Brain, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';

interface SmartFilter {
  id: string;
  name: string;
  type: 'usage' | 'budget' | 'experience' | 'preference';
  options: string[];
  selected: string[];
}

interface UserProfile {
  usage: string[];
  budget: string;
  experience: string;
  preferences: string[];
}

const SmartProductFinder: React.FC = () => {
  const { products } = useProducts();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    usage: [],
    budget: '',
    experience: '',
    preferences: []
  });
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const smartFilters: SmartFilter[] = [
    {
      id: 'usage',
      name: 'How will you use your device?',
      type: 'usage',
      options: [
        'Work & Productivity',
        'Creative Projects',
        'Gaming & Entertainment',
        'Communication',
        'Learning & Education',
        'Fitness & Health',
        'Photography',
        'Music & Audio'
      ],
      selected: userProfile.usage
    },
    {
      id: 'budget',
      name: "What's your budget range?",
      type: 'budget',
      options: [
        'Under $500',
        '$500 - $1,000',
        '$1,000 - $2,000',
        '$2,000 - $3,000',
        'Over $3,000'
      ],
      selected: userProfile.budget ? [userProfile.budget] : []
    },
    {
      id: 'experience',
      name: 'How familiar are you with Apple products?',
      type: 'experience',
      options: [
        'Complete beginner',
        'Some experience',
        'Very experienced',
        'Apple expert'
      ],
      selected: userProfile.experience ? [userProfile.experience] : []
    },
    {
      id: 'preferences',
      name: 'What matters most to you?',
      type: 'preference',
      options: [
        'Latest technology',
        'Best value for money',
        'Portability',
        'Performance',
        'Battery life',
        'Display quality',
        'Storage capacity',
        'Camera quality'
      ],
      selected: userProfile.preferences
    }
  ];

  const handleFilterChange = (filterId: string, option: string, isMultiple: boolean = true) => {
    if (filterId === 'usage') {
      setUserProfile(prev => ({
        ...prev,
        usage: isMultiple 
          ? prev.usage.includes(option)
            ? prev.usage.filter(u => u !== option)
            : [...prev.usage, option]
          : [option]
      }));
    } else if (filterId === 'budget') {
      setUserProfile(prev => ({ ...prev, budget: option }));
    } else if (filterId === 'experience') {
      setUserProfile(prev => ({ ...prev, experience: option }));
    } else if (filterId === 'preferences') {
      setUserProfile(prev => ({
        ...prev,
        preferences: prev.preferences.includes(option)
          ? prev.preferences.filter(p => p !== option)
          : [...prev.preferences, option]
      }));
    }
  };

  const generateRecommendations = () => {
    setLoading(true);
    
    setTimeout(() => {
      let scored = products.map(product => {
        let score = 0;
        
        // Usage-based scoring
        if (userProfile.usage.includes('Work & Productivity') && 
            (product.name.includes('MacBook') || product.name.includes('iPad Pro'))) {
          score += 30;
        }
        if (userProfile.usage.includes('Creative Projects') && 
            (product.name.includes('Pro') || product.name.includes('Studio'))) {
          score += 25;
        }
        if (userProfile.usage.includes('Gaming & Entertainment') && 
            (product.name.includes('iPhone') || product.name.includes('iPad'))) {
          score += 20;
        }
        if (userProfile.usage.includes('Photography') && 
            product.name.includes('iPhone')) {
          score += 35;
        }
        
        // Budget-based scoring
        const budgetRanges = {
          'Under $500': [0, 500],
          '$500 - $1,000': [500, 1000],
          '$1,000 - $2,000': [1000, 2000],
          '$2,000 - $3,000': [2000, 3000],
          'Over $3,000': [3000, Infinity]
        };
        
        if (userProfile.budget && budgetRanges[userProfile.budget as keyof typeof budgetRanges]) {
          const [min, max] = budgetRanges[userProfile.budget as keyof typeof budgetRanges];
          if (product.price >= min && product.price <= max) {
            score += 40;
          }
        }
        
        // Experience-based scoring
        if (userProfile.experience === 'Complete beginner' && 
            (product.name.includes('iPhone') || product.name.includes('iPad'))) {
          score += 15;
        }
        if (userProfile.experience === 'Apple expert' && 
            product.name.includes('Pro')) {
          score += 20;
        }
        
        // Preference-based scoring
        if (userProfile.preferences.includes('Latest technology') && 
            product.name.includes('15')) {
          score += 25;
        }
        if (userProfile.preferences.includes('Portability') && 
            (product.name.includes('Air') || product.name.includes('mini'))) {
          score += 20;
        }
        if (userProfile.preferences.includes('Performance') && 
            product.name.includes('Pro')) {
          score += 30;
        }
        
        return { product, score };
      });
      
      // Sort by score and take top recommendations
      const topRecommendations = scored
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map(item => item.product);
      
      setRecommendations(topRecommendations);
      setLoading(false);
    }, 2000);
  };

  const resetFinder = () => {
    setUserProfile({
      usage: [],
      budget: '',
      experience: '',
      preferences: []
    });
    setRecommendations([]);
    setStep(0);
  };

  const currentFilter = smartFilters[step];
  const isComplete = step >= smartFilters.length;

  return (
    <div className="bg-white rounded-2xl p-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-apple-gray-900">Smart Product Finder</h2>
          <p className="text-apple-gray-600">AI-powered recommendations tailored just for you</p>
        </div>
      </div>

      {!isComplete ? (
        <div className="space-y-8">
          {/* Progress Bar */}
          <div className="w-full bg-apple-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / smartFilters.length) * 100}%` }}
            ></div>
          </div>

          {/* Current Question */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-apple-gray-900 mb-2">
              Step {step + 1} of {smartFilters.length}
            </h3>
            <p className="text-lg text-apple-gray-700 mb-8">{currentFilter.name}</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentFilter.options.map(option => {
              const isSelected = currentFilter.selected.includes(option);
              const isMultiple = currentFilter.type === 'usage' || currentFilter.type === 'preference';
              
              return (
                <button
                  key={option}
                  onClick={() => handleFilterChange(currentFilter.id, option, isMultiple)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-apple-gray-200 hover:border-purple-300 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {isSelected && <Sparkles className="w-5 h-5 text-purple-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="px-6 py-3 border border-apple-gray-300 rounded-lg text-apple-gray-700 hover:bg-apple-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <button
              onClick={() => {
                if (step < smartFilters.length - 1) {
                  setStep(step + 1);
                } else {
                  generateRecommendations();
                }
              }}
              disabled={currentFilter.selected.length === 0}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step < smartFilters.length - 1 ? 'Next' : 'Find My Products'}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Results Header */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Target className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-semibold text-apple-gray-900">
                Perfect Matches Found!
              </h3>
            </div>
            <p className="text-apple-gray-600 mb-6">
              Based on your preferences, here are the best Apple products for you
            </p>
            <button
              onClick={resetFinder}
              className="px-4 py-2 border border-apple-gray-300 rounded-lg text-apple-gray-700 hover:bg-apple-gray-50"
            >
              Start Over
            </button>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center space-x-3">
                <Zap className="w-6 h-6 text-purple-500 animate-pulse" />
                <span className="text-lg text-apple-gray-700">Analyzing your preferences...</span>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-apple-gray-200 h-48 rounded-xl mb-4"></div>
                    <div className="bg-apple-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-apple-gray-200 h-3 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Recommendations */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((product, index) => (
                <div key={product.id} className="relative">
                  <ProductCard product={product} />
                  {index === 0 && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Best Match
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartProductFinder;
