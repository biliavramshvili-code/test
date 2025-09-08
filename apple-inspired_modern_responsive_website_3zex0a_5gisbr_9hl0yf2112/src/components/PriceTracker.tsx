import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Bell, BellOff, Target, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceHistory {
  date: string;
  price: number;
}

interface PriceAlert {
  id: string;
  productId: number;
  targetPrice: number;
  currentPrice: number;
  isActive: boolean;
  createdAt: string;
}

const PriceTracker: React.FC<{ productId: number; currentPrice: number }> = ({ 
  productId, 
  currentPrice 
}) => {
  const [priceHistory] = useState<PriceHistory[]>([
    { date: '2024-01-01', price: 999 },
    { date: '2024-01-05', price: 979 },
    { date: '2024-01-10', price: 999 },
    { date: '2024-01-15', price: 949 },
    { date: '2024-01-20', price: 899 },
    { date: '2024-01-25', price: 929 },
    { date: '2024-01-30', price: 899 }
  ]);

  const [alerts, setAlerts] = useState<PriceAlert[]>([
    {
      id: "1",
      productId: 1,
      targetPrice: 850,
      currentPrice: 899,
      isActive: true,
      createdAt: "2024-01-20"
    }
  ]);

  const [newAlertPrice, setNewAlertPrice] = useState('');
  const [showCreateAlert, setShowCreateAlert] = useState(false);

  const lowestPrice = Math.min(...priceHistory.map(p => p.price));
  const highestPrice = Math.max(...priceHistory.map(p => p.price));
  const priceChange = currentPrice - priceHistory[priceHistory.length - 2]?.price || 0;
  const priceChangePercent = ((priceChange / (currentPrice - priceChange)) * 100).toFixed(1);

  const createPriceAlert = () => {
    const targetPrice = parseFloat(newAlertPrice);
    if (targetPrice > 0) {
      const newAlert: PriceAlert = {
        id: Date.now().toString(),
        productId,
        targetPrice,
        currentPrice,
        isActive: true,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setAlerts([...alerts, newAlert]);
      setNewAlertPrice('');
      setShowCreateAlert(false);
    }
  };

  const toggleAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, isActive: !alert.isActive }
        : alert
    ));
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  return (
    <div className="space-y-6">
      {/* Price Overview */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <h3 className="text-xl font-bold text-apple-gray-900 mb-4">Price Tracking</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-apple-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-apple-gray-900">${currentPrice}</div>
            <div className="text-sm text-apple-gray-600">Current Price</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">${lowestPrice}</div>
            <div className="text-sm text-apple-gray-600">Lowest Price</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">${highestPrice}</div>
            <div className="text-sm text-apple-gray-600">Highest Price</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className={`text-2xl font-bold flex items-center justify-center ${
              priceChange >= 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              {priceChange >= 0 ? (
                <TrendingUp className="w-5 h-5 mr-1" />
              ) : (
                <TrendingDown className="w-5 h-5 mr-1" />
              )}
              {priceChangePercent}%
            </div>
            <div className="text-sm text-apple-gray-600">Price Change</div>
          </div>
        </div>

        {/* Price Chart */}
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis 
                domain={['dataMin - 50', 'dataMax + 50']}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value) => [`$${value}`, 'Price']}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#007AFF" 
                strokeWidth={2}
                dot={{ fill: '#007AFF', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Create Price Alert */}
        <div className="border-t border-apple-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-apple-gray-900">Price Alerts</h4>
            <button
              onClick={() => setShowCreateAlert(!showCreateAlert)}
              className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span>Create Alert</span>
            </button>
          </div>

          {showCreateAlert && (
            <div className="bg-apple-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Alert me when price drops to:
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-apple-gray-600">$</span>
                    <input
                      type="number"
                      value={newAlertPrice}
                      onChange={(e) => setNewAlertPrice(e.target.value)}
                      placeholder="Enter target price"
                      className="flex-1 px-3 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={createPriceAlert}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setShowCreateAlert(false)}
                    className="px-4 py-2 bg-apple-gray-300 text-apple-gray-700 rounded-lg hover:bg-apple-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Active Alerts */}
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    alert.isActive ? 'bg-green-100 text-green-600' : 'bg-apple-gray-200 text-apple-gray-500'
                  }`}>
                    {alert.isActive ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-medium text-apple-gray-900">
                      Alert when price drops to ${alert.targetPrice}
                    </div>
                    <div className="text-sm text-apple-gray-600">
                      Current: ${alert.currentPrice} • Created: {alert.createdAt}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      alert.isActive
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {alert.isActive ? 'Pause' : 'Resume'}
                  </button>
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {alerts.length === 0 && (
              <div className="text-center py-8 text-apple-gray-500">
                No price alerts set. Create one to get notified when prices drop!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTracker;
