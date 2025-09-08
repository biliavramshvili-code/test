import React, { useState, useRef, useEffect } from 'react';
import { Camera, Smartphone, Monitor, Headphones, Watch, Maximize, RotateCcw, ZoomIn, Share2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface ARSession {
  isActive: boolean;
  product: Product | null;
  scale: number;
  rotation: number;
  position: { x: number; y: number };
}

const ARShopping: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [arSession, setArSession] = useState<ARSession>({
    isActive: false,
    product: null,
    scale: 1,
    rotation: 0,
    position: { x: 0, y: 0 }
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { products } = useProducts();
  const { addItem } = useCart();

  const arCompatibleProducts = products.filter(product => 
    ['Smartphones', 'Laptops', 'Audio', 'Wearables'].includes(product.category)
  );

  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  const startARSession = async (product: Product) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraStream(stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setArSession({
        isActive: true,
        product,
        scale: 1,
        rotation: 0,
        position: { x: 0, y: 0 }
      });
    } catch (error) {
      console.error('Error accessing camera:', error);
      // Fallback to demo mode
      setArSession({
        isActive: true,
        product,
        scale: 1,
        rotation: 0,
        position: { x: 0, y: 0 }
      });
    }
  };

  const stopARSession = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setArSession({
      isActive: false,
      product: null,
      scale: 1,
      rotation: 0,
      position: { x: 0, y: 0 }
    });
  };

  const updateARObject = (updates: Partial<ARSession>) => {
    setArSession(prev => ({ ...prev, ...updates }));
  };

  const captureARPhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        // Add AR object overlay
        if (arSession.product) {
          ctx.save();
          ctx.translate(canvas.width / 2 + arSession.position.x, canvas.height / 2 + arSession.position.y);
          ctx.rotate(arSession.rotation * Math.PI / 180);
          ctx.scale(arSession.scale, arSession.scale);
          
          // Draw product placeholder (in real implementation, this would be a 3D model)
          ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
          ctx.fillRect(-50, -50, 100, 100);
          ctx.fillStyle = 'white';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(arSession.product.name, 0, 0);
          
          ctx.restore();
        }
        
        // Download the image
        const link = document.createElement('a');
        link.download = 'ar-preview.png';
        link.href = canvas.toDataURL();
        link.click();
      }
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Smartphones': return <Smartphone className="w-5 h-5" />;
      case 'Laptops': return <Monitor className="w-5 h-5" />;
      case 'Audio': return <Headphones className="w-5 h-5" />;
      case 'Wearables': return <Watch className="w-5 h-5" />;
      default: return <Camera className="w-5 h-5" />;
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-48 right-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        <Camera className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* AR Session View */}
      {arSession.isActive ? (
        <div className="relative w-full h-full">
          {/* Camera Feed */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          
          {/* Fallback Background */}
          {!cameraStream && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">AR Demo Mode</p>
                <p className="text-sm opacity-75">Camera access not available</p>
              </div>
            </div>
          )}

          {/* AR Object Overlay */}
          {arSession.product && (
            <div 
              className="absolute pointer-events-none"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${arSession.position.x}px, ${arSession.position.y}px) scale(${arSession.scale}) rotate(${arSession.rotation}deg)`
              }}
            >
              <div className="bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-lg p-4 text-center">
                <img 
                  src={arSession.product.image} 
                  alt={arSession.product.name}
                  className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                />
                <p className="text-white font-semibold text-sm">{arSession.product.name}</p>
                <p className="text-white/80 text-xs">${arSession.product.price}</p>
              </div>
            </div>
          )}

          {/* AR Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 flex items-center space-x-4">
              <button
                onClick={() => updateARObject({ scale: Math.max(0.5, arSession.scale - 0.1) })}
                className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <ZoomIn className="w-5 h-5 transform rotate-180" />
              </button>
              <button
                onClick={() => updateARObject({ rotation: arSession.rotation + 45 })}
                className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={() => updateARObject({ scale: Math.min(2, arSession.scale + 0.1) })}
                className="p-3 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={captureARPhoto}
                className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
              <button
                onClick={() => arSession.product && addItem(arSession.product)}
                className="px-4 py-3 bg-green-500 rounded-full text-white hover:bg-green-600 transition-colors font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={stopARSession}
            className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 transition-colors"
          >
            ×
          </button>

          {/* Hidden Canvas for Screenshots */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      ) : (
        /* Product Selection View */
        <div className="w-full h-full bg-gray-900 text-white overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">AR Shopping</h1>
                <p className="text-gray-300">Try products in your space with augmented reality</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2 mb-8 overflow-x-auto">
              {['all', 'Smartphones', 'Laptops', 'Audio', 'Wearables'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {getCategoryIcon(category)}
                  <span className="capitalize">{category}</span>
                </button>
              ))}
            </div>

            {/* AR Compatible Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {arCompatibleProducts
                .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
                .map((product) => (
                <div key={product.id} className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-colors">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      AR Ready
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-white">${product.price}</span>
                      <div className="flex items-center space-x-1">
                        {getCategoryIcon(product.category)}
                        <span className="text-sm text-gray-400">{product.category}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => startARSession(product)}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
                    >
                      <Camera className="w-5 h-5" />
                      <span>Try in AR</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* AR Features Info */}
            <div className="mt-12 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">AR Shopping Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Maximize className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-white mb-1">Scale & Resize</h4>
                  <p className="text-gray-300 text-sm">Adjust product size to fit your space perfectly</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-white mb-1">360° Rotation</h4>
                  <p className="text-gray-300 text-sm">View products from every angle</p>
                </div>
                <div className="text-center">
                  <Share2 className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-white mb-1">Share & Save</h4>
                  <p className="text-gray-300 text-sm">Capture and share your AR previews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARShopping;
