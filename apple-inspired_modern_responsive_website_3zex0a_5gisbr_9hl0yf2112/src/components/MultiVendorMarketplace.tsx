import React, { useState } from 'react';
import { Store, Users, DollarSign, Package, Star, TrendingUp, Eye, Edit, Ban, CheckCircle, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Vendor {
  id: string;
  name: string;
  email: string;
  storeName: string;
  logo?: string;
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  rating: number;
  totalProducts: number;
  totalSales: number;
  commission: number;
  joinedDate: string;
  lastActive: string;
  category: string;
  verified: boolean;
}

interface VendorProduct {
  id: string;
  vendorId: string;
  name: string;
  price: number;
  stock: number;
  sales: number;
  rating: number;
  status: 'active' | 'inactive' | 'pending';
}

const MultiVendorMarketplace: React.FC = () => {
  const [vendors] = useState<Vendor[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john@techstore.com',
      storeName: 'Tech Store Pro',
      status: 'active',
      rating: 4.8,
      totalProducts: 45,
      totalSales: 125000,
      commission: 15,
      joinedDate: '2023-06-15',
      lastActive: '2024-01-15T10:30:00Z',
      category: 'Electronics',
      verified: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@fashionhub.com',
      storeName: 'Fashion Hub',
      status: 'active',
      rating: 4.6,
      totalProducts: 78,
      totalSales: 89000,
      commission: 12,
      joinedDate: '2023-08-20',
      lastActive: '2024-01-14T15:45:00Z',
      category: 'Fashion',
      verified: true
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike@homegoods.com',
      storeName: 'Home & Garden',
      status: 'pending',
      rating: 0,
      totalProducts: 0,
      totalSales: 0,
      commission: 10,
      joinedDate: '2024-01-10',
      lastActive: '2024-01-15T09:20:00Z',
      category: 'Home & Garden',
      verified: false
    },
    {
      id: '4',
      name: 'Lisa Chen',
      email: 'lisa@bookstore.com',
      storeName: 'Book Corner',
      status: 'suspended',
      rating: 3.2,
      totalProducts: 23,
      totalSales: 15000,
      commission: 8,
      joinedDate: '2023-11-05',
      lastActive: '2024-01-12T12:00:00Z',
      category: 'Books',
      verified: false
    }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'products' | 'commissions'>('overview');

  const salesData = [
    { month: 'Jan', sales: 45000, vendors: 12 },
    { month: 'Feb', sales: 52000, vendors: 15 },
    { month: 'Mar', sales: 48000, vendors: 18 },
    { month: 'Apr', sales: 61000, vendors: 22 },
    { month: 'May', sales: 55000, vendors: 25 },
    { month: 'Jun', sales: 67000, vendors: 28 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'rejected': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'suspended': return <Ban className="w-4 h-4 text-red-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-apple-gray-900">Multi-Vendor Marketplace</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Users className="w-4 h-4" />
            <span>Invite Vendor</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
            <Store className="w-4 h-4" />
            <span>Marketplace Settings</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-apple-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'vendors', name: 'Vendors', icon: <Store className="w-4 h-4" /> },
            { id: 'products', name: 'Products', icon: <Package className="w-4 h-4" /> },
            { id: 'commissions', name: 'Commissions', icon: <DollarSign className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-apple-blue-500 text-apple-blue-600'
                  : 'border-transparent text-apple-gray-500 hover:text-apple-gray-700'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Total Vendors</p>
                  <p className="text-2xl font-bold text-apple-gray-900">{vendors.length}</p>
                </div>
                <Store className="w-8 h-8 text-apple-blue-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Active Vendors</p>
                  <p className="text-2xl font-bold text-green-600">
                    {vendors.filter(v => v.status === 'active').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {vendors.reduce((sum, v) => sum + v.totalProducts, 0)}
                  </p>
                </div>
                <Package className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Total Sales</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ${vendors.reduce((sum, v) => sum + v.totalSales, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Monthly Sales & Vendor Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#3B82F6" name="Sales ($)" />
                  <Line type="monotone" dataKey="vendors" stroke="#10B981" name="Vendors" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Vendor Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={vendors.filter(v => v.status === 'active').map(v => ({
                  name: v.storeName,
                  sales: v.totalSales / 1000,
                  products: v.totalProducts,
                  rating: v.rating
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#3B82F6" name="Sales (K)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Vendors */}
          <div className="bg-white rounded-xl border border-apple-gray-200">
            <div className="p-6 border-b border-apple-gray-200">
              <h3 className="text-lg font-semibold text-apple-gray-900">Top Performing Vendors</h3>
            </div>
            <div className="divide-y divide-apple-gray-200">
              {vendors
                .filter(v => v.status === 'active')
                .sort((a, b) => b.totalSales - a.totalSales)
                .slice(0, 5)
                .map((vendor, index) => (
                  <div key={vendor.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-apple-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-apple-blue-600 font-semibold">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-apple-gray-900">{vendor.storeName}</h4>
                        <p className="text-sm text-apple-gray-600">{vendor.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm text-apple-gray-600">Sales</p>
                        <p className="font-semibold text-apple-gray-900">
                          ${vendor.totalSales.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-apple-gray-600">Products</p>
                        <p className="font-semibold text-apple-gray-900">{vendor.totalProducts}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-apple-gray-900">{vendor.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'vendors' && (
        <div className="space-y-6">
          {/* Vendor Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Pending Approval</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {vendors.filter(v => v.status === 'pending').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Verified Vendors</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {vendors.filter(v => v.verified).length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Suspended</p>
                  <p className="text-2xl font-bold text-red-600">
                    {vendors.filter(v => v.status === 'suspended').length}
                  </p>
                </div>
                <Ban className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-green-600">
                    {(vendors.filter(v => v.rating > 0).reduce((sum, v) => sum + v.rating, 0) / 
                      vendors.filter(v => v.rating > 0).length).toFixed(1)}
                  </p>
                </div>
                <Star className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Vendors Table */}
          <div className="bg-white rounded-xl border border-apple-gray-200 overflow-hidden">
            <div className="p-6 border-b border-apple-gray-200">
              <h3 className="text-lg font-semibold text-apple-gray-900">All Vendors</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-apple-gray-50 border-b border-apple-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Vendor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Sales
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Commission
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-apple-gray-200">
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-apple-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-apple-blue-100 rounded-full flex items-center justify-center">
                            <Store className="w-5 h-5 text-apple-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <div className="font-medium text-apple-gray-900">{vendor.storeName}</div>
                              {vendor.verified && (
                                <CheckCircle className="w-4 h-4 text-blue-500" />
                              )}
                            </div>
                            <div className="text-sm text-apple-gray-500">{vendor.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(vendor.status)}
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vendor.status)}`}>
                            {vendor.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-apple-gray-900">
                        {vendor.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-apple-gray-900">
                        {vendor.totalProducts}
                      </td>
                      <td className="px-6 py-4 text-sm text-apple-gray-900">
                        ${vendor.totalSales.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {vendor.rating > 0 ? (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-apple-gray-900">{vendor.rating}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-apple-gray-500">No ratings</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-apple-gray-900">
                        {vendor.commission}%
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-apple-blue-500 hover:text-apple-blue-700">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-apple-gray-500 hover:text-apple-gray-700">
                            <Edit className="w-4 h-4" />
                          </button>
                          {vendor.status === 'pending' && (
                            <button className="p-1 text-green-500 hover:text-green-700">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          {vendor.status === 'active' && (
                            <button className="p-1 text-red-500 hover:text-red-700">
                              <Ban className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
          <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Vendor Products Management</h3>
          <p className="text-apple-gray-600">Product management interface would be implemented here with filtering, approval workflows, and bulk operations.</p>
        </div>
      )}

      {activeTab === 'commissions' && (
        <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
          <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Commission Management</h3>
          <p className="text-apple-gray-600">Commission tracking, payment processing, and vendor payout management would be implemented here.</p>
        </div>
      )}
    </div>
  );
};

export default MultiVendorMarketplace;
