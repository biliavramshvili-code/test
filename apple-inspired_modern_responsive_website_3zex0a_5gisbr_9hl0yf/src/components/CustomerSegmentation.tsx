import React, { useState } from 'react';
import { Users, Target, TrendingUp, Mail, Filter, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: string[];
  customerCount: number;
  averageOrderValue: number;
  totalRevenue: number;
  conversionRate: number;
  color: string;
}

interface Campaign {
  id: string;
  name: string;
  segmentId: string;
  type: 'email' | 'sms' | 'push';
  status: 'draft' | 'active' | 'completed' | 'paused';
  sentCount: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  createdAt: string;
}

const CustomerSegmentation: React.FC = () => {
  const [segments] = useState<CustomerSegment[]>([
    {
      id: '1',
      name: 'VIP Customers',
      description: 'High-value customers with frequent purchases',
      criteria: ['Total spent > $5000', 'Orders > 10', 'Last purchase < 30 days'],
      customerCount: 245,
      averageOrderValue: 1250,
      totalRevenue: 306250,
      conversionRate: 85,
      color: '#8B5CF6'
    },
    {
      id: '2',
      name: 'New Customers',
      description: 'Recently acquired customers',
      criteria: ['First purchase < 30 days', 'Orders = 1'],
      customerCount: 892,
      averageOrderValue: 450,
      totalRevenue: 401400,
      conversionRate: 35,
      color: '#10B981'
    },
    {
      id: '3',
      name: 'At-Risk Customers',
      description: 'Customers who haven\'t purchased recently',
      criteria: ['Last purchase > 90 days', 'Total orders > 2'],
      customerCount: 156,
      averageOrderValue: 780,
      totalRevenue: 121680,
      conversionRate: 15,
      color: '#F59E0B'
    },
    {
      id: '4',
      name: 'Loyal Customers',
      description: 'Regular customers with consistent purchases',
      criteria: ['Orders > 5', 'Customer for > 6 months', 'Regular purchase pattern'],
      customerCount: 423,
      averageOrderValue: 890,
      totalRevenue: 376470,
      conversionRate: 65,
      color: '#3B82F6'
    }
  ]);

  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'VIP Exclusive Offers',
      segmentId: '1',
      type: 'email',
      status: 'active',
      sentCount: 245,
      openRate: 78,
      clickRate: 45,
      conversionRate: 25,
      createdAt: '2024-01-10T10:00:00Z'
    },
    {
      id: '2',
      name: 'Welcome Series',
      segmentId: '2',
      type: 'email',
      status: 'active',
      sentCount: 892,
      openRate: 65,
      clickRate: 32,
      conversionRate: 18,
      createdAt: '2024-01-12T14:30:00Z'
    },
    {
      id: '3',
      name: 'Win-Back Campaign',
      segmentId: '3',
      type: 'email',
      status: 'completed',
      sentCount: 156,
      openRate: 42,
      clickRate: 28,
      conversionRate: 12,
      createdAt: '2024-01-08T09:15:00Z'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'segments' | 'campaigns'>('segments');

  const segmentData = segments.map(segment => ({
    name: segment.name,
    customers: segment.customerCount,
    revenue: segment.totalRevenue / 1000,
    conversion: segment.conversionRate
  }));

  const pieData = segments.map(segment => ({
    name: segment.name,
    value: segment.customerCount,
    color: segment.color
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-apple-gray-900">Customer Segmentation & Targeting</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
            <Target className="w-4 h-4" />
            <span>Create Segment</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-apple-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('segments')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'segments'
                ? 'border-apple-blue-500 text-apple-blue-600'
                : 'border-transparent text-apple-gray-500 hover:text-apple-gray-700'
            }`}
          >
            Customer Segments
          </button>
          <button
            onClick={() => setActiveTab('campaigns')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'campaigns'
                ? 'border-apple-blue-500 text-apple-blue-600'
                : 'border-transparent text-apple-gray-500 hover:text-apple-gray-700'
            }`}
          >
            Marketing Campaigns
          </button>
        </nav>
      </div>

      {activeTab === 'segments' && (
        <div className="space-y-6">
          {/* Segment Overview Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Segment Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={segmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="customers" fill="#3B82F6" name="Customers" />
                  <Bar dataKey="revenue" fill="#10B981" name="Revenue (K)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Customer Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Segments List */}
          <div className="bg-white rounded-xl border border-apple-gray-200">
            <div className="p-6 border-b border-apple-gray-200">
              <h3 className="text-lg font-semibold text-apple-gray-900">Customer Segments</h3>
            </div>
            <div className="divide-y divide-apple-gray-200">
              {segments.map((segment) => (
                <div key={segment.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: segment.color }}
                        />
                        <h4 className="text-lg font-semibold text-apple-gray-900">{segment.name}</h4>
                        <span className="bg-apple-gray-100 text-apple-gray-700 px-2 py-1 rounded-full text-sm">
                          {segment.customerCount} customers
                        </span>
                      </div>
                      <p className="text-apple-gray-600 mb-3">{segment.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {segment.criteria.map((criterion, index) => (
                          <span
                            key={index}
                            className="bg-apple-blue-50 text-apple-blue-700 px-2 py-1 rounded text-sm"
                          >
                            {criterion}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-apple-gray-500">Avg Order Value</p>
                          <p className="font-semibold text-apple-gray-900">
                            ${segment.averageOrderValue.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-apple-gray-500">Total Revenue</p>
                          <p className="font-semibold text-apple-gray-900">
                            ${segment.totalRevenue.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-apple-gray-500">Conversion Rate</p>
                          <p className="font-semibold text-apple-gray-900">{segment.conversionRate}%</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-apple-blue-500 hover:text-apple-blue-700">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-apple-gray-500 hover:text-apple-gray-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          {/* Campaign Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-green-600">
                    {campaigns.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <Mail className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Total Sent</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {campaigns.reduce((sum, c) => sum + c.sentCount, 0).toLocaleString()}
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Avg Open Rate</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round(campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length)}%
                  </p>
                </div>
                <Eye className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Avg Conversion</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.round(campaigns.reduce((sum, c) => sum + c.conversionRate, 0) / campaigns.length)}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Campaigns Table */}
          <div className="bg-white rounded-xl border border-apple-gray-200 overflow-hidden">
            <div className="p-6 border-b border-apple-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-apple-gray-900">Marketing Campaigns</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
                  <Mail className="w-4 h-4" />
                  <span>Create Campaign</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-apple-gray-50 border-b border-apple-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Segment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Sent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Open Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Click Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Conversion
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-apple-gray-200">
                  {campaigns.map((campaign) => {
                    const segment = segments.find(s => s.id === campaign.segmentId);
                    return (
                      <tr key={campaign.id} className="hover:bg-apple-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-apple-gray-900">{campaign.name}</div>
                            <div className="text-sm text-apple-gray-500 capitalize">{campaign.type}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: segment?.color }}
                            />
                            <span className="text-sm text-apple-gray-900">{segment?.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                            {campaign.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-apple-gray-900">
                          {campaign.sentCount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-apple-gray-900">
                          {campaign.openRate}%
                        </td>
                        <td className="px-6 py-4 text-sm text-apple-gray-900">
                          {campaign.clickRate}%
                        </td>
                        <td className="px-6 py-4 text-sm text-apple-gray-900">
                          {campaign.conversionRate}%
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-apple-blue-500 hover:text-apple-blue-700">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-apple-gray-500 hover:text-apple-gray-700">
                              <Edit className="w-4 h-4" />
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
      )}
    </div>
  );
};

export default CustomerSegmentation;
