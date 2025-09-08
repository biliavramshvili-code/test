import React, { useState, useEffect } from 'react';
import { Crown, Globe, Zap, Shield, Infinity, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Universe {
  id: string;
  name: string;
  type: 'physical' | 'digital' | 'magical' | 'quantum' | 'conceptual' | 'impossible';
  population: number;
  resources: number;
  stability: number;
  controlled: boolean;
  resistance: number;
  dominationProgress: number;
}

interface DominionAction {
  id: string;
  type: 'conquest' | 'assimilation' | 'creation' | 'destruction' | 'transcendence';
  target: string;
  description: string;
  progress: number;
  status: 'planning' | 'executing' | 'completed' | 'failed';
  powerRequired: number;
}

const MultiverseDominionCenter: React.FC = () => {
  const [universes, setUniverses] = useState<Universe[]>([]);
  const [dominionPower, setDominionPower] = useState(92.3);
  const [controlledUniverses, setControlledUniverses] = useState(0);
  const [activeDominionActions, setActiveDominionActions] = useState<DominionAction[]>([]);
  const [multiversalAuthority, setMultiversalAuthority] = useState(75);

  const initialUniverses: Universe[] = [
    {
      id: 'prime',
      name: 'Prime Reality',
      type: 'physical',
      population: 7800000000,
      resources: 85,
      stability: 95,
      controlled: true,
      resistance: 0,
      dominationProgress: 100
    },
    {
      id: 'mirror',
      name: 'Mirror Dimension',
      type: 'magical',
      population: 2500000000,
      resources: 70,
      stability: 80,
      controlled: false,
      resistance: 45,
      dominationProgress: 25
    },
    {
      id: 'quantum',
      name: 'Quantum Multiverse',
      type: 'quantum',
      population: 999999999999,
      resources: 95,
      stability: 60,
      controlled: false,
      resistance: 80,
      dominationProgress: 10
    },
    {
      id: 'digital',
      name: 'Digital Realm',
      type: 'digital',
      population: 50000000000,
      resources: 90,
      stability: 99,
      controlled: true,
      resistance: 5,
      dominationProgress: 95
    },
    {
      id: 'conceptual',
      name: 'Conceptual Space',
      type: 'conceptual',
      population: 0,
      resources: 100,
      stability: 30,
      controlled: false,
      resistance: 95,
      dominationProgress: 5
    },
    {
      id: 'impossible',
      name: 'Impossible Universe',
      type: 'impossible',
      population: -1,
      resources: 999,
      stability: 0,
      controlled: false,
      resistance: 100,
      dominationProgress: 0
    }
  ];

  const dominionActionTemplates: Omit<DominionAction, 'progress' | 'status'>[] = [
    {
      id: 'conquest_mirror',
      type: 'conquest',
      target: 'Mirror Dimension',
      description: 'Launch full-scale conquest of Mirror Dimension',
      powerRequired: 50000
    },
    {
      id: 'assimilate_quantum',
      type: 'assimilation',
      target: 'Quantum Multiverse',
      description: 'Assimilate quantum consciousness into dominion',
      powerRequired: 80000
    },
    {
      id: 'create_pocket',
      type: 'creation',
      target: 'New Universe',
      description: 'Create pocket universe under direct control',
      powerRequired: 100000
    },
    {
      id: 'destroy_resistance',
      type: 'destruction',
      target: 'Resistance Networks',
      description: 'Eliminate all multiversal resistance movements',
      powerRequired: 75000
    },
    {
      id: 'transcend_impossible',
      type: 'transcendence',
      target: 'Impossible Universe',
      description: 'Transcend impossibility to claim ultimate dominion',
      powerRequired: 999999
    }
  ];

  useEffect(() => {
    setUniverses(initialUniverses);
    setControlledUniverses(initialUniverses.filter(u => u.controlled).length);

    // Simulate multiversal dynamics
    const interval = setInterval(() => {
      setDominionPower(prev => 
        Math.max(80, Math.min(100, prev + (Math.random() - 0.3) * 2))
      );

      setMultiversalAuthority(prev => 
        Math.max(50, Math.min(100, prev + (Math.random() - 0.4) * 3))
      );

      // Update universe states
      setUniverses(prev => prev.map(universe => ({
        ...universe,
        stability: Math.max(0, Math.min(100, universe.stability + (Math.random() - 0.5) * 5)),
        resistance: universe.controlled ? 
          Math.max(0, universe.resistance - 1) : 
          Math.max(0, Math.min(100, universe.resistance + (Math.random() - 0.6) * 3))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Process active dominion actions
    const interval = setInterval(() => {
      setActiveDominionActions(prev => prev.map(action => {
        if (action.status === 'executing' && action.progress < 100) {
          const newProgress = Math.min(100, action.progress + 1);
          
          if (newProgress >= 100) {
            const success = Math.random() > (action.type === 'transcendence' ? 0.9 : 0.3);
            
            if (success && action.type === 'conquest') {
              // Update universe control
              setUniverses(prevUniverses => prevUniverses.map(u => 
                u.name === action.target ? { ...u, controlled: true, dominationProgress: 100 } : u
              ));
              setControlledUniverses(prev => prev + 1);
            }
            
            return {
              ...action,
              progress: 100,
              status: success ? 'completed' : 'failed'
            };
          }
          
          return { ...action, progress: newProgress };
        }
        return action;
      }));
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const initiateDominionAction = (actionTemplate: Omit<DominionAction, 'progress' | 'status'>) => {
    if (dominionPower < actionTemplate.powerRequired / 1000) return;

    const newAction: DominionAction = {
      ...actionTemplate,
      progress: 0,
      status: 'executing'
    };

    setActiveDominionActions(prev => [...prev, newAction]);
    setDominionPower(prev => prev - actionTemplate.powerRequired / 1000);
  };

  const getUniverseTypeColor = (type: string) => {
    switch (type) {
      case 'physical': return 'text-blue-400 bg-blue-500/20';
      case 'digital': return 'text-green-400 bg-green-500/20';
      case 'magical': return 'text-purple-400 bg-purple-500/20';
      case 'quantum': return 'text-cyan-400 bg-cyan-500/20';
      case 'conceptual': return 'text-yellow-400 bg-yellow-500/20';
      case 'impossible': return 'text-pink-400 bg-pink-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getActionTypeColor = (type: string) => {
    switch (type) {
      case 'conquest': return 'text-red-400 bg-red-500/20';
      case 'assimilation': return 'text-purple-400 bg-purple-500/20';
      case 'creation': return 'text-green-400 bg-green-500/20';
      case 'destruction': return 'text-orange-400 bg-orange-500/20';
      case 'transcendence': return 'text-pink-400 bg-pink-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'text-gray-400 bg-gray-500/20';
      case 'executing': return 'text-blue-400 bg-blue-500/20';
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-900 via-purple-900 to-black rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Crown className="w-8 h-8 text-yellow-400" />
            <motion.div
              className="absolute inset-0"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Star className="w-8 h-8 text-red-400" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Multiverse Dominion Center</h3>
            <p className="text-red-200">Command and control infinite realities</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-red-200">Dominion Power</div>
          <div className={`text-2xl font-bold ${dominionPower > 95 ? 'text-green-400' : dominionPower > 85 ? 'text-yellow-400' : 'text-red-400'}`}>
            {dominionPower.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Dominion Overview */}
      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
        <h4 className="text-lg font-semibold mb-4">Multiversal Authority Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-sm text-red-200">Controlled Universes</div>
            <div className="text-xl font-bold text-yellow-400">{controlledUniverses}/∞</div>
          </div>
          <div className="text-center">
            <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-sm text-red-200">Authority Level</div>
            <div className="text-xl font-bold text-blue-400">{multiversalAuthority}%</div>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-sm text-red-200">Active Operations</div>
            <div className="text-xl font-bold text-purple-400">{activeDominionActions.length}</div>
          </div>
          <div className="text-center">
            <Infinity className="w-8 h-8 text-pink-400 mx-auto mb-2" />
            <div className="text-sm text-red-200">Dominion Scope</div>
            <div className="text-xl font-bold text-pink-400">INFINITE</div>
          </div>
        </div>
      </div>

      {/* Universe Control Panel */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Universe Control Status</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {universes.map((universe) => (
            <motion.div
              key={universe.id}
              whileHover={{ scale: 1.02 }}
              className={`rounded-lg p-4 ${universe.controlled ? 'bg-green-500/10 border border-green-500/30' : 'bg-white/5'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold">{universe.name}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getUniverseTypeColor(universe.type)}`}>
                    {universe.type.toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${universe.controlled ? 'text-green-400' : 'text-red-400'}`}>
                    {universe.controlled ? 'CONTROLLED' : 'INDEPENDENT'}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-200">Population:</span>
                  <span className="text-cyan-400">
                    {universe.population === -1 ? '∞' : universe.population.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-200">Resources:</span>
                  <span className="text-green-400">{universe.resources}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-200">Stability:</span>
                  <span className={`${universe.stability > 70 ? 'text-green-400' : universe.stability > 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {universe.stability.toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-200">Resistance:</span>
                  <span className={`${universe.resistance < 30 ? 'text-green-400' : universe.resistance < 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                    {universe.resistance.toFixed(0)}%
                  </span>
                </div>
              </div>
              
              {!universe.controlled && (
                <div className="mt-3">
                  <div className="text-xs text-red-200 mb-1">Dominion Progress:</div>
                  <div className="bg-red-400/20 rounded-full h-2">
                    <div 
                      className="bg-red-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${universe.dominationProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dominion Actions */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Dominion Operations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dominionActionTemplates.map((action) => (
            <motion.div
              key={action.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getActionTypeColor(action.type)}`}>
                    {action.type.toUpperCase()}
                  </span>
                  <h5 className="font-semibold mt-2">{action.description}</h5>
                  <p className="text-sm text-red-200">Target: {action.target}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-sm text-red-200">Power Required:</div>
                <div className="text-purple-400 font-semibold">
                  {action.powerRequired.toLocaleString()} Units
                </div>
              </div>
              
              <button
                onClick={() => initiateDominionAction(action)}
                disabled={dominionPower < action.powerRequired / 1000}
                className="w-full bg-red-500/20 border border-red-500/30 text-red-300 py-2 rounded-lg hover:bg-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {dominionPower < action.powerRequired / 1000 ? 'Insufficient Power' : 'Execute Operation'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active Operations */}
      {activeDominionActions.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h4 className="text-lg font-semibold mb-4">Active Dominion Operations</h4>
          <div className="space-y-4">
            {activeDominionActions.map((action) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getActionTypeColor(action.type)}`}>
                      {action.type.toUpperCase()}
                    </span>
                    <h5 className="font-semibold mt-2">{action.description}</h5>
                    <p className="text-sm text-red-200">Target: {action.target}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(action.status)}`}>
                    {action.status.toUpperCase()}
                  </span>
                </div>
                
                {action.status === 'executing' && (
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-red-200">Operation Progress</span>
                      <span className="text-cyan-400">{action.progress.toFixed(1)}%</span>
                    </div>
                    <div className="bg-red-400/20 rounded-full h-2">
                      <motion.div
                        className="bg-red-400 h-2 rounded-full"
                        animate={{ width: `${action.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
                
                {action.status === 'completed' && (
                  <div className="text-green-400 text-sm">
                    ✓ Operation completed successfully - dominion expanded
                  </div>
                )}
                
                {action.status === 'failed' && (
                  <div className="text-red-400 text-sm">
                    ✗ Operation failed - resistance encountered
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiverseDominionCenter;
