import React, { useState, useEffect } from 'react';
import { Users, Brain, Target, TrendingUp, Eye, Heart, ShoppingBag, Clock, Star, MapPin } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

interface CustomerSegment {
  id: string;
  name: string;
  size: number;
  value: number;
  characteristics: string[];
  behavior: {
    avgOrderValue: number;
    frequency: number;
    retention: number;
    satisfaction: number;
  };
  preferences: {
    categories: string[];
    priceRange: { min: number; max: number };
    channels: string[];
  };
}

interface CustomerJourney {
  stage: string;
  customers: number;
  conversionRate: number;
  avgTime: number;
  dropoffReasons: string[];
}

interface PersonalizationInsight {
  customerId: string;
  name: string;
  segment: string;
  predictedValue: number;
  recommendations: string[];
  riskScore: number;
  nextBestAction: string;
}

const CustomerIntelligence: React.FC = () => {
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [journey, setJourney] = useState<CustomerJourney[]>([]);
  const [insights, setInsights] = useState<PersonalizationInsight[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateCustomerIntelligence();
  }, []);

  const generateCustomerIntelligence = async () => {
    setLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockSegments: CustomerSegment[] = [
      {
        id: 'premium',
        name: 'Premium Buyers',
        size: 1250,
        value: 890000,
        characteristics: ['High income', 'Tech enthusiasts', 'Early adopters'],
        behavior: {
          avgOrderValue: 1200,
          frequency: 3.2,
          retention: 89,
          satisfaction: 4.7
        },
        preferences: {
          categories: ['Smartphones', 'Laptops', 'Premium Audio'],
          priceRange: { min: 800, max: 3000 },
          channels: ['Online', 'Premium stores']
        }
      },
      {
        id: 'value',
        name: 'Value Seekers',
        size: 3200,
        value: 640000,
        characteristics: ['Price conscious', 'Research heavy', 'Deal hunters'],
        behavior: {
          avgOrderValue: 350,
          frequency: 2.1,
          retention: 67,
          satisfaction: 4.2
        },
        preferences: {
          categories: ['Accessories', 'Refurbished', 'Budget phones'],
          priceRange: { min: 50, max: 500 },
          channels: ['Online', 'Discount stores']
        }
      },
      {
        id: 'professional',
        name: 'Business Professionals',
        size: 1800,
        value: 720000,
        characteristics: ['B2B buyers', 'Bulk purchases', 'Reliability focused'],
        behavior: {
          avgOrderValue: 850,
          frequency: 1.8,
          retention: 78,
          satisfaction: 4.4
        },
        preferences: {
          categories: ['Laptops', 'Business phones', 'Productivity tools'],
          priceRange: { min: 400, max: 2000 },
          channels: ['B2B portal', 'Account managers']
        }
      },
      {
        id: 'casual',
        name: 'Casual Users',
        size: 4500,
        value: 450000,
        characteristics: ['Occasional buyers', 'Basic needs', 'Brand agnostic'],
        behavior: {
          avgOrderValue: 180,
          frequency: 1.2,
          retention: 45,
          satisfaction: 3.9
        },
        preferences: {
          categories: ['Basic phones', 'Accessories', 'Cables'],
          priceRange: { min: 20, max: 300 },
          channels: ['Online', 'Retail stores']
        }
      }
    ];

    const mockJourney: CustomerJourney[] = [
      {
        stage: 'Awareness',
        customers: 10000,
        conversionRate: 100,
        avgTime: 0,
        dropoffReasons: []
      },
      {
        stage: 'Interest',
        customers: 7500,
        conversionRate: 75,
        avgTime: 2.5,
        dropoffReasons: ['Price concerns', 'Feature mismatch']
      },
      {
        stage: 'Consideration',
        customers: 4200,
        conversionRate: 56,
        avgTime: 5.2,
        dropoffReasons: ['Competitor comparison', 'Budget constraints']
      },
      {
        stage: 'Purchase',
        customers: 2800,
        conversionRate: 67,
        avgTime: 1.8,
        dropoffReasons: ['Payment issues', 'Shipping concerns']
      },
      {
        stage: 'Retention',
        customers: 2100,
        conversionRate: 75,
        avgTime: 30,
        dropoffReasons: ['Product issues', 'Better alternatives']
      }
    ];

    const mockInsights: PersonalizationInsight[] = [
      {
        customerId: 'cust_001',
        name: 'Sarah Johnson',
        segment: 'Premium Buyers',
        predictedValue: 2400,
        recommendations: ['iPhone 15 Pro Max', 'AirPods Pro', 'Premium case'],
        riskScore: 15,
        nextBestAction: 'Send exclusive early access offer'
      },
      {
        customerId: 'cust_002',
        name: 'Mike Chen',
        segment: 'Value Seekers',
        predictedValue: 320,
        recommendations: ['Refurbished iPhone 13', 'Basic case', 'Screen protector'],
        riskScore: 45,
        nextBestAction: 'Offer bundle discount'
      },
      {
        customerId: 'cust_003',
        name: 'Emily Davis',
        segment: 'Business Professionals',
        predictedValue: 1800,
        recommendations: ['MacBook Pro', 'Business phone plan', 'Productivity suite'],
        riskScore: 25,
        nextBestAction: 'Schedule demo call'
      }
    ];

    setSegments(mockSegments);
    setJourney(mockJourney);
    setInsights(mockInsights);
    setLoading(false);
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600 bg-green-100';
    if (score < 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Intelligence</h1>
        <p className="text-gray-600">AI-powered customer insights and behavioral analytics</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing customer data and generating insights...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Customer Segments Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {segments.map((segment, index) => (
              <div key={segment.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
                   onClick={() => setSelectedSegment(segment.id)}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: `${COLORS[index]}20` }}>
                    <Users className="w-6 h-6" style={{ color: COLORS[index] }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: COLORS[index] }}>
                    {((segment.size / segments.reduce((acc, s) => acc + s.size, 0)) * 100).toFixed(1)}%
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{segment.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Customers</span>
                    <span className="font-medium">{segment.size.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Value</span>
                    <span className="font-medium">${segment.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Order</span>
                    <span className="font-medium">${segment.behavior.avgOrderValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Journey Funnel */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Journey Analysis</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={journey} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="stage" type="category" width={100} />
                    <Tooltip formatter={(value) => [value.toLocaleString(), 'Customers']} />
                    <Bar dataKey="customers" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {journey.map((stage, index) => (
                  <div key={stage.stage} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{stage.stage}</h4>
                      <span className="text-sm text-gray-600">{stage.conversionRate}% conversion</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {stage.customers.toLocaleString()} customers • Avg time: {stage.avgTime} days
                    </div>
                    {stage.dropoffReasons.length > 0 && (
                      <div className="text-xs text-red-600">
                        Top dropoff reasons: {stage.dropoffReasons.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Segment Deep Dive */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Segment Analysis</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Segment Distribution</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={segments}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="size"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {segments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value.toLocaleString(), 'Customers']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Value vs Retention</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <ScatterChart data={segments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="behavior.retention" name="Retention %" />
                    <YAxis dataKey="behavior.avgOrderValue" name="Avg Order Value" />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      formatter={(value, name) => [
                        name === 'behavior.retention' ? `${value}%` : `$${value}`,
                        name === 'behavior.retention' ? 'Retention' : 'Avg Order Value'
                      ]}
                    />
                    <Scatter dataKey="behavior.avgOrderValue" fill="#3B82F6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Personalization Insights */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Personalization Insights</h3>
            <div className="space-y-4">
              {insights.map((insight) => (
                <div key={insight.customerId} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{insight.name}</h4>
                      <p className="text-sm text-gray-600">{insight.segment} • Predicted Value: ${insight.predictedValue}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(insight.riskScore)}`}>
                        {insight.riskScore}% Risk
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Recommended Products</h5>
                      <div className="space-y-1">
                        {insight.recommendations.map((rec, index) => (
                          <div key={index} className="text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
                            {rec}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Next Best Action</h5>
                      <div className="text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                        <Target className="w-4 h-4 inline mr-2" />
                        {insight.nextBestAction}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Behavioral Patterns */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Behavioral Patterns</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Eye className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Browse Behavior</h4>
                <p className="text-sm text-gray-600 mt-2">Avg 4.2 pages per session</p>
                <p className="text-sm text-gray-600">3.5 min session duration</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <ShoppingBag className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Purchase Patterns</h4>
                <p className="text-sm text-gray-600 mt-2">Peak: Weekends</p>
                <p className="text-sm text-gray-600">Mobile: 68% of orders</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Heart className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Engagement</h4>
                <p className="text-sm text-gray-600 mt-2">Email open rate: 24%</p>
                <p className="text-sm text-gray-600">Social engagement: 12%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerIntelligence;
