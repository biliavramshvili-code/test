import React, { useState } from 'react';
import { Package, Calendar, Repeat, Download, Filter, Search, CheckSquare, X, Clock, Truck, AlertCircle } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  items: number;
  shippingMethod: string;
  trackingNumber?: string;
}

const AdvancedOrderManager: React.FC = () => {
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      customer: 'John Smith',
      email: 'john@example.com',
      total: 2499,
      status: 'processing',
      priority: 'high',
      createdAt: '2024-01-15T10:30:00Z',
      items: 3,
      shippingMethod: 'Express',
      trackingNumber: 'TRK123456789'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      customer: 'Sarah Johnson',
      email: 'sarah@example.com',
      total: 1299,
      status: 'pending',
      priority: 'medium',
      createdAt: '2024-01-15T11:00:00Z',
      items: 2,
      shippingMethod: 'Standard'
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      customer: 'Mike Davis',
      email: 'mike@example.com',
      total: 3999,
      status: 'shipped',
      priority: 'urgent',
      createdAt: '2024-01-14T15:20:00Z',
      items: 5,
      shippingMethod: 'Overnight',
      trackingNumber: 'TRK987654321'
    }
  ]);

  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const { showNotification } = useNotification();

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || order.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map(order => order.id));
    }
  };

  const handleBulkAction = (action: string) => {
    showNotification(`${action} applied to ${selectedOrders.length} orders`, 'success');
    setSelectedOrders([]);
    setShowBulkActions(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-apple-gray-900">Advanced Order Management</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Orders</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
            <Package className="w-4 h-4" />
            <span>Create Template</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-apple-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders, customers, or emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="flex items-center justify-between p-4 bg-apple-blue-50 rounded-lg">
            <span className="text-sm text-apple-blue-700">
              {selectedOrders.length} orders selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleBulkAction('Update Status')}
                className="px-3 py-1 bg-apple-blue-500 text-white text-sm rounded hover:bg-apple-blue-600 transition-colors"
              >
                Update Status
              </button>
              <button
                onClick={() => handleBulkAction('Export Selected')}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
              >
                Export
              </button>
              <button
                onClick={() => handleBulkAction('Print Labels')}
                className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors"
              >
                Print Labels
              </button>
              <button
                onClick={() => setSelectedOrders([])}
                className="p-1 text-apple-gray-500 hover:text-apple-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-apple-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-apple-gray-50 border-b border-apple-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-apple-gray-300"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-apple-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => handleSelectOrder(order.id)}
                      className="rounded border-apple-gray-300"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-apple-gray-900">{order.orderNumber}</div>
                      <div className="text-sm text-apple-gray-500">{order.items} items</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-apple-gray-900">{order.customer}</div>
                      <div className="text-sm text-apple-gray-500">{order.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-apple-gray-900">
                    ${order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-apple-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-apple-blue-500 hover:text-apple-blue-700">
                        <Package className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-green-500 hover:text-green-700">
                        <Truck className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-purple-500 hover:text-purple-700">
                        <Repeat className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-yellow-600">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Processing</p>
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'processing').length}
              </p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Shipped</p>
              <p className="text-2xl font-bold text-purple-600">
                {orders.filter(o => o.status === 'shipped').length}
              </p>
            </div>
            <Truck className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-apple-gray-600">Urgent Orders</p>
              <p className="text-2xl font-bold text-red-600">
                {orders.filter(o => o.priority === 'urgent').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOrderManager;
