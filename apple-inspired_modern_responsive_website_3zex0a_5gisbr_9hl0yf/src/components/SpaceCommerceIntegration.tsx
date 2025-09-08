import React, { useState, useEffect } from 'react';
import { Rocket, Satellite, Globe, MapPin, Clock, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface SpaceDelivery {
  id: string;
  destination: string;
  estimatedTime: string;
  cost: number;
  status: 'available' | 'launching' | 'in_orbit' | 'delivered';
}

interface OrbitalMarketplace {
  id: string;
  name: string;
  location: string;
  products: number;
  distance: string;
}

const SpaceCommerceIntegration: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  const [spaceDeliveries, setSpaceDeliveries] = useState<SpaceDelivery[]>([]);
  const [orbitalMarketplaces, setOrbitalMarketplaces] = useState<OrbitalMarketplace[]>([]);
  const [satelliteStatus, setSatelliteStatus] = useState('operational');

  useEffect(() => {
    // Initialize space commerce data
    const deliveries: SpaceDelivery[] = [
      {
        id: 'sd1',
        destination: 'International Space Station',
        estimatedTime: '3 days',
        cost: 50000,
        status: 'available'
      },
      {
        id: 'sd2',
        destination: 'Moon Base Alpha',
        estimatedTime: '7 days',
        cost: 250000,
        status: 'available'
      },
      {
        id: 'sd3',
        destination: 'Mars Colony One',
        estimatedTime: '180 days',
        cost: 2500000,
        status: 'available'
      }
    ];

    const marketplaces: OrbitalMarketplace[] = [
      {
        id: 'om1',
        name: 'ISS Marketplace',
        location: 'Low Earth Orbit',
        products: 1250,
        distance: '408 km'
      },
      {
        id: 'om2',
        name: 'Lunar Commerce Hub',
        location: 'Moon Surface',
        products: 850,
        distance: '384,400 km'
      },
      {
        id: 'om3',
        name: 'Mars Trading Post',
        location: 'Mars Orbit',
        products: 420,
        distance: '225M km'
      }
    ];

    setSpaceDeliveries(deliveries);
    setOrbitalMarketplaces(marketplaces);

    // Simulate satellite status updates
    const interval = setInterval(() => {
      setSatelliteStatus(prev => 
        prev === 'operational' ? 'transmitting' : 
        prev === 'transmitting' ? 'receiving' : 'operational'
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const launchDelivery = (deliveryId: string) => {
    setSpaceDeliveries(prev => 
      prev.map(delivery => 
        delivery.id === deliveryId 
          ? { ...delivery, status: 'launching' }
          : delivery
      )
    );

    // Simulate delivery progression
    setTimeout(() => {
      setSpaceDeliveries(prev => 
        prev.map(delivery => 
          delivery.id === deliveryId 
            ? { ...delivery, status: 'in_orbit' }
            : delivery
        )
      );
    }, 2000);

    setTimeout(() => {
      setSpaceDeliveries(prev => 
        prev.map(delivery => 
          delivery.id === deliveryId 
            ? { ...delivery, status: 'delivered' }
            : delivery
        )
      );
    }, 5000);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Rocket className="w-8 h-8 text-blue-400" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Space Commerce Integration</h3>
            <p className="text-blue-200">Interplanetary shopping and delivery</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-blue-200">Satellite Network</div>
          <div className={`font-bold ${
            satelliteStatus === 'operational' ? 'text-green-400' :
            satelliteStatus === 'transmitting' ? 'text-yellow-400' : 'text-blue-400'
          }`}>
            {satelliteStatus.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Space Delivery Options */}
        <div className="space-y-6">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Satellite className="w-6 h-6 text-blue-400" />
              <h4 className="text-lg font-semibold">Space Delivery Options</h4>
            </div>
            
            <div className="space-y-4">
              {spaceDeliveries.map((delivery) => (
                <motion.div
                  key={delivery.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-semibold">{delivery.destination}</h5>
                      <div className="flex items-center space-x-4 text-sm text-blue-200 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{delivery.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>${delivery.cost.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      delivery.status === 'available' ? 'bg-green-500/20 text-green-400' :
                      delivery.status === 'launching' ? 'bg-yellow-500/20 text-yellow-400' :
                      delivery.status === 'in_orbit' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {delivery.status.replace('_', ' ').toUpperCase()}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => launchDelivery(delivery.id)}
                    disabled={delivery.status !== 'available'}
                    className="w-full bg-blue-500/20 border border-blue-500/30 text-blue-300 py-2 rounded-lg hover:bg-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {delivery.status === 'available' ? 'Launch Delivery' :
                     delivery.status === 'launching' ? 'Launching...' :
                     delivery.status === 'in_orbit' ? 'In Transit' : 'Delivered'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Orbital Marketplaces */}
        <div className="space-y-6">
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="w-6 h-6 text-purple-400" />
              <h4 className="text-lg font-semibold">Orbital Marketplaces</h4>
            </div>
            
            <div className="space-y-4">
              {orbitalMarketplaces.map((marketplace) => (
                <motion.div
                  key={marketplace.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-semibold">{marketplace.name}</h5>
                      <p className="text-sm text-purple-200">{marketplace.location}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-200">
                      {marketplace.products.toLocaleString()} products
                    </span>
                    <span className="text-purple-200">
                      {marketplace.distance} away
                    </span>
                  </div>
                  
                  <button className="w-full mt-3 bg-purple-500/20 border border-purple-500/30 text-purple-300 py-2 rounded-lg hover:bg-purple-500/30 transition-all">
                    Browse Marketplace
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Space Commerce Stats */}
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h4 className="text-lg font-semibold mb-4">Space Commerce Network</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">47</div>
                <div className="text-sm text-blue-200">Active Satellites</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">12</div>
                <div className="text-sm text-green-200">Space Stations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">3.2K</div>
                <div className="text-sm text-purple-200">Products in Orbit</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">98.7%</div>
                <div className="text-sm text-yellow-200">Delivery Success</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Control */}
      <div className="mt-8 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Mission Control Center</h4>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">All Systems Operational</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-blue-400">24/7</div>
            <div className="text-xs text-blue-200">Mission Monitoring</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-green-400">Real-time</div>
            <div className="text-xs text-green-200">Tracking Updates</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-purple-400">Quantum</div>
            <div className="text-xs text-purple-200">Communication</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 text-center">
            <div className="text-lg font-bold text-yellow-400">AI-Powered</div>
            <div className="text-xs text-yellow-200">Route Optimization</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceCommerceIntegration;
