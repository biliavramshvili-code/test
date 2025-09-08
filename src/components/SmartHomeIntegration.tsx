import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Smartphone, Wifi, Thermometer, Lightbulb, Shield, Music, Camera } from 'lucide-react';

const SmartHomeIntegration: React.FC = () => {
  const [connectedDevices, setConnectedDevices] = useState(12);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('living-room');

  const rooms = [
    { id: 'living-room', name: 'Living Room', devices: 4, temperature: 72 },
    { id: 'bedroom', name: 'Bedroom', devices: 3, temperature: 68 },
    { id: 'kitchen', name: 'Kitchen', devices: 5, temperature: 70 },
    { id: 'office', name: 'Office', devices: 2, temperature: 71 }
  ];

  const deviceCategories = [
    {
      name: 'Lighting',
      icon: Lightbulb,
      devices: ['Smart Bulbs', 'LED Strips', 'Motion Sensors'],
      color: 'from-yellow-400 to-orange-500'
    },
    {
      name: 'Climate',
      icon: Thermometer,
      devices: ['Thermostat', 'Air Purifier', 'Humidifier'],
      color: 'from-blue-400 to-cyan-500'
    },
    {
      name: 'Security',
      icon: Shield,
      devices: ['Door Locks', 'Cameras', 'Alarm System'],
      color: 'from-green-400 to-emerald-500'
    },
    {
      name: 'Entertainment',
      icon: Music,
      devices: ['Smart Speakers', 'TV', 'Sound System'],
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const appleProducts = [
    {
      name: 'iPhone 15 Pro',
      role: 'Central Hub',
      features: ['HomeKit Control', 'Siri Commands', 'Automation'],
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Apple TV 4K',
      role: 'Home Hub',
      features: ['Device Bridge', 'Remote Access', 'Automation Hub'],
      image: 'https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'HomePod mini',
      role: 'Voice Control',
      features: ['Siri Integration', 'Intercom', 'Music Control'],
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const connectDevice = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setConnectedDevices(prev => prev + 1);
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Smart Home Integration
          </h2>
          <p className="text-gray-600">
            Seamlessly connect and control your smart home with Apple products
          </p>
        </div>
        <motion.div
          animate={{ scale: isConnecting ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 1, repeat: isConnecting ? Infinity : 0 }}
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center"
        >
          <Home className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Home Overview */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Home Overview</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{connectedDevices}</div>
              <div className="text-sm text-blue-700">Connected Devices</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{rooms.length}</div>
              <div className="text-sm text-green-700">Smart Rooms</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Rooms</h4>
            {rooms.map((room) => (
              <motion.div
                key={room.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedRoom === room.id ? 'bg-blue-100 border-2 border-blue-300' : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedRoom(room.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-gray-900">{room.name}</h5>
                    <p className="text-sm text-gray-600">{room.devices} devices</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">{room.temperature}°F</div>
                    <div className="text-xs text-gray-500">Temperature</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Device Categories */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Device Categories</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {deviceCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">{category.name}</h4>
                  <div className="space-y-1">
                    {category.devices.map((device, deviceIndex) => (
                      <div key={deviceIndex} className="text-xs text-gray-600">
                        • {device}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={connectDevice}
            disabled={isConnecting}
            className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-700 transition-colors disabled:opacity-50"
          >
            {isConnecting ? 'Connecting Device...' : 'Add New Device'}
          </button>
        </div>
      </div>

      {/* Apple Products Integration */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Apple Products Integration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {appleProducts.map((product, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              
              <h4 className="font-semibold text-gray-900 mb-1">{product.name}</h4>
              <p className="text-sm text-blue-600 mb-3">{product.role}</p>
              
              <div className="space-y-1">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="text-xs text-gray-600 flex items-center">
                    <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Good Morning', icon: Lightbulb, action: 'Turn on lights, adjust temperature' },
            { name: 'Away Mode', icon: Shield, action: 'Lock doors, arm security' },
            { name: 'Movie Time', icon: Music, action: 'Dim lights, start entertainment' },
            { name: 'Good Night', icon: Camera, action: 'Turn off lights, lock doors' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg text-center hover:from-blue-50 hover:to-blue-100 transition-colors"
              >
                <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-medium text-gray-900 text-sm">{action.name}</div>
                <div className="text-xs text-gray-600 mt-1">{action.action}</div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SmartHomeIntegration;
