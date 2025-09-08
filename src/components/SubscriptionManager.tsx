import React, { useState } from 'react';
import { Calendar, Package, CreditCard, Pause, Play, X, Edit, Plus } from 'lucide-react';

interface Subscription {
  id: string;
  productId: number;
  productName: string;
  productImage: string;
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  nextDelivery: string;
  price: number;
  status: 'active' | 'paused' | 'cancelled';
  quantity: number;
  startDate: string;
  totalOrders: number;
}

const SubscriptionManager: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "1",
      productId: 1,
      productName: "iPhone 15 Pro Case",
      productImage: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      frequency: 'monthly',
      nextDelivery: '2024-02-15',
      price: 49.99,
      status: 'active',
      quantity: 1,
      startDate: '2024-01-15',
      totalOrders: 3
    },
    {
      id: "2",
      productId: 2,
      productName: "AirPods Pro Tips",
      productImage: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      frequency: 'quarterly',
      nextDelivery: '2024-03-01',
      price: 19.99,
      status: 'active',
      quantity: 2,
      startDate: '2023-12-01',
      totalOrders: 2
    }
  ]);

  const [showCreateSubscription, setShowCreateSubscription] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<string | null>(null);

  const toggleSubscriptionStatus = (subscriptionId: string) => {
    setSubscriptions(subs => subs.map(sub => 
      sub.id === subscriptionId 
        ? { 
            ...sub, 
            status: sub.status === 'active' ? 'paused' : 'active'
          }
        : sub
    ));
  };

  const cancelSubscription = (subscriptionId: string) => {
    setSubscriptions(subs => subs.map(sub => 
      sub.id === subscriptionId 
        ? { ...sub, status: 'cancelled' }
        : sub
    ));
  };

  const updateSubscriptionFrequency = (subscriptionId: string, frequency: Subscription['frequency']) => {
    setSubscriptions(subs => subs.map(sub => 
      sub.id === subscriptionId 
        ? { ...sub, frequency }
        : sub
    ));
    setEditingSubscription(null);
  };

  const getStatusColor = (status: Subscription['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'paused': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-apple-gray-600 bg-apple-gray-50';
    }
  };

  const getFrequencyText = (frequency: Subscription['frequency']) => {
    switch (frequency) {
      case 'weekly': return 'Every Week';
      case 'monthly': return 'Every Month';
      case 'quarterly': return 'Every 3 Months';
      case 'yearly': return 'Every Year';
      default: return frequency;
    }
  };

  const calculateSavings = (subscription: Subscription) => {
    const regularPrice = subscription.price * 1.1; // Assume 10% savings
    const savings = (regularPrice - subscription.price) * subscription.totalOrders;
    return savings.toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-apple-gray-900">Subscription Manager</h2>
            <p className="text-apple-gray-600">Manage your recurring orders and subscriptions</p>
          </div>
          <button
            onClick={() => setShowCreateSubscription(true)}
            className="flex items-center space-x-2 px-6 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Subscription</span>
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-apple-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-apple-gray-900">
              {subscriptions.filter(s => s.status === 'active').length}
            </div>
            <div className="text-sm text-apple-gray-600">Active Subscriptions</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              ${subscriptions.reduce((total, sub) => 
                sub.status === 'active' ? total + sub.price : total, 0
              ).toFixed(2)}
            </div>
            <div className="text-sm text-apple-gray-600">Monthly Spending</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              ${subscriptions.reduce((total, sub) => 
                total + parseFloat(calculateSavings(sub)), 0
              ).toFixed(2)}
            </div>
            <div className="text-sm text-apple-gray-600">Total Savings</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {subscriptions.reduce((total, sub) => total + sub.totalOrders, 0)}
            </div>
            <div className="text-sm text-apple-gray-600">Total Orders</div>
          </div>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        {subscriptions.map((subscription) => (
          <div key={subscription.id} className="bg-white rounded-xl p-6 border border-apple-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={subscription.productImage}
                  alt={subscription.productName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-apple-gray-900">{subscription.productName}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </span>
                    <span className="text-sm text-apple-gray-600">
                      Qty: {subscription.quantity}
                    </span>
                    <span className="text-sm text-apple-gray-600">
                      {getFrequencyText(subscription.frequency)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-apple-gray-900">${subscription.price}</div>
                <div className="text-sm text-apple-gray-600">per delivery</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-apple-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Next: {subscription.nextDelivery}</span>
              </div>
              <div className="flex items-center space-x-2 text-apple-gray-600">
                <Package className="w-4 h-4" />
                <span className="text-sm">{subscription.totalOrders} orders delivered</span>
              </div>
              <div className="flex items-center space-x-2 text-green-600">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm">Saved ${calculateSavings(subscription)}</span>
              </div>
            </div>

            {/* Frequency Editor */}
            {editingSubscription === subscription.id && (
              <div className="mb-4 p-4 bg-apple-gray-50 rounded-lg">
                <h4 className="font-medium text-apple-gray-900 mb-2">Change Frequency</h4>
                <div className="flex flex-wrap gap-2">
                  {(['weekly', 'monthly', 'quarterly', 'yearly'] as const).map((freq) => (
                    <button
                      key={freq}
                      onClick={() => updateSubscriptionFrequency(subscription.id, freq)}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                        subscription.frequency === freq
                          ? 'bg-apple-blue-500 text-white'
                          : 'bg-white border border-apple-gray-300 text-apple-gray-700 hover:border-apple-gray-400'
                      }`}
                    >
                      {getFrequencyText(freq)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-apple-gray-200">
              <div className="flex items-center space-x-2">
                {subscription.status !== 'cancelled' && (
                  <>
                    <button
                      onClick={() => toggleSubscriptionStatus(subscription.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        subscription.status === 'active'
                          ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {subscription.status === 'active' ? (
                        <>
                          <Pause className="w-4 h-4" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          <span>Resume</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setEditingSubscription(
                        editingSubscription === subscription.id ? null : subscription.id
                      )}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </>
                )}
              </div>
              {subscription.status !== 'cancelled' && (
                <button
                  onClick={() => cancelSubscription(subscription.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              )}
            </div>
          </div>
        ))}

        {subscriptions.length === 0 && (
          <div className="bg-white rounded-xl p-12 border border-apple-gray-200 text-center">
            <Package className="w-16 h-16 text-apple-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-apple-gray-900 mb-2">No Subscriptions Yet</h3>
            <p className="text-apple-gray-600 mb-6">
              Set up recurring orders for your favorite products and never run out again.
            </p>
            <button
              onClick={() => setShowCreateSubscription(true)}
              className="px-6 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
            >
              Create Your First Subscription
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManager;
