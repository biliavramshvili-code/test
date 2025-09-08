import React, { useState, useEffect } from 'react';
import { Layers, Infinity, Zap, Eye, Brain, Atom } from 'lucide-react';
import { motion } from 'framer-motion';

interface Dimension {
  id: string;
  name: string;
  coordinates: number[];
  accessibility: 'stable' | 'unstable' | 'impossible' | 'paradoxical';
  products: HyperProduct[];
  laws: string[];
}

interface HyperProduct {
  id: string;
  name: string;
  price: number | 'undefined' | 'infinite' | 'imaginary';
  dimensions: number;
  existence: 'real' | 'imaginary' | 'impossible' | 'conceptual';
  properties: string[];
}

const HyperDimensionalShopping: React.FC = () => {
  const [currentDimension, setCurrentDimension] = useState(3);
  const [activeDimensions, setActiveDimensions] = useState<Dimension[]>([]);
  const [navigationMode, setNavigationMode] = useState<'linear' | 'quantum' | 'impossible'>('linear');
  const [dimensionalStability, setDimensionalStability] = useState(85);

  const dimensions: Dimension[] = [
    {
      id: 'dim_3d',
      name: 'Standard 3D Reality',
      coordinates: [1, 1, 1],
      accessibility: 'stable',
      products: [
        {
          id: 'prod_3d_1',
          name: 'Regular iPhone',
          price: 999,
          dimensions: 3,
          existence: 'real',
          properties: ['tangible', 'finite', 'observable']
        }
      ],
      laws: ['Conservation of Energy', 'Causality', 'Thermodynamics']
    },
    {
      id: 'dim_4d',
      name: '4D Tesseract Space',
      coordinates: [1, 1, 1, 1],
      accessibility: 'stable',
      products: [
        {
          id: 'prod_4d_1',
          name: 'Hypercube MacBook',
          price: 2499,
          dimensions: 4,
          existence: 'real',
          properties: ['4D-accessible', 'tesseract-folding', 'temporal-storage']
        }
      ],
      laws: ['4D Geometry', 'Hyperspatial Physics', 'Tesseract Dynamics']
    },
    {
      id: 'dim_11d',
      name: '11D String Theory Space',
      coordinates: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      accessibility: 'unstable',
      products: [
        {
          id: 'prod_11d_1',
          name: 'String Theory iPad',
          price: 'infinite',
          dimensions: 11,
          existence: 'real',
          properties: ['vibrating-strings', 'compactified-dimensions', 'quantum-gravity']
        }
      ],
      laws: ['String Dynamics', 'Compactification', 'Supersymmetry']
    },
    {
      id: 'dim_infinite',
      name: 'Infinite-Dimensional Hilbert Space',
      coordinates: Array(1000).fill(1),
      accessibility: 'impossible',
      products: [
        {
          id: 'prod_inf_1',
          name: 'Infinite-Dimensional Apple Watch',
          price: 'undefined',
          dimensions: Infinity,
          existence: 'conceptual',
          properties: ['infinite-features', 'hilbert-space-navigation', 'basis-vector-display']
        }
      ],
      laws: ['Infinite-Dimensional Analysis', 'Functional Analysis', 'Operator Theory']
    },
    {
      id: 'dim_imaginary',
      name: 'Complex Imaginary Dimension',
      coordinates: [1, 'i', '2i', '3i'],
      accessibility: 'paradoxical',
      products: [
        {
          id: 'prod_img_1',
          name: 'Imaginary Number AirPods',
          price: 'imaginary',
          dimensions: 4,
          existence: 'imaginary',
          properties: ['complex-audio', 'imaginary-bass', 'sqrt(-1)-enhancement']
        }
      ],
      laws: ['Complex Analysis', 'Imaginary Physics', 'Non-Real Mathematics']
    },
    {
      id: 'dim_negative',
      name: 'Negative Dimensional Space',
      coordinates: [-1, -2, -3],
      accessibility: 'impossible',
      products: [
        {
          id: 'prod_neg_1',
          name: 'Negative-Dimensional Mac Studio',
          price: -4999,
          dimensions: -3,
          existence: 'impossible',
          properties: ['negative-volume', 'anti-matter-processing', 'inverse-reality']
        }
      ],
      laws: ['Negative Geometry', 'Anti-Physics', 'Inverse Mathematics']
    },
    {
      id: 'dim_fractal',
      name: 'Fractal Dimension 2.5',
      coordinates: [2.5, 2.5, 2.5],
      accessibility: 'unstable',
      products: [
        {
          id: 'prod_frac_1',
          name: 'Fractal iPhone Pro',
          price: 1299.5,
          dimensions: 2.5,
          existence: 'real',
          properties: ['self-similar', 'infinite-zoom', 'mandelbrot-display']
        }
      ],
      laws: ['Fractal Geometry', 'Non-Integer Dimensions', 'Self-Similarity']
    }
  ];

  useEffect(() => {
    setActiveDimensions(dimensions.slice(0, Math.min(currentDimension + 1, dimensions.length)));
    
    // Simulate dimensional instability
    const interval = setInterval(() => {
      if (currentDimension > 4) {
        setDimensionalStability(prev => Math.max(20, prev - Math.random() * 10));
      } else {
        setDimensionalStability(prev => Math.min(100, prev + Math.random() * 5));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentDimension]);

  const navigateToDimension = (dimensionIndex: number) => {
    setCurrentDimension(dimensionIndex);
  };

  const getAccessibilityColor = (accessibility: string) => {
    switch (accessibility) {
      case 'stable': return 'text-green-400 bg-green-500/20';
      case 'unstable': return 'text-yellow-400 bg-yellow-500/20';
      case 'impossible': return 'text-red-400 bg-red-500/20';
      case 'paradoxical': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getExistenceColor = (existence: string) => {
    switch (existence) {
      case 'real': return 'text-blue-400';
      case 'imaginary': return 'text-purple-400';
      case 'impossible': return 'text-red-400';
      case 'conceptual': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
      {/* Dimensional Background Effects */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, #8b5cf6 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%)',
            'radial-gradient(circle at 40% 40%, #6366f1 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, #8b5cf6 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Layers className="w-8 h-8 text-purple-400" />
              <motion.div
                className="absolute inset-0"
                animate={{ 
                  rotateX: [0, 360],
                  rotateY: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Infinity className="w-8 h-8 text-blue-400" />
              </motion.div>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Hyper-Dimensional Shopping</h3>
              <p className="text-purple-200">Navigate infinite dimensional spaces</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-purple-200">Current Dimension</div>
            <div className="text-2xl font-bold text-purple-400">{currentDimension}D</div>
          </div>
        </div>

        {/* Dimensional Stability Monitor */}
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-semibold">Dimensional Stability</h4>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${dimensionalStability > 70 ? 'bg-green-400' : dimensionalStability > 40 ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
              <span className="text-sm">{dimensionalStability.toFixed(1)}%</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <motion.div
              className={`h-2 rounded-full ${dimensionalStability > 70 ? 'bg-green-400' : dimensionalStability > 40 ? 'bg-yellow-400' : 'bg-red-400'}`}
              style={{ width: `${dimensionalStability}%` }}
              animate={{ width: `${dimensionalStability}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {dimensionalStability < 50 && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm font-semibold">
                  WARNING: Dimensional instability detected. Reality may collapse.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Mode Selector */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4">Navigation Mode</h4>
          <div className="flex space-x-4">
            {['linear', 'quantum', 'impossible'].map((mode) => (
              <button
                key={mode}
                onClick={() => setNavigationMode(mode as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  navigationMode === mode
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-purple-200 hover:bg-white/20'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Dimensional Navigator */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4">Dimensional Navigator</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dimensions.map((dimension, index) => (
              <motion.button
                key={dimension.id}
                onClick={() => navigateToDimension(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-lg border transition-all ${
                  currentDimension === index
                    ? 'bg-purple-500/30 border-purple-400'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-300">
                    {dimension.name.includes('Infinite') ? '∞' : 
                     dimension.name.includes('Negative') ? '-' :
                     dimension.name.includes('Imaginary') ? 'i' :
                     dimension.name.includes('Fractal') ? '2.5' :
                     `${index + 3}`}D
                  </div>
                  <div className="text-xs text-purple-200 mt-1">
                    {dimension.name.split(' ')[0]}
                  </div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-2 ${getAccessibilityColor(dimension.accessibility)}`}>
                    {dimension.accessibility}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Current Dimension Details */}
        {activeDimensions[currentDimension] && (
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold text-purple-300">
                  {activeDimensions[currentDimension].name}
                </h4>
                <p className="text-purple-200 text-sm">
                  Coordinates: [{activeDimensions[currentDimension].coordinates.slice(0, 5).join(', ')}
                  {activeDimensions[currentDimension].coordinates.length > 5 ? '...' : ''}]
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getAccessibilityColor(activeDimensions[currentDimension].accessibility)}`}>
                {activeDimensions[currentDimension].accessibility}
              </span>
            </div>

            {/* Dimensional Laws */}
            <div className="mb-4">
              <h5 className="font-semibold text-purple-300 mb-2">Physical Laws</h5>
              <div className="flex flex-wrap gap-2">
                {activeDimensions[currentDimension].laws.map((law, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                    {law}
                  </span>
                ))}
              </div>
            </div>

            {/* Products in Current Dimension */}
            <div>
              <h5 className="font-semibold text-purple-300 mb-3">Available Products</h5>
              <div className="space-y-3">
                {activeDimensions[currentDimension].products.map((product) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-lg p-4 border border-purple-500/30"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h6 className="font-semibold text-white">{product.name}</h6>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-purple-200">
                            Price: {typeof product.price === 'number' ? `$${product.price}` : product.price}
                          </span>
                          <span className="text-sm text-purple-200">•</span>
                          <span className="text-sm text-purple-200">
                            {product.dimensions === Infinity ? '∞' : product.dimensions}D
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getExistenceColor(product.existence)} bg-current/20`}>
                        {product.existence}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {product.properties.map((property, index) => (
                        <span key={index} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">
                          {property}
                        </span>
                      ))}
                    </div>
                    
                    <button className="w-full mt-3 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors">
                      Add to {product.dimensions}D Cart
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dimensional Shopping Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Layers className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Accessible Dimensions</div>
            <div className="text-xl font-bold text-purple-400">{activeDimensions.length}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Infinity className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Max Dimensions</div>
            <div className="text-xl font-bold text-blue-400">∞</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Eye className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Reality Coherence</div>
            <div className="text-xl font-bold text-cyan-400">{dimensionalStability > 50 ? 'Stable' : 'Unstable'}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Atom className="w-6 h-6 text-pink-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Quantum State</div>
            <div className="text-xl font-bold text-pink-400">Superposition</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HyperDimensionalShopping;
