import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Calendar, Package, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ForecastData {
  period: string;
  predicted: number;
  actual?: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}

interface InventoryAlert {
  id: string;
  productId: number;
  productName: string;
  type: 'stockout' | 'overstock' | 'reorder';
  severity: 'low' | 'medium' | 'high';
  message: string;
  recommendedAction: string;
  estimatedImpact: number;
}

const InventoryForecasting: React.FC = () => {
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('all');
  const [forecastPeriod, setForecastPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate forecast data generation
    const generateForecastData = () => {
      const periods = forecastPeriod === '7d' ? 7 : forecastPeriod === '30d' ? 30 : 90;
      const data: ForecastData[] = [];
      
      for (let i = 0; i < periods; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        
        data.push({
          period: date.toISOString().split('T')[0],
          predicted: Math.floor(Math.random() * 100) + 50,
          actual: i < 7 ? Math.floor(Math.random() * 100) + 45 : undefined,
          confidence: Math.random() * 0.3 + 0.7,
          trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable'
        });
      }
      
      setForecastData(data);
    };

    const generateAlerts = () => {
      const alertsData: InventoryAlert[] = [
        {
          id: '1',
          productId: 1,
          productName: 'iPhone 15 Pro',
          type: 'reorder',
          severity: 'high',
          message: 'Stock level below reorder point',
          recommendedAction: 'Order 500 units within 3 days',
          estimatedImpact: 25000
        },
        {
          id: '2',
          productId: 2,
          productName: 'MacBook Air M3',
          type: 'overstock',
          severity: 'medium',
          message: 'Excess inventory detected',
          recommendedAction: 'Consider promotional pricing',
          estimatedImpact: -15000
        },
        {
          id: '3',
          productId: 3,
          productName: 'AirPods Pro',
          type: 'stockout',
          severity: 'high',
          message: 'Predicted stockout in 5 days',
          recommendedAction: 'Expedite next shipment',
          estimatedImpact: 18000
        }
      ];
      
      setAlerts(alertsData);
    };

    generateForecastData();
    generateAlerts();
    setLoading(false);
  }, [forecastPeriod, selectedProduct]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'stockout': return <AlertTriangle className="w-4 h-4" />;
      case 'overstock': return <Package className="w-4 h-4" />;
      case 'reorder': return <TrendingUp className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-sm border border-apple-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-apple-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-apple-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-apple-gray-900">Inventory Forecasting</h2>
          <p className="text-apple-gray-600">AI-powered demand prediction and inventory optimization</p>
        </div>
        
        <div className="flex gap-3">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
          >
            <option value="all">All Products</option>
            <option value="iphone">iPhone Series</option>
            <option value="macbook">MacBook Series</option>
            <option value="airpods">AirPods Series</option>
          </select>
          
          <select
            value={forecastPeriod}
            onChange={(e) => setForecastPeriod(e.target.value as '7d' | '30d' | '90d')}
            className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
          >
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="90d">90 Days</option>
          </select>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
        <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Inventory Alerts</h3>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getTypeIcon(alert.type)}
                  <div>
                    <h4 className="font-medium">{alert.productName}</h4>
                    <p className="text-sm opacity-80">{alert.message}</p>
                    <p className="text-sm font-medium mt-1">{alert.recommendedAction}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">
                    ${alert.estimatedImpact.toLocaleString()}
                  </span>
                  <p className="text-xs opacity-60">Impact</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
        <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Demand Forecast</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="period" 
                stroke="#666"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: number, name: string) => [
                  value,
                  name === 'predicted' ? 'Predicted' : 'Actual'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                name="predicted"
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Forecast Accuracy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Forecast Accuracy</p>
              <p className="text-2xl font-bold text-apple-gray-900">94.2%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-sm text-green-600 mt-2">+2.1% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Avg Days of Stock</p>
              <p className="text-2xl font-bold text-apple-gray-900">23.5</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-sm text-blue-600 mt-2">Optimal range: 20-30 days</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Stockout Risk</p>
              <p className="text-2xl font-bold text-apple-gray-900">Low</p>
            </div>
            <Package className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-sm text-yellow-600 mt-2">3 products at risk</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryForecasting;
