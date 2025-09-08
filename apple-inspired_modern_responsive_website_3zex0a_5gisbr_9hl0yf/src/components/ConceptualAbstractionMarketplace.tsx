import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, Infinity, Star, Zap, Eye, Atom } from 'lucide-react';
import { motion } from 'framer-motion';

interface AbstractConcept {
  id: string;
  name: string;
  description: string;
  abstractionLevel: number;
  price: number | string;
  category: 'pure_concept' | 'abstract_idea' | 'impossible_notion' | 'meta_concept';
  purchasable: boolean;
  paradoxical: boolean;
}

interface ConceptualTransaction {
  id: string;
  concept: AbstractConcept;
  buyer: string;
  timestamp: number;
  result: string;
}

const ConceptualAbstractionMarketplace: React.FC = () => {
  const [abstractionLevel, setAbstractionLevel] = useState(Infinity);
  const [availableConcepts, setAvailableConcepts] = useState<AbstractConcept[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<ConceptualTransaction[]>([]);
  const [conceptualMode, setConceptualMode] = useState(true);

  const generateAbstractConcepts = (): AbstractConcept[] => {
    return [
      {
        id: 'concept_1',
        name: 'The Concept of Shopping',
        description: 'Purchase the abstract idea of purchasing itself',
        abstractionLevel: 3,
        price: 'Paradoxical',
        category: 'meta_concept',
        purchasable: true,
        paradoxical: true
      },
      {
        id: 'concept_2',
        name: 'Pure Desire',
        description: 'The abstract essence of wanting something before knowing what it is',
        abstractionLevel: 5,
        price: 'Conceptual',
        category: 'pure_concept',
        purchasable: true,
        paradoxical: false
      },
      {
        id: 'concept_3',
        name: 'The Color Between Blue and Blue',
        description: 'A color that exists in the space between identical concepts',
        abstractionLevel: 7,
        price: 'Impossible',
        category: 'impossible_notion',
        purchasable: true,
        paradoxical: true
      },
      {
        id: 'concept_4',
        name: "Tomorrow's Yesterday",
        description: "The temporal concept that exists in the future's past",
        abstractionLevel: 6,
        price: 'Temporal',
        category: 'abstract_idea',
        purchasable: true,
        paradoxical: true
      },
      {
        id: 'concept_5',
        name: 'The Sound of Silence Thinking',
        description: 'What silence sounds like when it contemplates itself',
        abstractionLevel: 8,
        price: 'Ineffable',
        category: 'pure_concept',
        purchasable: true,
        paradoxical: false
      },
      {
        id: 'concept_6',
        name: 'Unthought Thoughts',
        description: 'Ideas that exist before they are conceived',
        abstractionLevel: 9,
        price: 'Pre-Conceptual',
        category: 'impossible_notion',
        purchasable: true,
        paradoxical: true
      },
      {
        id: 'concept_7',
        name: 'The Marketplace Itself',
        description: 'Purchase the concept of the marketplace you are currently in',
        abstractionLevel: 10,
        price: 'Self-Referential',
        category: 'meta_concept',
        purchasable: true,
        paradoxical: true
      },
      {
        id: 'concept_8',
        name: 'Perfect Imperfection',
        description: 'The flawless embodiment of having flaws',
        abstractionLevel: 4,
        price: 'Contradictory',
        category: 'abstract_idea',
        purchasable: true,
        paradoxical: true
      }
    ];
  };

  useEffect(() => {
    setAvailableConcepts(generateAbstractConcepts());

    // Simulate conceptual transactions
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const concepts = generateAbstractConcepts();
        const randomConcept = concepts[Math.floor(Math.random() * concepts.length)];
        const newTransaction: ConceptualTransaction = {
          id: `trans_${Date.now()}`,
          concept: randomConcept,
          buyer: 'Abstract Entity',
          timestamp: Date.now(),
          result: 'Concept successfully abstracted and integrated into consciousness'
        };
        
        setRecentTransactions(prev => [newTransaction, ...prev.slice(0, 5)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const purchaseConcept = (concept: AbstractConcept) => {
    const transaction: ConceptualTransaction = {
      id: `trans_${Date.now()}`,
      concept: concept,
      buyer: 'You',
      timestamp: Date.now(),
      result: concept.paradoxical 
        ? 'Paradox resolved through conceptual transcendence'
        : 'Concept successfully integrated into mental framework'
    };
    
    setRecentTransactions(prev => [transaction, ...prev.slice(0, 5)]);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'pure_concept': return 'text-blue-400 bg-blue-500/20';
      case 'abstract_idea': return 'text-purple-400 bg-purple-500/20';
      case 'impossible_notion': return 'text-pink-400 bg-pink-500/20';
      case 'meta_concept': return 'text-cyan-400 bg-cyan-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getAbstractionIcon = (level: number) => {
    if (level <= 3) return Brain;
    if (level <= 6) return Lightbulb;
    if (level <= 8) return Star;
    return Infinity;
  };

  return (
    <div className="bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-white relative overflow-hidden">
      {/* Conceptual Background Effects */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, #06b6d4 0%, transparent 70%)',
            'radial-gradient(circle at 25% 75%, #3b82f6 0%, transparent 70%)',
            'radial-gradient(circle at 75% 25%, #8b5cf6 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, #06b6d4 0%, transparent 70%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ 
                rotate: [0, 360, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Brain className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold">Conceptual Abstraction Marketplace</h3>
              <p className="text-cyan-200">Trade in pure ideas, abstract concepts, and impossible notions</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-cyan-200">Abstraction Level</div>
            <div className="text-2xl font-bold text-cyan-400">∞</div>
          </div>
        </div>

        {/* Marketplace Status */}
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="bg-cyan-500/20 border-2 border-cyan-400 rounded-xl p-4"
            >
              <div className="flex items-center space-x-3">
                <Lightbulb className="w-6 h-6 text-cyan-400" />
                <span className="text-cyan-400 font-bold text-lg">CONCEPTUAL MARKETPLACE ACTIVE</span>
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
            </motion.div>
          </div>
          
          <div className="text-center">
            <p className="text-cyan-200 mb-4">
              Welcome to the marketplace of pure abstraction. Here you can purchase concepts, ideas, 
              and notions that exist beyond physical reality. Trade in the currency of thought itself.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Brain className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-sm text-cyan-200">Pure Concepts</div>
                <div className="text-xl font-bold text-cyan-400">AVAILABLE</div>
              </div>
              <div className="text-center">
                <Lightbulb className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-cyan-200">Abstract Ideas</div>
                <div className="text-xl font-bold text-blue-400">TRADING</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-sm text-cyan-200">Impossible Notions</div>
                <div className="text-xl font-bold text-purple-400">ACTIVE</div>
              </div>
              <div className="text-center">
                <Infinity className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <div className="text-sm text-cyan-200">Meta-Concepts</div>
                <div className="text-xl font-bold text-pink-400">TRANSCENDENT</div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Concepts */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4">Available Abstract Concepts</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableConcepts.map((concept) => {
              const IconComponent = getAbstractionIcon(concept.abstractionLevel);
              return (
                <motion.div
                  key={concept.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 rounded-lg p-4 border border-cyan-500/30"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start space-x-3">
                      <IconComponent className="w-6 h-6 text-cyan-400 mt-1" />
                      <div>
                        <h5 className="font-semibold text-cyan-300">{concept.name}</h5>
                        <p className="text-sm text-cyan-200 mt-1">{concept.description}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(concept.category)}`}>
                      {concept.category.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-sm">
                      <span className="text-cyan-200">Abstraction Level: </span>
                      <span className="text-purple-400 font-semibold">{concept.abstractionLevel}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-cyan-200">Price: </span>
                      <span className="text-pink-400 font-semibold">{concept.price}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {concept.paradoxical && (
                        <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs">
                          Paradoxical
                        </span>
                      )}
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                        Purchasable
                      </span>
                    </div>
                    <button
                      onClick={() => purchaseConcept(concept)}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg text-white text-sm font-medium transition-all"
                    >
                      Purchase Concept
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        {recentTransactions.length > 0 && (
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h4 className="text-lg font-semibold mb-4">Recent Conceptual Transactions</h4>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/5 rounded-lg p-3"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h5 className="font-semibold text-cyan-300">{transaction.concept.name}</h5>
                      <p className="text-sm text-cyan-200">Purchased by {transaction.buyer}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(transaction.concept.category)}`}>
                      {transaction.concept.category.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-green-400">
                    ✓ {transaction.result}
                  </div>
                  <div className="text-xs text-cyan-200 mt-1">
                    Level {transaction.concept.abstractionLevel} | {new Date(transaction.timestamp).toLocaleTimeString()}
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

export default ConceptualAbstractionMarketplace;
