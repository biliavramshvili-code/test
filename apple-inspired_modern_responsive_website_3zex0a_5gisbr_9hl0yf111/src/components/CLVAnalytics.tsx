import React, { useState, useEffect } from 'react';
import { Users, DollarSign, TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface CustomerSegment {
  id: string;
  name: string;
  count: number;
  avgCLV: number;
  avgOrderValue: number;
  purchaseFrequency: number;
  churnRate: number;
  color: string;
}

interface CLVTrend {
  month: string;
  clv: number;
  newCustomers: number;
  returningCustomers: number;
}

interface TopCustomer {
  id: string;
  name: string;
  email: string;
  clv: number;
  totalOrders: number;
  lastPurchase: string;
  segment: string;
}

const CLVAnalytics: React.FC = () => {
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [clvTrends, setCLVTrends] = useState<CLVTrend[]>([]);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'3m' | '6m' | '12m'>('6m');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate CLV analytics data
    const generateSegments = () => {
      const segmentData: CustomerSegment[] = [
        {
          id: '1',
          name: 'Champions',
          count: 1250,
          avgCLV: 2850,
          avgOrderValue: 485,
          purchaseFrequency: 5.8,
          churnRate: 0.05,
          color: '#10b981'
        },
        {
          id: '2',
          name: 'Loyal Customers',
          count: 2100,
          avgCLV: 1920,
          avgOrderValue: 320,
          purchaseFrequency: 4.2,
          churnRate: 0.12,
          color: '#3b82f6'
        },
        {
          id: '3',
          name: 'Potential Loyalists',
          count: 1800,
          avgCLV: 1150,
          avgOrderValue: 280,
          purchaseFrequency: 2.8,
          churnRate: 0.18,
          color: '#f59e0b'
        },
        {
          id: '4',
          name: 'At Risk',
          count: 950,
          avgCLV: 680,
          avgOrderValue: 195,
          purchaseFrequency: 1.5,
          churnRate: 0.35,
          color: '#ef4444'
        },
        {
          id: '5',
          name: 'New Customers',
          count: 3200,
          avgCLV: 420,
          avgOrderValue: 210,
          purchaseFrequency: 1.2,
          churnRate: 0.25,
          color: '#8b5cf6'
        }
      ];
      
      setSegments(segmentData);
    };

    const generateCLVTrends = () => {
      const months = selectedPeriod === '3m' ? 3 : selectedPeriod === '6m' ? 6 : 12;
      const trends: CLVTrend[] = [];
      
      for (let i = months - 1; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        
        trends.push({
          month: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
          clv: Math.floor(Math.random() * 500) + 1500,
          newCustomers: Math.floor(Math.random() * 200) + 300,
          returningCustomers: Math.floor(Math.random() * 150) + 250
        });
      }
      
      setCLVTrends(trends);
    };

    const generateTopCustomers = () => {
      const customers: TopCustomer[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          clv: 4850,
          totalOrders: 28,
          lastPurchase: '2024-01-10',
          segment: 'Champions'
        },
        {
          id: '2',
          name: 'Michael Chen',
          email: 'michael.c@email.com',
          clv: 4320,
          totalOrders: 22,
          lastPurchase: '2024-01-08',
          segment: 'Champions'
        },
        {
          id: '3',
          name: 'Emily Davis',
          email: 'emily.d@email.com',
          clv: 3950,
          totalOrders: 19,
          lastPurchase: '2024-01-12',
          segment: 'Loyal Customers'
        },
        {
          id: '4',
          name: 'David Wilson',
          email: 'david.w@email.com',
          clv: 3680,
          totalOrders: 25,
          lastPurchase: '2024-01-05',
          segment: 'Champions'
        },
        {
          id: '5',
          name: 'Lisa Anderson',
          email: 'lisa.a@email.com',
          clv: 3420,
          totalOrders: 16,
          lastPurchase: '2024-01-11',
          segment: 'Loyal Customers'
        }
      ];
      
      setTopCustomers(customers);
    };

    generateSegments();
    generateCLVTrends();
    generateTopCustomers();
    setLoading(false);
  }, [selectedPeriod]);

  const totalCLV = segments.reduce((sum, segment) => sum + (segment.avgCLV * segment.count), 0);
  const totalCustomers = segments.reduce((sum, segment) => sum + segment.count, 0);
  const avgCLV = totalCustomers > 0 ? totalCLV / totalCustomers : 0;

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
          <h2 className="text-2xl font-bold text-apple-gray-900">Customer Lifetime Value Analytics</h2>
          <p className="text-apple-gray-600">Comprehensive CLV analysis and customer segmentation</p>
        </div>
        
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as '3m' | '6m' | '12m')}
          className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
        >
          <option value="3m">Last 3 Months</option>
          <option value="6m">Last 6 Months</option>
          <option value="12m">Last 12 Months</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Average CLV</p>
              <p className="text-2xl font-bold text-apple-gray-900">${avgCLV.toFixed(0)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-sm text-green-600 mt-2">+12.5% from last period</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-apple-gray-900">{totalCustomers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-sm text-blue-600 mt-2">+8.3% new customers</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Churn Rate</p>
              <p className="text-2xl font-bold text-apple-gray-900">15.2%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-sm text-red-600 mt-2">-2.1% improvement</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Revenue per Customer</p>
              <p className="text-2xl font-bold text-apple-gray-900">${(totalCLV / totalCustomers * 0.3).toFixed(0)}</p>
            </div>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-sm text-purple-600 mt-2">Monthly average</p>
        </div>
      </div>

      {/* CLV Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
        <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">CLV Trends</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={clvTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="clv" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                name="Average CLV"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Customer Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
          <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Customer Segments</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segments}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {segments.map((segment, index) => (
                    <Cell key={`cell-${index}`} fill={segment.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
          <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Segment Performance</h3>
          <div className="space-y-4">
            {segments.map((segment) => (
              <div key={segment.id} className="flex items-center justify-between p-3 rounded-lg bg-apple-gray-50">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  ></div>
                  <div>
                    <p className="font-medium text-apple-gray-900">{segment.name}</p>
                    <p className="text-sm text-apple-gray-600">{segment.count} customers</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-apple-gray-900">${segment.avgCLV}</p>
                  <p className="text-sm text-apple-gray-600">Avg CLV</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Customers */}
      <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
        <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Top Customers by CLV</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-apple-gray-200">
                <th className="text-left py-3 px-4 font-medium text-apple-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-apple-gray-700">CLV</th>
                <th className="text-left py-3 px-4 font-medium text-apple-gray-700">Orders</th>
                <th className="text-left py-3 px-4 font-medium text-apple-gray-700">Last Purchase</th>
                <th className="text-left py-3 px-4 font-medium text-apple-gray-700">Segment</th>
              </tr>
            </thead>
            <tbody>
              {topCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-apple-gray-100 hover:bg-apple-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-apple-gray-900">{customer.name}</p>
                      <p className="text-sm text-apple-gray-600">{customer.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-green-600">
                    ${customer.clv.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-apple-gray-700">
                    {customer.totalOrders}
                  </td>
                  <td className="py-3 px-4 text-apple-gray-700">
                    {new Date(customer.lastPurchase).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {customer.segment}
                    </span>
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

export default CLVAnalytics;
