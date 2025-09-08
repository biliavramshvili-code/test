import React, { useState, useEffect } from 'react';
import { Globe, Infinity, Zap, Eye, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface UniverseVariant {
  id: string;
  name: string;
  divergencePoint: string;
  stability: number;
  accessibility: 'stable' | 'fluctuating' | 'dangerous' | 'collapsed';
  products: number;
  currency: string;
  physicsLaws: string[];
}

interface MultiverseProduct {
  id: string;
  name: string;
  universe: string;
  variants: { universe: string; price: number; availability: number }[];
  paradoxRisk: number;
  description: string;
}

const ParallelUniverseMarketplace: React.FC = () => {
  const [universeVariants, setUniverseVariants] = useState<UniverseVariant[]>([]);
  const [selectedUniverse, setSelectedUniverse] = useState<UniverseVariant | null>(null);
  const [multiverseProducts, setMultiverseProducts] = useState<MultiverseProduct[]>([]);
  const [dimensionalStability, setDimensionalStability] = useState(87.3);
  const [paradoxWarning, setParadoxWarning] = useState(false);

  const universes: UniverseVariant[] = [
    {
      id: 'prime',
      name: 'Prime Universe (Ours)',
      divergencePoint: 'N/A - Origin Point',
      stability: 100,
      accessibility: 'stable',
      products: 50000,
      currency: 'Standard Credits',
      physicsLaws: ['Conservation of Energy', 'Relativity', 'Quantum Mechanics']
    },
    {
      id: 'tech_advanced',
      name: 'Tech-Advanced Earth',
      divergencePoint: '1969 - Moon Base Established',
      stability: 94.2,
      accessibility: 'stable',
      products: 125000,
      currency: 'Quantum Credits',
      physicsLaws: ['Enhanced Physics', 'Quantum Computing', 'Fusion Energy']
    },
    {
      id: 'magic_reality',
      name: 'Magic-Infused Reality',
      divergencePoint: '1692 - Salem Witches Were Real',
      stability: 78.5,
      accessibility: 'fluctuating',
      products: 75000,
      currency: 'Mana Crystals',
      physicsLaws: ['Thaumic Energy', 'Spell Dynamics', 'Magical Conservation']
    },
    {
      id: 'steampunk',
      name: 'Victorian Steam Age',
      divergencePoint: '1876 - Steam Never Replaced',
      stability: 85.7,
      accessibility: 'stable',
      products: 35000,
      currency: 'Steam Pounds',
      physicsLaws: ['Steam Dynamics', 'Mechanical Physics', 'Gear Ratios']
    },
    {
      id: 'post_apocalyptic',
      name: 'Post-Nuclear Earth',
      divergencePoint: '1962 - Cuban Missile Crisis Escalated',
      stability: 45.3,
      accessibility: 'dangerous',
      products: 15000,
      currency: 'Bottle Caps',
      physicsLaws: ['Radiation Physics', 'Mutation Dynamics', 'Survival Laws']
    },
    {
      id: 'ai_dominated',
      name: 'AI-Dominated Timeline',
      divergencePoint: '2029 - Singularity Achieved',
      stability: 67.8,
      accessibility: 'fluctuating',
      products: 200000,
      currency: 'Processing Cycles',
      physicsLaws: ['Digital Physics', 'AI Consciousness', 'Virtual Reality']
    },
    {
      id: 'backwards_time',
      name: 'Reverse-Time Universe',
      divergencePoint: 'Big Bang - Time Flows Backward',
      stability: 23.1,
      accessibility: 'dangerous',
      products: 999999,
      currency: 'Temporal Fragments',
      physicsLaws: ['Reverse Causality', 'Entropy Decrease', 'Memory Precognition']
    }
  ];

  const products: MultiverseProduct[] = [
    {
      id: 'mp1',
      name: 'Smartphone',
      universe: 'Multiple',
      variants: [
        { universe: 'Prime Universe', price: 800, availability: 95 },
        { universe: 'Tech-Advanced Earth', price: 200, availability: 100 },
        { universe: 'Magic-Infused Reality', price: 1500, availability: 60 },
        { universe: 'Victorian Steam Age', price: 0, availability: 0 },
        { universe: 'AI-Dominated Timeline', price: 50, availability: 100 }
      ],
      paradoxRisk: 0.15,
      description: 'Communication device with varying technological implementations'
    },
    {
      id: 'mp2',
      name: 'Flying Car',
      universe: 'Multiple',
      variants: [
        { universe: 'Prime Universe', price: 0, availability: 0 },
        { universe: 'Tech-Advanced Earth', price: 45000, availability: 85 },
        { universe: 'Magic-Infused Reality', price: 25000, availability: 70 },
        { universe: 'Victorian Steam Age', price: 75000, availability: 30 },
        { universe: 'AI-Dominated Timeline', price: 15000, availability: 95 }
      ],
      paradoxRisk: 0.35,
      description: 'Personal aerial transportation vehicle'
    },
    {
      id: 'mp3',
      name: 'Healing Potion',
      universe: 'Magic-Infused Reality',
      variants: [
        { universe: 'Magic-Infused Reality', price: 500, availability: 90 },
        { universe: 'Post-Nuclear Earth', price: 2000, availability: 20 }
      ],
      paradoxRisk: 0.65,
      description: 'Magical remedy that instantly heals injuries'
    },
    {
      id: 'mp4',
      name: 'Time Machine',
      universe: 'Multiple',
      variants: [
        { universe: 'Tech-Advanced Earth', price: 500000, availability: 5 },
        { universe: 'Reverse-Time Universe', price: 100, availability: 95 }
      ],
      paradoxRisk: 0.95,
      description: 'Device capable of temporal displacement'
    }
  ];

  useEffect(() => {
    setUniverseVariants(universes);
    setSelectedUniverse(universes[0]);
    setMultiverseProducts(products);

    // Simulate dimensional stability fluctuations
    const interval = setInterval(() => {
      setDimensionalStability(prev => 
        Math.max(60, Math.min(95, prev + (Math.random() - 0.5) * 4))
      );
      
      // Trigger paradox warnings
      setParadoxWarning(Math.random() > 0.85);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const switchUniverse = (universe: UniverseVariant) => {
    if (universe.accessibility === 'collapsed') return;
    setSelectedUniverse(universe);
  };

  const getAccessibilityColor = (accessibility: string) => {
    switch (accessibility) {
      case 'stable': return 'text-green-400 bg-green-500/20';
      case 'fluctuating': return 'text-yellow-400 bg-yellow-500/20';
      case 'dangerous': return 'text-red-400 bg-red-500/20';
      case 'collapsed': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const purchaseFromUniverse = (product: MultiverseProduct, universeVariant: any) => {
    if (universeVariant.availability === 0) return;
    
    // Simulate purchase with paradox risk
    const paradoxOccurred = Math.random() < product.paradoxRisk;
    
    if (paradoxOccurred) {
      setParadoxWarning(true);
      setTimeout(() => setParadoxWarning(false), 5000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Globe className="w-8 h-8 text-purple-400" />
            <motion.div
              className="absolute inset-0"
              animate={{ 
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Infinity className="w-8 h-8 text-cyan-400" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Parallel Universe Marketplace</h3>
            <p className="text-purple-200">Shop across infinite reality variants</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-purple-200">Dimensional Stability</div>
          <div className={`text-2xl font-bold ${dimensionalStability > 80 ? 'text-green-400' : dimensionalStability > 60 ? 'text-yellow-400' : 'text-red-400'}`}>
            {dimensionalStability.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Paradox Warning */}
      {paradoxWarning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-semibold">PARADOX DETECTED</span>
          </div>
          <p className="text-red-200 text-sm mt-1">
            Cross-dimensional purchase has created a temporal paradox. Reality stabilizers engaged.
          </p>
        </motion.div>
      )}

      {/* Current Universe Display */}
      {selectedUniverse && (
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold">{selectedUniverse.name}</h4>
              <p className="text-purple-200">Divergence: {selectedUniverse.divergencePoint}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-200">Universe Stability</div>
              <div className={`text-2xl font-bold ${
                selectedUniverse.stability > 90 ? 'text-green-400' :
                selectedUniverse.stability > 70 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {selectedUniverse.stability.toFixed(1)}%
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm text-purple-200">Products Available</div>
              <div className="text-lg font-bold text-cyan-400">
                {selectedUniverse.products.toLocaleString()}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-sm text-purple-200">Currency</div>
              <div className="text-lg font-bold text-purple-400">
                {selectedUniverse.currency}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="text-sm text-purple-200 mb-2">Physics Laws:</div>
            <div className="flex flex-wrap gap-2">
              {selectedUniverse.physicsLaws.map((law, index) => (
                <span key={index} className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                  {law}
                </span>
              ))}
            </div>
          </div>
          
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAccessibilityColor(selectedUniverse.accessibility)}`}>
            {selectedUniverse.accessibility.toUpperCase()}
          </span>
        </div>
      )}

      {/* Universe Selection */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Available Universe Variants</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {universeVariants.map((universe) => (
            <motion.button
              key={universe.id}
              whileHover={{ scale: universe.accessibility !== 'collapsed' ? 1.05 : 1 }}
              onClick={() => switchUniverse(universe)}
              disabled={universe.accessibility === 'collapsed'}
              className={`p-4 rounded-lg text-left transition-all ${
                selectedUniverse?.id === universe.id 
                  ? 'bg-purple-500/30 border-2 border-purple-400' 
                  : universe.accessibility === 'collapsed'
                  ? 'bg-gray-500/20 border border-gray-500/30 cursor-not-allowed opacity-50'
                  : 'bg-white/5 border border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-semibold text-sm">{universe.name}</h5>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getAccessibilityColor(universe.accessibility)}`}>
                  {universe.accessibility}
                </span>
              </div>
              <p className="text-xs text-purple-200 mb-2">{universe.divergencePoint}</p>
              <div className="flex justify-between text-xs">
                <span className="text-cyan-200">Stability: {universe.stability}%</span>
                <span className="text-cyan-200">{universe.products.toLocaleString()} items</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Multiverse Products */}
      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
        <h4 className="text-lg font-semibold mb-4">Cross-Dimensional Products</h4>
        <div className="space-y-6">
          {multiverseProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold">{product.name}</h5>
                  <p className="text-sm text-purple-200">{product.description}</p>
                  <div className="text-xs text-red-300 mt-1">
                    Paradox Risk: {(product.paradoxRisk * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-sm text-purple-200 mb-2">Available in:</div>
                {product.variants.map((variant, index) => (
                  <div key={index} className="flex justify-between items-center bg-white/5 rounded p-2">
                    <div>
                      <span className="text-sm font-medium">{variant.universe}</span>
                      <div className="text-xs text-purple-200">
                        Availability: {variant.availability}%
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-400 font-semibold">
                        {variant.price > 0 ? `${variant.price.toLocaleString()}` : 'N/A'}
                      </span>
                      <button
                        onClick={() => purchaseFromUniverse(product, variant)}
                        disabled={variant.availability === 0}
                        className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded text-xs hover:bg-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {variant.availability === 0 ? 'Unavailable' : 'Purchase'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Multiverse Statistics */}
      <div className="mt-6 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
        <h4 className="text-lg font-semibold mb-4">Multiverse Network Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Globe className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Accessible Universes</div>
            <div className="text-xl font-bold text-green-400">
              {universeVariants.filter(u => u.accessibility === 'stable').length}
            </div>
          </div>
          <div className="text-center">
            <Eye className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Under Observation</div>
            <div className="text-xl font-bold text-yellow-400">
              {universeVariants.filter(u => u.accessibility === 'fluctuating').length}
            </div>
          </div>
          <div className="text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Dangerous Zones</div>
            <div className="text-xl font-bold text-red-400">
              {universeVariants.filter(u => u.accessibility === 'dangerous').length}
            </div>
          </div>
          <div className="text-center">
            <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Paradoxes Resolved</div>
            <div className="text-xl font-bold text-purple-400">1,247</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallelUniverseMarketplace;
