import React, { useState, useEffect } from 'react';
import { Eye, Zap, Globe, Layers, Sparkles, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface RealityLayer {
  id: string;
  name: string;
  stability: number;
  malleable: boolean;
  laws: string[];
  inhabitants: number;
}

interface RealityManipulation {
  id: string;
  type: 'physics' | 'matter' | 'time' | 'space' | 'consciousness' | 'existence';
  description: string;
  energyCost: number;
  paradoxRisk: number;
  status: 'pending' | 'active' | 'completed' | 'failed';
  progress: number;
}

const RealityManipulationEngine: React.FC = () => {
  const [realityLayers, setRealityLayers] = useState<RealityLayer[]>([]);
  const [activeManipulations, setActiveManipulations] = useState<RealityManipulation[]>([]);
  const [realityStability, setRealityStability] = useState(89.4);
  const [existenceLevel, setExistenceLevel] = useState(7);
  const [godModeActive, setGodModeActive] = useState(false);

  const layers: RealityLayer[] = [
    {
      id: 'physical',
      name: 'Physical Reality',
      stability: 95.2,
      malleable: true,
      laws: ['Gravity', 'Electromagnetism', 'Strong Nuclear', 'Weak Nuclear'],
      inhabitants: 7800000000
    },
    {
      id: 'quantum',
      name: 'Quantum Substrate',
      stability: 78.6,
      malleable: true,
      laws: ['Superposition', 'Entanglement', 'Uncertainty', 'Wave-Particle Duality'],
      inhabitants: 0
    },
    {
      id: 'consciousness',
      name: 'Consciousness Field',
      stability: 67.3,
      malleable: true,
      laws: ['Thought Manifestation', 'Collective Unconscious', 'Dream Logic'],
      inhabitants: 7800000000
    },
    {
      id: 'information',
      name: 'Information Matrix',
      stability: 92.8,
      malleable: false,
      laws: ['Data Conservation', 'Information Entropy', 'Computational Limits'],
      inhabitants: 0
    },
    {
      id: 'metaphysical',
      name: 'Metaphysical Plane',
      stability: 45.7,
      malleable: true,
      laws: ['Conceptual Existence', 'Abstract Mathematics', 'Pure Logic'],
      inhabitants: 999999999
    }
  ];

  const manipulations: RealityManipulation[] = [
    {
      id: 'rm1',
      type: 'physics',
      description: 'Temporarily disable gravity in shopping areas',
      energyCost: 50000,
      paradoxRisk: 0.15,
      status: 'pending',
      progress: 0
    },
    {
      id: 'rm2',
      type: 'matter',
      description: 'Transform air molecules into luxury products',
      energyCost: 150000,
      paradoxRisk: 0.35,
      status: 'pending',
      progress: 0
    },
    {
      id: 'rm3',
      type: 'time',
      description: 'Create temporal shopping bubbles with extended time',
      energyCost: 300000,
      paradoxRisk: 0.65,
      status: 'pending',
      progress: 0
    },
    {
      id: 'rm4',
      type: 'space',
      description: 'Fold space to bring distant stores to customers',
      energyCost: 200000,
      paradoxRisk: 0.45,
      status: 'pending',
      progress: 0
    },
    {
      id: 'rm5',
      type: 'consciousness',
      description: 'Merge customer desires with product reality',
      energyCost: 500000,
      paradoxRisk: 0.85,
      status: 'pending',
      progress: 0
    },
    {
      id: 'rm6',
      type: 'existence',
      description: 'Create new fundamental particles for unique products',
      energyCost: 1000000,
      paradoxRisk: 0.95,
      status: 'pending',
      progress: 0
    }
  ];

  useEffect(() => {
    setRealityLayers(layers);

    // Simulate reality fluctuations
    const interval = setInterval(() => {
      setRealityStability(prev => 
        Math.max(60, Math.min(99, prev + (Math.random() - 0.5) * 5))
      );

      setExistenceLevel(prev => 
        Math.max(1, Math.min(10, prev + Math.floor((Math.random() - 0.5) * 3)))
      );

      // Update layer stability
      setRealityLayers(prev => prev.map(layer => ({
        ...layer,
        stability: Math.max(30, Math.min(100, layer.stability + (Math.random() - 0.5) * 8))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Process active manipulations
    const interval = setInterval(() => {
      setActiveManipulations(prev => prev.map(manipulation => {
        if (manipulation.status === 'active' && manipulation.progress < 100) {
          const newProgress = Math.min(100, manipulation.progress + 2);
          
          if (newProgress >= 100) {
            const success = Math.random() > manipulation.paradoxRisk;
            return {
              ...manipulation,
              progress: 100,
              status: success ? 'completed' : 'failed'
            };
          }
          
          return { ...manipulation, progress: newProgress };
        }
        return manipulation;
      }));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const initiateManipulation = (manipulation: RealityManipulation) => {
    if (realityStability < 70 && manipulation.paradoxRisk > 0.5) return;

    const newManipulation = {
      ...manipulation,
      status: 'active' as const,
      progress: 0
    };

    setActiveManipulations(prev => [...prev, newManipulation]);
    setRealityStability(prev => prev - manipulation.paradoxRisk * 10);
  };

  const toggleGodMode = () => {
    setGodModeActive(!godModeActive);
    if (!godModeActive) {
      setRealityStability(100);
      setExistenceLevel(10);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'physics': return 'text-blue-400 bg-blue-500/20';
      case 'matter': return 'text-green-400 bg-green-500/20';
      case 'time': return 'text-purple-400 bg-purple-500/20';
      case 'space': return 'text-cyan-400 bg-cyan-500/20';
      case 'consciousness': return 'text-pink-400 bg-pink-500/20';
      case 'existence': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-gray-400 bg-gray-500/20';
      case 'active': return 'text-blue-400 bg-blue-500/20';
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Eye className="w-8 h-8 text-purple-400" />
            <motion.div
              className="absolute inset-0"
              animate={{ 
                scale: [1, 1.5, 1],
                rotate: [0, 180, 360],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Reality Manipulation Engine</h3>
            <p className="text-purple-200">Reshape existence for ultimate shopping</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-purple-200">Reality Stability</div>
          <div className={`text-2xl font-bold ${realityStability > 85 ? 'text-green-400' : realityStability > 70 ? 'text-yellow-400' : 'text-red-400'}`}>
            {realityStability.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* God Mode Toggle */}
      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold">Omnipotence Mode</h4>
            <p className="text-sm text-purple-200">Override all reality constraints</p>
          </div>
          <button
            onClick={toggleGodMode}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              godModeActive 
                ? 'bg-yellow-500/30 border-2 border-yellow-400 text-yellow-300' 
                : 'bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30'
            }`}
          >
            {godModeActive ? 'GOD MODE ACTIVE' : 'Activate God Mode'}
          </button>
        </div>
        {godModeActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30"
          >
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">WARNING</span>
            </div>
            <p className="text-yellow-200 text-sm">
              Omnipotence mode grants unlimited reality manipulation powers. Use responsibly to avoid universal collapse.
            </p>
          </motion.div>
        )}
      </div>

      {/* Reality Layers */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Reality Layer Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {realityLayers.map((layer) => (
            <motion.div
              key={layer.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold">{layer.name}</h5>
                  <p className="text-xs text-purple-200">
                    {layer.inhabitants.toLocaleString()} entities
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-purple-200">Stability</div>
                  <div className={`text-lg font-bold ${
                    layer.stability > 80 ? 'text-green-400' :
                    layer.stability > 60 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {layer.stability.toFixed(1)}%
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-xs text-purple-200 mb-1">Fundamental Laws:</div>
                <div className="space-y-1">
                  {layer.laws.map((law, index) => (
                    <div key={index} className="text-xs text-cyan-200">
                      • {law}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  layer.malleable ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
                }`}>
                  {layer.malleable ? 'Malleable' : 'Fixed'}
                </span>
                <span className="text-xs text-purple-200">
                  Level {existenceLevel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Available Manipulations */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Reality Manipulation Options</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {manipulations.map((manipulation) => (
            <motion.div
              key={manipulation.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(manipulation.type)}`}>
                    {manipulation.type.toUpperCase()}
                  </span>
                  <h5 className="font-semibold mt-2">{manipulation.description}</h5>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-purple-200">Energy Cost:</span>
                  <div className="text-cyan-400 font-semibold">
                    {manipulation.energyCost.toLocaleString()} EU
                  </div>
                </div>
                <div>
                  <span className="text-purple-200">Paradox Risk:</span>
                  <div className={`font-semibold ${
                    manipulation.paradoxRisk < 0.3 ? 'text-green-400' :
                    manipulation.paradoxRisk < 0.7 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {(manipulation.paradoxRisk * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => initiateManipulation(manipulation)}
                disabled={!godModeActive && (realityStability < 70 && manipulation.paradoxRisk > 0.5)}
                className="w-full bg-purple-500/20 border border-purple-500/30 text-purple-300 py-2 rounded-lg hover:bg-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {godModeActive ? 'Execute Reality Change' : 
                 (!godModeActive && realityStability < 70 && manipulation.paradoxRisk > 0.5) ? 'Too Dangerous' : 
                 'Initiate Manipulation'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Manipulations */}
      {activeManipulations.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
          <h4 className="text-lg font-semibold mb-4">Active Reality Manipulations</h4>
          <div className="space-y-4">
            {activeManipulations.map((manipulation) => (
              <motion.div
                key={manipulation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(manipulation.type)}`}>
                      {manipulation.type.toUpperCase()}
                    </span>
                    <h5 className="font-semibold mt-2">{manipulation.description}</h5>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(manipulation.status)}`}>
                    {manipulation.status.toUpperCase()}
                  </span>
                </div>
                
                {manipulation.status === 'active' && (
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-purple-200">Reality Alteration Progress</span>
                      <span className="text-cyan-400">{manipulation.progress.toFixed(1)}%</span>
                    </div>
                    <div className="bg-purple-400/20 rounded-full h-2">
                      <motion.div
                        className="bg-purple-400 h-2 rounded-full"
                        animate={{ width: `${manipulation.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
                
                {manipulation.status === 'completed' && (
                  <div className="text-green-400 text-sm">
                    ✓ Reality successfully altered - new physical laws in effect
                  </div>
                )}
                
                {manipulation.status === 'failed' && (
                  <div className="text-red-400 text-sm">
                    ✗ Reality manipulation failed - paradox detected and contained
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Existence Statistics */}
      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
        <h4 className="text-lg font-semibold mb-4">Existence Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Globe className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Universes Created</div>
            <div className="text-xl font-bold text-blue-400">∞</div>
          </div>
          <div className="text-center">
            <Layers className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Dimensions Accessed</div>
            <div className="text-xl font-bold text-green-400">11</div>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Reality Alterations</div>
            <div className="text-xl font-bold text-yellow-400">
              {activeManipulations.filter(m => m.status === 'completed').length}
            </div>
          </div>
          <div className="text-center">
            <Eye className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-sm text-purple-200">Omnipotence Level</div>
            <div className="text-xl font-bold text-purple-400">
              {godModeActive ? 'MAXIMUM' : existenceLevel}/10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealityManipulationEngine;
