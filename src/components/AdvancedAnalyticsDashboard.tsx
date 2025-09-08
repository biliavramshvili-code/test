import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, ShoppingCart, Eye, Brain, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdvancedAnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const salesData = [
    { name: 'Mon', revenue: 4200, orders: 24, visitors: 1200 },
    { name: 'Tue', revenue: 3800, orders: 19, visitors: 1100 },
    { name: 'Wed', revenue: 5200, orders: 31, visitors: 1400 },
    { name: 'Thu', revenue: 4600, orders: 27, visitors: 1300 },
    { name: 'Fri', revenue: 6800, orders: 42, visitors: 1800 },
    { name: 'Sat', revenue: 7200, orders: 45, visitors: 1900 },
    { name: 'Sun', revenue: 5400, orders: 33, visitors: 1500 }
  ];

  const productData = [
    { name: 'iPhone 15 Pro', value: 35, color: '#3B82F6' },
    { name: 'MacBook Air M3', value: 25, color: '#8B5CF6' },
    { name: 'AirPods Pro', value: 20, color: '#10B981' },
    { name: 'Apple Watch', value: 15, color: '#F59E0B' },
    { name: 'iPad Pro', value: 5, color: '#EF4444' }
  ];

  const customerSegments = [
    { segment: 'Premium Buyers', count: 1250, revenue: 125000, avgOrder: 100 },
    { segment: 'Regular Customers', count: 3400, revenue: 85000, avgOrder: 25 },
    { segment: 'New Visitors', count: 2100, revenue: 21000, avgOrder: 10 },
    { segment: 'Returning Users', count: 1800, revenue: 54000, avgOrder: 30 }
  ];

  const aiInsights = [
    {
      type: 'prediction',
      title: 'Revenue Forecast',
      insight: 'AI predicts 23% revenue increase next week based on current trends',
      confidence: 87,
      icon: TrendingUp,
      color: 'text-green-500'
    },
    {
      type: 'behavior',
      title: 'Customer Behavior',
      insight: 'Users spend 40% more time on product pages with AR features',
      confidence: 92,
      icon: Eye,
      color: 'text-blue-500'
    },
    {
      type: 'optimization',
      title: 'Conversion Optimization',
      insight: 'Personalized recommendations increase conversion by 15%',
      confidence: 78,
      icon: Target,
      color: 'text-purple-500'
    },
    {
      type: 'anomaly',
      title: 'Anomaly Detection',
      insight: 'Unusual spike in MacBook sales detected - investigate marketing campaign',
      confidence: 95,
      icon: Zap,
      color: 'text-orange-500'
    }
  ];

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: '$47,200',
      change: '+12.5%',
      changeType: 'positive',
      icon: BarChart3
    },
    {
      title: 'Total Orders',
      value: '221',
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingCart
    },
    {
      title: 'Unique Visitors',
      value: '10,300',
      change: '+15.7%',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'Conversion Rate',
      value: '3.4%',
      change: '-2.1%',
      changeType: 'negative',
      icon: TrendingUp
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Advanced Analytics Dashboard</h2>
            <p className="text-gray-600">AI-powered insights and predictive analytics</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <kpi.icon className="w-8 h-8 text-blue-500" />
              <span className={`text-sm font-medium ${
                kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
            <p className="text-gray-600">{kpi.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Product Performance */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customer Segments */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Segments Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Segment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Customers</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg Order</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Performance</th>
              </tr>
            </thead>
            <tbody>
              {customerSegments.map((segment, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{segment.segment}</td>
                  <td className="py-3 px-4 text-gray-600">{segment.count.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">${segment.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">${segment.avgOrder}</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(segment.revenue / 125000) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-6">
          <Brain className="w-6 h-6 text-purple-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">AI-Powered Insights</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <insight.icon className={`w-6 h-6 ${insight.color} mt-1`} />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
                  <p className="text-gray-600 mb-3">{insight.insight}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Confidence:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${insight.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{insight.confidence}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;
