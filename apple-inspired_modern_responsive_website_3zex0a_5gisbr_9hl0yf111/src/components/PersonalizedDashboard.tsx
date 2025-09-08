import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  TrendingUp, 
  ShoppingBag, 
  Heart, 
  Clock, 
  Star,
  Gift,
  Zap,
  Target,
  Award,
  Calendar,
  DollarSign
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface PersonalizedInsight {
  id: string;
  type: 'spending' | 'preference' | 'recommendation' | 'milestone';
  title: string;
  description: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

interface ShoppingPattern {
  category: string;
  frequency: number;
  avgSpend: number;
  lastPurchase: string;
  prediction: number;
}

const PersonalizedDashboard: React.FC = () => {
  const [insights, setInsights] = useState<PersonalizedInsight[]>([]);
  const [patterns, setPatterns] = useState<ShoppingPattern[]>([]);
  const [spendingData, setSpendingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI-generated personalized insights
    const generateInsights = () => {
      const mockInsights: PersonalizedInsight[] = [
        {
          id: '1',
          type: 'spending',
          title: 'Monthly Spending Trend',
          description: 'Your spending has increased 23% this month, mainly on tech accessories',
          value: '+23%',
          trend: 'up',
          confidence: 89
        },
        {
          id: '2',
          type: 'preference',
          title: 'Favorite Category',
          description: 'You show strong preference for Apple ecosystem products',
          value: 'Tech',
          trend: 'stable',
          confidence: 94
        },
        {
          id: '3',
          type: 'recommendation',
          title: 'Perfect Match',
          description: 'Based on your history, MacBook Air M3 has 96% compatibility',
          value: '96%',
          trend: 'up',
          confidence: 96
        },
        {
          id: '4',
          type: 'milestone',
          title: 'Loyalty Milestone',
          description: 'You are 2 purchases away from VIP status',
          value: '2 left',
          trend: 'up',
          confidence: 100
        }
      ];

      const mockPatterns: ShoppingPattern[] = [
        { category: 'iPhone', frequency: 85, avgSpend: 1200, lastPurchase: '2024-01-15', prediction: 92 },
        { category: 'MacBook', frequency: 65, avgSpend: 2500, lastPurchase: '2023-11-20', prediction: 78 },
        { category: 'AirPods', frequency: 90, avgSpend: 250, lastPurchase: '2024-02-01', prediction: 95 },
        { category: 'iPad', frequency: 45, avgSpend: 800, lastPurchase: '2023-12-10', prediction: 67 },
        { category: 'Apple Watch', frequency: 70, avgSpend: 450, lastPurchase: '2024-01-05', prediction: 82 }
      ];

      const mockSpendingData = [
        { month: 'Jan', amount: 1200, predicted: 1150 },
        { month: 'Feb', amount: 800, predicted: 850 },
        { month: 'Mar', amount: 1500, predicted: 1400 },
        { month: 'Apr', amount: 950, predicted: 1000 },
        { month: 'May', amount: 1800, predicted: 1750 },
        { month: 'Jun', amount: 1300, predicted: 1350 }
      ];

      setInsights(mockInsights);
      setPatterns(mockPatterns);
      setSpendingData(mockSpendingData);
      setLoading(false);
    };

    setTimeout(generateInsights, 1000);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <Target className="w-4 h-4 text-blue-500" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'spending': return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'preference': return <Heart className="w-5 h-5 text-red-500" />;
      case 'recommendation': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'milestone': return <Award className="w-5 h-5 text-purple-500" />;
      default: return <Star className="w-5 h-5 text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Personal Dashboard</h2>
          <p className="text-gray-600">AI-powered insights tailored just for you</p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg">
          <Zap className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-medium text-blue-700">AI Powered</span>
        </div>
      </div>

      {/* Personalized Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                {getInsightIcon(insight.type)}
              </div>
              <div className="flex items-center space-x-1">
                {getTrendIcon(insight.trend)}
                <span className="text-sm font-medium text-gray-600">{insight.confidence}%</span>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
            <div className="text-2xl font-bold text-blue-600">{insight.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Spending Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending vs Predictions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={spendingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, '']} />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stackId="1" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3}
                name="Actual Spending"
              />
              <Area 
                type="monotone" 
                dataKey="predicted" 
                stackId="2" 
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.3}
                strokeDasharray="5 5"
                name="AI Prediction"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shopping Patterns</h3>
          <div className="space-y-4">
            {patterns.map((pattern, index) => (
              <div key={pattern.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{pattern.category}</div>
                    <div className="text-sm text-gray-500">Avg: ${pattern.avgSpend}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{pattern.prediction}%</div>
                  <div className="text-xs text-gray-500">Next purchase</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-2xl text-white">
        <h3 className="text-xl font-semibold mb-4">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/20 backdrop-blur-sm p-4 rounded-xl hover:bg-white/30 transition-colors text-left">
            <Gift className="w-6 h-6 mb-2" />
            <div className="font-medium">Claim Reward</div>
            <div className="text-sm opacity-90">500 points available</div>
          </button>
          <button className="bg-white/20 backdrop-blur-sm p-4 rounded-xl hover:bg-white/30 transition-colors text-left">
            <Calendar className="w-6 h-6 mb-2" />
            <div className="font-medium">Schedule Delivery</div>
            <div className="text-sm opacity-90">Optimize your orders</div>
          </button>
          <button className="bg-white/20 backdrop-blur-sm p-4 rounded-xl hover:bg-white/30 transition-colors text-left">
            <Star className="w-6 h-6 mb-2" />
            <div className="font-medium">Rate Products</div>
            <div className="text-sm opacity-90">Help improve AI</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedDashboard;
