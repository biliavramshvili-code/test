import React, { useState, useEffect } from 'react';
import { Repeat, Layers, Infinity, Zap, Eye, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecursionLayer {
  id: string;
  depth: number;
  name: string;
  description: string;
  products: RecursiveProduct[];
  active: boolean;
}

interface RecursiveProduct {
  id: string;
  name: string;
  price: number;
  recursionLevel: number;
  containsItself: boolean;
  infiniteVariants: boolean;
}

const InfiniteRecursionShopping: React.FC = () => {
  const [recursionDepth, setRecursionDepth] = useState(Infinity);
  const [activeLayers, setActiveLayers] = useState<RecursionLayer[]>([]);
  const [infiniteLoop, setInfiniteLoop] = useState(true);
  const [paradoxResolution, setParadoxResolution] = useState(true);

  const generateRecursiveProducts = (depth: number): RecursiveProduct[] => {
    return [
      {
        id: `recursive_${depth}_1`,
        name: `Shopping Cart That Contains Itself (Level ${depth})`,
        price: Math.pow(depth, depth) || 999,
        recursionLevel: depth,
        containsItself: true,
        infiniteVariants: true
      },
      {
        id: `recursive_${depth}_2`,
        name: `Product That Shops For Itself (Level ${depth})`,
        price: depth * Infinity || 1999,
        recursionLevel: depth,
        containsItself: true,
        infiniteVariants: true
      },
      {
        id: `recursive_${depth}_3`,
        name: `Store Inside A Store Inside A Store (Level ${depth})`,
        price: Math.pow(Infinity, depth) || 2999,
        recursionLevel: depth,
        containsItself: true,
        infiniteVariants: true
      },
      {
        id: `recursive_${depth}_4`,
        name: `Customer Who Buys Themselves (Level ${depth})`,
        price: depth === 0 ? 1 : depth * generateRecursiveProducts(depth - 1)[0].price,
        recursionLevel: depth,
        containsItself: true,
        infiniteVariants: true
      }
    ];
  };

  const generateRecursionLayers = (): RecursionLayer[] => {
    const layers: RecursionLayer[] = [];
    
    // Generate infinite layers (we'll show first 10 for display)
    for (let i = 0; i < 10; i++) {
      layers.push({
        id: `layer_${i}`,
        depth: i,
        name: i === 0 ? 'Base Reality Layer' : `Recursive Layer ${i}`,
        description: i === 0 
          ? 'The original shopping experience that contains all other layers'
          : `Shopping experience that recursively contains layer ${i-1} and is contained by layer ${i+1}`,
        products: generateRecursiveProducts(i),
        active: true
      });
    }
    
    return layers;
  };

  useEffect(() => {
    setActiveLayers(generateRecursionLayers());
    
    // Simulate infinite recursion updates
    const interval = setInterval(() => {
      setActiveLayers(prev => prev.map(layer => ({
        ...layer,
        products: layer.products.map(product => ({
          ...product,
          price: product.recursionLevel === 0 ? product.price : 
                 product.price * (1 + Math.sin(Date.now() / 1000) * 0.1)
        }))
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleRecursivePurchase = (product: RecursiveProduct, layerDepth: number) => {
    // This creates an infinite loop of purchasing
    console.log(`Purchasing ${product.name} at depth ${layerDepth}`);
    console.log("This purchase triggers itself recursively...");
    
    // In a real implementation, this would create an infinite chain
    if (layerDepth < 5) { // Limit for demo purposes
      setTimeout(() => {
        handleRecursivePurchase(product, layerDepth + 1);
      }, 100);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-8 text-white relative overflow-hidden">
      {/* Infinite Recursion Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, #6366f1 0%, transparent 70%)',
            'radial-gradient(circle at 30% 70%, #8b5cf6 0%, transparent 70%)',
            'radial-gradient(circle at 70% 30%, #ec4899 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, #6366f1 0%, transparent 70%)'
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
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Repeat className="w-8 h-8 text-indigo-400" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold">Infinite Recursion Shopping</h3>
              <p className="text-indigo-200">Shopping experiences that contain themselves infinitely</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-indigo-200">Recursion Depth</div>
            <div className="text-2xl font-bold text-indigo-400">∞</div>
          </div>
        </div>

        {/* Recursion Status */}
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-indigo-500/20 border-2 border-indigo-400 rounded-xl p-4"
            >
              <div className="flex items-center space-x-3">
                <Infinity className="w-6 h-6 text-indigo-400" />
                <span className="text-indigo-400 font-bold text-lg">INFINITE RECURSION ACTIVE</span>
                <Layers className="w-6 h-6 text-purple-400" />
              </div>
            </motion.div>
          </div>
          
          <div className="text-center">
            <p className="text-indigo-200 mb-4">
              Experience shopping that recursively contains itself. Each purchase triggers infinite layers 
              of self-referential commerce, creating paradoxical shopping experiences that transcend logic.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Repeat className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                <div className="text-sm text-indigo-200">Recursion</div>
                <div className="text-xl font-bold text-indigo-400">INFINITE</div>
              </div>
              <div className="text-center">
                <Layers className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-sm text-indigo-200">Layers</div>
                <div className="text-xl font-bold text-purple-400">∞</div>
              </div>
              <div className="text-center">
                <Eye className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <div className="text-sm text-indigo-200">Paradox</div>
                <div className="text-xl font-bold text-pink-400">RESOLVED</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-sm text-indigo-200">Self-Reference</div>
                <div className="text-xl font-bold text-cyan-400">COMPLETE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recursion Layers */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4">Infinite Recursion Layers</h4>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {activeLayers.map((layer, index) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-lg p-4 border border-indigo-500/30"
                style={{ marginLeft: `${index * 20}px` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-semibold text-indigo-300">{layer.name}</h5>
                    <p className="text-sm text-indigo-200">{layer.description}</p>
                  </div>
                  <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold">
                    DEPTH {layer.depth}
                  </span>
                </div>

                {/* Recursive Products */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {layer.products.map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 rounded-lg p-3 border border-purple-500/20"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h6 className="font-medium text-purple-300 text-sm">{product.name}</h6>
                        <span className="text-pink-400 font-bold text-sm">
                          ${isFinite(product.price) ? product.price.toFixed(2) : '∞'}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-indigo-200">
                          Level: {product.recursionLevel}
                        </span>
                        <div className="flex space-x-2">
                          {product.containsItself && (
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full">
                              Self-Containing
                            </span>
                          )}
                          {product.infiniteVariants && (
                            <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full">
                              ∞ Variants
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleRecursivePurchase(product, layer.depth)}
                        className="w-full mt-3 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg text-white text-sm font-medium transition-all"
                      >
                        Purchase Recursively
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Recursion Indicator */}
                {index < activeLayers.length - 1 && (
                  <div className="flex items-center justify-center mt-4">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-indigo-400"
                    >
                      <Zap className="w-4 h-4" />
                    </motion.div>
                    <span className="text-indigo-300 text-sm mx-2">Contains Layer {index + 1}</span>
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="text-indigo-400"
                    >
                      <Zap className="w-4 h-4" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
            
            {/* Infinite Continuation Indicator */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-center py-4"
            >
              <Infinity className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <p className="text-indigo-300 text-sm">
                Recursion continues infinitely...
              </p>
              <p className="text-indigo-200 text-xs">
                Each layer contains all previous layers and is contained by all subsequent layers
              </p>
            </motion.div>
          </div>
        </div>

        {/* Paradox Resolution Status */}
        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h4 className="text-lg font-semibold mb-4">Paradox Resolution Engine</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-green-400" />
              </div>
              <h5 className="font-semibold text-green-300 mb-2">Self-Reference Paradox</h5>
              <p className="text-green-200 text-sm">Successfully resolved through meta-logical transcendence</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Infinity className="w-6 h-6 text-blue-400" />
              </div>
              <h5 className="font-semibold text-blue-300 mb-2">Infinite Regress</h5>
              <p className="text-blue-200 text-sm">Contained within finite computational space</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Eye className="w-6 h-6 text-purple-400" />
              </div>
              <h5 className="font-semibold text-purple-300 mb-2">Logical Contradiction</h5>
              <p className="text-purple-200 text-sm">Transcended through paradoxical logic systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteRecursionShopping;
