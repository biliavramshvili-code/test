import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, MapPin, Clock, Zap, Satellite, Plane, Ship } from 'lucide-react';

const AdvancedLogisticsTracker: React.FC = () => {
  const [selectedShipment, setSelectedShipment] = useState('SH001');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const shipments = [
    {
      id: 'SH001',
      product: 'iPhone 15 Pro Max',
      status: 'In Transit',
      method: 'Drone Delivery',
      eta: '2 hours',
      progress: 75
    },
    {
      id: 'SH002',
      product: 'MacBook Pro M3',
      status: 'Processing',
      method: 'Hyperloop',
      eta: '45 minutes',
      progress: 25
    },
    {
      id: 'SH003',
      product: 'Apple Watch Ultra',
      status: 'Delivered',
      method: 'Teleportation',
      eta: 'Completed',
      progress: 100
    }
  ];

  const deliveryMethods = [
    {
      name: 'Drone Delivery',
      icon: Plane,
      speed: '50 mph',
      range: '25 miles',
      eco: '100% Electric',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      name: 'Hyperloop',
      icon: Zap,
      speed: '600 mph',
      range: '500 miles',
      eco: 'Zero Emissions',
      color: 'from-purple-400 to-pink-500'
    },
    {
      name: 'Autonomous Vehicle',
      icon: Truck,
      speed: '65 mph',
      range: '300 miles',
      eco: 'Electric',
      color: 'from-green-400 to-emerald-500'
    },
    {
      name: 'Satellite Drop',
      icon: Satellite,
      speed: '17,500 mph',
      range: 'Global',
      eco: 'Solar Powered',
      color: 'from-orange-400 to-red-500'
    }
  ];

  const trackingSteps = [
    { step: 'Order Confirmed', time: '10:30 AM', status: 'completed' },
    { step: 'Quantum Processing', time: '10:45 AM', status: 'completed' },
    { step: 'Molecular Assembly', time: '11:15 AM', status: 'completed' },
    { step: 'Drone Dispatch', time: '12:00 PM', status: 'active' },
    { step: 'Final Delivery', time: '2:30 PM', status: 'pending' }
  ];

  useEffect(() => {
    if (selectedShipment) {
      setIsLoading(true);
      setTimeout(() => {
        setTrackingData({
          location: 'San Francisco, CA',
          coordinates: [37.7749, -122.4194],
          temperature: '72°F',
          humidity: '65%',
          speed: '45 mph',
          altitude: '500 ft'
        });
        setIsLoading(false);
      }, 1000);
    }
  }, [selectedShipment]);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Advanced Logistics Tracker
          </h2>
          <p className="text-gray-600">
            Real-time tracking with quantum sensors, AI optimization, and next-gen delivery methods
          </p>
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center"
        >
          <Satellite className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipment Selection */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Active Shipments</h3>
          
          <div className="space-y-4">
            {shipments.map((shipment) => (
              <motion.div
                key={shipment.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedShipment === shipment.id ? 'bg-orange-100 border-2 border-orange-300' : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedShipment(shipment.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{shipment.product}</h4>
                    <p className="text-sm text-gray-600">{shipment.id}</p>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      shipment.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {shipment.status}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{shipment.method}</span>
                  <span className="text-sm font-medium text-gray-900">ETA: {shipment.eta}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full"
                    style={{ width: `${shipment.progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${shipment.progress}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real-time Tracking */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibent text-gray-900 mb-4">Real-time Tracking</h3>
          
          {isLoading ? (
            <div className="text-center py-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-600">Loading tracking data...</p>
            </div>
          ) : trackingData ? (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-gray-900">Current Location</span>
                </div>
                <p className="text-gray-700 mb-2">{trackingData.location}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Speed:</span>
                    <span className="font-medium ml-2">{trackingData.speed}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Altitude:</span>
                    <span className="font-medium ml-2">{trackingData.altitude}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Temperature:</span>
                    <span className="font-medium ml-2">{trackingData.temperature}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Humidity:</span>
                    <span className="font-medium ml-2">{trackingData.humidity}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Delivery Timeline</h4>
                <div className="space-y-3">
                  {trackingSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        step.status === 'completed' ? 'bg-green-500' :
                        step.status === 'active' ? 'bg-orange-500 animate-pulse' :
                        'bg-gray-300'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`text-sm ${
                            step.status === 'completed' ? 'text-gray-900 font-medium' :
                            step.status === 'active' ? 'text-orange-600 font-medium' :
                            'text-gray-500'
                          }`}>
                            {step.step}
                          </span>
                          <span className="text-xs text-gray-500">{step.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a shipment to view tracking details</p>
            </div>
          )}
        </div>
      </div>

      {/* Delivery Methods */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Next-Gen Delivery Methods</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliveryMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{method.name}</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Speed: {method.speed}</div>
                  <div>Range: {method.range}</div>
                  <div className="text-green-600">{method.eco}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdvancedLogisticsTracker;
