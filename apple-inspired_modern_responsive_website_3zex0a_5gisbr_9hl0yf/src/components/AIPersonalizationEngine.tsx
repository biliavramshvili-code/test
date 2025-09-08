import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  Eye,
  Zap,
  Settings,
  BarChart3,
  Lightbulb,
  Sparkles,
  Clock,
  Heart,
  ShoppingBag,
  Star
} from 'lucide-react';

interface PersonalizationProfile {
  id: string;
  userId: string;
  preferences: {
    categories: string[];
    priceRange: { min: number; max: number };
    brands: string[];
    colors: string[];
    styles: string[];
  };
  behavior: {
    browsingPatterns: string[];
    purchaseHistory: string[];
    searchQueries: string[];
    timeSpentOnCategories: Record<string, number>;
  };
  aiInsights: {
    personalityType: string;
    shoppingStyle: string;
    predictedInterests: string[];
    lifestyleSegment: string;
  };
  recommendations: PersonalizedRecommendation[];
}

interface PersonalizedRecommendation {
  id: string;
  type: 'product' | 'category' | 'brand' | 'experience';
  title: string;
  description: string;
  confidence: number;
  reasoning: string[];
  actionable: boolean;
  priority: 'high' | 'medium' | 'low';
  estimatedValue: number;
}

interface AIModel {
  name: string;
  type: 'collaborative' | 'content' | 'hybrid' | 'deep_learning';
  accuracy: number;
  lastTrained: string;
  status: 'active' | 'training' | 'inactive';
}

const AIPersonalizationEngine: React.FC = () => {
  const [profile, setProfile] = useState<PersonalizationProfile | null>(null);
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const [activeTab, setActiveTab] = useState<'insights' | 'recommendations' | 'models' | 'settings'>('insights');
  const [loading, setLoading] = useState(true);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  useEffect(() => {
    // Simulate AI personalization data
    const mockProfile: PersonalizationProfile = {
      id: 'profile-1',
      userId: 'user-123',
      preferences: {
        categories: ['Electronics', 'Accessories', 'Wearables'],
        priceRange: { min: 100, max: 2000 },
        brands: ['Apple', 'Samsung', 'Sony'],
        colors: ['Space Gray', 'Silver', 'Gold'],
        styles: ['Minimalist', 'Premium', 'Professional']
      },
      behavior: {
        browsingPatterns: ['Evening shopper', 'Research-heavy', 'Price-conscious'],
        purchaseHistory: ['iPhone 14 Pro', 'AirPods Pro', 'MacBook Air'],
        searchQueries: ['best smartphone 2024', 'wireless earbuds', 'laptop for work'],
        timeSpentOnCategories: {
          'Smartphones': 45,
          'Laptops': 30,
          'Accessories': 15,
          'Wearables': 10
        }
      },
      aiInsights: {
        personalityType: 'Tech Enthusiast',
        shoppingStyle: 'Research-Driven Premium Buyer',
        predictedInterests: ['Latest Technology', 'Professional Tools', 'Productivity Apps'],
        lifestyleSegment: 'Digital Professional'
      },
      recommendations: [
        {
          id: 'rec-1',
          type: 'product',
          title: 'iPhone 15 Pro Max',
          description: 'Perfect upgrade based on your iPhone usage patterns',
          confidence: 94,
          reasoning: ['Previous iPhone purchases', 'Premium preference', 'Professional use case'],
          actionable: true,
          priority: 'high',
          estimatedValue: 1200
        },
        {
          id: 'rec-2',
          type: 'category',
          title: 'Smart Home Devices',
          description: 'Expand your tech ecosystem with smart home integration',
          confidence: 78,
          reasoning: ['Tech enthusiast profile', 'Apple ecosystem user', 'Professional lifestyle'],
          actionable: true,
          priority: 'medium',
          estimatedValue: 500
        },
        {
          id: 'rec-3',
          type: 'experience',
          title: 'Apple One Subscription',
          description: 'Maximize your Apple ecosystem benefits',
          confidence: 85,
          reasoning: ['Multiple Apple devices', 'Professional use', 'Content consumption patterns'],
          actionable: true,
          priority: 'medium',
          estimatedValue: 30
        }
      ]
    };

    const mockModels: AIModel[] = [
      {
        name: 'Collaborative Filtering v2.1',
        type: 'collaborative',
        accuracy: 87.3,
        lastTrained: '2024-01-15T10:00:00Z',
        status: 'active'
      },
      {
        name: 'Content-Based Recommender',
        type: 'content',
        accuracy: 82.1,
        lastTrained: '2024-01-14T15:30:00Z',
        status: 'active'
      },
      {
        name: 'Deep Learning Hybrid',
        type: 'deep_learning',
        accuracy: 91.7,
        lastTrained: '2024-01-16T08:00:00Z',
        status: 'training'
      },
      {
        name: 'Behavioral Pattern Analyzer',
        type: 'hybrid',
        accuracy: 89.4,
        lastTrained: '2024-01-15T20:00:00Z',
        status: 'active'
      }
    ];

    setProfile(mockProfile);
    setAiModels(mockModels);
    setLoading(false);
  }, []);

  // Simulate real-time AI updates
  useEffect(() => {
    if (!realTimeUpdates) return;

    const interval = setInterval(() => {
      setProfile(prev => {
        if (!prev) return prev;
        
        return {
          ...prev,
          recommendations: prev.recommendations.map(rec => ({
            ...rec,
            confidence: Math.min(rec.confidence + Math.random() * 2 - 1, 100)
          }))
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  const getModelStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'training': return 'text-blue-600 bg-blue-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-300 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="w-8 h-8 text-purple-500" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Personalization Engine</h1>
            <p className="text-gray-600">Advanced machine learning for personalized experiences</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setRealTimeUpdates(!realTimeUpdates)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              realTimeUpdates 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Real-time AI</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { key: 'insights', label: 'AI Insights', icon: <Lightbulb className="w-4 h-4" /> },
          { key: 'recommendations', label: 'Recommendations', icon: <Target className="w-4 h-4" /> },
          { key: 'models', label: 'AI Models', icon: <BarChart3 className="w-4 h-4" /> },
          { key: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'insights' && profile && (
          <motion.div
            key="insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* AI Insights Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8" />
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Personality Type</h3>
                <p className="text-purple-100">{profile.aiInsights.personalityType}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <ShoppingBag className="w-8 h-8" />
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Shopping Style</h3>
                <p className="text-blue-100">{profile.aiInsights.shoppingStyle}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <Target className="w-8 h-8" />
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Lifestyle Segment</h3>
                <p className="text-green-100">{profile.aiInsights.lifestyleSegment}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between mb-4">
                  <Heart className="w-8 h-8" />
                  <Star className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Predicted Interests</h3>
                <p className="text-orange-100">{profile.aiInsights.predictedInterests.length} categories</p>
              </div>
            </div>

            {/* Behavioral Patterns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Browsing Patterns</h3>
                <div className="space-y-3">
                  {profile.behavior.browsingPatterns.map((pattern, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{pattern}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Category Engagement</h3>
                <div className="space-y-3">
                  {Object.entries(profile.behavior.timeSpentOnCategories).map(([category, time]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">{category}</span>
                        <span className="text-gray-500">{time}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${time}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Predicted Interests */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Predicted Interests</h3>
              <div className="flex flex-wrap gap-3">
                {profile.aiInsights.predictedInterests.map((interest, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'recommendations' && profile && (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {profile.recommendations.map(rec => (
              <motion.div
                key={rec.id}
                whileHover={{ scale: 1.01 }}
                className={`p-6 rounded-2xl border-l-4 ${getPriorityColor(rec.priority)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{rec.title}</h3>
                    <p className="text-gray-600 mb-3">{rec.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-600">Confidence: {rec.confidence.toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600">Value: ${rec.estimatedValue}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{rec.confidence.toFixed(0)}%</div>
                    <div className="text-sm text-gray-500">Match</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">AI Reasoning:</h4>
                  <ul className="space-y-1">
                    {rec.reasoning.map((reason, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {rec.actionable && (
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Explore Recommendation
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'models' && (
          <motion.div
            key="models"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiModels.map(model => (
                <div key={model.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{model.name}</h3>
                      <p className="text-gray-600 capitalize">{model.type.replace('_', ' ')}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getModelStatusColor(model.status)}`}>
                      {model.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Accuracy</span>
                      <span className="font-semibold text-green-600">{model.accuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${model.accuracy}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Trained</span>
                      <span className="text-gray-500">
                        {new Date(model.lastTrained).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Personalization Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-gray-700">Enable AI-powered recommendations</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-gray-700">Allow behavioral tracking for personalization</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-700">Share anonymized data for model improvement</span>
                </label>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Personalization Level</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option>High - Maximum personalization</option>
                  <option>Medium - Balanced approach</option>
                  <option>Low - Minimal personalization</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIPersonalizationEngine;
