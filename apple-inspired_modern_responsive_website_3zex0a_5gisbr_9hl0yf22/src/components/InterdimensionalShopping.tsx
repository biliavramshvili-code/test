import React, { useState, useEffect } from 'react';
import { Layers, Zap, Globe, Infinity, Sparkles, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface Dimension {
  id: string;
  name: string;
  description: string;
  stability: number;
  products: number;
  currency: string;
  physics: string;
  accessibility: 'open' | 'restricted' | 'dangerous' | 'unknown';
}

interface DimensionalProduct {
  id: string;
  name: string;
  dimension: string;
  properties: string[];
  paradoxRisk: number;
  price: number;
  rarity: 'common' | 'rare' | 'legendary' | 'impossible';
}

const InterdimensionalShopping: React.FC = () => {
  const [currentDimension, setCurrentDimension] = useState<Dimension | null>(null);
  const [dimensionalProducts, setDimensionalProducts] = useState<DimensionalProduct[]>([]);
  const [isShifting, setIsShifting] = useState(false);
  const [portalStability, setPortalStability] = useState(94.2);
  const [paradoxWarning, setParadoxWarning] = useState(false);

  const dimensions: Dimension[] = [
    {
      id: 'prime',
      name: 'Prime Reality',
      description: 'Our original dimension with standard physics',
      stability: 100,
      products: 50000,
      currency: 'Reality Credits',
      physics: 'Standard',
      accessibility: 'open'
    },
    {
      id: 'mirror',
      name: 'Mirror Dimension',
      description: 'Everything is reversed and opposite',
      stability: 87.5,
      products: 45000,
      currency: 'Reverse Tokens',
      physics: 'Inverted',
      accessibility: 'open'
    },
    {
      id: 'quantum',
      name: 'Quantum Realm',
      description: 'Subatomic dimension where probability rules',
      stability: 72.3,
      products: 25000,
      currency: 'Probability Coins',
      physics: 'Quantum',
      accessibility: 'restricted'
    },
    {
      id: 'dream',
      name: 'Dream Dimension',
      description: 'Realm of collective unconscious and imagination',
      stability: 65.8,
      products: 75000,
      currency: 'Dream Essence',
      physics: 'Surreal',
      accessibility: 'restricted'
    },
    {
      id: 'void',
      name: 'The Void',
      description: 'Empty space between realities',
      stability: 45.2,
      products: 5000,
      currency: 'Void Fragments',
      physics: 'None',
      accessibility: 'dangerous'
    },
    {
      id: 'chaos',
      name: 'Chaos Dimension',
      description: 'Where all possibilities exist simultaneously',
      stability: 23.7,
      products: 999999,
      currency: 'Chaos Shards',
      physics: 'Chaotic',
      accessibility: 'dangerous'
    },
    {
      id: 'impossible',
      name: 'Impossible Realm',
      description: 'Dimension that should not exist',
      stability: 12.1,
      products: 1,
      currency: 'Impossibility',
      physics: 'Paradoxical',
      accessibility: 'unknown'
    }
  ];

  useEffect(() => {
    // Initialize with prime reality
    setCurrentDimension(dimensions[0]);
    
    // Simulate portal stability fluctuations
    const interval = setInterval(() => {
      setPortalStability(prev => 
        Math.max(60, Math.min(99, prev + (Math.random() - 0.5) * 5))
      );
      
      // Check for paradox warnings
      if (currentDimension && currentDimension.stability < 50) {
        setParadoxWarning(Math.random() > 0.7);
      } else {
        setParadoxWarning(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentDimension]);

  const shiftToDimension = async (dimension: Dimension) => {
    if (dimension.accessibility === 'unknown') return;
    
    setIsShifting(true);
    
    // Simulate dimensional shift
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setCurrentDimension(dimension);
    
    // Generate dimension-specific products
    const products: DimensionalProduct[] = [
      {
        id: 'dp1',
        name: dimension.id === 'mirror' ? 'Reverse iPhone' : 
              dimension.id === 'quantum' ? 'Probability Phone' :
              dimension.id === 'dream' ? 'Imagination Device' :
              dimension.id === 'void' ? 'Nothingness Container' :
              dimension.id === 'chaos' ? 'Everything Machine' :
              dimension.id === 'impossible' ? 'Paradox Generator' : 'Standard iPhone',
        dimension: dimension.name,
        properties: dimension.id === 'mirror' ? ['Backwards Interface', 'Reverse Time'] :
                    dimension.id === 'quantum' ? ['Superposition Display', 'Quantum Entanglement'] :
                    dimension.id === 'dream' ? ['Thought Control', 'Reality Bending'] :
                    dimension.id === 'void' ? ['Absolute Silence', 'Void Storage'] :
                    dimension.id === 'chaos' ? ['Infinite Possibilities', 'Reality Chaos'] :
                    dimension.id === 'impossible' ? ['Should Not Exist', 'Breaks Logic'] : ['Standard Features'],
        paradoxRisk: dimension.stability < 50 ? Math.random() * 0.8 + 0.2 : Math.random() * 0.3,
        price: Math.floor(Math.random() * 5000) + 1000,
        rarity: dimension.stability > 80 ? 'common' : dimension.stability > 50 ? 'rare' : dimension.stability > 30 ? 'legendary' : 'impossible'
      },
      {
        id: 'dp2',
        name: dimension.id === 'mirror' ? 'Backwards Laptop' : 
              dimension.id === 'quantum' ? 'Schrödinger Computer' :
              dimension.id === 'dream' ? 'Lucid Workstation' :
              dimension.id === 'void' ? 'Empty Machine' :
              dimension.id === 'chaos' ? 'Chaos Computer' :
              dimension.id === 'impossible' ? 'Non-Existent Laptop' : 'Standard Laptop',
        dimension: dimension.name,
        properties: dimension.id === 'mirror' ? ['Mirror OS', 'Reverse Processing'] :
                    dimension.id === 'quantum' ? ['Quantum Computing', 'Parallel Processing'] :
                    dimension.id === 'dream' ? ['Dream Interface', 'Subconscious Access'] :
                    dimension.id === 'void' ? ['Void Processing', 'Null Operations'] :
                    dimension.id === 'chaos' ? ['Random Execution', 'Chaotic Logic'] :
                    dimension.id === 'impossible' ? ['Paradox Computing', 'Logic Violation'] : ['Standard Computing'],
        paradoxRisk: dimension.stability < 50 ? Math.random() * 0.8 + 0.2 : Math.random() * 0.3,
        price: Math.floor(Math.random() * 8000) + 2000,
        rarity: dimension.stability > 80 ? 'common' : dimension.stability > 50 ? 'rare' : dimension.stability > 30 ? 'legendary' : 'impossible'
      }
    ];
    
    setDimensionalProducts(products);
    setIsShifting(false);
  };

  const getAccessibilityColor = (accessibility: string) => {
    switch (accessibility) {
      case 'open': return 'text-green-400 bg-green-500/20';
      case 'restricted': return 'text-yellow-400 bg-yellow-500/20';
      case 'dangerous': return 'text-red-400 bg-red-500/20';
      case 'unknown': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400';
      case 'rare': return 'text-blue-400';
      case 'legendary': return 'text-purple-400';
      case 'impossible': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-cyan-900 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Layers className="w-8 h-8 text-purple-400" />
            <motion.div
              className="absolute inset-0"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Infinity className="w-8 h-8 text-cyan-400" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Interdimensional Shopping</h3>
            <p className="text-purple-200">Access parallel universe marketplaces</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-purple-200">Portal Stability</div>
          <div className={`font-bold ${portalStability > 90 ? 'text-green-400' : portalStability > 70 ? 'text-yellow-400' : 'text-red-400'}`}>
            {portalStability.toFixed(1)}%
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
            <Eye className="w-5 h-5 text-red-400" />
            <span className="text-red-400 font-semibold">PARADOX WARNING</span>
          </div>
          <p className="text-red-200 text-sm mt-1">
            Reality distortion detected. Dimensional shopping may cause temporal paradoxes.
          </p>
        </motion.div>
      )}

      {/* Current Dimension Display */}
      {currentDimension && (
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-xl font-bold">{currentDimension.name}</h4>
              <p className="text-purple-200">Physics: {currentDimension.physics}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-200">Stability</div>
              <div className={`text-2xl font-bold ${
                currentDimension.stability > 80 ? 'text-green-400' :
                currentDimension.stability > 50 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {currentDimension.stability.toFixed(1)}%
              </div>
            </div>
          </div>
          <p className="text-cyan-200 mb-4">{currentDimension.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-200">
              {currentDimension.products.toLocaleString()} products • Currency: {currentDimension.currency}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getAccessibilityColor(currentDimension.accessibility)}`}>
              {currentDimension.accessibility.toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Dimension Selection */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Available Dimensions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dimensions.map((dimension) => (
            <motion.button
              key={dimension.id}
              whileHover={{ scale: dimension.accessibility !== 'unknown' ? 1.05 : 1 }}
              onClick={() => dimension.accessibility !== 'unknown' && shiftToDimension(dimension)}
              disabled={dimension.accessibility === 'unknown' || isShifting}
              className={`p-4 rounded-lg text-left transition-all ${
                currentDimension?.id === dimension.id 
                  ? 'bg-purple-500/30 border-2 border-purple-400' 
                  : dimension.accessibility === 'unknown'
                  ? 'bg-gray-500/20 border border-gray-500/30 cursor-not-allowed opacity-50'
                  : 'bg-white/5 border border-white/20 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold">{dimension.name}</h5>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getAccessibilityColor(dimension.accessibility)}`}>
                  {dimension.accessibility}
                </span>
              </div>
              <p className="text-sm text-purple-200 mb-2">{dimension.description}</p>
              <div className="flex justify-between text-xs">
                <span className="text-cyan-200">Physics: {dimension.physics}</span>
                <span className="text-cyan-200">Stability: {dimension.stability}%</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Dimensional Shift Status */}
      {isShifting && (
        <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Layers className="w-6 h-6 text-cyan-400" />
            </motion.div>
            <span className="text-cyan-400 font-semibold">Shifting Between Dimensions...</span>
          </div>
          <div className="bg-cyan-400/20 rounded-full h-2">
            <motion.div
              className="bg-cyan-400 h-2 rounded-full"
              animate={{ width: ["0%", "100%"] }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />
          </div>
        </div>
      )}

      {/* Dimensional Products */}
      {dimensionalProducts.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h4 className="text-lg font-semibold mb-4">Dimensional Products</h4>
          <div className="space-y-4">
            {dimensionalProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-semibold">{product.name}</h5>
                    <p className="text-sm text-purple-200">From: {product.dimension}</p>
                    <div className={`text-xs font-semibold mt-1 ${getRarityColor(product.rarity)}`}>
                      {product.rarity.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-cyan-400">
                      {currentDimension?.currency} {product.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-purple-200">
                      Paradox Risk: {(product.paradoxRisk * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm text-purple-200 mb-1">Dimensional Properties:</div>
                  <div className="flex flex-wrap gap-2">
                    {product.properties.map((property, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300">
                        {property}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-purple-500/20 border border-purple-500/30 text-purple-300 py-2 rounded-lg hover:bg-purple-500/30 transition-all">
                  Add to Dimensional Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Portal Controls */}
      <div className="mt-6 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
        <h4 className="text-lg font-semibold mb-4">Portal Control Center</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <Globe className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Active Portals</div>
            <div className="text-xl font-bold text-cyan-400">7</div>
          </div>
          <div className="text-center">
            <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Reality Anchors</div>
            <div className="text-xl font-bold text-purple-400">12</div>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Energy Level</div>
            <div className="text-xl font-bold text-yellow-400">89%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterdimensionalShopping;
