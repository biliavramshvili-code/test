import React, { useState } from 'react';
import { Package, AlertTriangle, TrendingUp, TrendingDown, RefreshCw, Bell, BarChart3, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface InventoryItem {
  id: string;
  productId: number;
  productName: string;
  sku: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  reorderPoint: number;
  maxStock: number;
  costPrice: number;
  sellPrice: number;
  supplier: string;
  location: string;
  lastRestocked: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'discontinued';
  salesVelocity: number;
  forecastDemand: number;
}

const AdvancedInventoryManager: React.FC = () => {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: "INV001",
      productId: 1,
      productName: "iPhone 15 Pro",
      sku: "IPH15P-128-NT",
      currentStock: 45,
      reservedStock: 12,
      availableStock: 33,
      reorderPoint: 20,
      maxStock: 100,
      costPrice: 799,
      sellPrice: 999,
      supplier: "Apple Inc.",
      location: "Warehouse A",
      lastRestocked: "2024-01-20",
      status: "in-stock",
      salesVelocity: 8.5,
      forecastDemand: 25
    },
    {
      id: "INV002",
      productId: 2,
      productName: "MacBook Pro 16-inch",
      sku: "MBP16-512-SG",
      currentStock: 8,
      reservedStock: 3,
      availableStock: 5,
      reorderPoint: 15,
      maxStock: 50,
      costPrice: 1999,
      sellPrice: 2499,
      supplier: "Apple Inc.",
      location: "Warehouse B",
      lastRestocked: "2024-01-18",
      status: "low-stock",
      salesVelocity: 3.2,
      forecastDemand: 12
    },
    {
      id: "INV003",
      productId: 3,
      productName: "AirPods Pro",
      sku: "APP-2ND-GEN",
      currentStock: 0,
      reservedStock: 0,
      availableStock: 0,
      reorderPoint: 25,
      maxStock: 150,
      costPrice: 199,
      sellPrice: 249,
      supplier: "Apple Inc.",
      location: "Warehouse A",
      lastRestocked: "2024-01-10",
      status: "out-of-stock",
      salesVelocity: 12.1,
      forecastDemand: 45
    }
  ]);

  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
  const [showAlerts, setShowAlerts] = useState(true);

  const stockMovementData = [
    { date: '2024-01-15', inbound: 50, outbound: 32, net: 18 },
    { date: '2024-01-16', inbound: 25, outbound: 28, net: -3 },
    { date: '2024-01-17', inbound: 0, outbound: 35, net: -35 },
    { date: '2024-01-18', inbound: 75, outbound: 22, net: 53 },
    { date: '2024-01-19', inbound: 0, outbound: 41, net: -41 },
    { date: '2024-01-20', inbound: 100, outbound: 38, net: 62 },
    { date: '2024-01-21', inbound: 0, outbound: 29, net: -29 }
  ];

  const getStatusColor = (status: InventoryItem['status']) => {
    switch (status) {
      case 'in-stock': return 'text-green-600 bg-green-50';
      case 'low-stock': return 'text-yellow-600 bg-yellow-50';
      case 'out-of-stock': return 'text-red-600 bg-red-50';
      case 'discontinued': return 'text-gray-600 bg-gray-50';
      default: return 'text-apple-gray-600 bg-apple-gray-50';
    }
  };

  const getStockLevel = (item: InventoryItem) => {
    const percentage = (item.availableStock / item.maxStock) * 100;
    return {
      percentage,
      color: percentage > 50 ? 'bg-green-500' : percentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
    };
  };

  const calculateTotalValue = () => {
    return inventoryItems.reduce((total, item) => total + (item.currentStock * item.costPrice), 0);
  };

  const getLowStockItems = () => {
    return inventoryItems.filter(item => item.availableStock <= item.reorderPoint);
  };

  const getOutOfStockItems = () => {
    return inventoryItems.filter(item => item.status === 'out-of-stock');
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-apple-gray-500">Total Items</span>
          </div>
          <div className="text-2xl font-bold text-apple-gray-900">{inventoryItems.length}</div>
          <div className="text-sm text-apple-gray-600">Active SKUs</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-apple-gray-500">Total Value</span>
          </div>
          <div className="text-2xl font-bold text-apple-gray-900">
            ${calculateTotalValue().toLocaleString()}
          </div>
          <div className="text-sm text-apple-gray-600">Inventory Value</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-sm text-apple-gray-500">Low Stock</span>
          </div>
          <div className="text-2xl font-bold text-apple-gray-900">{getLowStockItems().length}</div>
          <div className="text-sm text-apple-gray-600">Items Need Reorder</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-50 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm text-apple-gray-500">Out of Stock</span>
          </div>
          <div className="text-2xl font-bold text-apple-gray-900">{getOutOfStockItems().length}</div>
          <div className="text-sm text-apple-gray-600">Items Unavailable</div>
        </div>
      </div>

      {/* Stock Movement Chart */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-apple-gray-900">Stock Movement</h3>
            <p className="text-apple-gray-600">Inbound vs Outbound inventory flow</p>
          </div>
          <div className="flex items-center space-x-2">
            {['7d', '30d', '90d'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedTimeframe(period)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  selectedTimeframe === period
                    ? 'bg-apple-blue-500 text-white'
                    : 'bg-apple-gray-100 text-apple-gray-700 hover:bg-apple-gray-200'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stockMovementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis />
              <Tooltip 
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value, name) => [value, name === 'inbound' ? 'Inbound' : name === 'outbound' ? 'Outbound' : 'Net Change']}
              />
              <Bar dataKey="inbound" fill="#10B981" name="inbound" />
              <Bar dataKey="outbound" fill="#EF4444" name="outbound" />
              <Line type="monotone" dataKey="net" stroke="#6366F1" strokeWidth={2} name="net" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alerts Section */}
      {showAlerts && (getLowStockItems().length > 0 || getOutOfStockItems().length > 0) && (
        <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-bold text-apple-gray-900">Inventory Alerts</h3>
            </div>
            <button
              onClick={() => setShowAlerts(false)}
              className="text-apple-gray-400 hover:text-apple-gray-600"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            {getOutOfStockItems().map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <div className="font-medium text-red-900">{item.productName}</div>
                    <div className="text-sm text-red-700">Out of stock - {item.forecastDemand} units needed</div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Reorder Now
                </button>
              </div>
            ))}

            {getLowStockItems().filter(item => item.status !== 'out-of-stock').map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <div>
                    <div className="font-medium text-yellow-900">{item.productName}</div>
                    <div className="text-sm text-yellow-700">
                      Low stock - {item.availableStock} remaining (reorder at {item.reorderPoint})
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                  Reorder
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-apple-gray-200 overflow-hidden">
        <div className="p-6 border-b border-apple-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-apple-gray-900">Inventory Details</h3>
              <p className="text-apple-gray-600">Detailed view of all inventory items</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Sync Inventory</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-apple-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  Stock Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  Sales Velocity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  Forecast
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-apple-gray-200">
              {inventoryItems.map((item) => {
                const stockLevel = getStockLevel(item);
                return (
                  <tr key={item.id} className="hover:bg-apple-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-apple-gray-900">{item.productName}</div>
                        <div className="text-sm text-apple-gray-500">{item.supplier}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-apple-gray-900">
                      {item.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-apple-gray-900">{item.availableStock}/{item.maxStock}</span>
                            <span className="text-apple-gray-500">{stockLevel.percentage.toFixed(0)}%</span>
                          </div>
                          <div className="w-full bg-apple-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${stockLevel.color}`}
                              style={{ width: `${stockLevel.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-apple-gray-900">
                      {item.salesVelocity} units/day
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-apple-gray-900">
                      {item.forecastDemand} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-apple-blue-600 hover:text-apple-blue-900">
                          Edit
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          Reorder
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdvancedInventoryManager;
