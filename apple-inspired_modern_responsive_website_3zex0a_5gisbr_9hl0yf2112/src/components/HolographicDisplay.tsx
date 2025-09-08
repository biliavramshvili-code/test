import React, { useState, useEffect } from 'react';
import { Box, Layers, RotateCcw, Maximize, Eye, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HologramProduct {
  id: number;
  name: string;
  model: string;
  hologramUrl: string;
  dimensions: { width: number; height: number; depth: number };
}

const HolographicDisplay: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<HologramProduct | null>(null);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [scale, setScale] = useState(1);
  const [hologramQuality, setHologramQuality] = useState('ultra');

  const sampleProducts: HologramProduct[] = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      model: "iphone_15_pro.holo",
      hologramUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      dimensions: { width: 71.6, height: 146.6, depth: 8.25 }
    },
    {
      id: 2,
      name: "MacBook Pro 16\"",
      model: "macbook_pro_16.holo",
      hologramUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      dimensions: { width: 355.7, height: 248.1, depth: 16.8 }
    },
    {
      id: 3,
      name: "Apple Watch Ultra",
      model: "watch_ultra.holo",
      hologramUrl: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      dimensions: { width: 49, height: 44, depth: 14.4 }
    }
  ];

  useEffect(() => {
    if (isActive && currentProduct) {
      const interval = setInterval(() => {
        setRotationY(prev => (prev + 1) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isActive, currentProduct]);

  const activateHologram = (product: HologramProduct) => {
    setCurrentProduct(product);
    setIsActive(true);
    setRotationX(0);
    setRotationY(0);
    setScale(1);
  };

  const deactivateHologram = () => {
    setIsActive(false);
    setCurrentProduct(null);
  };

  return (
    <div className="bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Box className="w-8 h-8 text-cyan-400" />
            <motion.div
              className="absolute inset-0"
              animate={{ rotateY: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-purple-400" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Holographic Product Display</h3>
            <p className="text-cyan-200">3D holographic product visualization</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-cyan-200">Status</div>
          <div className={`font-bold ${isActive ? 'text-green-400' : 'text-gray-400'}`}>
            {isActive ? 'ACTIVE' : 'STANDBY'}
          </div>
        </div>
      </div>

      {!isActive ? (
        <div className="space-y-6">
          <div className="text-center py-8">
            <Layers className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Select Product for Holographic Display</h4>
            <p className="text-cyan-200">
              Experience products in stunning 3D holographic detail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 rounded-xl p-4 backdrop-blur-sm cursor-pointer"
                onClick={() => activateHologram(product)}
              >
                <img
                  src={product.hologramUrl}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h5 className="font-semibold mb-1">{product.name}</h5>
                <p className="text-sm text-cyan-200">
                  {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} mm
                </p>
                <button className="w-full mt-3 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 py-2 rounded-lg text-sm hover:bg-cyan-500/30 transition-all">
                  Activate Hologram
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Holographic Display Area */}
          <div className="relative bg-black/30 rounded-2xl p-8 min-h-96 flex items-center justify-center border-2 border-cyan-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl"></div>
            
            {/* Hologram Effect */}
            <motion.div
              className="relative"
              style={{
                transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${scale})`,
              }}
            >
              <div className="relative">
                <img
                  src={currentProduct?.hologramUrl}
                  alt={currentProduct?.name}
                  className="w-64 h-64 object-contain filter drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 0 20px cyan) drop-shadow(0 0 40px purple) brightness(1.2) contrast(1.1)'
                  }}
                />
                
                {/* Holographic Grid Lines */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent opacity-50"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-50"></div>
                
                {/* Scanning Lines */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent h-2"
                  animate={{ y: [0, 256, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>

            {/* Corner Indicators */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-8 h-8 border-2 border-cyan-400 ${
                  i === 0 ? 'top-4 left-4 border-r-0 border-b-0' :
                  i === 1 ? 'top-4 right-4 border-l-0 border-b-0' :
                  i === 2 ? 'bottom-4 left-4 border-r-0 border-t-0' :
                  'bottom-4 right-4 border-l-0 border-t-0'
                }`}
              />
            ))}
          </div>

          {/* Product Info */}
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold">{currentProduct?.name}</h4>
                <p className="text-cyan-200">Holographic Model: {currentProduct?.model}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-cyan-200">Quality</div>
                <div className="font-bold text-green-400">{hologramQuality.toUpperCase()}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-sm text-cyan-200">Width</div>
                <div className="font-bold">{currentProduct?.dimensions.width} mm</div>
              </div>
              <div>
                <div className="text-sm text-cyan-200">Height</div>
                <div className="font-bold">{currentProduct?.dimensions.height} mm</div>
              </div>
              <div>
                <div className="text-sm text-cyan-200">Depth</div>
                <div className="font-bold">{currentProduct?.dimensions.depth} mm</div>
              </div>
            </div>
          </div>

          {/* Hologram Controls */}
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h5 className="font-semibold mb-4">Hologram Controls</h5>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <button
                onClick={() => setRotationX(prev => prev + 15)}
                className="flex items-center justify-center space-x-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 py-2 rounded-lg hover:bg-cyan-500/30 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Rotate X</span>
              </button>
              <button
                onClick={() => setRotationY(prev => prev + 15)}
                className="flex items-center justify-center space-x-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 py-2 rounded-lg hover:bg-purple-500/30 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm">Rotate Y</span>
              </button>
              <button
                onClick={() => setScale(prev => Math.min(prev + 0.2, 2))}
                className="flex items-center justify-center space-x-2 bg-green-500/20 border border-green-500/30 text-green-300 py-2 rounded-lg hover:bg-green-500/30 transition-all"
              >
                <Maximize className="w-4 h-4" />
                <span className="text-sm">Zoom In</span>
              </button>
              <button
                onClick={() => setScale(prev => Math.max(prev - 0.2, 0.5))}
                className="flex items-center justify-center space-x-2 bg-red-500/20 border border-red-500/30 text-red-300 py-2 rounded-lg hover:bg-red-500/30 transition-all"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">Zoom Out</span>
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setRotationX(0);
                  setRotationY(0);
                  setScale(1);
                }}
                className="flex-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 py-2 rounded-lg hover:bg-blue-500/30 transition-all"
              >
                Reset View
              </button>
              <button
                onClick={deactivateHologram}
                className="flex-1 bg-red-500/20 border border-red-500/30 text-red-300 py-2 rounded-lg hover:bg-red-500/30 transition-all"
              >
                Deactivate Hologram
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HolographicDisplay;
