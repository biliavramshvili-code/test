import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  RotateCcw, 
  Download, 
  Share2, 
  Sparkles, 
  Eye,
  Palette,
  Zap,
  Monitor,
  Smartphone
} from 'lucide-react';

interface TryOnSession {
  id: string;
  productId: string;
  productName: string;
  category: 'watch' | 'glasses' | 'jewelry' | 'clothing';
  confidence: number;
  fitScore: number;
  recommendations: string[];
}

interface ARFilter {
  id: string;
  name: string;
  type: 'size' | 'color' | 'style';
  value: string;
  preview: string;
}

const VirtualTryOn: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentSession, setCurrentSession] = useState<TryOnSession | null>(null);
  const [availableFilters, setAvailableFilters] = useState<ARFilter[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [isProcessing, setIsProcessing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    // Initialize AR filters
    const filters: ARFilter[] = [
      { id: '1', name: 'Silver', type: 'color', value: '#C0C0C0', preview: 'silver-watch.jpg' },
      { id: '2', name: 'Gold', type: 'color', value: '#FFD700', preview: 'gold-watch.jpg' },
      { id: '3', name: 'Rose Gold', type: 'color', value: '#E8B4B8', preview: 'rose-gold-watch.jpg' },
      { id: '4', name: '42mm', type: 'size', value: '42', preview: '42mm-watch.jpg' },
      { id: '5', name: '46mm', type: 'size', value: '46', preview: '46mm-watch.jpg' },
      { id: '6', name: 'Sport', type: 'style', value: 'sport', preview: 'sport-watch.jpg' },
      { id: '7', name: 'Classic', type: 'style', value: 'classic', preview: 'classic-watch.jpg' }
    ];
    setAvailableFilters(filters);
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setCameraPermission('granted');
      setIsActive(true);
      
      // Simulate AR detection
      setTimeout(() => {
        setCurrentSession({
          id: 'session-1',
          productId: 'apple-watch-series-9',
          productName: 'Apple Watch Series 9',
          category: 'watch',
          confidence: 94,
          fitScore: 87,
          recommendations: [
            'Perfect fit for your wrist size',
            'Silver color complements your skin tone',
            'Sport band recommended for active lifestyle'
          ]
        });
      }, 2000);
      
    } catch (error) {
      console.error('Camera access denied:', error);
      setCameraPermission('denied');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    setCurrentSession(null);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
        
        // Simulate AI processing
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
        }, 3000);
      }
    }
  };

  const applyFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(prev => prev.filter(id => id !== filterId));
    } else {
      setSelectedFilters(prev => [...prev, filterId]);
    }
    
    // Simulate AR filter application
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 1000);
  };

  const shareResult = () => {
    if (capturedImage) {
      // Simulate sharing functionality
      navigator.share?.({
        title: 'My Virtual Try-On',
        text: 'Check out how this Apple Watch looks on me!',
        url: window.location.href
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="w-8 h-8 text-purple-500" />
          <h1 className="text-3xl font-bold text-gray-900">Virtual Try-On Studio</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience products in augmented reality before you buy. See how they look and fit with AI-powered precision.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Camera Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
            {!isActive ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Camera className="w-16 h-16 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Start Your Try-On Experience</h3>
                    <p className="text-gray-300 mb-4">Allow camera access to begin virtual try-on</p>
                    <button
                      onClick={startCamera}
                      className="px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors"
                    >
                      Start Camera
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
                
                {/* AR Overlay */}
                {currentSession && (
                  <div className="absolute inset-0">
                    {/* Wrist Detection Outline */}
                    <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
                      <div className="w-32 h-20 border-2 border-purple-400 rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Virtual Product Overlay */}
                    <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg shadow-lg"
                        style={{
                          background: selectedFilters.includes('2') ? 'linear-gradient(45deg, #FFD700, #FFA500)' :
                                     selectedFilters.includes('3') ? 'linear-gradient(45deg, #E8B4B8, #D4A5A5)' :
                                     'linear-gradient(45deg, #C0C0C0, #A0A0A0)'
                        }}
                      />
                    </div>
                  </div>
                )}
                
                {/* Processing Overlay */}
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                      <p>Processing with AI...</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Camera Controls */}
          {isActive && (
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={capturePhoto}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-500 text-white rounded-xl font-semibold hover:bg-purple-600 transition-colors"
              >
                <Camera className="w-4 h-4" />
                <span>Capture</span>
              </button>
              <button
                onClick={() => setSelectedFilters([])}
                className="flex items-center space-x-2 px-4 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button
                onClick={stopCamera}
                className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Stop
              </button>
            </div>
          )}
        </div>

        {/* Controls Panel */}
        <div className="space-y-6">
          {/* Session Info */}
          {currentSession && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Try-On Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Detection Confidence</span>
                  <span className="font-semibold text-green-600">{currentSession.confidence}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fit Score</span>
                  <span className="font-semibold text-blue-600">{currentSession.fitScore}%</span>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-900 mb-2">AI Recommendations:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {currentSession.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Zap className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Filter Controls */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Customization</h3>
            
            {/* Color Filters */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Colors</h4>
              <div className="grid grid-cols-3 gap-2">
                {availableFilters.filter(f => f.type === 'color').map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => applyFilter(filter.id)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      selectedFilters.includes(filter.id)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div 
                      className="w-6 h-6 rounded-full mx-auto mb-1"
                      style={{ backgroundColor: filter.value }}
                    ></div>
                    <span className="text-xs font-medium">{filter.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filters */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Sizes</h4>
              <div className="grid grid-cols-2 gap-2">
                {availableFilters.filter(f => f.type === 'size').map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => applyFilter(filter.id)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      selectedFilters.includes(filter.id)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium">{filter.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Style Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Styles</h4>
              <div className="space-y-2">
                {availableFilters.filter(f => f.type === 'style').map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => applyFilter(filter.id)}
                    className={`w-full p-3 rounded-lg border-2 transition-colors text-left ${
                      selectedFilters.includes(filter.id)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium">{filter.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {capturedImage && (
            <div className="space-y-3">
              <button
                onClick={shareResult}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Result</span>
              </button>
              <a
                href={capturedImage}
                download="virtual-tryon.png"
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Image</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Canvas for Capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default VirtualTryOn;
