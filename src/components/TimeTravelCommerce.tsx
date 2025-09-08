import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Zap, History, FastForward, Rewind } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimeEra {
  id: string;
  name: string;
  year: number;
  description: string;
  products: number;
  currency: string;
  status: 'accessible' | 'locked' | 'unstable';
}

interface TimelineProduct {
  id: string;
  name: string;
  era: string;
  originalPrice: number;
  timeAdjustedPrice: number;
  availability: 'past' | 'present' | 'future';
  temporalRisk: number;
}

const TimeTravelCommerce: React.FC = () => {
  const [currentEra, setCurrentEra] = useState<TimeEra | null>(null);
  const [timelineProducts, setTimelineProducts] = useState<TimelineProduct[]>([]);
  const [isTimeJumping, setIsTimeJumping] = useState(false);
  const [temporalStability, setTemporalStability] = useState(98.7);

  const timeEras: TimeEra[] = [
    {
      id: 'prehistoric',
      name: 'Prehistoric Era',
      year: -10000,
      description: 'Stone age tools and primitive technology',
      products: 45,
      currency: 'Shells',
      status: 'accessible'
    },
    {
      id: 'ancient',
      name: 'Ancient Civilizations',
      year: -3000,
      description: 'Egyptian, Greek, and Roman artifacts',
      products: 1250,
      currency: 'Gold Coins',
      status: 'accessible'
    },
    {
      id: 'medieval',
      name: 'Medieval Times',
      year: 1200,
      description: 'Knights, castles, and medieval crafts',
      products: 890,
      currency: 'Silver Pieces',
      status: 'accessible'
    },
    {
      id: 'industrial',
      name: 'Industrial Revolution',
      year: 1850,
      description: 'Steam engines and mechanical innovations',
      products: 2100,
      currency: 'Pounds Sterling',
      status: 'accessible'
    },
    {
      id: 'present',
      name: 'Present Day',
      year: 2024,
      description: 'Modern technology and current products',
      products: 50000,
      currency: 'USD',
      status: 'accessible'
    },
    {
      id: 'near_future',
      name: 'Near Future',
      year: 2050,
      description: 'Advanced AI and quantum technologies',
      products: 75000,
      currency: 'Quantum Credits',
      status: 'accessible'
    },
    {
      id: 'far_future',
      name: 'Far Future',
      year: 2500,
      description: 'Interstellar civilization products',
      products: 125000,
      currency: 'Galactic Units',
      status: 'unstable'
    },
    {
      id: 'post_singularity',
      name: 'Post-Singularity',
      year: 3000,
      description: 'Beyond human comprehension',
      products: 999999,
      currency: 'Consciousness Tokens',
      status: 'locked'
    }
  ];

  useEffect(() => {
    // Initialize with present day
    setCurrentEra(timeEras.find(era => era.id === 'present') || timeEras[4]);
    
    // Simulate temporal stability fluctuations
    const interval = setInterval(() => {
      setTemporalStability(prev => 
        Math.max(85, Math.min(99.9, prev + (Math.random() - 0.5) * 2))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const jumpToEra = async (era: TimeEra) => {
    if (era.status === 'locked') return;
    
    setIsTimeJumping(true);
    
    // Simulate time travel process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setCurrentEra(era);
    
    // Generate era-specific products
    const products: TimelineProduct[] = [
      {
        id: 'tp1',
        name: era.year < 0 ? 'Stone Axe' : era.year < 1000 ? 'Bronze Sword' : era.year < 1800 ? 'Medieval Armor' : era.year < 2000 ? 'Steam Engine' : era.year < 2100 ? 'Quantum Computer' : era.year < 3000 ? 'Antimatter Drive' : 'Reality Manipulator',
        era: era.name,
        originalPrice: Math.floor(Math.random() * 1000) + 100,
        timeAdjustedPrice: Math.floor(Math.random() * 2000) + 200,
        availability: era.year < 2024 ? 'past' : era.year === 2024 ? 'present' : 'future',
        temporalRisk: era.status === 'unstable' ? Math.random() * 0.5 + 0.3 : Math.random() * 0.2
      },
      {
        id: 'tp2',
        name: era.year < 0 ? 'Fire Starter' : era.year < 1000 ? 'Papyrus Scroll' : era.year < 1800 ? 'Illuminated Manuscript' : era.year < 2000 ? 'Telegraph' : era.year < 2100 ? 'Neural Interface' : era.year < 3000 ? 'Consciousness Backup' : 'Universe Seed',
        era: era.name,
        originalPrice: Math.floor(Math.random() * 1500) + 300,
        timeAdjustedPrice: Math.floor(Math.random() * 3000) + 500,
        availability: era.year < 2024 ? 'past' : era.year === 2024 ? 'present' : 'future',
        temporalRisk: era.status === 'unstable' ? Math.random() * 0.5 + 0.3 : Math.random() * 0.2
      }
    ];
    
    setTimelineProducts(products);
    setIsTimeJumping(false);
  };

  const getEraStatusColor = (status: string) => {
    switch (status) {
      case 'accessible': return 'text-green-400 bg-green-500/20';
      case 'unstable': return 'text-yellow-400 bg-yellow-500/20';
      case 'locked': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'past': return 'text-blue-400';
      case 'present': return 'text-green-400';
      case 'future': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Clock className="w-8 h-8 text-cyan-400" />
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: isTimeJumping ? 360 : 0 }}
              transition={{ duration: isTimeJumping ? 1 : 0, repeat: isTimeJumping ? Infinity : 0, ease: "linear" }}
            >
              <Zap className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Time Travel Commerce</h3>
            <p className="text-cyan-200">Shop across all of history and future</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-cyan-200">Temporal Stability</div>
          <div className={`font-bold ${temporalStability > 95 ? 'text-green-400' : temporalStability > 90 ? 'text-yellow-400' : 'text-red-400'}`}>
            {temporalStability.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Current Era Display */}
      {currentEra && (
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold">{currentEra.name}</h4>
              <p className="text-cyan-200">Year: {currentEra.year > 0 ? currentEra.year : `${Math.abs(currentEra.year)} BCE`}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-cyan-200">Products Available</div>
              <div className="text-2xl font-bold text-purple-400">{currentEra.products.toLocaleString()}</div>
            </div>
          </div>
          <p className="text-purple-200 mb-4">{currentEra.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-cyan-200">Currency: {currentEra.currency}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEraStatusColor(currentEra.status)}`}>
              {currentEra.status.toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Time Era Selection */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Select Time Period</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {timeEras.map((era) => (
            <motion.button
              key={era.id}
              whileHover={{ scale: era.status !== 'locked' ? 1.05 : 1 }}
              onClick={() => era.status !== 'locked' && jumpToEra(era)}
              disabled={era.status === 'locked' || isTimeJumping}
              className={`p-3 rounded-lg text-left transition-all ${
                currentEra?.id === era.id 
                  ? 'bg-purple-500/30 border-2 border-purple-400' 
                  : era.status === 'locked'
                  ? 'bg-gray-500/20 border border-gray-500/30 cursor-not-allowed opacity-50'
                  : 'bg-white/5 border border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="text-sm font-semibold">{era.name}</div>
              <div className="text-xs text-purple-200">
                {era.year > 0 ? era.year : `${Math.abs(era.year)} BCE`}
              </div>
              <div className="text-xs text-cyan-200 mt-1">
                {era.products.toLocaleString()} items
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time Jump Status */}
      {isTimeJumping && (
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-6 h-6 text-yellow-400" />
            </motion.div>
            <span className="text-yellow-400 font-semibold">Initiating Temporal Jump...</span>
          </div>
          <div className="mt-4 bg-yellow-400/20 rounded-full h-2">
            <motion.div
              className="bg-yellow-400 h-2 rounded-full"
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
        </div>
      )}

      {/* Timeline Products */}
      {timelineProducts.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h4 className="text-lg font-semibold mb-4">Available Products</h4>
          <div className="space-y-4">
            {timelineProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="font-semibold">{product.name}</h5>
                    <p className="text-sm text-purple-200">From: {product.era}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${getAvailabilityColor(product.availability)}`}>
                      {product.availability.toUpperCase()}
                    </div>
                    <div className="text-xs text-purple-200">
                      Risk: {(product.temporalRisk * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm">
                    <span className="text-purple-200">Original: </span>
                    <span className="line-through text-gray-400">{currentEra?.currency} {product.originalPrice}</span>
                    <span className="ml-2 text-green-400 font-semibold">
                      {currentEra?.currency} {product.timeAdjustedPrice}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all">
                    Add to Timeline Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Temporal Controls */}
      <div className="mt-6 flex space-x-3">
        <button
          onClick={() => {
            const currentIndex = timeEras.findIndex(era => era.id === currentEra?.id);
            if (currentIndex > 0) jumpToEra(timeEras[currentIndex - 1]);
          }}
          disabled={isTimeJumping}
          className="flex-1 flex items-center justify-center space-x-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 py-3 rounded-xl hover:bg-blue-500/30 transition-all disabled:opacity-50"
        >
          <Rewind className="w-5 h-5" />
          <span>Previous Era</span>
        </button>
        <button
          onClick={() => jumpToEra(timeEras.find(era => era.id === 'present') || timeEras[4])}
          disabled={isTimeJumping}
          className="flex-1 flex items-center justify-center space-x-2 bg-green-500/20 border border-green-500/30 text-green-300 py-3 rounded-xl hover:bg-green-500/30 transition-all disabled:opacity-50"
        >
          <History className="w-5 h-5" />
          <span>Return to Present</span>
        </button>
        <button
          onClick={() => {
            const currentIndex = timeEras.findIndex(era => era.id === currentEra?.id);
            if (currentIndex < timeEras.length - 1 && timeEras[currentIndex + 1].status !== 'locked') {
              jumpToEra(timeEras[currentIndex + 1]);
            }
          }}
          disabled={isTimeJumping}
          className="flex-1 flex items-center justify-center space-x-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 py-3 rounded-xl hover:bg-purple-500/30 transition-all disabled:opacity-50"
        >
          <FastForward className="w-5 h-5" />
          <span>Next Era</span>
        </button>
      </div>
    </div>
  );
};

export default TimeTravelCommerce;
