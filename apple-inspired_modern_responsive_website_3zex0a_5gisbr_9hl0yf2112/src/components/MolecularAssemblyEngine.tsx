import React, { useState, useEffect } from 'react';
import { Atom, Zap, Layers, Target, Sparkles, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface AtomicBlueprint {
  id: string;
  name: string;
  complexity: number;
  atoms: { element: string; count: number }[];
  assemblyTime: number;
  energyRequired: number;
  successRate: number;
}

interface AssemblyProcess {
  id: string;
  blueprint: AtomicBlueprint;
  progress: number;
  status: 'queued' | 'assembling' | 'completed' | 'failed';
  startTime: Date;
}

const MolecularAssemblyEngine: React.FC = () => {
  const [availableBlueprints, setAvailableBlueprints] = useState<AtomicBlueprint[]>([]);
  const [assemblyQueue, setAssemblyQueue] = useState<AssemblyProcess[]>([]);
  const [atomicInventory, setAtomicInventory] = useState<Record<string, number>>({});
  const [assemblerStatus, setAssemblerStatus] = useState('idle');
  const [energyLevel, setEnergyLevel] = useState(85.7);

  const blueprints: AtomicBlueprint[] = [
    {
      id: 'bp1',
      name: 'Diamond Crystal Structure',
      complexity: 3,
      atoms: [
        { element: 'Carbon', count: 1000000 }
      ],
      assemblyTime: 30,
      energyRequired: 2500,
      successRate: 0.95
    },
    {
      id: 'bp2',
      name: 'Gold Nanoparticles',
      complexity: 2,
      atoms: [
        { element: 'Gold', count: 50000 }
      ],
      assemblyTime: 15,
      energyRequired: 1200,
      successRate: 0.98
    },
    {
      id: 'bp3',
      name: 'Silicon Microprocessor',
      complexity: 8,
      atoms: [
        { element: 'Silicon', count: 2000000 },
        { element: 'Copper', count: 500000 },
        { element: 'Aluminum', count: 300000 }
      ],
      assemblyTime: 120,
      energyRequired: 8500,
      successRate: 0.87
    },
    {
      id: 'bp4',
      name: 'Graphene Sheet',
      complexity: 4,
      atoms: [
        { element: 'Carbon', count: 800000 }
      ],
      assemblyTime: 45,
      energyRequired: 3200,
      successRate: 0.92
    },
    {
      id: 'bp5',
      name: 'Titanium Alloy Frame',
      complexity: 6,
      atoms: [
        { element: 'Titanium', count: 1500000 },
        { element: 'Aluminum', count: 400000 },
        { element: 'Vanadium', count: 100000 }
      ],
      assemblyTime: 90,
      energyRequired: 6800,
      successRate: 0.89
    },
    {
      id: 'bp6',
      name: 'Quantum Dot Array',
      complexity: 10,
      atoms: [
        { element: 'Indium', count: 200000 },
        { element: 'Gallium', count: 200000 },
        { element: 'Arsenic', count: 400000 }
      ],
      assemblyTime: 180,
      energyRequired: 12000,
      successRate: 0.78
    }
  ];

  useEffect(() => {
    setAvailableBlueprints(blueprints);
    
    // Initialize atomic inventory
    const inventory: Record<string, number> = {
      'Carbon': 5000000,
      'Gold': 200000,
      'Silicon': 3000000,
      'Copper': 1000000,
      'Aluminum': 800000,
      'Titanium': 2000000,
      'Vanadium': 300000,
      'Indium': 500000,
      'Gallium': 500000,
      'Arsenic': 600000
    };
    setAtomicInventory(inventory);

    // Simulate energy fluctuations
    const interval = setInterval(() => {
      setEnergyLevel(prev => 
        Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 3))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Process assembly queue
    const interval = setInterval(() => {
      setAssemblyQueue(prev => prev.map(process => {
        if (process.status === 'assembling' && process.progress < 100) {
          const newProgress = Math.min(100, process.progress + (100 / process.blueprint.assemblyTime));
          
          if (newProgress >= 100) {
            // Determine success or failure
            const success = Math.random() < process.blueprint.successRate;
            return {
              ...process,
              progress: 100,
              status: success ? 'completed' : 'failed'
            };
          }
          
          return { ...process, progress: newProgress };
        }
        return process;
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startAssembly = (blueprint: AtomicBlueprint) => {
    // Check if we have enough atoms
    const hasEnoughAtoms = blueprint.atoms.every(atom => 
      atomicInventory[atom.element] >= atom.count
    );
    
    if (!hasEnoughAtoms || energyLevel < (blueprint.energyRequired / 100)) {
      return;
    }

    // Deduct atoms from inventory
    const newInventory = { ...atomicInventory };
    blueprint.atoms.forEach(atom => {
      newInventory[atom.element] -= atom.count;
    });
    setAtomicInventory(newInventory);

    // Add to assembly queue
    const newProcess: AssemblyProcess = {
      id: `ap_${Date.now()}`,
      blueprint,
      progress: 0,
      status: 'assembling',
      startTime: new Date()
    };

    setAssemblyQueue(prev => [...prev, newProcess]);
    setAssemblerStatus('active');
  };

  const getComplexityColor = (complexity: number) => {
    if (complexity <= 3) return 'text-green-400';
    if (complexity <= 6) return 'text-yellow-400';
    if (complexity <= 8) return 'text-orange-400';
    return 'text-red-400';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'queued': return 'text-gray-400 bg-gray-500/20';
      case 'assembling': return 'text-blue-400 bg-blue-500/20';
      case 'completed': return 'text-green-400 bg-green-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const canAssemble = (blueprint: AtomicBlueprint) => {
    const hasEnoughAtoms = blueprint.atoms.every(atom => 
      atomicInventory[atom.element] >= atom.count
    );
    const hasEnoughEnergy = energyLevel >= (blueprint.energyRequired / 100);
    return hasEnoughAtoms && hasEnoughEnergy;
  };

  return (
    <div className="bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Atom className="w-8 h-8 text-green-400" />
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-cyan-400" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Molecular Assembly Engine</h3>
            <p className="text-green-200">Build products at the atomic level</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-green-200">Energy Level</div>
          <div className={`text-2xl font-bold ${energyLevel > 90 ? 'text-green-400' : energyLevel > 75 ? 'text-yellow-400' : 'text-red-400'}`}>
            {energyLevel.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Atomic Inventory */}
      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
        <h4 className="text-lg font-semibold mb-4">Atomic Inventory</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(atomicInventory).map(([element, count]) => (
            <div key={element} className="bg-white/5 rounded-lg p-3 text-center">
              <div className="text-sm text-green-200">{element}</div>
              <div className="text-lg font-bold text-cyan-400">
                {count.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assembly Blueprints */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">Available Blueprints</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableBlueprints.map((blueprint) => (
            <motion.div
              key={blueprint.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h5 className="font-semibold">{blueprint.name}</h5>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-green-200">Complexity:</span>
                    <span className={`text-xs font-semibold ${getComplexityColor(blueprint.complexity)}`}>
                      Level {blueprint.complexity}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-green-200">Success Rate</div>
                  <div className="text-lg font-bold text-green-400">
                    {(blueprint.successRate * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="text-xs text-green-200 mb-2">Required Atoms:</div>
                <div className="space-y-1">
                  {blueprint.atoms.map((atom, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-cyan-200">{atom.element}</span>
                      <span className={`${
                        atomicInventory[atom.element] >= atom.count 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      }`}>
                        {atom.count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between text-xs mb-3">
                <span className="text-green-200">Assembly Time: {blueprint.assemblyTime}s</span>
                <span className="text-green-200">Energy: {blueprint.energyRequired}</span>
              </div>
              
              <button
                onClick={() => startAssembly(blueprint)}
                disabled={!canAssemble(blueprint)}
                className="w-full bg-green-500/20 border border-green-500/30 text-green-300 py-2 rounded-lg hover:bg-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {!canAssemble(blueprint) ? 'Insufficient Resources' : 'Start Assembly'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Assembly Queue */}
      {assemblyQueue.length > 0 && (
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h4 className="text-lg font-semibold mb-4">Assembly Queue</h4>
          <div className="space-y-4">
            {assemblyQueue.map((process) => (
              <motion.div
                key={process.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-semibold">{process.blueprint.name}</h5>
                    <p className="text-sm text-green-200">
                      Started: {process.startTime.toLocaleTimeString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(process.status)}`}>
                    {process.status.toUpperCase()}
                  </span>
                </div>
                
                {process.status === 'assembling' && (
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-200">Progress</span>
                      <span className="text-cyan-400">{process.progress.toFixed(1)}%</span>
                    </div>
                    <div className="bg-green-400/20 rounded-full h-2">
                      <motion.div
                        className="bg-green-400 h-2 rounded-full"
                        animate={{ width: `${process.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Assembly Statistics */}
      <div className="mt-6 bg-white/10 rounded-xl p-6 backdrop-blur-sm">
        <h4 className="text-lg font-semibold mb-4">Assembly Statistics</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-sm text-green-200">Completed</div>
            <div className="text-xl font-bold text-green-400">
              {assemblyQueue.filter(p => p.status === 'completed').length}
            </div>
          </div>
          <div className="text-center">
            <Settings className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-sm text-green-200">In Progress</div>
            <div className="text-xl font-bold text-blue-400">
              {assemblyQueue.filter(p => p.status === 'assembling').length}
            </div>
          </div>
          <div className="text-center">
            <Layers className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-sm text-green-200">Queue</div>
            <div className="text-xl font-bold text-purple-400">
              {assemblyQueue.filter(p => p.status === 'queued').length}
            </div>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-sm text-green-200">Failed</div>
            <div className="text-xl font-bold text-red-400">
              {assemblyQueue.filter(p => p.status === 'failed').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MolecularAssemblyEngine;
