import React, { useState, useEffect } from 'react';
import { Target, Zap, Star, Eye, Infinity, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProbabilityEvent {
  id: string;
  name: string;
  baseProbability: number;
  manipulatedProbability: number;
  outcome: 'pending' | 'success' | 'failure' | 'impossible';
  category: 'purchase' | 'delivery' | 'satisfaction' | 'return' | 'recommendation';
  manipulationLevel: number;
}

interface ProbabilityField {
  id: string;
  name: string;
  strength: number;
  radius: number;
  active: boolean;
  effects: string[];
}

const ProbabilityManipulationEngine: React.FC = () => {
  const [probabilityEvents, setProbabilityEvents] = useState<ProbabilityEvent[]>([]);
  const [activeFields, setActiveFields] = useState<ProbabilityField[]>([]);
  const [manipulationPower, setManipulationPower] = useState(0.85);
  const [realityStability, setRealityStability] = useState(0.92);

  const generateProbabilityEvents = (): ProbabilityEvent[] => {
    return [
      {
        id: 'event_1',
        name: 'Customer Finds Perfect Product',
        baseProbability: 0.15,
        manipulatedProbability: 0.95,
        outcome: 'pending',
        category: 'purchase',
        manipulationLevel: 8
      },
      {
        id: 'event_2',
        name: 'Instant Delivery Success',
        baseProbability: 0.05,
        manipulatedProbability: 0.88,
        outcome: 'pending',
        category: 'delivery',
        manipulationLevel: 9
      },
      {
        id: 'event_3',
        name: 'Product Exceeds Expectations',
        baseProbability: 0.25,
        manipulatedProbability: 0.92,
        outcome: 'pending',
        category: 'satisfaction',
        manipulationLevel: 7
      },
      {
        id: 'event_4',
        name: 'Zero Return Rate',
        baseProbability: 0.02,
        manipulatedProbability: 0.75,
        outcome: 'pending',
        category: 'return',
        manipulationLevel: 10
      },
      {
        id: 'event_5',
        name: 'Viral Product Recommendation',
        baseProbability: 0.001,
        manipulatedProbability: 0.65,
        outcome: 'pending',
        category: 'recommendation',
        manipulationLevel: 10
      },
      {
        id: 'event_6',
        name: 'Customer Becomes Brand Ambassador',
        baseProbability: 0.008,
        manipulatedProbability: 0.78,
        outcome: 'pending',
        category: 'recommendation',
        manipulationLevel: 9
      }
    ];
  };

  const generateProbabilityFields = (): ProbabilityField[] => {
    return [
      {
        id: 'field_1',
        name: 'Serendipity Enhancement Field',
        strength: 0.9,
        radius: 1000,
        active: true,
        effects: ['Increases lucky discoveries', 'Enhances product matching', 'Boosts satisfaction']
      },
      {
        id: 'field_2',
        name: 'Temporal Probability Distortion',
        strength: 0.85,
        radius: 500,
        active: true,
        effects: ['Accelerates delivery times', 'Reduces wait times', 'Synchronizes events']
      },
      {
        id: 'field_3',
        name: 'Desire Amplification Matrix',
        strength: 0.92,
        radius: 2000,
        active: true,
        effects: ['Increases purchase intent', 'Enhances product appeal', 'Reduces decision time']
      },
      {
        id: 'field_4',
        name: 'Satisfaction Guarantee Field',
        strength: 0.88,
        radius: 1500,
        active: true,
        effects: ['Ensures positive outcomes', 'Minimizes disappointment', 'Maximizes joy']
      },
      {
        id: 'field_5',
        name: 'Impossibility Negation Zone',
        strength: 0.95,
        radius: 100,
        active: true,
        effects: ['Makes impossible possible', 'Breaks probability limits', 'Transcends logic']
      }
    ];
  };

  useEffect(() => {
    setProbabilityEvents(generateProbabilityEvents());
    setActiveFields(generateProbabilityFields());

    // Simulate probability manipulations
    const interval = setInterval(() => {
      // Update manipulation power
      setManipulationPower(prev => Math.max(0.7, Math.min(1.0, prev + (Math.random() - 0.5) * 0.1)));
      
      // Update reality stability
      setRealityStability(prev => Math.max(0.8, Math.min(1.0, prev + (Math.random() - 0.5) * 0.05)));

      // Randomly resolve some events
      setProbabilityEvents(prev => prev.map(event => {
        if (event.outcome === 'pending' && Math.random() < 0.2) {
          const success = Math.random() < event.manipulatedProbability;
          return {
            ...event,
            outcome: success ? 'success' : 'failure'
          };
        }
        return event;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const manipulateProbability = (eventId: string, newProbability: number) => {
    setProbabilityEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          manipulatedProbability: Math.max(0, Math.min(1, newProbability)),
          manipulationLevel: Math.ceil((newProbability - event.baseProbability) * 10)
        };
      }
      return event;
    }));
  };

  const resetEvent = (eventId: string) => {
    setProbabilityEvents(prev => prev.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          outcome: 'pending'
        };
      }
      return event;
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'purchase': return 'text-green-400 bg-green-500/20';
      case 'delivery': return 'text-blue-400 bg-blue-500/20';
      case 'satisfaction': return 'text-purple-400 bg-purple-500/20';
      case 'return': return 'text-orange-400 bg-orange-500/20';
      case 'recommendation': return 'text-pink-400 bg-pink-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'success': return 'text-green-400';
      case 'failure': return 'text-red-400';
      case 'impossible': return 'text-purple-400';
      default: return 'text-yellow-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 rounded-2xl p-8 text-white relative overflow-hidden">
      {/* Probability Manipulation Background */}
      <motion.div
        className="absolute inset-0 opacity-25"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, #10b981 0%, transparent 70%)',
            'radial-gradient(circle at 30% 70%, #14b8a6 0%, transparent 70%)',
            'radial-gradient(circle at 70% 30%, #06b6d4 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, #10b981 0%, transparent 70%)'
          ]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ 
                rotate: [0, 360, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Target className="w-8 h-8 text-emerald-400" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold">Probability Manipulation Engine</h3>
              <p className="text-emerald-200">Alter the likelihood of favorable outcomes</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-emerald-200">Manipulation Power</div>
            <div className="text-2xl font-bold text-emerald-400">{(manipulationPower * 100).toFixed(1)}%</div>
          </div>
        </div>

        {/* Engine Status */}
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="bg-emerald-500/20 border-2 border-emerald-400 rounded-xl p-4"
            >
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-emerald-400" />
                <span className="text-emerald-400 font-bold text-lg">PROBABILITY MANIPULATION ACTIVE</span>
                <TrendingUp className="w-6 h-6 text-teal-400" />
              </div>
            </motion.div>
          </div>
          
          <div className="text-center">
            <p className="text-emerald-200 mb-4">
              Actively manipulating probability fields to ensure favorable outcomes. 
              Reality bends to optimize customer satisfaction and business success.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Target className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <div className="text-sm text-emerald-200">Manipulation</div>
                <div className="text-xl font-bold text-emerald-400">ACTIVE</div>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                <div className="text-sm text-emerald-200">Fields</div>
                <div className="text-xl font-bold text-teal-400">{activeFields.length}</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-sm text-emerald-200">Reality Stability</div>
                <div className="text-xl font-bold text-cyan-400">{(realityStability * 100).toFixed(0)}%</div>
              </div>
              <div className="text-center">
                <Infinity className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-emerald-200">Possibilities</div>
                <div className="text-xl font-bold text-blue-400">UNLIMITED</div>
              </div>
            </div>
          </div>
        </div>

        {/* Probability Events */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4">Active Probability Manipulations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {probabilityEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 rounded-lg p-4 border border-emerald-500/30"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h5 className="font-semibold text-emerald-300">{event.name}</h5>
                    <p className="text-sm text-emerald-200">Manipulation Level: {event.manipulationLevel}/10</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(event.category)}`}>
                    {event.category.toUpperCase()}
                  </span>
                </div>

                {/* Probability Comparison */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-emerald-200">Base Probability</span>
                    <span className="text-sm text-red-400">{(event.baseProbability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className="bg-red-400 h-2 rounded-full"
                      style={{ width: `${event.baseProbability * 100}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-emerald-200">Manipulated Probability</span>
                    <span className="text-sm text-green-400">{(event.manipulatedProbability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className="bg-green-400 h-2 rounded-full"
                      animate={{ width: `${event.manipulatedProbability * 100}%` }}
                    />
                  </div>
                </div>

                {/* Outcome Status */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-emerald-200">Outcome:</span>
                  <span className={`text-sm font-semibold ${getOutcomeColor(event.outcome)}`}>
                    {event.outcome.toUpperCase()}
                  </span>
                </div>

                {/* Probability Slider */}
                <div className="mb-3">
                  <label className="text-xs text-emerald-200 mb-1 block">Adjust Probability</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={event.manipulatedProbability}
                    onChange={(e) => manipulateProbability(event.id, parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Action Button */}
                {event.outcome !== 'pending' && (
                  <button
                    onClick={() => resetEvent(event.id)}
                    className="w-full px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-lg text-white text-sm font-medium transition-all"
                  >
                    Reset Event
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Probability Fields */}
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h4 className="text-lg font-semibold mb-4">Active Probability Fields</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeFields.map((field) => (
              <motion.div
                key={field.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <h5 className="font-semibold text-emerald-300">{field.name}</h5>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    field.active ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'
                  }`}>
                    {field.active ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-emerald-200">Strength</span>
                    <span className="text-sm text-teal-400">{(field.strength * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-teal-400 h-2 rounded-full"
                      style={{ width: `${field.strength * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <span className="text-sm text-emerald-200">Radius: </span>
                  <span className="text-sm text-cyan-400">{field.radius}m</span>
                </div>
                
                <div>
                  <p className="text-xs text-emerald-200 mb-2">Effects:</p>
                  <div className="space-y-1">
                    {field.effects.map((effect, index) => (
                      <div key={index} className="text-xs text-emerald-300">
                        • {effect}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProbabilityManipulationEngine;
