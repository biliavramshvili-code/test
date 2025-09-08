import React, { useState, useEffect } from 'react';
import { Glasses, Play, Pause, RotateCcw, Maximize, Volume2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const ImmersiveVRShowroom: React.FC = () => {
  const [isVRActive, setIsVRActive] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('apple-store');
  const [viewMode, setViewMode] = useState('360');
  const [isPlaying, setIsPlaying] = useState(false);

  const vrRooms = [
    {
      id: 'apple-store',
      name: 'Apple Store Fifth Avenue',
      description: 'Experience the iconic glass cube store in immersive VR',
      thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'design-studio',
      name: 'Apple Design Studio',
      description: 'Step inside where Apple products are conceived and designed',
      thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing Facility',
      description: 'Witness the precision manufacturing of Apple products',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'future-lab',
      name: 'Future Technology Lab',
      description: 'Explore cutting-edge technologies in development',
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const vrFeatures = [
    {
      icon: '🎯',
      title: 'Spatial Tracking',
      description: 'Advanced 6DOF tracking for natural movement'
    },
    {
      icon: '🎨',
      title: 'Photorealistic Rendering',
      description: 'Ray-traced environments with realistic lighting'
    },
    {
      icon: '🤝',
      title: 'Hand Tracking',
      description: 'Natural hand gestures for product interaction'
    },
    {
      icon: '🔊',
      title: 'Spatial Audio',
      description: '3D audio that responds to your position'
    }
  ];

  const toggleVR = () => {
    setIsVRActive(!isVRActive);
    if (!isVRActive) {
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
          <Glasses className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Immersive VR Showroom</h2>
          <p className="text-gray-600">Experience Apple products in photorealistic virtual environments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* VR Viewer */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-xl overflow-hidden relative">
            <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              {isVRActive ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center text-white"
                >
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <Glasses className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">VR Experience Active</h3>
                  <p className="text-blue-200">Exploring: {vrRooms.find(room => room.id === currentRoom)?.name}</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center text-white">
                  <Glasses className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">VR Showroom Ready</h3>
                  <p className="text-gray-300">Click "Enter VR" to begin your immersive experience</p>
                </div>
              )}
            </div>

            {/* VR Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  onClick={toggleVR}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isVRActive 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {isVRActive ? 'Exit VR' : 'Enter VR'}
                </button>
                <button className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Room Selection */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {vrRooms.map((room) => (
              <motion.button
                key={room.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentRoom(room.id)}
                className={`p-4 rounded-xl text-left transition-all ${
                  currentRoom === room.id
                    ? 'bg-indigo-100 border-2 border-indigo-500'
                    : 'bg-white border-2 border-transparent hover:border-gray-200'
                }`}
              >
                <img
                  src={room.thumbnail}
                  alt={room.name}
                  className="w-full h-24 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold text-gray-900 mb-1">{room.name}</h4>
                <p className="text-sm text-gray-600">{room.description}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* VR Features */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">VR Features</h3>
            <div className="space-y-4">
              {vrFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">System Requirements</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">VR Headset</span>
                <span className="text-green-600 font-medium">✓ Compatible</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Graphics</span>
                <span className="text-green-600 font-medium">✓ RTX 3080+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">RAM</span>
                <span className="text-green-600 font-medium">✓ 16GB+</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Storage</span>
                <span className="text-green-600 font-medium">✓ 50GB Free</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Premium VR Experience</h3>
            <p className="text-indigo-100 mb-4">
              Unlock exclusive VR showrooms and advanced features with our premium subscription.
            </p>
            <button className="w-full bg-white text-indigo-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveVRShowroom;
