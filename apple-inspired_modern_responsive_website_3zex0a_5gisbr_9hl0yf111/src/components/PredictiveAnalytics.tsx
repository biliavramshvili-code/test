import React, { useState, useEffect } from 'react';
import { TrendingUp, Brain, Target, AlertTriangle, DollarSign, Users, ShoppingCart, Calendar } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface PredictionData {
  category: string;
  currentSales: number;
  predictedSales: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  factors: string[];
}

interface MarketTrend {
  period: string;
  revenue: number;
  orders: number;
  customers: number;
  predicted: boolean;
}

interface RiskAlert {
  id: string;
  type: 'inventory' | 'demand' | 'pricing' | 'competition';
  severity: 'low' | 'medium' | 'high';
  message: string;
  impact: string;
  recommendation: string;
}

const PredictiveAnalytics: React.FC = () => {
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [riskAlerts, setRiskAlerts] = useState<RiskAlert[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generatePredictions();
  }, [selectedTimeframe]);

  const generatePredictions = async () => {
    setLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockPredictions: PredictionData[] = [
      {
        category: 'Smartphones',
        currentSales: 125000,
        predictedSales: 148000,
        confidence: 87,
        trend: 'up',
        factors: ['Holiday season', 'New product launch', 'Marketing campaign']
      },
      {
        category: 'Laptops',
        currentSales: 89000,
        predictedSales: 92000,
        confidence: 82,
        trend: 'up',
        factors: ['Back-to-school season', 'Remote work trend']
      },
      {
        category: 'Audio',
        currentSales: 67000,
        predictedSales: 58000,
        confidence: 79,
        trend: 'down',
        factors: ['Market saturation', 'Economic uncertainty']
      },
      {
        category: 'Wearables',
        currentSales: 45000,
        predictedSales: 52000,
        confidence: 91,
        trend: 'up',
        factors: ['Health awareness', 'Fitness trends', 'New features']
      }
    ];

    const mockTrends: MarketTrend[] = [
      { period: 'Week 1', revenue: 125000, orders: 1250, customers: 980, predicted: false },
      { period: 'Week 2', revenue: 132000, orders: 1320, customers: 1050, predicted: false },
      { period: 'Week 3', revenue: 128000, orders: 1280, customers: 1020, predicted: false },
      { period: 'Week 4', revenue: 145000, orders: 1450, customers: 1180, predicted: false },
      { period: 'Week 5', revenue: 158000, orders: 1580, customers: 1280, predicted: true },
      { period: 'Week 6', revenue: 162000, orders: 1620, customers: 1320, predicted: true },
      { period: 'Week 7', revenue: 171000, orders: 1710, customers: 1390, predicted: true },
      { period: 'Week 8', revenue: 178000, orders: 1780, customers: 1450, predicted: true }
    ];

    const mockAlerts: RiskAlert[] = [
      {
        id: '1',
        type: 'inventory',
        severity: 'high',
        message: 'iPhone 15 Pro inventory running low',
        impact: 'Potential stockout in 3 days',
        recommendation: 'Increase order quantity by 40%'
      },
      {
        id: '2',
        type: 'demand',
        severity: 'medium',
        message: 'Unusual demand spike for MacBook Air',
        impact: '23% above forecast',
        recommendation: 'Adjust pricing strategy and inventory levels'
      },
      {
        id: '3',
        type: 'pricing',
        severity: 'low',
        message: 'Competitor price reduction detected',
        impact: 'Potential 5% revenue impact',
        recommendation: 'Consider promotional campaign'
      }
    ];

    setPredictions(mockPredictions);
    setMarketTrends(mockTrends);
    setRiskAlerts(mockAlerts);
    setLoading(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Predictive Analytics</h1>
        <p className="text-gray-600">AI-powered insights and forecasting for strategic decision making</p>
      </div>

      {/* Timeframe Selector */}
      <div className="flex space-x-2 mb-8">
        {[
          { value: '7d', label: '7 Days' },
          { value: '30d', label: '30 Days' },
          { value: '90d', label: '90 Days' },
          { value: '1y', label: '1 Year' }
        ].map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setSelectedTimeframe(value as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTimeframe === value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing market data and generating predictions...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">+12.5%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">$1.2M</h3>
              <p className="text-gray-600">Predicted Revenue</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">+8.3%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">15,420</h3>
              <p className="text-gray-600">Predicted Orders</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">+15.7%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">12,890</h3>
              <p className="text-gray-600">New Customers</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Brain className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm text-blue-600 font-medium">89% Accuracy</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">AI Model</h3>
              <p className="text-gray-600">Prediction Confidence</p>
            </div>
          </div>

          {/* Market Trends Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Revenue Forecast</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={marketTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name]} />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.1}
                  strokeDasharray={(entry: any) => entry?.predicted ? "5 5" : "0"}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center mt-4 space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-blue-500"></div>
                <span className="text-sm text-gray-600">Historical Data</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-1 bg-blue-500 border-dashed border-2 border-blue-500"></div>
                <span className="text-sm text-gray-600">Predicted Data</span>
              </div>
            </div>
          </div>

          {/* Category Predictions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Category Sales Predictions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {predictions.map((prediction, index) => (
                <div key={prediction.category} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{prediction.category}</h4>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(prediction.trend)}
                      <span className="text-sm text-gray-600">{prediction.confidence}% confidence</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Current Sales</span>
                      <span className="font-medium">${prediction.currentSales.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Predicted Sales</span>
                      <span className="font-medium text-blue-600">${prediction.predictedSales.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${prediction.confidence}%` }}
                      ></div>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">Key Factors:</p>
                      <div className="flex flex-wrap gap-1">
                        {prediction.factors.map((factor, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Risk Alerts & Recommendations</h3>
            <div className="space-y-4">
              {riskAlerts.map((alert) => (
                <div key={alert.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <AlertTriangle className={`w-6 h-6 ${
                        alert.severity === 'high' ? 'text-red-500' : 
                        alert.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{alert.message}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Impact: {alert.impact}</p>
                      <p className="text-sm text-blue-600 font-medium">Recommendation: {alert.recommendation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prediction Accuracy */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Model Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Accuracy by Category</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={predictions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="confidence" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Prediction Distribution</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={predictions}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="predictedSales"
                      label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                    >
                      {predictions.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Predicted Sales']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictiveAnalytics;
