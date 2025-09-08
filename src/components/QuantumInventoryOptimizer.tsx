import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Atom, TrendingUp, Zap, BarChart3, AlertTriangle, CheckCircle } from 'lucide-react';

const QuantumInventoryOptimizer: React.FC = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [quantumState, setQuantumState] = useState('superposition');

  useEffect(() => {
    if (isOptimizing) {
      const interval = setInterval(() => {
        setOptimizationProgress(prev => {
          if (prev >= 100) {
            setIsOptimizing(false);
            setQuantumState('collapsed');
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isOptimizing]);

  const startOptimization = () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);
    setQuantumState('entangled');
  };

  const inventoryMetrics = [
    { label: 'Quantum Efficiency', value: '99.7%', trend: '+12%' },
    { label: 'Superposition States', value: '2,847', trend: '+34%' },
    { label: 'Entangled Products', value: '1,293', trend: '+8%' },
    { label: 'Probability Accuracy', value: '94.2%', trend: '+15%' }
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Quantum Inventory Optimizer
          </h2>
          <p className="text-gray-600">
            Leverage quantum computing for optimal inventory management across parallel realities
          </p>
        </div>
        <motion.div
          animate={{ rotate: isOptimizing ? 360 : 0 }}
          transition={{ duration: 2, repeat: isOptimizing ? Infinity : 0, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center"
        >
          <Atom className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quantum Control Panel */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quantum Control Panel</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Quantum State:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                quantumState === 'superposition' ? 'bg-blue-100 text-blue-800' :
                quantumState === 'entangled' ? 'bg-purple-100 text-purple-800' :
                'bg-green-100 text-green-800'
              }`}>
                {quantumState.charAt(0).toUpperCase() + quantumState.slice(1)}
              </span>
            </div>

            {isOptimizing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Optimization Progress</span>
                  <span>{optimizationProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full"
                    style={{ width: `${optimizationProgress}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={startOptimization}
              disabled={isOptimizing}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 transition-colors disabled:opacity-50"
            >
              {isOptimizing ? 'Optimizing Quantum States...' : 'Start Quantum Optimization'}
            </button>
          </div>
        </div>

        {/* Quantum Metrics */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quantum Metrics</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {inventoryMetrics.map((metric, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{metric.label}</span>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-sm text-green-600">{metric.trend}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quantum Inventory Visualization */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Quantum Inventory States</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'iPhone 15 Pro', states: 847, probability: 0.94, status: 'optimal' },
            { name: 'MacBook Pro M3', states: 623, probability: 0.87, status: 'warning' },
            { name: 'Apple Watch Ultra', states: 1205, probability: 0.98, status: 'optimal' }
          ].map((product, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                {product.status === 'optimal' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quantum States:</span>
                  <span className="font-medium">{product.states.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Probability:</span>
                  <span className="font-medium">{(product.probability * 100).toFixed(1)}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      product.status === 'optimal' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${product.probability * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuantumInventoryOptimizer;
