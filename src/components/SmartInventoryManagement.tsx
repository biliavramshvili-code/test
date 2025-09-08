import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, TrendingUp, Truck, BarChart3, Zap, RefreshCw, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SmartInventoryManagement: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('stock-level');
  const [autoReorderEnabled, setAutoReorderEnabled] = useState(true);

  const inventoryData = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      sku: 'IPH15PM-256-TB',
      category: 'smartphones',
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      reorderPoint: 25,
      avgDailySales: 3.2,
      daysUntilStockout: 14,
      status: 'healthy',
      supplier: 'Apple Inc.',
      lastRestocked: '2024-01-10',
      predictedDemand: 85,
      seasonalTrend: 'increasing'
    },
    {
      id: 2,
      name: 'MacBook Air M3',
      sku: 'MBA-M3-512-SG',
      category: 'laptops',
      currentStock: 8,
      minStock: 15,
      maxStock: 50,
      reorderPoint: 20,
      avgDailySales: 1.8,
      daysUntilStockout: 4,
      status: 'critical',
      supplier: 'Apple Inc.',
      lastRestocked: '2024-01-05',
      predictedDemand: 35,
      seasonalTrend: 'stable'
    },
    {
      id: 3,
      name: 'AirPods Pro 2nd Gen',
      sku: 'APP-2ND-USB-C',
      category: 'audio',
      currentStock: 120,
      minStock: 30,
      maxStock: 200,
      reorderPoint: 40,
      avgDailySales: 5.5,
      daysUntilStockout: 22,
      status: 'overstocked',
      supplier: 'Apple Inc.',
      lastRestocked: '2024-01-12',
      predictedDemand: 150,
      seasonalTrend: 'decreasing'
    },
    {
      id: 4,
      name: 'Apple Watch Series 9',
      sku: 'AWS9-45-GPS-PK',
      category: 'wearables',
      currentStock: 12,
      minStock: 25,
      maxStock: 75,
      reorderPoint: 30,
      avgDailySales: 2.1,
      daysUntilStockout: 6,
      status: 'low',
      supplier: 'Apple Inc.',
      lastRestocked: '2024-01-08',
      predictedDemand: 45,
      seasonalTrend: 'increasing'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'low': return 'text-orange-600 bg-orange-100';
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'overstocked': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStockPercentage = (current: number, max: number) => {
    return (current / max) * 100;
  };

  const categories = [
    { id: 'all', name: 'All Products', count: inventoryData.length },
    { id: 'smartphones', name: 'Smartphones', count: inventoryData.filter(item => item.category === 'smartphones').length },
    { id: 'laptops', name: 'Laptops', count: inventoryData.filter(item => item.category === 'laptops').length },
    { id: 'audio', name: 'Audio', count: inventoryData.filter(item => item.category === 'audio').length },
    { id: 'wearables', name: 'Wearables', count: inventoryData.filter(item => item.category === 'wearables').length }
  ];

  const filteredData = selectedCategory === 'all' 
    ? inventoryData 
    : inventoryData.filter(item => item.category === selectedCategory);

  const criticalItems = inventoryData.filter(item => item.status === 'critical' || item.status === 'low').length;
  const totalValue = inventoryData.reduce((sum, item) => sum + (item.currentStock * 500), 0); // Assuming avg price of $500
  const turnoverRate = 2.3; // Example turnover rate

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Smart Inventory Management</h2>
            <p className="text-gray-600">AI-powered stock optimization and demand forecasting</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Auto-Reorder:</span>
            <button
              onClick={() => setAutoReorderEnabled(!autoReorderEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoReorderEnabled ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  autoReorderEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Sync Inventory</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">{inventoryData.length}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Total Products</h3>
          <p className="text-gray-600">Active SKUs</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-900">{criticalItems}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Critical Items</h3>
          <p className="text-gray-600">Need attention</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold text-gray-900">${(totalValue / 1000).toFixed(0)}K</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Inventory Value</h3>
          <p className="text-gray-600">Total stock value</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold text-gray-900">{turnoverRate}x</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Turnover Rate</h3>
          <p className="text-gray-600">Annual average</p>
        </motion.div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Inventory Overview</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="stock-level">Sort by Stock Level</option>
              <option value="days-until-stockout">Sort by Days Until Stockout</option>
              <option value="predicted-demand">Sort by Predicted Demand</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Product</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Stock Level</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Days Until Stockout</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Predicted Demand</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">SKU: {item.sku}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">
                          {item.currentStock} / {item.maxStock}
                        </span>
                        <span className="text-sm text-gray-600">
                          {getStockPercentage(item.currentStock, item.maxStock).toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            item.currentStock <= item.reorderPoint
                              ? 'bg-red-500'
                              : item.currentStock >= item.maxStock * 0.8
                              ? 'bg-blue-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${getStockPercentage(item.currentStock, item.maxStock)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`font-medium ${
                      item.daysUntilStockout <= 7 ? 'text-red-600' : 
                      item.daysUntilStockout <= 14 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {item.daysUntilStockout} days
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{item.predictedDemand}</span>
                      <TrendingUp className={`w-4 h-4 ${
                        item.seasonalTrend === 'increasing' ? 'text-green-500' :
                        item.seasonalTrend === 'decreasing' ? 'text-red-500' : 'text-gray-500'
                      }`} />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      {item.status === 'critical' || item.status === 'low' ? (
                        <button className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                          <Truck className="w-3 h-3" />
                          <span>Reorder</span>
                        </button>
                      ) : (
                        <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                          <CheckCircle className="w-3 h-3" />
                          <span>Good</span>
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center mb-4">
          <Zap className="w-6 h-6 text-yellow-500 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900">AI Recommendations</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Urgent Reorder</h4>
            <p className="text-red-700 text-sm">MacBook Air M3 will stock out in 4 days. Recommend immediate reorder of 30 units.</p>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Optimize Stock</h4>
            <p className="text-blue-700 text-sm">AirPods Pro are overstocked. Consider promotional pricing to increase turnover.</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Seasonal Adjustment</h4>
            <p className="text-green-700 text-sm">Apple Watch demand increasing. Prepare for 25% stock increase next month.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartInventoryManagement;
