import React, { useState } from 'react';
import { Package, Truck, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { useOrders, Order } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';

const Orders: React.FC = () => {
  const { orders, cancelOrder } = useOrders();
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    const success = await cancelOrder(orderId);
    if (success) {
      // Order cancelled successfully
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-apple-gray-50 pt-20">
        <div className="container-padding">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-apple-gray-900 mb-4">Please Sign In</h1>
            <p className="text-apple-gray-600">You need to sign in to view your orders.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-apple-gray-50 pt-20">
      <div className="container-padding">
        <div className="py-8">
          <h1 className="text-3xl font-bold text-apple-gray-900 mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-apple-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-apple-gray-900 mb-2">No orders yet</h2>
              <p className="text-apple-gray-600">When you place your first order, it will appear here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-apple-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="font-semibold text-apple-gray-900">Order {order.id}</h3>
                          <p className="text-sm text-apple-gray-600">
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-apple-gray-600 hover:text-apple-blue-500 transition-colors"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-apple-gray-600">Total Amount</p>
                        <p className="font-semibold text-apple-gray-900">${order.total.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-apple-gray-600">Items</p>
                        <p className="font-semibold text-apple-gray-900">
                          {order.items.reduce((total, item) => total + item.quantity, 0)} items
                        </p>
                      </div>
                      {order.trackingNumber && (
                        <div>
                          <p className="text-sm text-apple-gray-600">Tracking Number</p>
                          <p className="font-semibold text-apple-gray-900">{order.trackingNumber}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      {order.items.slice(0, 3).map((item, index) => (
                        <img
                          key={index}
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-12 h-12 bg-apple-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-sm text-apple-gray-600">+{order.items.length - 3}</span>
                        </div>
                      )}
                    </div>

                    {(order.status === 'pending' || order.status === 'processing') && (
                      <div className="mt-4 pt-4 border-t border-apple-gray-200">
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-apple-gray-200">
              <h2 className="text-xl font-bold text-apple-gray-900">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 rounded-lg hover:bg-apple-gray-100 transition-colors"
              >
                <XCircle className="w-5 h-5 text-apple-gray-600" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-6">
                {/* Order Info */}
                <div>
                  <h3 className="font-semibold text-apple-gray-900 mb-3">Order Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-apple-gray-600">Order ID</p>
                      <p className="font-medium">{selectedOrder.id}</p>
                    </div>
                    <div>
                      <p className="text-apple-gray-600">Status</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </div>
                    <div>
                      <p className="text-apple-gray-600">Order Date</p>
                      <p className="font-medium">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-apple-gray-600">Total</p>
                      <p className="font-medium">${selectedOrder.total.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="font-semibold text-apple-gray-900 mb-3">Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-apple-gray-50 rounded-lg">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-apple-gray-900">{item.product.name}</h4>
                          <p className="text-sm text-apple-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-apple-gray-900">
                            ${((item.configuredPrice || item.product.price) * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-semibold text-apple-gray-900 mb-3">Shipping Address</h3>
                  <div className="p-3 bg-apple-gray-50 rounded-lg">
                    <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                    <p className="text-apple-gray-600">{selectedOrder.shippingAddress.street}</p>
                    <p className="text-apple-gray-600">
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                    </p>
                    <p className="text-apple-gray-600">{selectedOrder.shippingAddress.country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
