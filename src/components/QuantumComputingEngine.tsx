import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Brain, Atom, Calculator, TrendingUp, Activity, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuantumState {
  qubits: number;
  coherenceTime: number;
  fidelity: number;
  entanglement: number;
}

interface QuantumOptimization {
  algorithm: string;
  problem: string;
  classicalTime: number;
  quantumTime: number;
  speedup: number;
  accuracy: number;
  status: 'running' | 'completed' | 'error';
}

const QuantumComputingEngine: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [quantumState, setQuantumState] = useState<QuantumState>({
    qubits: 128,
    coherenceTime: 0.5,
    fidelity: 99.7,
    entanglement: 0.85
  });
  const [optimizations, setOptimizations] = useState<QuantumOptimization[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Initialize quantum optimizations
    const initialOptimizations: QuantumOptimization[] = [
      {
        algorithm: 'Quantum Annealing',
        problem: 'Supply Chain Optimization',
        classicalTime: 3600,
        quantumTime: 12,
        speedup: 300,
        accuracy: 99.2,
        status: 'completed'
      },
      {
        algorithm: 'Variational Quantum Eigensolver',
        problem: 'Price Optimization Matrix',
        classicalTime: 7200,
        quantumTime: 45,
        speedup: 160,
        accuracy: 97.8,
        status: 'running'
      },
      {
        algorithm: 'Quantum Approximate Optimization',
        problem: 'Inventory Distribution',
        classicalTime: 1800,
        quantumTime: 8,
        speedup: 225,
        accuracy: 98.5,
        status: 'completed'
      }
    ];
    setOptimizations(initialOptimizations);
  }, []);

  useEffect(() => {
    if (isActive) {
      // Simulate quantum state fluctuations
      const interval = setInterval(() => {
        setQuantumState(prev => ({
          qubits: prev.qubits + Math.floor((Math.random() - 0.5) * 4),
          coherenceTime: Math.max(0.1, prev.coherenceTime + (Math.random() - 0.5) * 0.1),
          fidelity: Math.max(95, Math.min(99.9, prev.fidelity + (Math.random() - 0.5) * 0.5)),
          entanglement: Math.max(0.7, Math.min(0.95, prev.entanglement + (Math.random() - 0.5) * 0.05))
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const runQuantumOptimization = async () => {
    setIsProcessing(true);
    
    // Simulate quantum computation
    const newOptimization: QuantumOptimization = {
      algorithm: 'Quantum Machine Learning',
      problem: 'Customer Behavior Prediction',
      classicalTime: 14400,
      quantumTime: 0,
      speedup: 0,
      accuracy: 0,
      status: 'running'
    };

    setOptimizations(prev => [...prev, newOptimization]);

    // Simulate processing time
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 100));
      const time = (i / 100) * 28;
      const accuracy = 85 + (i / 100) * 13;
      
      setOptimizations(prev => prev.map(opt => 
        opt.algorithm === 'Quantum Machine Learning' 
          ? { ...opt, quantumTime: time, accuracy, speedup: Math.floor(14400 / Math.max(time, 1)) }
          : opt
      ));
    }

    setOptimizations(prev => prev.map(opt => 
      opt.algorithm === 'Quantum Machine Learning' 
        ? { ...opt, status: 'completed' as const }
        : opt
    ));

    setIsProcessing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-blue-500 bg-blue-100';
      case 'completed': return 'text-green-500 bg-green-100';
      case 'error': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Atom className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-apple-gray-900">Quantum Computing Engine</h3>
            <p className="text-sm text-apple-gray-600">Advanced quantum algorithms for optimization</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isActive 
                ? 'bg-green-500 text-white' 
                : 'bg-apple-gray-200 text-apple-gray-700 hover:bg-apple-gray-300'
            }`}
          >
            {isActive ? 'Active' : 'Inactive'}
          </button>
          <div className="flex items-center space-x-2 text-sm text-apple-gray-600">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span>Quantum State</span>
          </div>
        </div>
      </div>

      {/* Quantum State Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-apple-gray-600">Qubits</span>
            <Cpu className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-purple-600">{quantumState.qubits}</p>
          <div className="w-full bg-purple-200 rounded-full h-1 mt-2">
            <motion.div
              className="bg-purple-500 h-1 rounded-full"
              animate={{ width: `${(quantumState.qubits / 256) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-apple-gray-600">Coherence</span>
            <Activity className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600">{quantumState.coherenceTime.toFixed(2)}ms</p>
          <div className="w-full bg-blue-200 rounded-full h-1 mt-2">
            <motion.div
              className="bg-blue-500 h-1 rounded-full"
              animate={{ width: `${(quantumState.coherenceTime / 1) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-apple-gray-600">Fidelity</span>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">{quantumState.fidelity.toFixed(1)}%</p>
          <div className="w-full bg-green-200 rounded-full h-1 mt-2">
            <motion.div
              className="bg-green-500 h-1 rounded-full"
              animate={{ width: `${quantumState.fidelity}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-apple-gray-600">Entanglement</span>
            <Sparkles className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-2xl font-bold text-orange-600">{quantumState.entanglement.toFixed(2)}</p>
          <div className="w-full bg-orange-200 rounded-full h-1 mt-2">
            <motion.div
              className="bg-orange-500 h-1 rounded-full"
              animate={{ width: `${quantumState.entanglement * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Quantum Optimizations */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-apple-gray-900">Active Optimizations</h4>
          <button
            onClick={runQuantumOptimization}
            disabled={isProcessing || !isActive}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Run New Optimization'}
          </button>
        </div>

        <div className="space-y-4">
          {optimizations.map((opt, index) => (
            <motion.div
              key={index}
              className="bg-apple-gray-50 rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h5 className="font-semibold text-apple-gray-900">{opt.algorithm}</h5>
                  <p className="text-sm text-apple-gray-600">{opt.problem}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(opt.status)}`}>
                  {opt.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-apple-gray-600">Classical Time</p>
                  <p className="font-semibold">{Math.floor(opt.classicalTime / 60)}m {opt.classicalTime % 60}s</p>
                </div>
                <div>
                  <p className="text-apple-gray-600">Quantum Time</p>
                  <p className="font-semibold text-blue-600">{opt.quantumTime.toFixed(1)}s</p>
                </div>
                <div>
                  <p className="text-apple-gray-600">Speedup</p>
                  <p className="font-semibold text-green-600">{opt.speedup}x</p>
                </div>
                <div>
                  <p className="text-apple-gray-600">Accuracy</p>
                  <p className="font-semibold text-purple-600">{opt.accuracy.toFixed(1)}%</p>
                </div>
              </div>

              {opt.status === 'running' && (
                <div className="mt-3">
                  <div className="w-full bg-apple-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-blue-500 h-2 rounded-full"
                      animate={{ width: `${(opt.quantumTime / 30) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quantum Advantages */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white">
        <h4 className="text-lg font-bold mb-4">Quantum Advantages</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <Calculator className="w-8 h-8 mx-auto mb-2" />
            <h5 className="font-semibold mb-1">Exponential Speedup</h5>
            <p className="text-sm text-purple-100">Solve complex optimization problems exponentially faster</p>
          </div>
          <div className="text-center">
            <Brain className="w-8 h-8 mx-auto mb-2" />
            <h5 className="font-semibold mb-1">Parallel Processing</h5>
            <p className="text-sm text-purple-100">Process multiple solutions simultaneously</p>
          </div>
          <div className="text-center">
            <Zap className="w-8 h-8 mx-auto mb-2" />
            <h5 className="font-semibold mb-1">Real-time Optimization</h5>
            <p className="text-sm text-purple-100">Instant optimization of pricing and inventory</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumComputingEngine;
