import React, { useState, useEffect } from 'react';
import { Brain, Zap, Eye, Activity, Waves, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface BrainSignal {
  type: 'alpha' | 'beta' | 'gamma' | 'theta';
  strength: number;
  frequency: number;
}

interface ThoughtCommand {
  id: string;
  thought: string;
  confidence: number;
  action: string;
  timestamp: Date;
}

const NeuralInterfaceShopping: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [brainSignals, setBrainSignals] = useState<BrainSignal[]>([]);
  const [thoughtCommands, setThoughtCommands] = useState<ThoughtCommand[]>([]);
  const [calibrating, setCalibrating] = useState(false);
  const [neuralActivity, setNeuralActivity] = useState(0);

  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        // Simulate brain signal monitoring
        const signals: BrainSignal[] = [
          { type: 'alpha', strength: Math.random() * 100, frequency: 8 + Math.random() * 5 },
          { type: 'beta', strength: Math.random() * 100, frequency: 13 + Math.random() * 17 },
          { type: 'gamma', strength: Math.random() * 100, frequency: 30 + Math.random() * 70 },
          { type: 'theta', strength: Math.random() * 100, frequency: 4 + Math.random() * 4 }
        ];
        setBrainSignals(signals);
        setNeuralActivity(Math.random() * 100);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isConnected]);

  const connectNeuralInterface = async () => {
    setCalibrating(true);
    
    // Simulate neural interface calibration
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsConnected(true);
    setCalibrating(false);
    
    // Add sample thought commands
    const sampleCommands: ThoughtCommand[] = [
      {
        id: '1',
        thought: "I want to see iPhone 15 Pro",
        confidence: 0.94,
        action: "show_product",
        timestamp: new Date()
      },
      {
        id: '2',
        thought: "Add to cart",
        confidence: 0.89,
        action: "add_to_cart",
        timestamp: new Date()
      }
    ];
    
    setThoughtCommands(sampleCommands);
  };

  const disconnectInterface = () => {
    setIsConnected(false);
    setBrainSignals([]);
    setThoughtCommands([]);
    setNeuralActivity(0);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Brain className="w-8 h-8 text-pink-400" />
            {isConnected && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold">Neural Interface Shopping</h3>
            <p className="text-purple-200">Shop with your thoughts</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-purple-200">Status</div>
          <div className={`font-bold ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
            {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
          </div>
        </div>
      </div>

      {!isConnected ? (
        <div className="text-center py-12">
          <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h4 className="text-xl font-semibold mb-2">Connect Neural Interface</h4>
          <p className="text-purple-200 mb-6">
            Enable thought-based shopping with our advanced brain-computer interface
          </p>
          <button
            onClick={connectNeuralInterface}
            disabled={calibrating}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50"
          >
            {calibrating ? (
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Activity className="w-5 h-5" />
                </motion.div>
                <span>Calibrating Neural Patterns...</span>
              </div>
            ) : (
              "Connect Neural Interface"
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Neural Activity Monitor */}
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Neural Activity Monitor</h4>
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-bold">{neuralActivity.toFixed(1)}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {brainSignals.map((signal, index) => (
                <div key={index} className="text-center">
                  <div className="text-sm text-purple-200 capitalize">{signal.type} Wave</div>
                  <div className="text-lg font-bold text-cyan-400">
                    {signal.strength.toFixed(1)}%
                  </div>
                  <div className="text-xs text-purple-300">
                    {signal.frequency.toFixed(1)} Hz
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thought Commands */}
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Detected Thoughts</h4>
              <Waves className="w-5 h-5 text-purple-400" />
            </div>
            
            <div className="space-y-3">
              {thoughtCommands.map((command) => (
                <motion.div
                  key={command.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Eye className="w-4 h-4 text-pink-400" />
                    <div>
                      <div className="font-medium">"{command.thought}"</div>
                      <div className="text-sm text-purple-200">
                        Action: {command.action.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-purple-200">Confidence</div>
                    <div className="font-bold text-green-400">
                      {(command.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Neural Shopping Controls */}
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h4 className="text-lg font-semibold mb-4">Neural Shopping Commands</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { command: "Show Products", thought: "Think: 'show products'" },
                { command: "Add to Cart", thought: "Think: 'add to cart'" },
                { command: "Search Item", thought: "Think: 'search [item]'" },
                { command: "View Cart", thought: "Think: 'view cart'" },
                { command: "Checkout", thought: "Think: 'checkout'" },
                { command: "Help", thought: "Think: 'help'" }
              ].map((item, index) => (
                <div key={index} className="p-3 bg-white/5 rounded-lg text-center">
                  <div className="font-medium text-sm">{item.command}</div>
                  <div className="text-xs text-purple-200 mt-1">{item.thought}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={disconnectInterface}
            className="w-full bg-red-500/20 border border-red-500/30 text-red-300 py-3 rounded-xl font-semibold hover:bg-red-500/30 transition-all"
          >
            Disconnect Neural Interface
          </button>
        </div>
      )}
    </div>
  );
};

export default NeuralInterfaceShopping;
