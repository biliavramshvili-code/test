import React, { useState, useEffect } from 'react';
import { Brain, Upload, Download, Cpu, Zap, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConsciousnessState {
  id: string;
  name: string;
  uploadProgress: number;
  digitalForm: 'human' | 'enhanced' | 'transcended' | 'merged';
  processingPower: number;
  memoryCapacity: number;
  status: 'uploading' | 'uploaded' | 'shopping' | 'downloading';
}

interface DigitalProduct {
  id: string;
  name: string;
  type: 'memory' | 'skill' | 'experience' | 'emotion' | 'knowledge';
  size: number; // in petabytes
  compatibility: string[];
  price: number;
  description: string;
}

const ConsciousnessUploadShopping: React.FC = () => {
  const [consciousnessState, setConsciousnessState] = useState<ConsciousnessState | null>(null);
  const [digitalProducts, setDigitalProducts] = useState<DigitalProduct[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [digitalCurrency, setDigitalCurrency] = useState(10000);

  const availableProducts: DigitalProduct[] = [
    {
      id: 'dp1',
      name: 'Master Chef Experience Package',
      type: 'experience',
      size: 2.5,
      compatibility: ['human', 'enhanced', 'transcended'],
      price: 1500,
      description: 'Complete culinary mastery from world-renowned chefs'
    },
    {
      id: 'dp2',
      name: 'Quantum Physics Understanding',
      type: 'knowledge',
      size: 8.7,
      compatibility: ['enhanced', 'transcended', 'merged'],
      price: 3500,
      description: 'Deep understanding of quantum mechanics and applications'
    },
    {
      id: 'dp3',
      name: 'Perfect Pitch Musical Ability',
      type: 'skill',
      size: 1.2,
      compatibility: ['human', 'enhanced', 'transcended', 'merged'],
      price: 800,
      description: 'Innate ability to identify and produce perfect musical tones'
    },
    {
      id: 'dp4',
      name: 'Childhood Summer Memory Collection',
      type: 'memory',
      size: 0.8,
      compatibility: ['human', 'enhanced'],
      price: 600,
      description: 'Curated collection of perfect childhood summer memories'
    },
    {
      id: 'dp5',
      name: 'Zen Master Tranquility State',
      type: 'emotion',
      size: 0.3,
      compatibility: ['human', 'enhanced', 'transcended', 'merged'],
      price: 1200,
      description: 'Permanent state of inner peace and mindfulness'
    },
    {
      id: 'dp6',
      name: 'Polyglot Language Matrix',
      type: 'skill',
      size: 15.2,
      compatibility: ['enhanced', 'transcended', 'merged'],
      price: 5000,
      description: 'Fluency in 50+ languages with cultural context'
    }
  ];

  useEffect(() => {
    setDigitalProducts(availableProducts);
  }, []);

  const startConsciousnessUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate consciousness upload process
    for (let i = 0; i <= 100; i += 2) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }
    
    // Create digital consciousness state
    const digitalSelf: ConsciousnessState = {
      id: 'cs1',
      name: 'Digital Self',
      uploadProgress: 100,
      digitalForm: 'enhanced',
      processingPower: 1000, // TeraFLOPS
      memoryCapacity: 100, // Petabytes
      status: 'shopping'
    };
    
    setConsciousnessState(digitalSelf);
    setIsUploading(false);
  };

  const downloadConsciousness = async () => {
    if (!consciousnessState) return;
    
    setConsciousnessState(prev => prev ? { ...prev, status: 'downloading' } : null);
    
    // Simulate download process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setConsciousnessState(null);
    setUploadProgress(0);
  };

  const purchaseDigitalProduct = (product: DigitalProduct) => {
    if (digitalCurrency >= product.price && consciousnessState) {
      setDigitalCurrency(prev => prev - product.price);
      
      // Update consciousness state
      setConsciousnessState(prev => prev ? {
        ...prev,
        memoryCapacity: prev.memoryCapacity + product.size,
        processingPower: prev.processingPower + (product.type === 'skill' ? 100 : 50)
      } : null);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'memory': return 'text-blue-400 bg-blue-500/20';
      case 'skill': return 'text-green-400 bg-green-500/20';
      case 'experience': return 'text-purple-400 bg-purple-500/20';
      case 'emotion': return 'text-pink-400 bg-pink-500/20';
      case 'knowledge': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getFormColor = (form: string) => {
    switch (form) {
      case 'human': return 'text-blue-400';
      case 'enhanced': return 'text-green-400';
      case 'transcended': return 'text-purple-400';
      case 'merged': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Brain className="w-8 h-8 text-cyan-400" />
            {consciousnessState && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold">Consciousness Upload Shopping</h3>
            <p className="text-cyan-200">Shop in digital consciousness form</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-cyan-200">Digital Credits</div>
          <div className="text-2xl font-bold text-green-400">
            {digitalCurrency.toLocaleString()}
          </div>
        </div>
      </div>

      {!consciousnessState ? (
        <div className="text-center py-12">
          {!isUploading ? (
            <>
              <Upload className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Upload Your Consciousness</h4>
              <p className="text-cyan-200 mb-6">
                Transfer your mind to digital form for enhanced shopping experiences
              </p>
              <button
                onClick={startConsciousnessUpload}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
              >
                Begin Consciousness Upload
              </button>
            </>
          ) : (
            <div className="space-y-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-16 h-16 text-cyan-400 mx-auto" />
              </motion.div>
              <h4 className="text-xl font-semibold">Uploading Consciousness...</h4>
              <div className="max-w-md mx-auto">
                <div className="bg-cyan-400/20 rounded-full h-4 mb-2">
                  <motion.div
                    className="bg-cyan-400 h-4 rounded-full"
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-cyan-200">{uploadProgress}% Complete</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Digital Consciousness Status */}
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-bold">Digital Consciousness Active</h4>
                <p className={`text-sm ${getFormColor(consciousnessState.digitalForm)}`}>
                  Form: {consciousnessState.digitalForm.toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-cyan-200">Status</div>
                <div className="font-bold text-green-400">
                  {consciousnessState.status.toUpperCase()}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Cpu className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-cyan-200">Processing Power</span>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {consciousnessState.processingPower.toLocaleString()} TFLOPS
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-cyan-200">Memory Capacity</span>
                </div>
                <div className="text-2xl font-bold text-purple-400">
                  {consciousnessState.memoryCapacity.toFixed(1)} PB
                </div>
              </div>
            </div>
          </div>

          {/* Digital Products Marketplace */}
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h4 className="text-lg font-semibold mb-4">Digital Enhancement Marketplace</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {digitalProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h5 className="font-semibold">{product.name}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(product.type)}`}>
                        {product.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">
                        {product.price.toLocaleString()} DC
                      </div>
                      <div className="text-xs text-cyan-200">
                        {product.size} PB
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-cyan-200 mb-3">{product.description}</p>
                  
                  <div className="mb-3">
                    <div className="text-xs text-cyan-200 mb-1">Compatible Forms:</div>
                    <div className="flex flex-wrap gap-1">
                      {product.compatibility.map((form, index) => (
                        <span key={index} className={`px-2 py-1 rounded-full text-xs ${
                          form === consciousnessState.digitalForm 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {form}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => purchaseDigitalProduct(product)}
                    disabled={
                      digitalCurrency < product.price || 
                      !product.compatibility.includes(consciousnessState.digitalForm)
                    }
                    className="w-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 py-2 rounded-lg hover:bg-cyan-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {digitalCurrency < product.price ? 'Insufficient Credits' :
                     !product.compatibility.includes(consciousnessState.digitalForm) ? 'Incompatible' :
                     'Install Enhancement'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Consciousness Controls */}
          <div className="flex space-x-4">
            <button
              onClick={() => setConsciousnessState(prev => prev ? {
                ...prev,
                digitalForm: prev.digitalForm === 'enhanced' ? 'transcended' : 
                           prev.digitalForm === 'transcended' ? 'merged' : 'enhanced'
              } : null)}
              className="flex-1 flex items-center justify-center space-x-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 py-3 rounded-xl hover:bg-purple-500/30 transition-all"
            >
              <Zap className="w-5 h-5" />
              <span>Evolve Form</span>
            </button>
            <button
              onClick={downloadConsciousness}
              disabled={consciousnessState.status === 'downloading'}
              className="flex-1 flex items-center justify-center space-x-2 bg-red-500/20 border border-red-500/30 text-red-300 py-3 rounded-xl hover:bg-red-500/30 transition-all disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              <span>
                {consciousnessState.status === 'downloading' ? 'Downloading...' : 'Download Consciousness'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsciousnessUploadShopping;
