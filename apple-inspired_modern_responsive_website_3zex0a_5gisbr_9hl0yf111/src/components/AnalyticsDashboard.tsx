import React from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign, Activity, Package } from 'lucide-react';
import { useAnalytics } from '../context/AnalyticsContext';

const AnalyticsDashboard: React.FC = () => {
  const { analytics, loading, refreshAnalytics } = useAnalytics();

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-apple-gray-200">
                <div className="h-4 bg-apple-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-apple-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-apple-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-green-500" />;
      case 'user':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'product_view':
        return <Package className="w-4 h-4 text-purple-500" />;
      default:
        return <Activity className="w-4 h-4 text-apple-gray-500" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-apple-gray-900">Analytics Dashboard</h1>
          <p className="text-apple-gray-600 mt-1">Monitor your store performance and insights</p>
        </div>
        <button
          onClick={refreshAnalytics}
          className="px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
        >
          Refresh Data
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-apple-gray-900">
            {formatCurrency(analytics.totalSales)}
          </h3>
          <p className="text-apple-gray-600 text-sm">Total Sales</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-apple-gray-900">
            {formatNumber(analytics.totalOrders)}
          </h3>
          <p className="text-apple-gray-600 text-sm">Total Orders</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-apple-gray-900">
            {formatNumber(analytics.totalUsers)}
          </h3>
          <p className="text-apple-gray-600 text-sm">Total Users</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-apple-gray-900">
            {analytics.topProducts.length}
          </h3>
          <p className="text-apple-gray-600 text-sm">Active Products</p>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 border border-apple-gray-200">
          <h3 className="text-xl font-semibold text-apple-gray-900 mb-4">Top Products</h3>
          <div className="space-y-4">
            {analytics.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-apple-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-semibold text-apple-blue-600">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-apple-gray-900">{product.name}</p>
                    <p className="text-sm text-apple-gray-600">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-apple-gray-900">
                    {formatCurrency(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white rounded-2xl p-6 border border-apple-gray-200">
          <h3 className="text-xl font-semibold text-apple-gray-900 mb-4">Sales by Category</h3>
          <div className="space-y-4">
            {analytics.salesByCategory.map((category, index) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-apple-gray-900">{category.category}</span>
                  <span className="text-sm text-apple-gray-600">
                    {formatCurrency(category.revenue)}
                  </span>
                </div>
                <div className="w-full bg-apple-gray-200 rounded-full h-2">
                  <div
                    className="bg-apple-blue-500 h-2 rounded-full"
                    style={{
                      width: `${(category.revenue / Math.max(...analytics.salesByCategory.map(c => c.revenue))) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 border border-apple-gray-200">
        <h3 className="text-xl font-semibold text-apple-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {analytics.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className="p-2 bg-apple-gray-100 rounded-lg">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-apple-gray-900">{activity.description}</p>
                <p className="text-sm text-apple-gray-600">
                  {formatTimeAgo(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
