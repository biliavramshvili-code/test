import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Package, Calendar, Download, Filter, Eye, BarChart3, PieChart, LineChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

interface KPIMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  format: 'currency' | 'number' | 'percentage';
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
}

interface ForecastData {
  period: string;
  actual?: number;
  predicted: number;
  confidence: number;
}

const BusinessIntelligenceDashboard: React.FC = () => {
  const [kpiMetrics] = useState<KPIMetric[]>([
    {
      id: '1',
      name: 'Total Revenue',
      value: 2450000,
      previousValue: 2180000,
      format: 'currency',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'text-green-600'
    },
    {
      id: '2',
      name: 'Active Customers',
      value: 15420,
      previousValue: 14890,
      format: 'number',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'text-blue-600'
    },
    {
      id: '3',
      name: 'Conversion Rate',
      value: 3.8,
      previousValue: 3.2,
      format: 'percentage',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-purple-600'
    },
    {
      id: '4',
      name: 'Average Order Value',
      value: 158.90,
      previousValue: 142.30,
      format: 'currency',
      trend: 'up',
      icon: <Package className="w-6 h-6" />,
      color: 'text-orange-600'
    }
  ]);

  const [revenueData] = useState([
    { month: 'Jan', revenue: 180000, orders: 1200, customers: 980 },
    { month: 'Feb', revenue: 195000, orders: 1350, customers: 1100 },
    { month: 'Mar', revenue: 210000, orders: 1420, customers: 1250 },
    { month: 'Apr', revenue: 225000, orders: 1580, customers: 1380 },
    { month: 'May', revenue: 240000, orders: 1650, customers: 1420 },
    { month: 'Jun', revenue: 255000, orders: 1720, customers: 1580 }
  ]);

  const [forecastData] = useState<ForecastData[]>([
    { period: 'Jul', actual: 255000, predicted: 270000, confidence: 85 },
    { period: 'Aug', predicted: 285000, confidence: 82 },
    { period: 'Sep', predicted: 295000, confidence: 78 },
    { period: 'Oct', predicted: 310000, confidence: 75 },
    { period: 'Nov', predicted: 340000, confidence: 72 },
    { period: 'Dec', predicted: 380000, confidence: 68 }
  ]);

  const [categoryData] = useState([
    { name: 'Electronics', value: 45, color: '#3B82F6' },
    { name: 'Fashion', value: 25, color: '#10B981' },
    { name: 'Home & Garden', value: 15, color: '#F59E0B' },
    { name: 'Books', value: 10, color: '#8B5CF6' },
    { name: 'Sports', value: 5, color: '#EF4444' }
  ]);

  const [customerSegmentData] = useState([
    { segment: 'VIP', customers: 245, revenue: 306250, avgOrder: 1250 },
    { segment: 'Loyal', customers: 423, revenue: 376470, avgOrder: 890 },
    { segment: 'New', customers: 892, revenue: 401400, avgOrder: 450 },
    { segment: 'At-Risk', customers: 156, revenue: 121680, avgOrder: 780 }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'forecasting' | 'segments' | 'products'>('overview');
  const [dateRange, setDateRange] = useState('last-30-days');

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'percentage':
        return `${value}%`;
      default:
        return value.toLocaleString();
    }
  };

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-apple-gray-900">Business Intelligence Dashboard</h2>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
          >
            <option value="last-7-days">Last 7 Days</option>
            <option value="last-30-days">Last 30 Days</option>
            <option value="last-90-days">Last 90 Days</option>
            <option value="last-year">Last Year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Custom Report</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-apple-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'forecasting', name: 'Forecasting', icon: <LineChart className="w-4 h-4" /> },
            { id: 'segments', name: 'Customer Segments', icon: <Users className="w-4 h-4" /> },
            { id: 'products', name: 'Product Analytics', icon: <Package className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-apple-blue-500 text-apple-blue-600'
                  : 'border-transparent text-apple-gray-500 hover:text-apple-gray-700'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiMetrics.map((metric) => (
              <div key={metric.id} className="bg-white p-6 rounded-xl border border-apple-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={metric.color}>
                    {metric.icon}
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 'text-apple-gray-600'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span>{calculateGrowth(metric.value, metric.previousValue)}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-apple-gray-600 mb-1">{metric.name}</p>
                  <p className="text-2xl font-bold text-apple-gray-900">
                    {formatValue(metric.value, metric.format)}
                  </p>
                  <p className="text-xs text-apple-gray-500 mt-1">
                    vs {formatValue(metric.previousValue, metric.format)} last period
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-apple-gray-900">Revenue Trend</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-apple-gray-600">Revenue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-apple-gray-600">Orders</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="orders" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Sales by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Customer Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="customers" stroke="#8B5CF6" strokeWidth={3} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'forecasting' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-apple-gray-900">Revenue Forecasting</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-apple-gray-600">Actual</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-apple-gray-600">Predicted</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <RechartsLineChart data={[...revenueData.slice(-3), ...forecastData]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={3} />
                <Line type="monotone" dataKey="predicted" stroke="#F59E0B" strokeWidth={3} strokeDasharray="5 5" />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>

          {/* Forecast Confidence */}
          <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Forecast Confidence Levels</h3>
            <div className="space-y-4">
              {forecastData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-apple-gray-900">{item.period}</span>
                    <span className="text-apple-gray-600">
                      ${item.predicted.toLocaleString()} predicted
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-apple-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${item.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-apple-gray-700">
                      {item.confidence}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'segments' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Customer Segment Performance</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={customerSegmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="segment" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#3B82F6" name="Revenue" />
                <Bar dataKey="customers" fill="#10B981" name="Customers" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerSegmentData.map((segment, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-apple-gray-200">
                <h4 className="font-semibold text-apple-gray-900 mb-3">{segment.segment} Customers</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-apple-gray-600">Count:</span>
                    <span className="font-medium">{segment.customers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-apple-gray-600">Revenue:</span>
                    <span className="font-medium">${segment.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-apple-gray-600">Avg Order:</span>
                    <span className="font-medium">${segment.avgOrder}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
          <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Product Performance Analytics</h3>
          <p className="text-apple-gray-600">Detailed product analytics including sales trends, inventory turnover, profit margins, and performance comparisons would be implemented here.</p>
        </div>
      )}
    </div>
  );
};

export default BusinessIntelligenceDashboard;
