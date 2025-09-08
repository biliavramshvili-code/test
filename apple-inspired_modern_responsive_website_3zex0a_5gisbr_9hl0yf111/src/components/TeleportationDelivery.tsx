import React, { useState, useEffect } from 'react';
import { Zap, MapPin, Clock, Target, Sparkles, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TeleportationHub {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: 'online' | 'offline' | 'maintenance';
  capacity: number;
  distance: number;
}

interface TeleportationOrder {
  id: string;
  destination: TeleportationHub;
  items: string[];
  status: 'preparing' | 'materializing' | 'teleporting' | 'delivered' | 'failed';
  progress: number;
  energyRequired: number;
  molecularIntegrity: number;
}

const TeleportationDelivery: React.FC = () => {
  const [teleportationHubs, setTeleportationHubs] = useState<TeleportationHub[]>([]);
  const [activeOrders, setActiveOrders] = useState<TeleportationOrder[]>([]);
  const [selectedHub, setSelectedHub] = useState<TeleportationHub | null>(null);
  const [quantumStability, setQuantumStability] = useState(96.8);
  const [networkStatus, setNetworkStatus] = useState('operational');

  const hubs: TeleportationHub[] = [
    {
      id: 'hub1',
      name: 'Manhattan Quantum Hub',
      location: 'New York, NY',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      status: 'online',
      capacity: 1000,
      distance: 0
    },
    {
      id: 'hub2',
      name: 'Silicon Valley Portal',
      location: 'San Francisco, CA',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      status: 'online',
      capacity: 800,
      distance: 2900
    },
    {
      id: 'hub3',
      name: 'Tokyo Teleport Station',
      location: 'Tokyo, Japan',
      coordinates: { lat: 35.6762, lng: 139.6503 },
      status: 'online',
      capacity: 1200,
      distance: 6740
    },
    {
      id: 'hub4',
      name: 'London Quantum Gate',
      location: 'London, UK',
      coordinates: { lat: 51.5074, lng: -0.1278 },
      status: 'maintenance',
      capacity: 900,
      distance: 3470
    },
    {
      id: 'hub5',
      name: 'Sydney Portal Complex',
      location: 'Sydney, Australia',
      coordinates: { lat: -33.8688, lng: 151.2093 },
      status: 'online',
      capacity: 600,
      distance: 9950
    },
    {
      id: 'hub6',
      name: 'Dubai Quantum Center',
      location: 'Dubai, UAE',
      coordinates: { lat: 25.2048, lng: 55.2708 },
      status: 'offline',
      capacity: 700,
      distance: 6840
    }
  ];

  useEffect(() => {
    setTeleportationHubs(hubs);
    setSelectedHub(hubs[0]);

    // Simulate quantum stability fluctuations
    const interval = setInterval(() => {
      setQuantumStability(prev => 
        Math.max(85, Math.min(99.9, prev + (Math.random() - 0.5) * 2))
      );
      
      setNetworkStatus(prev => {
        const statuses = ['operational', 'high_traffic', 'quantum_interference'];
        return Math.random() > 0.9 ? statuses[Math.floor(Math.random() * statuses.length)] : prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Process active orders
    const interval = setInterval(() => {
      setActiveOrders(prev => prev.map(order => {
        if (order.status === 'teleporting' && order.progress < 100) {
          const newProgress = Math.min(100, order.progress + 5);
          
          if (newProgress >= 100) {
            // Determine success based on molecular integrity
            const success = order.molecularIntegrity > 95;
            return {
              ...order,
              progress: 100,
              status: success ? 'delivered' : 'failed'
            };
          }
          
          return { 
            ...order, 
            progress: newProgress,
            molecularIntegrity: Math.max(90, order.molecularIntegrity - Math.random() * 2)
          };
        }
        return order;
      }));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const initiateTeleportation = (hub: TeleportationHub) => {
    if (hub.status !== 'online') return;

    const newOrder: TeleportationOrder = {
      id: `tp_${Date.now()}`,
      destination: hub,
      items: ['Quantum Laptop', 'Holographic Display', 'Neural Interface Headset'],
      status: 'teleporting',
      progress: 0,
      energyRequired: Math.floor(hub.distance * 0.5) + 1000,
      molecularIntegrity: 99.8
    };

    setActiveOrders(prev => [...prev, newOrder]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-500/20';
      case 'offline': return 'text-red-400 bg-red-500/20';
      case 'maintenance': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'text-blue-400 bg-blue-500/20';
      case 'materializing': return 'text-purple-400 bg-purple-500/20';
      case 'teleporting': return 'text-cyan-400 bg-cyan-500/20';
      case 'delivered': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getNetworkStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-400';
      case 'high_traffic': return 'text-yellow-400';
      case 'quantum_interference': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Zap className="w-8 h-8 text-cyan-400" />
            <motion.div
              className="absolute inset-0"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Teleportation Delivery Network</h3>
            <p className="text-cyan-200">Instant quantum matter transportation</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-cyan-200">Quantum Stability</div>
          <div className={`text-2xl font-bold ${quantumStability > 95 ? 'text-green-400' : quantumStability > 90 ? 'text-yellow-400' : 'text-red-400'}`}>
            {quantumStability.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Network Status Alert */}
      {networkStatus !== 'operational' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">NETWORK STATUS</span>
          </div>
          <p className="text-yellow-200 text-sm mt-1">
            {networkStatus === 'high_traffic' ? 'High traffic detected. Teleportation delays possible.' :
             'Quantum interference detected. Molecular integrity may be affected.'}
          </p>
        </motion.div>
      )}

      {/* Teleportation Hubs */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Global Teleportation Network</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teleportationHubs.map((hub) => (
            <motion.div
              key={hub.id}
              whileHover={{ scale: 1.02 }}
              className={`bg-white/10 rounded-xl p-4 backdrop-blur-sm cursor-pointer transition-all ${
                selectedHub?.id === hub.id ? 'ring-2 ring-cyan-400' : ''
              }`}
              onClick={() => setSelectedHub(hub)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold">{hub.name}</h5>
                  <p className="text-sm text-cyan-200">{hub.location}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(hub.status)}`}>
                  {hub.status.toUpperCase()}
                </span>
              </div>
              
              <div className="flex justify-between text-sm mb-3">
                <span className="text-cyan-200">Distance: {hub.distance.toLocaleString()} km</span>
                <span className="text-cyan-200">Capacity: {hub.capacity}</span>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  initiateTeleportation(hub);
                }}
                disabled={hub.status !== 'online'}
                className="w-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 py-2 rounded-lg hover:bg-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {hub.status === 'online' ? 'Initiate Teleportation' : 'Hub Unavailable'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Teleportations */}
      {activeOrders.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
          <h4 className="text-lg font-semibold mb-4">Active Teleportations</h4>
          <div className="space-y-4">
            {activeOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-semibold">To: {order.destination.name}</h5>
                    <p className="text-sm text-cyan-200">
                      Items: {order.items.join(', ')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusColor(order.status)}`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
                
                {order.status === 'teleporting' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-cyan-200">Teleportation Progress</span>
                      <span className="text-cyan-400">{order.progress.toFixed(1)}%</span>
                    </div>
                    <div className="bg-cyan-400/20 rounded-full h-2 mb-2">
                      <motion.div
                        className="bg-cyan-400 h-2 rounded-full"
                        animate={{ width: `${order.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-cyan-200">
                        Molecular Integrity: {order.molecularIntegrity.toFixed(1)}%
                      </span>
                      <span className="text-cyan-200">
                        Energy: {order.energyRequired.toLocaleString()} QJ
                      </span>
                    </div>
                  </div>
                )}
                
                {order.status === 'delivered' && (
                  <div className="text-green-400 text-sm">
                    ✓ Successfully teleported with {order.molecularIntegrity.toFixed(1)}% integrity
                  </div>
                )}
                
                {order.status === 'failed' && (
                  <div className="text-red-400 text-sm">
                    ✗ Teleportation failed - molecular integrity compromised
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Network Statistics */}
      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
        <h4 className="text-lg font-semibold mb-4">Network Statistics</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <MapPin className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-sm text-cyan-200">Active Hubs</div>
            <div className="text-xl font-bold text-cyan-400">
              {teleportationHubs.filter(h => h.status === 'online').length}
            </div>
          </div>
          <div className="text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-sm text-cyan-200">Success Rate</div>
            <div className="text-xl font-bold text-green-400">98.7%</div>
          </div>
          <div className="text-center">
            <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-sm text-cyan-200">Avg. Time</div>
            <div className="text-xl font-bold text-purple-400">0.003s</div>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-sm text-cyan-200">Network Status</div>
            <div className={`text-lg font-bold ${getNetworkStatusColor(networkStatus)}`}>
              {networkStatus.replace('_', ' ').toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeleportationDelivery;
