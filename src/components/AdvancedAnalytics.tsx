import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, ShoppingCart, Eye, Heart, DollarSign, Calendar } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const salesData = [
  { month: 'Jan', sales: 45000, orders: 120, visitors: 2400 },
  { month: 'Feb', sales: 52000, orders: 145, visitors: 2800 },
  { month: 'Mar', sales: 48000, orders: 135, visitors: 2600 },
  { month: 'Apr', sales: 61000, orders: 168, visitors: 3200 },
  { month: 'May', sales: 55000, orders: 152, visitors: 2900 },
  { month: 'Jun', sales: 67000, orders: 189, visitors: 3500 }
];

const productData = [
  { name: 'MacBook Pro', sales: 25000, percentage: 35 },
  { name: 'iPhone 15 Pro', sales: 18000, percentage: 25 },
  { name: 'iPad Pro', sales: 12000, percentage: 17 },
  { name: 'Apple Watch', sales: 9000, percentage: 13 },
  { name: 'AirPods Pro', sales: 7000, percentage: 10 }
];

const customerData = [
  { segment: 'New Customers', value: 45, color: '#3B82F6' },
  { segment: 'Returning Customers', value: 35, color: '#10B981' },
  { segment: 'VIP Customers', value: 20, color: '#F59E0B' }
];

const AdvancedAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('6months');
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Revenue',
      value: '$328,000',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: 'Total Orders',
      value: '1,209',
      change: '+8.2%',
      trend: 'up',
      icon: <ShoppingCart className="w-6 h-6" />
    },
    {
      title: 'Website Visitors',
      value: '17,400',
      change: '+15.3%',
      trend: 'up',
      icon: <Eye className="w-6 h-6" />
    },
    {
      title: 'Conversion Rate',
      value: '6.95%',
      change: '+2.1%',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-apple-gray-900">Advanced Analytics</h2>
        <div className="flex space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-apple-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'sales', name: 'Sales', icon: <DollarSign className="w-4 h-4" /> },
            { id: 'customers', name: 'Customers', icon: <Users className="w-4 h-4" /> },
            { id: 'products', name: 'Products', icon: <ShoppingCart className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-apple-blue-500 text-apple-blue-600'
                  : 'border-transparent text-apple-gray-500 hover:text-apple-gray-700 hover:border-apple-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-apple-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-apple-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-apple-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  <span className="text-sm text-apple-gray-500 ml-1">vs last period</span>
                </div>
              </div>
              <div className="p-3 bg-apple-blue-50 rounded-lg">
                <div className="text-apple-blue-500">{stat.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Trend */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-apple-gray-200">
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Sales Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Customer Segments */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-apple-gray-200">
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Customer Segments</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={customerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'sales' && (
        <div className="space-y-6">
          {/* Monthly Sales */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-apple-gray-200">
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Monthly Sales Performance</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#3B82F6" />
                <Bar dataKey="orders" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Products */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-apple-gray-200">
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Top Selling Products</h3>
            <div className="space-y-4">
              {productData.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-apple-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-semibold text-apple-blue-600">{index + 1}</span>
                    </div>
                    <span className="font-medium text-apple-gray-900">{product.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-apple-gray-200 rounded-full h-2">
                      <div
                        className="bg-apple-blue-500 h-2 rounded-full"
                        style={{ width: `${product.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-apple-gray-900 w-16 text-right">
                      ${product.sales.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'customers' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Growth */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-apple-gray-200">
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Customer Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Customer Metrics */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-apple-gray-200">
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Customer Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-apple-gray-50 rounded-lg">
                <span className="text-apple-gray-700">Average Order Value</span>
                <span className="font-semibold text-apple-gray-900">$271.50</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-apple-gray-50 rounded-lg">
                <span className="text-apple-gray-700">Customer Lifetime Value</span>
                <span className="font-semibold text-apple-gray-900">$1,245.80</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-apple-gray-50 rounded-lg">
                <span className="text-apple-gray-700">Repeat Purchase Rate</span>
                <span className="font-semibold text-apple-gray-900">34.2%</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-apple-gray-50 rounded-lg">
                <span className="text-apple-gray-700">Customer Satisfaction</span>
                <span className="font-semibold text-apple-gray-900">4.8/5.0</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-apple-gray-200">
          <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Product Performance</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={productData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="sales" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AdvancedAnalytics;
