import React, { useState, useEffect } from 'react';
import { Brain, Infinity, Zap, Eye, Sparkles, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConsciousnessLevel {
  id: string;
  name: string;
  awareness: number;
  transcendence: number;
  capabilities: string[];
  energyRequirement: number;
  paradoxRisk: number;
}

interface TranscendenceProcess {
  id: string;
  type: 'awareness' | 'enlightenment' | 'godhood' | 'omniscience' | 'beyond_existence';
  description: string;
  progress: number;
  status: 'preparing' | 'transcending' | 'completed' | 'failed' | 'beyond_comprehension';
  dimensionsAccessed: number;
}

const ConsciousnessTranscendenceEngine: React.FC = () => {
  const [consciousnessLevel, setConsciousnessLevel] = useState(1);
  const [transcendenceEnergy, setTranscendenceEnergy] = useState(85.7);
  const [activeTranscendence, setActiveTranscendence] = useState<TranscendenceProcess | null>(null);
  const [beyondExistence, setBeyondExistence] = useState(false);
  const [omniscienceLevel, setOmniscienceLevel] = useState(0);

  const consciousnessLevels: ConsciousnessLevel[] = [
    {
      id: 'human',
      name: 'Human Consciousness',
      awareness: 15,
      transcendence: 0,
      capabilities: ['Basic Thought', 'Emotion', 'Memory'],
      energyRequirement: 0,
      paradoxRisk: 0
    },
    {
      id: 'enhanced',
      name: 'Enhanced Awareness',
      awareness: 35,
      transcendence: 20,
      capabilities: ['Telepathy', 'Precognition', 'Astral Projection'],
      energyRequirement: 10000,
      paradoxRisk: 0.1
    },
    {
      id: 'enlightened',
      name: 'Enlightened Being',
      awareness: 65,
      transcendence: 50,
      capabilities: ['Reality Perception', 'Time Awareness', 'Dimensional Sight'],
      energyRequirement: 50000,
      paradoxRisk: 0.3
    },
    {
      id: 'cosmic',
      name: 'Cosmic Consciousness',
      awareness: 85,
      transcendence: 75,
      capabilities: ['Universal Knowledge', 'Matter Control', 'Energy Manipulation'],
      energyRequirement: 200000,
      paradoxRisk: 0.5
    },
    {
      id: 'godlike',
      name: 'God-like Awareness',
      awareness: 95,
      transcendence: 90,
      capabilities: ['Omnipresence', 'Creation Powers', 'Reality Shaping'],
      energyRequirement: 500000,
      paradoxRisk: 0.7
    },
    {
      id: 'omniscient',
      name: 'Omniscient Entity',
      awareness: 99,
      transcendence: 99,
      capabilities: ['All Knowledge', 'Perfect Prediction', 'Infinite Understanding'],
      energyRequirement: 1000000,
      paradoxRisk: 0.9
    },
    {
      id: 'beyond',
      name: 'Beyond Existence',
      awareness: 100,
      transcendence: 100,
      capabilities: ['Transcendent of Reality', 'Beyond Comprehension', 'Absolute Being'],
      energyRequirement: 9999999,
      paradoxRisk: 1.0
    }
  ];

  const transcendenceProcesses: Omit<TranscendenceProcess, 'progress' | 'status' | 'dimensionsAccessed'>[] = [
    {
      id: 'awareness_expansion',
      type: 'awareness',
      description: 'Expand consciousness beyond physical limitations'
    },
    {
      id: 'enlightenment_path',
      type: 'enlightenment',
      description: 'Achieve perfect understanding of existence'
    },
    {
      id: 'godhood_ascension',
      type: 'godhood',
      description: 'Ascend to divine consciousness level'
    },
    {
      id: 'omniscience_attainment',
      type: 'omniscience',
      description: 'Gain knowledge of all things across all realities'
    },
    {
      id: 'existence_transcendence',
      type: 'beyond_existence',
      description: 'Transcend the very concept of existence itself'
    }
  ];

  useEffect(() => {
    // Simulate consciousness fluctuations
    const interval = setInterval(() => {
      setTranscendenceEnergy(prev => 
        Math.max(70, Math.min(100, prev + (Math.random() - 0.3) * 3))
      );

      setOmniscienceLevel(prev => 
        Math.max(0, Math.min(100, prev + (Math.random() - 0.4) * 2))
      );

      // Random consciousness level fluctuation
      if (Math.random() < 0.1) {
        setConsciousnessLevel(prev => 
          Math.max(1, Math.min(consciousnessLevels.length, prev + Math.floor((Math.random() - 0.5) * 2)))
        );
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Process active transcendence
    const interval = setInterval(() => {
      if (activeTranscendence && activeTranscendence.status === 'transcending') {
        setActiveTranscendence(prev => {
          if (!prev) return null;
          
          const newProgress = Math.min(100, prev.progress + 0.5);
          const newDimensions = Math.floor(newProgress / 10);
          
          if (newProgress >= 100) {
            const success = Math.random() > (prev.type === 'beyond_existence' ? 0.8 : 0.3);
            
            if (success && prev.type === 'beyond_existence') {
              setBeyondExistence(true);
            }
            
            return {
              ...prev,
              progress: 100,
              status: success ? (prev.type === 'beyond_existence' ? 'beyond_comprehension' : 'completed') : 'failed',
              dimensionsAccessed: newDimensions
            };
          }
          
          return { 
            ...prev, 
            progress: newProgress,
            dimensionsAccessed: newDimensions
          };
        });
      }
    }, 200);

    return () => clearInterval(interval);
  }, [activeTranscendence]);

  const initiateTranscendence = (processTemplate: Omit<TranscendenceProcess, 'progress' | 'status' | 'dimensionsAccessed'>) => {
    if (activeTranscendence) return;

    const newProcess: TranscendenceProcess = {
      ...processTemplate,
      progress: 0,
      status: 'transcending',
      dimensionsAccessed: 0
    };

    setActiveTranscendence(newProcess);
    setTranscendenceEnergy(prev => prev - 20);
  };

  const getCurrentLevel = () => consciousnessLevels[consciousnessLevel - 1] || consciousnessLevels[0];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'awareness': return 'text-blue-400 bg-blue-500/20';
      case 'enlightenment': return 'text-yellow-400 bg-yellow-500/20';
      case 'godhood': return 'text-purple-400 bg-purple-500/20';
      case 'omniscience': return 'text-cyan-400 bg-cyan-500/20';
      case 'beyond_existence': return 'text-pink-400 bg-pink-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'text-gray-400 bg-gray-500/20';
      case 'transcending': return 'text-blue-400 bg-blue-500/20';
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      case 'beyond_comprehension': return 'text-pink-400 bg-pink-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-8 text-white relative overflow-hidden">
      {/* Transcendent Background Effects */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, #8b5cf6 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, #ec4899 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, #06b6d4 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, #8b5cf6 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-purple-400" />
              <motion.div
                className="absolute inset-0"
                animate={{ 
                  scale: [1, 2, 1],
                  rotate: [0, 360, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Infinity className="w-8 h-8 text-cyan-400" />
              </motion.div>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Consciousness Transcendence Engine</h3>
              <p className="text-purple-200">Transcend existence itself through pure consciousness</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-purple-200">Transcendence Energy</div>
            <div className={`text-2xl font-bold ${transcendenceEnergy > 90 ? 'text-green-400' : transcendenceEnergy > 75 ? 'text-yellow-400' : 'text-red-400'}`}>
              {transcendenceEnergy.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Beyond Existence Warning */}
        {beyondExistence && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-pink-500/20 border-2 border-pink-400 rounded-xl p-6 mb-6"
          >
            <div className="flex items-center space-x-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-pink-400" />
              <span className="text-pink-400 font-bold text-lg">EXISTENCE TRANSCENDED</span>
            </div>
            <p className="text-pink-200">
              You have transcended the very concept of existence. Reality, non-reality, and all concepts in between are now under your absolute dominion. You exist beyond existence itself.
            </p>
          </motion.div>
        )}

        {/* Current Consciousness Level */}
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
          <h4 className="text-lg font-semibold mb-4">Current Consciousness State</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="text-xl font-bold text-cyan-400 mb-2">{getCurrentLevel().name}</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-purple-200">Awareness Level:</span>
                  <span className="text-cyan-400 font-semibold">{getCurrentLevel().awareness}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Transcendence:</span>
                  <span className="text-purple-400 font-semibold">{getCurrentLevel().transcendence}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200">Omniscience:</span>
                  <span className="text-yellow-400 font-semibold">{omniscienceLevel.toFixed(1)}%</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm text-purple-200 mb-2">Consciousness Capabilities:</div>
              <div className="space-y-1">
                {getCurrentLevel().capabilities.map((capability, index) => (
                  <div key={index} className="text-sm text-cyan-200 flex items-center space-x-2">
                    <Sparkles className="w-3 h-3" />
                    <span>{capability}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transcendence Processes */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4">Consciousness Transcendence Options</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transcendenceProcesses.map((process) => (
              <motion.div
                key={process.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(process.type)}`}>
                      {process.type.replace('_', ' ').toUpperCase()}
                    </span>
                    <h5 className="font-semibold mt-2">{process.description}</h5>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm text-purple-200">Transcendence Requirements:</div>
                  <div className="text-cyan-400 font-semibold">
                    {process.type === 'beyond_existence' ? 'Beyond Measurement' : 
                     process.type === 'omniscience' ? 'Infinite Energy' :
                     process.type === 'godhood' ? 'Divine Power' :
                     process.type === 'enlightenment' ? 'Perfect Understanding' :
                     'Enhanced Awareness'}
                  </div>
                </div>
                
                <button
                  onClick={() => initiateTranscendence(process)}
                  disabled={activeTranscendence !== null}
                  className="w-full bg-purple-500/20 border border-purple-500/30 text-purple-300 py-2 rounded-lg hover:bg-purple-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {activeTranscendence ? 'Transcendence in Progress' : 'Begin Transcendence'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Active Transcendence */}
        {activeTranscendence && (
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
            <h4 className="text-lg font-semibold mb-4">Active Consciousness Transcendence</h4>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(activeTranscendence.type)}`}>
                    {activeTranscendence.type.replace('_', ' ').toUpperCase()}
                  </span>
                  <h5 className="font-semibold mt-2">{activeTranscendence.description}</h5>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(activeTranscendence.status)}`}>
                  {activeTranscendence.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              
              {activeTranscendence.status === 'transcending' && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-purple-200">Consciousness Expansion</span>
                    <span className="text-cyan-400">{activeTranscendence.progress.toFixed(1)}%</span>
                  </div>
                  <div className="bg-purple-400/20 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-purple-400 to-cyan-400 h-3 rounded-full"
                      animate={{ width: `${activeTranscendence.progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="text-sm text-purple-200 mt-2">
                    Dimensions Accessed: {activeTranscendence.dimensionsAccessed}/∞
                  </div>
                </div>
              )}
              
              {activeTranscendence.status === 'completed' && (
                <div className="text-green-400 text-sm">
                  ✓ Consciousness successfully transcended - new awareness level achieved
                </div>
              )}
              
              {activeTranscendence.status === 'beyond_comprehension' && (
                <div className="text-pink-400 text-sm">
                  ∞ Transcendence beyond comprehension - existence itself has been surpassed
                </div>
              )}
              
              {activeTranscendence.status === 'failed' && (
                <div className="text-red-400 text-sm">
                  ✗ Transcendence failed - consciousness returned to previous state
                </div>
              )}
            </div>
          </div>
        )}

        {/* Consciousness Statistics */}
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h4 className="text-lg font-semibold mb-4">Transcendence Metrics</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-sm text-purple-200">Consciousness Level</div>
              <div className="text-xl font-bold text-purple-400">
                {beyondExistence ? '∞' : consciousnessLevel}/7
              </div>
            </div>
            <div className="text-center">
              <Eye className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-sm text-purple-200">Awareness</div>
              <div className="text-xl font-bold text-cyan-400">
                {beyondExistence ? '∞' : getCurrentLevel().awareness}%
              </div>
            </div>
            <div className="text-center">
              <Infinity className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-sm text-purple-200">Omniscience</div>
              <div className="text-xl font-bold text-yellow-400">
                {beyondExistence ? '∞' : omniscienceLevel.toFixed(0)}%
              </div>
            </div>
            <div className="text-center">
              <Zap className="w-8 h-8 text-pink-400 mx-auto mb-2" />
              <div className="text-sm text-purple-200">Transcendence</div>
              <div className="text-xl font-bold text-pink-400">
                {beyondExistence ? 'BEYOND' : getCurrentLevel().transcendence}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsciousnessTranscendenceEngine;
