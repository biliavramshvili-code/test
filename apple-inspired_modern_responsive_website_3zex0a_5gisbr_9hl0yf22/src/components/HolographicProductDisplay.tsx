import React, { useState, useEffect } from 'react';
import { Box, Layers, RotateCcw, Maximize, Eye, Sparkles, Zap, Monitor, Cpu, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

interface HologramProduct {
  id: number;
  name: string;
  model: string;
  hologramUrl: string;
  dimensions: { width: number; height: number; depth: number };
  price: number;
  category: string;
}

interface HologramSettings {
  quality: 'standard' | 'high' | 'ultra' | 'quantum';
  projection: '2D' | '3D' | '4D' | 'holographic';
  lighting: 'ambient' | 'dramatic' | 'studio' | 'dynamic';
  effects: boolean;
}

const HolographicProductDisplay: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<HologramProduct | null>(null);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);
  const [scale, setScale] = useState(1);
  const [settings, setSettings] = useState<HologramSettings>({
    quality: 'ultra',
    projection: 'holographic',
    lighting: 'dynamic',
    effects: true
  });
  const [isScanning, setIsScanning] = useState(false);
  const [hologramIntensity, setHologramIntensity] = useState(100);

  const sampleProducts: HologramProduct[] = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      model: "iphone_15_pro_max.holo",
      hologramUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      dimensions: { width: 76.7, height: 159.9, depth: 8.25 },
      price: 1199,
      category: "Smartphone"
    },
    {
      id: 2,
      name: "MacBook Pro 16\" M3 Max",
      model: "macbook_pro_16_m3.holo",
      hologramUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      dimensions: { width: 355.7, height: 248.1, depth: 16.8 },
      price: 3499,
      category: "Laptop"
    },
    {
      id: 3,
      name: "Apple Watch Ultra 2",
      model: "watch_ultra_2.holo",
      hologramUrl: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      dimensions: { width: 49, height: 44, depth: 14.4 },
      price: 799,
      category: "Wearable"
    },
    {
      id: 4,
      name: "iPad Pro 12.9\" M4",
      model: "ipad_pro_129_m4.holo",
      hologramUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      dimensions: { width: 214.9, height: 280.6, depth: 5.1 },
      price: 1299,
      category: "Tablet"
    }
  ];

  useEffect(() => {
    if (isActive && currentProduct && settings.effects) {
      const interval = setInterval(() => {
        setRotationY(prev => (prev + 0.5) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isActive, currentProduct, settings.effects]);

  useEffect(() => {
    if (isScanning) {
      const timeout = setTimeout(() => {
        setIsScanning(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isScanning]);

  const activateHologram = (product: HologramProduct) => {
    setCurrentProduct(product);
    setIsActive(true);
    setIsScanning(true);
    setRotationX(0);
    setRotationY(0);
    setRotationZ(0);
    setScale(1);
  };

  const deactivateHologram = () => {
    setIsActive(false);
    setCurrentProduct(null);
    setIsScanning(false);
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'quantum': return 'text-purple-400';
      case 'ultra': return 'text-cyan-400';
      case 'high': return 'text-blue-400';
      default: return 'text-green-400';
    }
  };

  const getProjectionEffect = () => {
    switch (settings.projection) {
      case '4D': return 'drop-shadow(0 0 30px cyan) drop-shadow(0 0 60px purple) brightness(1.4) contrast(1.3)';
      case 'holographic': return 'drop-shadow(0 0 20px cyan) drop-shadow(0 0 40px purple) brightness(1.2) contrast(1.1)';
      case '3D': return 'drop-shadow(0 0 15px blue) brightness(1.1)';
      default: return 'drop-shadow(0 0 10px gray)';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-cyan-900 rounded-2xl p-8 text-white min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Box className="w-10 h-10 text-cyan-400" />
            <motion.div
              className="absolute inset-0"
              animate={{ rotateY: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-10 h-10 text-purple-400" />
            </motion.div>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Holographic Product Display
            </h1>
            <p className="text-cyan-200 text-lg">Advanced 4D holographic product visualization system</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-cyan-200">System Status</div>
          <div className={`font-bold text-xl ${isActive ? 'text-green-400' : 'text-gray-400'}`}>
            {isActive ? 'HOLOGRAM ACTIVE' : 'STANDBY MODE'}
          </div>
          {isActive && (
            <div className="text-sm text-purple-300">
              Projection: {settings.projection.toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {!isActive ? (
        <div className="space-y-8">
          {/* Product Selection */}
          <div className="text-center py-12">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Layers className="w-12 h-12 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Select Product for Holographic Display</h2>
            <p className="text-xl text-cyan-200 mb-8">
              Experience products in stunning 4D holographic detail with quantum-enhanced visualization
            </p>
          </div>

          {/* Hologram Settings */}
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm mb-8">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <Monitor className="w-6 h-6" />
              <span>Hologram Configuration</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">Quality</label>
                <select
                  value={settings.quality}
                  onChange={(e) => setSettings(prev => ({ ...prev, quality: e.target.value as any }))}
                  className="w-full bg-black/30 border border-cyan-500/30 rounded-lg px-3 py-2 text-white"
                >
                  <option value="standard">Standard</option>
                  <option value="high">High Definition</option>
                  <option value="ultra">Ultra HD</option>
                  <option value="quantum">Quantum Enhanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">Projection Mode</label>
                <select
                  value={settings.projection}
                  onChange={(e) => setSettings(prev => ({ ...prev, projection: e.target.value as any }))}
                  className="w-full bg-black/30 border border-cyan-500/30 rounded-lg px-3 py-2 text-white"
                >
                  <option value="2D">2D Display</option>
                  <option value="3D">3D Projection</option>
                  <option value="4D">4D Immersive</option>
                  <option value="holographic">Holographic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">Lighting</label>
                <select
                  value={settings.lighting}
                  onChange={(e) => setSettings(prev => ({ ...prev, lighting: e.target.value as any }))}
                  className="w-full bg-black/30 border border-cyan-500/30 rounded-lg px-3 py-2 text-white"
                >
                  <option value="ambient">Ambient</option>
                  <option value="dramatic">Dramatic</option>
                  <option value="studio">Studio</option>
                  <option value="dynamic">Dynamic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cyan-200 mb-2">Effects</label>
                <button
                  onClick={() => setSettings(prev => ({ ...prev, effects: !prev.effects }))}
                  className={`w-full px-3 py-2 rounded-lg border transition-all ${
                    settings.effects
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300'
                      : 'bg-gray-500/20 border-gray-500/50 text-gray-300'
                  }`}
                >
                  {settings.effects ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm cursor-pointer border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
                onClick={() => activateHologram(product)}
              >
                <div className="relative mb-4">
                  <img
                    src={product.hologramUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
                  <div className="absolute top-2 right-2 bg-purple-500/80 text-white text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </div>
                </div>
                
                <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                <p className="text-cyan-200 text-sm mb-3">
                  {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} mm
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-400">${product.price}</span>
                  <button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:from-cyan-600 hover:to-purple-700 transition-all flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Activate</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Holographic Display Chamber */}
          <div className="relative bg-black/40 rounded-3xl p-12 min-h-96 border-2 border-cyan-500/30 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl" />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
                {[...Array(96)].map((_, i) => (
                  <div key={i} className="border border-cyan-400/20" />
                ))}
              </div>
            </div>

            {/* Hologram Display */}
            <div className="relative flex items-center justify-center h-full">
              <motion.div
                className="relative"
                style={{
                  transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg) scale(${scale})`,
                }}
                animate={settings.effects ? {
                  y: [0, -10, 0],
                } : {}}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="relative">
                  <img
                    src={currentProduct?.hologramUrl}
                    alt={currentProduct?.name}
                    className="w-80 h-80 object-contain"
                    style={{
                      filter: getProjectionEffect(),
                      opacity: hologramIntensity / 100
                    }}
                  />
                  
                  {/* Holographic Effects */}
                  {settings.effects && (
                    <>
                      {/* Scanning Lines */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent h-4"
                        animate={{ y: [0, 320, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      
                      {/* Particle Effects */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                      
                      {/* Energy Rings */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute border-2 border-purple-400/30 rounded-full"
                          style={{
                            width: `${(i + 1) * 100}px`,
                            height: `${(i + 1) * 100}px`,
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0, 0.3],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Corner Projectors */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-12 h-12 ${
                  i === 0 ? 'top-4 left-4' :
                  i === 1 ? 'top-4 right-4' :
                  i === 2 ? 'bottom-4 left-4' :
                  'bottom-4 right-4'
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className="absolute inset-0 bg-cyan-400/20 rounded-lg"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
                />
              </div>
            ))}

            {/* Status Indicators */}
            <div className="absolute top-6 left-6 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">PROJECTION ACTIVE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wifi className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-cyan-400">QUANTUM LINK STABLE</span>
              </div>
            </div>
          </div>

          {/* Product Information Panel */}
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold mb-4">{currentProduct?.name}</h2>
                <p className="text-cyan-200 text-lg mb-6">Holographic Model: {currentProduct?.model}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-black/20 rounded-lg">
                    <div className="text-sm text-cyan-200">Width</div>
                    <div className="text-xl font-bold">{currentProduct?.dimensions.width} mm</div>
                  </div>
                  <div className="text-center p-4 bg-black/20 rounded-lg">
                    <div className="text-sm text-cyan-200">Height</div>
                    <div className="text-xl font-bold">{currentProduct?.dimensions.height} mm</div>
                  </div>
                  <div className="text-center p-4 bg-black/20 rounded-lg">
                    <div className="text-sm text-cyan-200">Depth</div>
                    <div className="text-xl font-bold">{currentProduct?.dimensions.depth} mm</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-cyan-200">Price</div>
                    <div className="text-4xl font-bold text-green-400">${currentProduct?.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-cyan-200">Quality</div>
                    <div className={`text-xl font-bold ${getQualityColor(settings.quality)}`}>
                      {settings.quality.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-6">Hologram Controls</h3>
                
                {/* Rotation Controls */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm text-cyan-200 mb-2">X-Axis Rotation</label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={rotationX}
                      onChange={(e) => setRotationX(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-cyan-200 mb-2">Y-Axis Rotation</label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={rotationY}
                      onChange={(e) => setRotationY(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-cyan-200 mb-2">Z-Axis Rotation</label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={rotationZ}
                      onChange={(e) => setRotationZ(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-cyan-200 mb-2">Scale</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Hologram Intensity */}
                <div className="mb-6">
                  <label className="block text-sm text-cyan-200 mb-2">Hologram Intensity</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={hologramIntensity}
                    onChange={(e) => setHologramIntensity(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setRotationX(0);
                      setRotationY(0);
                      setRotationZ(0);
                      setScale(1);
                      setHologramIntensity(100);
                    }}
                    className="bg-blue-500/20 border border-blue-500/30 text-blue-300 py-3 rounded-lg hover:bg-blue-500/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Reset View</span>
                  </button>
                  <button
                    onClick={deactivateHologram}
                    className="bg-red-500/20 border border-red-500/30 text-red-300 py-3 rounded-lg hover:bg-red-500/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Deactivate</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scanning Overlay */}
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <div className="bg-gradient-to-br from-cyan-900 to-purple-900 rounded-2xl p-8 text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold text-white mb-2">Initializing Hologram</h3>
                <p className="text-cyan-200">Quantum scanning in progress...</p>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default HolographicProductDisplay;
