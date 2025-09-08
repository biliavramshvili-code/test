import React, { useState } from 'react';
import { Bell, Clock, CheckCircle, X, Mail, Phone } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

interface WaitlistItem {
  id: string;
  productId: number;
  productName: string;
  productImage: string;
  userEmail: string;
  userPhone?: string;
  notifyWhen: 'in-stock' | 'price-drop' | 'new-model';
  targetPrice?: number;
  createdAt: Date;
  status: 'active' | 'notified' | 'cancelled';
}

const ProductWaitlist: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    notifyWhen: 'in-stock' as 'in-stock' | 'price-drop' | 'new-model',
    targetPrice: ''
  });
  const { showNotification } = useNotification();

  const mockWaitlistItems: WaitlistItem[] = [
    {
      id: '1',
      productId: 3,
      productName: 'iPad Pro 12.9-inch',
      productImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      userEmail: 'user@example.com',
      userPhone: '+1234567890',
      notifyWhen: 'in-stock',
      createdAt: new Date('2024-01-10'),
      status: 'active'
    },
    {
      id: '2',
      productId: 1,
      productName: 'MacBook Pro 16-inch',
      productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      userEmail: 'user@example.com',
      notifyWhen: 'price-drop',
      targetPrice: 2200,
      createdAt: new Date('2024-01-08'),
      status: 'active'
    },
    {
      id: '3',
      productId: 2,
      productName: 'iPhone 15 Pro',
      productImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      userEmail: 'user@example.com',
      notifyWhen: 'new-model',
      createdAt: new Date('2024-01-05'),
      status: 'notified'
    }
  ];

  const handleJoinWaitlist = (product: any) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSubmitWaitlist = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate adding to waitlist
    showNotification(
      `You've been added to the waitlist for ${selectedProduct.name}! We'll notify you when it's available.`,
      'success'
    );
    
    setShowModal(false);
    setFormData({
      email: '',
      phone: '',
      notifyWhen: 'in-stock',
      targetPrice: ''
    });
  };

  const handleRemoveFromWaitlist = (itemId: string) => {
    showNotification('Removed from waitlist', 'info');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'notified':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <Bell className="w-4 h-4 text-apple-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-yellow-100 text-yellow-800';
      case 'notified':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-apple-gray-100 text-apple-gray-800';
    }
  };

  const getNotifyTypeText = (type: string, targetPrice?: number) => {
    switch (type) {
      case 'in-stock':
        return 'Back in stock';
      case 'price-drop':
        return `Price drops below $${targetPrice}`;
      case 'new-model':
        return 'New model released';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-apple-gray-900">Product Waitlist</h2>
          <p className="text-apple-gray-600">Get notified when products become available</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors flex items-center"
        >
          <Bell className="w-4 h-4 mr-2" />
          Join Waitlist
        </button>
      </div>

      {/* Waitlist Items */}
      <div className="space-y-4">
        {mockWaitlistItems.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-apple-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-apple-gray-900">{item.productName}</h3>
                  <p className="text-sm text-apple-gray-600">
                    Notify when: {getNotifyTypeText(item.notifyWhen, item.targetPrice)}
                  </p>
                  <p className="text-xs text-apple-gray-500">
                    Added on {item.createdAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(item.status)}
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                
                {item.status === 'active' && (
                  <button
                    onClick={() => handleRemoveFromWaitlist(item.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Join Waitlist Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-apple-gray-900">Join Waitlist</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-apple-gray-400 hover:text-apple-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitWaitlist} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-apple-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-apple-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                  Notify me when:
                </label>
                <select
                  value={formData.notifyWhen}
                  onChange={(e) => setFormData({ ...formData, notifyWhen: e.target.value as any })}
                  className="w-full px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                >
                  <option value="in-stock">Product is back in stock</option>
                  <option value="price-drop">Price drops below target</option>
                  <option value="new-model">New model is released</option>
                </select>
              </div>

              {formData.notifyWhen === 'price-drop' && (
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Target Price ($)
                  </label>
                  <input
                    type="number"
                    value={formData.targetPrice}
                    onChange={(e) => setFormData({ ...formData, targetPrice: e.target.value })}
                    className="w-full px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    placeholder="Enter target price"
                  />
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-apple-gray-300 text-apple-gray-700 rounded-lg hover:bg-apple-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
                >
                  Join Waitlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductWaitlist;
