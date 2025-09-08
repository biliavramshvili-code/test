import React, { useState } from 'react';
import { BarChart3, Users, Package, DollarSign, TrendingUp, Settings, Bell, Calendar } from 'lucide-react';
import AdvancedOrderManager from '../components/AdvancedOrderManager';
import CustomerSegmentation from '../components/CustomerSegmentation';
import MultiVendorMarketplace from '../components/MultiVendorMarketplace';
import AdvancedShippingLogistics from '../components/AdvancedShippingLogistics';
import BusinessIntelligenceDashboard from '../components/BusinessIntelligenceDashboard';
import CustomerServicePortal from '../components/CustomerServicePortal';

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'orders', name: 'Order Management', icon: <Package className="w-5 h-5" /> },
    { id: 'customers', name: 'Customer Segmentation', icon: <Users className="w-5 h-5" /> },
    { id: 'marketplace', name: 'Vendor Marketplace', icon: <DollarSign className="w-5 h-5" /> },
    { id: 'shipping', name: 'Shipping & Logistics', icon: <Calendar className="w-5 h-5" /> },
    { id: 'analytics', name: 'Business Intelligence', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'support', name: 'Customer Service', icon: <Bell className="w-5 h-5" /> }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'orders':
        return <AdvancedOrderManager />;
      case 'customers':
        return <CustomerSegmentation />;
      case 'marketplace':
        return <MultiVendorMarketplace />;
      case 'shipping':
        return <AdvancedShippingLogistics />;
      case 'analytics':
        return <BusinessIntelligenceDashboard />;
      case 'support':
        return <CustomerServicePortal />;
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-apple-gray-900">Enterprise Dashboard Overview</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Dashboard Settings</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-apple-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">$2.45M</p>
                    <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-apple-gray-600">Active Orders</p>
                    <p className="text-2xl font-bold text-blue-600">1,247</p>
                    <p className="text-xs text-blue-600 mt-1">+8.2% from last week</p>
                  </div>
                  <Package className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-apple-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold text-purple-600">15,420</p>
                    <p className="text-xs text-purple-600 mt-1">+5.7% from last month</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-apple-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-orange-600">3.8%</p>
                    <p className="text-xs text-orange-600 mt-1">+0.6% from last month</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Feature Overview */}
            <div className="bg-white rounded-xl border border-apple-gray-200 p-6">
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-6">Enterprise Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.slice(1).map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border border-apple-gray-200 rounded-lg hover:bg-apple-gray-50 cursor-pointer transition-colors"
                    onClick={() => setActiveSection(item.id)}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-apple-blue-500">
                        {item.icon}
                      </div>
                      <h4 className="font-semibold text-apple-gray-900">{item.name}</h4>
                    </div>
                    <p className="text-sm text-apple-gray-600">
                      {item.id === 'orders' && 'Advanced order processing, bulk operations, and automated workflows'}
                      {item.id === 'customers' && 'Customer segmentation, targeting, and personalized marketing campaigns'}
                      {item.id === 'marketplace' && 'Multi-vendor support, commission tracking, and seller management'}
                      {item.id === 'shipping' && 'Real-time shipping rates, delivery scheduling, and logistics optimization'}
                      {item.id === 'analytics' && 'Business intelligence, forecasting, and advanced reporting'}
                      {item.id === 'support' && 'Comprehensive customer service portal and knowledge base'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-apple-gray-50 pt-20">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-apple-gray-200 min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-apple-gray-900 mb-6">Enterprise Dashboard</h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-apple-blue-100 text-apple-blue-700'
                      : 'text-apple-gray-600 hover:bg-apple-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
