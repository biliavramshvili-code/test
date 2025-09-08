import React, { useState, useRef, useEffect } from 'react';
import { Headphones, Users, Navigation, Settings, Maximize, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Avatar {
  id: string;
  name: string;
  appearance: {
    skin: string;
    hair: string;
    outfit: string;
  };
  position: { x: number; y: number; z: number };
}

interface VirtualStore {
  id: string;
  name: string;
  theme: 'modern' | 'futuristic' | 'minimalist' | 'luxury';
  products: any[];
  visitors: number;
}

const MetaverseExperience: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStore, setCurrentStore] = useState<VirtualStore | null>(null);
  const [avatar, setAvatar] = useState<Avatar>({
    id: 'user-1',
    name: 'You',
    appearance: {
      skin: '#F4C2A1',
      hair: '#8B4513',
      outfit: 'casual'
    },
    position: { x: 0, y: 0, z: 0 }
  });
  const [isVRMode, setIsVRMode] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [otherAvatars, setOtherAvatars] = useState<Avatar[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const virtualStores: VirtualStore[] = [
    {
      id: 'apple-flagship',
      name: 'Apple Flagship Store',
      theme: 'modern',
      products: [],
      visitors: 127
    },
    {
      id: 'tech-plaza',
      name: 'Tech Innovation Plaza',
      theme: 'futuristic',
      products: [],
      visitors: 89
    },
    {
      id: 'minimalist-space',
      name: 'Minimalist Experience',
      theme: 'minimalist',
      products: [],
      visitors: 45
    },
    {
      id: 'luxury-boutique',
      name: 'Luxury Tech Boutique',
      theme: 'luxury',
      products: [],
      visitors: 67
    }
  ];

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      initializeMetaverse();
    }
  }, [isOpen]);

  const initializeMetaverse = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Render 3D-like environment
    renderMetaverseEnvironment(ctx);
  };

  const renderMetaverseEnvironment = (ctx: CanvasRenderingContext2D) => {
    const { width, height } = ctx.canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);

    // Draw ground
    ctx.fillStyle = '#F5F5F5';
    ctx.fillRect(0, height * 0.7, width, height * 0.3);

    // Draw grid lines for perspective
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      const y = height * 0.7 + (i * 20);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw virtual stores as 3D buildings
    virtualStores.forEach((store, index) => {
      const x = (index + 1) * (width / 5);
      const buildingHeight = 150 + Math.random() * 100;
      
      // Building shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(x + 5, height * 0.7 - buildingHeight + 5, 80, buildingHeight);
      
      // Building
      const buildingGradient = ctx.createLinearGradient(x, height * 0.7 - buildingHeight, x, height * 0.7);
      buildingGradient.addColorStop(0, store.theme === 'luxury' ? '#FFD700' : '#FFFFFF');
      buildingGradient.addColorStop(1, store.theme === 'futuristic' ? '#4A90E2' : '#F0F0F0');
      ctx.fillStyle = buildingGradient;
      ctx.fillRect(x, height * 0.7 - buildingHeight, 80, buildingHeight);
      
      // Building outline
      ctx.strokeStyle = '#CCCCCC';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, height * 0.7 - buildingHeight, 80, buildingHeight);
      
      // Store name
      ctx.fillStyle = '#333333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(store.name, x + 40, height * 0.7 + 20);
      
      // Visitor count
      ctx.fillStyle = '#666666';
      ctx.font = '10px Arial';
      ctx.fillText(`${store.visitors} visitors`, x + 40, height * 0.7 + 35);
    });

    // Draw avatar
    drawAvatar(ctx, avatar, width / 2, height * 0.8);

    // Draw other avatars
    otherAvatars.forEach((otherAvatar, index) => {
      const x = 100 + (index * 150);
      const y = height * 0.8 + Math.sin(Date.now() * 0.001 + index) * 10;
      drawAvatar(ctx, otherAvatar, x, y);
    });
  };

  const drawAvatar = (ctx: CanvasRenderingContext2D, avatarData: Avatar, x: number, y: number) => {
    // Avatar body
    ctx.fillStyle = avatarData.appearance.skin;
    ctx.beginPath();
    ctx.arc(x, y - 30, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Avatar body
    ctx.fillStyle = avatarData.appearance.outfit === 'casual' ? '#4A90E2' : '#333333';
    ctx.fillRect(x - 10, y - 15, 20, 30);
    
    // Avatar name
    ctx.fillStyle = '#333333';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(avatarData.name, x, y + 20);
  };

  const enterStore = (store: VirtualStore) => {
    setCurrentStore(store);
    // Simulate entering store with animation
    setTimeout(() => {
      // Generate some random other avatars in the store
      const randomAvatars: Avatar[] = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
        id: `avatar-${i}`,
        name: `Visitor ${i + 1}`,
        appearance: {
          skin: ['#F4C2A1', '#D4A574', '#E8B896', '#F7D7C4'][Math.floor(Math.random() * 4)],
          hair: ['#8B4513', '#000000', '#FFD700', '#A0522D'][Math.floor(Math.random() * 4)],
          outfit: ['casual', 'formal'][Math.floor(Math.random() * 2)]
        },
        position: { x: Math.random() * 100, y: Math.random() * 100, z: 0 }
      }));
      setOtherAvatars(randomAvatars);
    }, 1000);
  };

  const customizeAvatar = () => {
    const skins = ['#F4C2A1', '#D4A574', '#E8B896', '#F7D7C4'];
    const hairs = ['#8B4513', '#000000', '#FFD700', '#A0522D'];
    const outfits = ['casual', 'formal'];
    
    setAvatar(prev => ({
      ...prev,
      appearance: {
        skin: skins[Math.floor(Math.random() * skins.length)],
        hair: hairs[Math.floor(Math.random() * hairs.length)],
        outfit: outfits[Math.floor(Math.random() * outfits.length)]
      }
    }));
  };

  // Animation loop
  useEffect(() => {
    if (!isOpen) return;
    
    const animate = () => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          renderMetaverseEnvironment(ctx);
        }
      }
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isOpen, avatar, otherAvatars]);

  return (
    <>
      {/* Metaverse Entry Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Headphones className="w-6 h-6" />
      </motion.button>

      {/* Metaverse Experience Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            {/* Header Controls */}
            <div className="bg-black/80 backdrop-blur-sm text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-xl font-bold">Metaverse Shopping</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Users className="w-4 h-4" />
                  <span>{otherAvatars.length + 1} users online</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={() => setIsVRMode(!isVRMode)}
                  className={`p-2 rounded-lg transition-colors ${
                    isVRMode ? 'bg-purple-500' : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <Headphones className="w-5 h-5" />
                </button>
                
                <button
                  onClick={customizeAvatar}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Main Metaverse View */}
            <div className="flex-1 relative">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ background: 'linear-gradient(to bottom, #87CEEB, #E0F6FF)' }}
              />
              
              {/* Store Selection Overlay */}
              {!currentStore && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-8 text-white max-w-4xl w-full mx-4">
                    <h2 className="text-3xl font-bold mb-6 text-center">Choose Your Virtual Store</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {virtualStores.map((store) => (
                        <motion.button
                          key={store.id}
                          onClick={() => enterStore(store)}
                          className="bg-white/10 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 text-left"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                            <Headphones className="w-12 h-12 text-white" />
                          </div>
                          <h3 className="font-bold text-lg mb-2">{store.name}</h3>
                          <p className="text-gray-300 text-sm mb-3 capitalize">{store.theme} theme</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-green-400">{store.visitors} visitors</span>
                            <span className="text-blue-400">Enter →</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* In-Store Experience */}
              {currentStore && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">{currentStore.name}</h3>
                      <button
                        onClick={() => setCurrentStore(null)}
                        className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                      >
                        Exit Store
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Featured Products</h4>
                        <p className="text-sm text-gray-300">Browse our latest collection in immersive 3D</p>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Virtual Try-On</h4>
                        <p className="text-sm text-gray-300">Experience products with AR technology</p>
                      </div>
                      
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Social Shopping</h4>
                        <p className="text-sm text-gray-300">Shop with friends in real-time</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar Customization Panel */}
            <div className="bg-black/80 backdrop-blur-sm text-white p-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: avatar.appearance.skin }}>
                    <span className="text-xs">👤</span>
                  </div>
                  <div>
                    <p className="font-semibold">{avatar.name}</p>
                    <p className="text-sm text-gray-300">Level 1 Explorer</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-gray-300">
                    Movement: WASD | Interact: E | Chat: T
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MetaverseExperience;
