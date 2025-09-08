import React, { useState, useEffect } from 'react';
import { Atom, Zap, Eye, Brain, Infinity, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuantumProduct {
  id: string;
  name: string;
  states: ProductState[];
  currentState: 'superposition' | 'collapsed';
  observationCount: number;
  entangledWith: string[];
  waveFunction: string;
}

interface ProductState {
  id: string;
  name: string;
  price: number;
  probability: number;
  properties: string[];
  color: string;
}

interface QuantumObservation {
  id: string;
  productId: string;
  observerName: string;
  collapsedState: string;
  timestamp: number;
  probability: number;
}

const QuantumSuperpositionMarket: React.FC = () => {
  const [quantumProducts, setQuantumProducts] = useState<QuantumProduct[]>([]);
  const [observations, setObservations] = useState<QuantumObservation[]>([]);
  const [coherenceLevel, setCoherenceLevel] = useState(95);
  const [entanglementActive, setEntanglementActive] = useState(true);
  const [observerEffect, setObserverEffect] = useState(true);

  const initialProducts: QuantumProduct[] = [
    {
      id: 'quantum_iphone',
      name: 'Quantum iPhone Pro',
      states: [
        {
          id: 'state_1',
          name: 'iPhone 15 Pro',
          price: 999,
          probability: 0.4,
          properties: ['titanium', '48MP camera', 'A17 Pro'],
          color: 'blue'
        },
        {
          id: 'state_2',
          name: 'iPhone 16 Pro',
          price: 1199,
          probability: 0.35,
          properties: ['titanium', '64MP camera', 'A18 Pro'],
          color: 'purple'
        },
        {
          id: 'state_3',
          name: 'iPhone 17 Pro',
          price: 1399,
          probability: 0.25,
          properties: ['graphene', '128MP camera', 'A19 Quantum'],
          color: 'gold'
        }
      ],
      currentState: 'superposition',
      observationCount: 0,
      entangledWith: ['quantum_macbook'],
      waveFunction: 'ψ = 0.4|iPhone15⟩ + 0.35|iPhone16⟩ + 0.25|iPhone17⟩'
    },
    {
      id: 'quantum_macbook',
      name: 'Quantum MacBook Pro',
      states: [
        {
          id: 'state_1',
          name: 'MacBook Pro M3',
          price: 1999,
          probability: 0.5,
          properties: ['M3 chip', '16GB RAM', '512GB SSD'],
          color: 'silver'
        },
        {
          id: 'state_2',
          name: 'MacBook Pro M4',
          price: 2499,
          probability: 0.3,
          properties: ['M4 chip', '32GB RAM', '1TB SSD'],
          color: 'space-gray'
        },
        {
          id: 'state_3',
          name: 'MacBook Pro Quantum',
          price: 3999,
          probability: 0.2,
          properties: ['Quantum processor', '64GB RAM', '2TB SSD'],
          color: 'quantum-blue'
        }
      ],
      currentState: 'superposition',
      observationCount: 0,
      entangledWith: ['quantum_iphone'],
      waveFunction: 'ψ = 0.5|M3⟩ + 0.3|M4⟩ + 0.2|Quantum⟩'
    },
    {
      id: 'quantum_watch',
      name: 'Quantum Apple Watch',
      states: [
        {
          id: 'state_1',
          name: 'Apple Watch Series 9',
          price: 399,
          probability: 0.6,
          properties: ['S9 chip', 'Always-On display', 'Health sensors'],
          color: 'red'
        },
        {
          id: 'state_2',
          name: 'Apple Watch Ultra 2',
          price: 799,
          probability: 0.25,
          properties: ['S9 chip', 'Titanium', 'Action button'],
          color: 'orange'
        },
        {
          id: 'state_3',
          name: 'Apple Watch Quantum',
          price: 1299,
          probability: 0.15,
          properties: ['Quantum chip', 'Holographic display', 'Time manipulation'],
          color: 'quantum-green'
        }
      ],
      currentState: 'superposition',
      observationCount: 0,
      entangledWith: [],
      waveFunction: 'ψ = 0.6|Series9⟩ + 0.25|Ultra2⟩ + 0.15|Quantum⟩'
    }
  ];

  useEffect(() => {
    setQuantumProducts(initialProducts);

    // Simulate quantum decoherence
    const interval = setInterval(() => {
      if (observerEffect) {
        setCoherenceLevel(prev => Math.max(60, prev - Math.random() * 2));
      } else {
        setCoherenceLevel(prev => Math.min(100, prev + Math.random() * 1));
      }

      // Random quantum fluctuations
      if (Math.random() < 0.1) {
        setQuantumProducts(prev => prev.map(product => ({
          ...product,
          states: product.states.map(state => ({
            ...state,
            probability: Math.max(0.05, state.probability + (Math.random() - 0.5) * 0.1)
          }))
        })));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [observerEffect]);

  const observeProduct = (productId: string) => {
    setQuantumProducts(prev => prev.map(product => {
      if (product.id === productId && product.currentState === 'superposition') {
        // Collapse wave function based on probabilities
        const random = Math.random();
        let cumulativeProbability = 0;
        let collapsedState = product.states[0];

        for (const state of product.states) {
          cumulativeProbability += state.probability;
          if (random <= cumulativeProbability) {
            collapsedState = state;
            break;
          }
        }

        // Create observation record
        const observation: QuantumObservation = {
          id: `obs_${Date.now()}`,
          productId: productId,
          observerName: 'Customer',
          collapsedState: collapsedState.name,
          timestamp: Date.now(),
          probability: collapsedState.probability
        };

        setObservations(prev => [observation, ...prev.slice(0, 9)]);

        // Handle quantum entanglement
        if (entanglementActive && product.entangledWith.length > 0) {
          product.entangledWith.forEach(entangledId => {
            // Entangled products collapse to correlated states
            setQuantumProducts(prevProducts => prevProducts.map(entangledProduct => {
              if (entangledProduct.id === entangledId) {
                return {
                  ...entangledProduct,
                  currentState: 'collapsed' as const,
                  observationCount: entangledProduct.observationCount + 1
                };
              }
              return entangledProduct;
            }));
          });
        }

        return {
          ...product,
          currentState: 'collapsed' as const,
          observationCount: product.observationCount + 1
        };
      }
      return product;
    }));
  };

  const resetQuantumState = (productId: string) => {
    setQuantumProducts(prev => prev.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          currentState: 'superposition' as const
        };
      }
      return product;
    }));
  };

  const getStateColor = (color: string) => {
    const colorMap: Record<string, string> = {
      'blue': 'bg-blue-500',
      'purple': 'bg-purple-500',
      'gold': 'bg-yellow-500',
      'silver': 'bg-gray-400',
      'space-gray': 'bg-gray-600',
      'quantum-blue': 'bg-cyan-500',
      'red': 'bg-red-500',
      'orange': 'bg-orange-500',
      'quantum-green': 'bg-green-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-8 text-white relative overflow-hidden">
      {/* Quantum Background Effects */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 25% 25%, #6366f1 0%, transparent 50%)',
            'radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, #ec4899 0%, transparent 50%)',
            'radial-gradient(circle at 25% 25%, #6366f1 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Atom className="w-8 h-8 text-indigo-400" />
              <motion.div
                className="absolute inset-0"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.3, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="w-8 h-8 border-2 border-purple-400 rounded-full opacity-50"></div>
              </motion.div>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Quantum Superposition Market</h3>
              <p className="text-indigo-200">Products exist in multiple states until observed</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-indigo-200">Quantum Coherence</div>
            <div className="text-2xl font-bold text-indigo-400">{coherenceLevel.toFixed(1)}%</div>
          </div>
        </div>

        {/* Quantum Controls */}
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
          <h4 className="text-lg font-semibold mb-4">Quantum Controls</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-indigo-200">Observer Effect</span>
              <button
                onClick={() => setObserverEffect(!observerEffect)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  observerEffect ? 'bg-indigo-500' : 'bg-gray-600'
                } relative`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  observerEffect ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-indigo-200">Quantum Entanglement</span>
              <button
                onClick={() => setEntanglementActive(!entanglementActive)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  entanglementActive ? 'bg-purple-500' : 'bg-gray-600'
                } relative`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  entanglementActive ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>

            <div className="text-center">
              <div className="text-sm text-indigo-200">Coherence Level</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                <motion.div
                  className={`h-2 rounded-full ${coherenceLevel > 80 ? 'bg-green-400' : coherenceLevel > 60 ? 'bg-yellow-400' : 'bg-red-400'}`}
                  style={{ width: `${coherenceLevel}%` }}
                  animate={{ width: `${coherenceLevel}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {coherenceLevel < 70 && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mt-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm font-semibold">
                  WARNING: Quantum decoherence detected. Wave functions may collapse spontaneously.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Quantum Products */}
        <div className="space-y-6 mb-6">
          {quantumProducts.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white/10 rounded-xl p-6 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold text-indigo-300">{product.name}</h4>
                  <p className="text-indigo-200 text-sm mt-1">
                    Current State: <span className={`font-semibold ${
                      product.currentState === 'superposition' ? 'text-purple-400' : 'text-green-400'
                    }`}>
                      {product.currentState === 'superposition' ? 'Quantum Superposition' : 'Wave Function Collapsed'}
                    </span>
                  </p>
                  <p className="text-indigo-200 text-xs mt-1">
                    Observations: {product.observationCount}
                  </p>
                </div>
                <div className="text-right">
                  {product.entangledWith.length > 0 && (
                    <div className="flex items-center space-x-1 mb-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-semibold">Entangled</span>
                    </div>
                  )}
                  <button
                    onClick={() => product.currentState === 'superposition' ? observeProduct(product.id) : resetQuantumState(product.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      product.currentState === 'superposition'
                        ? 'bg-purple-500 hover:bg-purple-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {product.currentState === 'superposition' ? 'Observe Product' : 'Reset Quantum State'}
                  </button>
                </div>
              </div>

              {/* Wave Function */}
              <div className="mb-4">
                <h5 className="font-semibold text-indigo-300 mb-2">Wave Function</h5>
                <div className="bg-black/30 rounded-lg p-3 font-mono text-sm text-cyan-300">
                  {product.waveFunction}
                </div>
              </div>

              {/* Quantum States */}
              <div className="space-y-3">
                <h5 className="font-semibold text-indigo-300">Possible States</h5>
                {product.states.map((state) => (
                  <motion.div
                    key={state.id}
                    className={`p-4 rounded-lg border transition-all ${
                      product.currentState === 'superposition'
                        ? 'bg-white/5 border-white/20 opacity-70'
                        : 'bg-white/10 border-indigo-400'
                    }`}
                    animate={{
                      opacity: product.currentState === 'superposition' ? [0.7, 1, 0.7] : 1,
                      scale: product.currentState === 'superposition' ? [1, 1.02, 1] : 1
                    }}
                    transition={{ duration: 2, repeat: product.currentState === 'superposition' ? Infinity : 0 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${getStateColor(state.color)}`}></div>
                        <div>
                          <h6 className="font-semibold text-white">{state.name}</h6>
                          <p className="text-sm text-indigo-200">${state.price}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-indigo-200">Probability</div>
                        <div className="text-lg font-bold text-purple-400">
                          {(state.probability * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {state.properties.map((property, index) => (
                        <span key={index} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">
                          {property}
                        </span>
                      ))}
                    </div>

                    {/* Probability Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                      <motion.div
                        className="h-2 bg-purple-400 rounded-full"
                        style={{ width: `${state.probability * 100}%` }}
                        animate={{ width: `${state.probability * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Observations */}
        {observations.length > 0 && (
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h4 className="text-lg font-semibold mb-4">Recent Quantum Observations</h4>
            <div className="space-y-3">
              {observations.map((observation) => (
                <motion.div
                  key={observation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/5 rounded-lg p-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-semibold text-white">Wave Function Collapsed</h5>
                      <p className="text-sm text-indigo-200">
                        Product: {quantumProducts.find(p => p.id === observation.productId)?.name}
                      </p>
                      <p className="text-sm text-indigo-200">
                        Collapsed to: <span className="text-green-400 font-semibold">{observation.collapsedState}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-indigo-200">Probability</div>
                      <div className="text-lg font-bold text-purple-400">
                        {(observation.probability * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-indigo-200 mt-2">
                    {new Date(observation.timestamp).toLocaleTimeString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantumSuperpositionMarket;
