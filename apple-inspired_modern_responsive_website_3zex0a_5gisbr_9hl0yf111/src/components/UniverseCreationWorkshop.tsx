import React, { useState, useEffect } from 'react';
import { Globe, Sparkles, Zap, Settings, Eye, Atom } from 'lucide-react';
import { motion } from 'framer-motion';

interface UniverseBlueprint {
  id: string;
  name: string;
  dimensions: number;
  physicsLaws: string[];
  timeFlow: 'forward' | 'backward' | 'circular' | 'nonlinear';
  consciousness: boolean;
  magic: boolean;
  technology: boolean;
  creationProgress: number;
  status: 'designing' | 'creating' | 'stable' | 'expanding' | 'collapsing';
}

interface CosmicResource {
  name: string;
  amount: number;
  unit: string;
  regenerationRate: number;
}

const UniverseCreationWorkshop: React.FC = () => {
  const [universeBlueprints, setUniverseBlueprints] = useState<UniverseBlueprint[]>([]);
  const [cosmicResources, setCosmicResources] = useState<CosmicResource[]>([]);
  const [creationEnergy, setCreationEnergy] = useState(75.8);
  const [omnipotenceLevel, setOmnipotenceLevel] = useState(8);
  const [activeCreation, setActiveCreation] = useState<UniverseBlueprint | null>(null);

  const initialResources: CosmicResource[] = [
    { name: 'Dark Matter', amount: 1000000, unit: 'Cosmic Units', regenerationRate: 1000 },
    { name: 'Dark Energy', amount: 2500000, unit: 'Void Joules', regenerationRate: 2500 },
    { name: 'Quantum Foam', amount: 500000, unit: 'Planck Volumes', regenerationRate: 500 },
    { name: 'Temporal Essence', amount: 100000, unit: 'Chronons', regenerationRate: 100 },
    { name: 'Consciousness Substrate', amount: 50000, unit: 'Awareness Units', regenerationRate: 50 },
    { name: 'Information Bits', amount: 999999999, unit: 'Cosmic Bytes', regenerationRate: 999999 }
  ];

  const blueprintTemplates: Partial<UniverseBlueprint>[] = [
    {
      name: 'Standard Physics Universe',
      dimensions: 4,
      physicsLaws: ['Gravity', 'Electromagnetism', 'Strong Nuclear', 'Weak Nuclear'],
      timeFlow: 'forward',
      consciousness: true,
      magic: false,
      technology: true
    },
    {
      name: 'Magic-Dominant Reality',
      dimensions: 5,
      physicsLaws: ['Thaumic Force', 'Mana Conservation', 'Spell Dynamics'],
      timeFlow: 'nonlinear',
      consciousness: true,
      magic: true,
      technology: false
    },
    {
      name: 'Pure Information Universe',
      dimensions: 11,
      physicsLaws: ['Data Conservation', 'Computational Limits', 'Information Entropy'],
      timeFlow: 'circular',
      consciousness: false,
      magic: false,
      technology: true
    },
    {
      name: 'Consciousness-Only Realm',
      dimensions: 0,
      physicsLaws: ['Thought Manifestation', 'Dream Logic', 'Collective Unconscious'],
      timeFlow: 'nonlinear',
      consciousness: true,
      magic: true,
      technology: false
    },
    {
      name: 'Reverse-Time Universe',
      dimensions: 4,
      physicsLaws: ['Reverse Causality', 'Entropy Decrease', 'Memory Precognition'],
      timeFlow: 'backward',
      consciousness: true,
      magic: false,
      technology: true
    }
  ];

  useEffect(() => {
    setCosmicResources(initialResources);

    // Simulate resource regeneration
    const interval = setInterval(() => {
      setCosmicResources(prev => prev.map(resource => ({
        ...resource,
        amount: resource.amount + resource.regenerationRate
      })));

      setCreationEnergy(prev => 
        Math.max(50, Math.min(100, prev + (Math.random() - 0.4) * 2))
      );

      setOmnipotenceLevel(prev => 
        Math.max(1, Math.min(10, prev + Math.floor((Math.random() - 0.5) * 2)))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Process universe creation
    const interval = setInterval(() => {
      if (activeCreation && activeCreation.status === 'creating') {
        setActiveCreation(prev => {
          if (!prev) return null;
          
          const newProgress = Math.min(100, prev.creationProgress + 1);
          
          if (newProgress >= 100) {
            return {
              ...prev,
              creationProgress: 100,
              status: 'stable'
            };
          }
          
          return { ...prev, creationProgress: newProgress };
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [activeCreation]);

  const createUniverse = (template: Partial<UniverseBlueprint>) => {
    const requiredEnergy = (template.dimensions || 4) * 10 + (template.physicsLaws?.length || 0) * 5;
    
    if (creationEnergy < requiredEnergy) return;

    const newUniverse: UniverseBlueprint = {
      id: `universe_${Date.now()}`,
      name: template.name || 'Custom Universe',
      dimensions: template.dimensions || 4,
      physicsLaws: template.physicsLaws || ['Standard Physics'],
      timeFlow: template.timeFlow || 'forward',
      consciousness: template.consciousness || false,
      magic: template.magic || false,
      technology: template.technology || false,
      creationProgress: 0,
      status: 'creating'
    };

    setActiveCreation(newUniverse);
    setCreationEnergy(prev => prev - requiredEnergy);
    
    // Deduct cosmic resources
    setCosmicResources(prev => prev.map(resource => ({
      ...resource,
      amount: Math.max(0, resource.amount - requiredEnergy * 1000)
    })));
  };

  const completeCreation = () => {
    if (activeCreation && activeCreation.status === 'stable') {
      setUniverseBlueprints(prev => [...prev, activeCreation]);
      setActiveCreation(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'designing': return 'text-blue-400 bg-blue-500/20';
      case 'creating': return 'text-yellow-400 bg-yellow-500/20';
      case 'stable': return 'text-green-400 bg-green-500/20';
      case 'expanding': return 'text-purple-400 bg-purple-500/20';
      case 'collapsing': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTimeFlowColor = (timeFlow: string) => {
    switch (timeFlow) {
      case 'forward': return 'text-green-400';
      case 'backward': return 'text-red-400';
      case 'circular': return 'text-purple-400';
      case 'nonlinear': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Globe className="w-8 h-8 text-indigo-400" />
            <motion.div
              className="absolute inset-0"
              animate={{ 
                scale: [1, 2, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Universe Creation Workshop</h3>
            <p className="text-indigo-200">Design and build custom realities</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-indigo-200">Creation Energy</div>
          <div className={`text-2xl font-bold ${creationEnergy > 80 ? 'text-green-400' : creationEnergy > 60 ? 'text-yellow-400' : 'text-red-400'}`}>
            {creationEnergy.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Cosmic Resources */}
      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
        <h4 className="text-lg font-semibold mb-4">Cosmic Resources</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cosmicResources.map((resource, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{resource.name}</span>
                <span className="text-xs text-indigo-200">+{resource.regenerationRate}/s</span>
              </div>
              <div className="text-lg font-bold text-cyan-400">
                {resource.amount.toLocaleString()} {resource.unit}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Creation */}
      {activeCreation && (
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
          <h4 className="text-lg font-semibold mb-4">Universe in Creation</h4>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h5 className="text-xl font-bold">{activeCreation.name}</h5>
                <p className="text-indigo-200">
                  {activeCreation.dimensions}D Universe with {activeCreation.physicsLaws.length} physics laws
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(activeCreation.status)}`}>
                {activeCreation.status.toUpperCase()}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-indigo-200 mb-2">Time Flow:</div>
                <span className={`font-semibold ${getTimeFlowColor(activeCreation.timeFlow)}`}>
                  {activeCreation.timeFlow.toUpperCase()}
                </span>
              </div>
              <div>
                <div className="text-sm text-indigo-200 mb-2">Features:</div>
                <div className="flex space-x-2">
                  {activeCreation.consciousness && (
                    <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded text-xs">Consciousness</span>
                  )}
                  {activeCreation.magic && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">Magic</span>
                  )}
                  {activeCreation.technology && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">Technology</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="text-sm text-indigo-200 mb-2">Physics Laws:</div>
              <div className="flex flex-wrap gap-1">
                {activeCreation.physicsLaws.map((law, index) => (
                  <span key={index} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs">
                    {law}
                  </span>
                ))}
              </div>
            </div>
            
            {activeCreation.status === 'creating' && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-indigo-200">Creation Progress</span>
                  <span className="text-cyan-400">{activeCreation.creationProgress.toFixed(1)}%</span>
                </div>
                <div className="bg-indigo-400/20 rounded-full h-3">
                  <motion.div
                    className="bg-indigo-400 h-3 rounded-full"
                    animate={{ width: `${activeCreation.creationProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}
            
            {activeCreation.status === 'stable' && (
              <button
                onClick={completeCreation}
                className="w-full bg-green-500/20 border border-green-500/30 text-green-300 py-3 rounded-lg hover:bg-green-500/30 transition-all"
              >
                Add to Multiverse Collection
              </button>
            )}
          </div>
        </div>
      )}

      {/* Universe Templates */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Universe Templates</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blueprintTemplates.map((template, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold">{template.name}</h5>
                  <p className="text-sm text-indigo-200">
                    {template.dimensions}D • {template.physicsLaws?.length} Laws
                  </p>
                </div>
                <span className={`text-sm font-semibold ${getTimeFlowColor(template.timeFlow || 'forward')}`}>
                  {template.timeFlow?.toUpperCase()}
                </span>
              </div>
              
              <div className="mb-3">
                <div className="text-xs text-indigo-200 mb-1">Physics Laws:</div>
                <div className="flex flex-wrap gap-1">
                  {template.physicsLaws?.slice(0, 3).map((law, lawIndex) => (
                    <span key={lawIndex} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs">
                      {law}
                    </span>
                  ))}
                  {(template.physicsLaws?.length || 0) > 3 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs">
                      +{(template.physicsLaws?.length || 0) - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <div className="flex space-x-2">
                  {template.consciousness && (
                    <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded text-xs">Consciousness</span>
                  )}
                  {template.magic && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">Magic</span>
                  )}
                  {template.technology && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">Technology</span>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => createUniverse(template)}
                disabled={activeCreation !== null || creationEnergy < ((template.dimensions || 4) * 10)}
                className="w-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 py-2 rounded-lg hover:bg-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {activeCreation ? 'Creation in Progress' : 
                 creationEnergy < ((template.dimensions || 4) * 10) ? 'Insufficient Energy' : 
                 'Create Universe'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Created Universes */}
      {universeBlueprints.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
          <h4 className="text-lg font-semibold mb-4">Created Universes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {universeBlueprints.map((universe) => (
              <motion.div
                key={universe.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold">{universe.name}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(universe.status)}`}>
                    {universe.status}
                  </span>
                </div>
                <p className="text-sm text-indigo-200 mb-2">
                  {universe.dimensions}D • {universe.physicsLaws.length} Laws • {universe.timeFlow} time
                </p>
                <div className="text-xs text-green-400">
                  ✓ Universe successfully created and stable
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Creation Statistics */}
      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
        <h4 className="text-lg font-semibold mb-4">Creation Statistics</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Globe className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-sm text-indigo-200">Universes Created</div>
            <div className="text-xl font-bold text-green-400">
              {universeBlueprints.length}
            </div>
          </div>
          <div className="text-center">
            <Atom className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-sm text-indigo-200">Total Dimensions</div>
            <div className="text-xl font-bold text-blue-400">
              {universeBlueprints.reduce((sum, u) => sum + u.dimensions, 0)}
            </div>
          </div>
          <div className="text-center">
            <Settings className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-sm text-indigo-200">Physics Laws</div>
            <div className="text-xl font-bold text-purple-400">
              {universeBlueprints.reduce((sum, u) => sum + u.physicsLaws.length, 0)}
            </div>
          </div>
          <div className="text-center">
            <Eye className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-sm text-indigo-200">Omnipotence Level</div>
            <div className="text-xl font-bold text-yellow-400">
              {omnipotenceLevel}/10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniverseCreationWorkshop;
