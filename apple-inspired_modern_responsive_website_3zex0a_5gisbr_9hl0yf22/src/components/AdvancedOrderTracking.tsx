import React, { useState } from 'react';
import { Package, Truck, MapPin, Clock, CheckCircle, AlertCircle, Phone, MessageSquare } from 'lucide-react';

interface TrackingEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string;
  isCompleted: boolean;
}

interface OrderTracking {
  orderId: string;
  status: 'processing' | 'shipped' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'exception';
  estimatedDelivery: string;
  trackingNumber: string;
  carrier: string;
  currentLocation: string;
  events: TrackingEvent[];
  deliveryAddress: string;
  contactInfo: {
    phone: string;
    email: string;
  };
}

const AdvancedOrderTracking: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<string>('ORD123456');
  
  const [orderTrackings] = useState<OrderTracking[]>([
    {
      orderId: 'ORD123456',
      status: 'in-transit',
      estimatedDelivery: '2024-01-25',
      trackingNumber: '1Z999AA1234567890',
      carrier: 'UPS',
      currentLocation: 'Chicago, IL',
      deliveryAddress: '123 Main St, New York, NY 10001',
      contactInfo: {
        phone: '+1 (555) 123-4567',
        email: 'john.doe@email.com'
      },
      events: [
        {
          id: '1',
          status: 'Order Placed',
          description: 'Your order has been received and is being processed',
          location: 'Apple Store Online',
          timestamp: '2024-01-20T10:00:00Z',
          isCompleted: true
        },
        {
          id: '2',
          status: 'Processing',
          description: 'Your order is being prepared for shipment',
          location: 'Cupertino, CA',
          timestamp: '2024-01-21T14:30:00Z',
          isCompleted: true
        },
        {
          id: '3',
          status: 'Shipped',
          description: 'Your package has been shipped',
          location: 'Cupertino, CA',
          timestamp: '2024-01-22T09:15:00Z',
          isCompleted: true
        },
        {
          id: '4',
          status: 'In Transit',
          description: 'Package is on its way to the destination',
          location: 'Chicago, IL',
          timestamp: '2024-01-23T16:45:00Z',
          isCompleted: true
        },
        {
          id: '5',
          status: 'Out for Delivery',
          description: 'Package is out for delivery',
          location: 'New York, NY',
          timestamp: '2024-01-25T08:00:00Z',
          isCompleted: false
        },
        {
          id: '6',
          status: 'Delivered',
          description: 'Package has been delivered',
          location: 'New York, NY',
          timestamp: '2024-01-25T15:00:00Z',
          isCompleted: false
        }
      ]
    },
    {
      orderId: 'ORD123457',
      status: 'delivered',
      estimatedDelivery: '2024-01-20',
      trackingNumber: '1Z999AA1234567891',
      carrier: 'FedEx',
      currentLocation: 'Delivered',
      deliveryAddress: '456 Oak Ave, Los Angeles, CA 90210',
      contactInfo: {
        phone: '+1 (555) 987-6543',
        email: 'jane.smith@email.com'
      },
      events: [
        {
          id: '1',
          status: 'Order Placed',
          description: 'Your order has been received',
          location: 'Apple Store Online',
          timestamp: '2024-01-18T11:00:00Z',
          isCompleted: true
        },
        {
          id: '2',
          status: 'Delivered',
          description: 'Package delivered successfully',
          location: 'Los Angeles, CA',
          timestamp: '2024-01-20T14:30:00Z',
          isCompleted: true
        }
      ]
    }
  ]);

  const currentTracking = orderTrackings.find(order => order.orderId === selectedOrder);

  const getStatusIcon = (status: string, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    
    switch (status.toLowerCase()) {
      case 'processing':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipped':
      case 'in transit':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'out for delivery':
        return <MapPin className="w-5 h-5 text-orange-500" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Clock className="w-5 h-5 text-apple-gray-400" />;
    }
  };

  const getStatusColor = (status: OrderTracking['status']) => {
    switch (status) {
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'shipped': return 'text-purple-600 bg-purple-50';
      case 'in-transit': return 'text-blue-600 bg-blue-50';
      case 'out-for-delivery': return 'text-orange-600 bg-orange-50';
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'exception': return 'text-red-600 bg-red-50';
      default: return 'text-apple-gray-600 bg-apple-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!currentTracking) return null;

  return (
    <div className="space-y-6">
      {/* Order Selection */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-apple-gray-900">Order Tracking</h2>
          <select
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
            className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
          >
            {orderTrackings.map((order) => (
              <option key={order.orderId} value={order.orderId}>
                {order.orderId}
              </option>
            ))}
          </select>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-apple-gray-50 rounded-lg">
            <div className="text-lg font-bold text-apple-gray-900">{currentTracking.orderId}</div>
            <div className="text-sm text-apple-gray-600">Order ID</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{currentTracking.trackingNumber}</div>
            <div className="text-sm text-apple-gray-600">Tracking Number</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">{currentTracking.carrier}</div>
            <div className="text-sm text-apple-gray-600">Carrier</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {new Date(currentTracking.estimatedDelivery).toLocaleDateString()}
            </div>
            <div className="text-sm text-apple-gray-600">Est. Delivery</div>
          </div>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-apple-gray-900">Current Status</h3>
            <p className="text-apple-gray-600">Real-time tracking information</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(currentTracking.status)}`}>
            {currentTracking.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-apple-blue-500" />
              <div>
                <div className="font-medium text-apple-gray-900">Current Location</div>
                <div className="text-apple-gray-600">{currentTracking.currentLocation}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="w-5 h-5 text-apple-blue-500" />
              <div>
                <div className="font-medium text-apple-gray-900">Delivery Address</div>
                <div className="text-apple-gray-600">{currentTracking.deliveryAddress}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-apple-blue-500" />
              <div>
                <div className="font-medium text-apple-gray-900">Contact Phone</div>
                <div className="text-apple-gray-600">{currentTracking.contactInfo.phone}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-apple-blue-500" />
              <div>
                <div className="font-medium text-apple-gray-900">Email</div>
                <div className="text-apple-gray-600">{currentTracking.contactInfo.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <h3 className="text-xl font-bold text-apple-gray-900 mb-6">Tracking History</h3>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-apple-gray-200"></div>
          
          <div className="space-y-6">
            {currentTracking.events.map((event, index) => (
              <div key={event.id} className="relative flex items-start space-x-4">
                {/* Timeline Dot */}
                <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 ${
                  event.isCompleted 
                    ? 'bg-green-50 border-green-200' 
                    : index === currentTracking.events.findIndex(e => !e.isCompleted)
                    ? 'bg-blue-50 border-blue-200 animate-pulse'
                    : 'bg-apple-gray-50 border-apple-gray-200'
                }`}>
                  {getStatusIcon(event.status, event.isCompleted)}
                </div>
                
                {/* Event Details */}
                <div className="flex-1 min-w-0 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className={`font-semibold ${
                      event.isCompleted ? 'text-apple-gray-900' : 'text-apple-gray-600'
                    }`}>
                      {event.status}
                    </h4>
                    <span className="text-sm text-apple-gray-500">
                      {formatDate(event.timestamp)}
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-2 ${
                    event.isCompleted ? 'text-apple-gray-700' : 'text-apple-gray-500'
                  }`}>
                    {event.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-xs text-apple-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Instructions */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <h3 className="text-xl font-bold text-apple-gray-900 mb-4">Delivery Instructions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Delivery Notes</span>
              </div>
              <p className="text-sm text-blue-800">
                Please leave package at front door if no one is home. Ring doorbell upon delivery.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">Signature Required</span>
              </div>
              <p className="text-sm text-green-800">
                This package requires an adult signature upon delivery.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>Contact Carrier</span>
            </button>
            
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-apple-gray-200 text-apple-gray-700 rounded-lg hover:bg-apple-gray-300 transition-colors">
              <MapPin className="w-4 h-4" />
              <span>Change Delivery Address</span>
            </button>
            
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
              <Clock className="w-4 h-4" />
              <span>Reschedule Delivery</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedOrderTracking;
