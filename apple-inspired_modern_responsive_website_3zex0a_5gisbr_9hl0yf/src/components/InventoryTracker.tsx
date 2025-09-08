import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

interface InventoryItem {
  productId: number;
  productName: string;
  currentStock: number;
  minThreshold: number;
  maxCapacity: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'overstocked';
  lastUpdated: string;
  trend: 'up' | 'down' | 'stable';
}

const InventoryTracker: React.FC = () => {
  const { inventory, updateStock, getStockLevel } = useInventory();
  const [filter, setFilter] = useState<'all' | 'low-stock' | 'out-of-stock'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'stock' | 'status'>('name');

  const mockInventory: InventoryItem[] = [
    {
      productId: 1,
      productName: 'MacBook Pro 16-inch',
      currentStock: 45,
      minThreshold: 10,
      maxCapacity: 100,
      status: 'in-stock',
      lastUpdated: '2024-01-15T10:30:00Z',
      trend: 'down'
    },
    {
      productId: 2,
      productName: 'iPhone 15 Pro',
      currentStock: 8,
      minThreshold: 15,
      maxCapacity: 200,
      status: 'low-stock',
      lastUpdated: '2024-01-15T09:15:00Z',
      trend: 'down'
    },
    {
      productId: 3,
      productName: 'iPad Pro 12.9-inch',
      currentStock: 0,
      minThreshold: 5,
      maxCapacity: 75,
      status: 'out-of-stock',
      lastUpdated: '2024-01-14T16:45:00Z',
      trend: 'down'
    },
    {
      productId: 4,
      productName: 'Apple Watch Series 9',
      currentStock: 67,
      minThreshold: 20,
      maxCapacity: 150,
      status: 'in-stock',
      lastUpdated: '2024-01-15T11:00:00Z',
      trend: 'up'
    },
    {
      productId: 5,
      productName: 'AirPods Pro (2nd generation)',
      currentStock: 125,
      minThreshold: 30,
      maxCapacity: 300,
      status: 'in-stock',
      lastUpdated: '2024-01-15T08:30:00Z',
      trend: 'stable'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'low-stock':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'out-of-stock':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-apple-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-apple-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-apple-gray-100 text-apple-gray-800';
    }
  };

  const filteredInventory = mockInventory.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.productName.localeCompare(b.productName);
      case 'stock':
        return b.currentStock - a.currentStock;
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const stats = {
    total: mockInventory.length,
    inStock: mockInventory.filter(item => item.status === 'in-stock').length,
    lowStock: mockInventory.filter(item => item.status === 'low-stock').length,
    outOfStock: mockInventory.filter(item => item.status === 'out-of-stock').length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-apple-gray-900">Inventory Management</h2>
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
          >
            <option value="all">All Items</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="stock">Sort by Stock</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-apple-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-apple-gray-900">{stats.total}</p>
            </div>
            <Package className="w-8 h-8 text-apple-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-apple-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">In Stock</p>
              <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-apple-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.lowStock}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-apple-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-apple-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-apple-gray-900">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-apple-gray-900">Current Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-apple-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-apple-gray-900">Trend</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-apple-gray-900">Last Updated</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-apple-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200">
              {sortedInventory.map((item) => (
                <tr key={item.productId} className="hover:bg-apple-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(item.status)}
                      <span className="ml-3 font-medium text-apple-gray-900">{item.productName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-apple-gray-900 font-medium">{item.currentStock}</span>
                      <span className="text-apple-gray-500 text-sm ml-2">/ {item.maxCapacity}</span>
                    </div>
                    <div className="w-full bg-apple-gray-200 rounded-full h-2 mt-1">
                      <div
                        className={`h-2 rounded-full ${
                          item.status === 'out-of-stock' ? 'bg-red-500' :
                          item.status === 'low-stock' ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(item.currentStock / item.maxCapacity) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getTrendIcon(item.trend)}
                      <span className="ml-2 text-sm text-apple-gray-600 capitalize">{item.trend}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-apple-gray-600">
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-apple-blue-500 hover:text-apple-blue-600 text-sm font-medium">
                      Update Stock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryTracker;
