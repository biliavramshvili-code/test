import React, { useState, useRef, useEffect } from 'react';
import { Fingerprint, Eye, Shield, Check, X, Scan, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BiometricData {
  type: 'fingerprint' | 'face' | 'voice';
  confidence: number;
  timestamp: Date;
}

const BiometricAuth: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authMethod, setAuthMethod] = useState<'fingerprint' | 'face' | 'voice'>('fingerprint');
  const [isScanning, setIsScanning] = useState(false);
  const [authStatus, setAuthStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [confidence, setConfidence] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (authMethod === 'face' && isOpen) {
      initializeFaceRecognition();
    }
    
    return () => {
      stopCamera();
    };
  }, [authMethod, isOpen]);

  const initializeFaceRecognition = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const simulateBiometricScan = async () => {
    setIsScanning(true);
    setAuthStatus('scanning');
    setConfidence(0);

    // Simulate scanning progress
    for (let i = 0; i <= 100; i += 5) {
      setConfidence(i);
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Simulate authentication result (90% success rate)
    const success = Math.random() > 0.1;
    setAuthStatus(success ? 'success' : 'failed');
    setIsScanning(false);

    if (success) {
      setTimeout(() => {
        setIsOpen(false);
        setAuthStatus('idle');
        setConfidence(0);
      }, 2000);
    } else {
      setTimeout(() => {
        setAuthStatus('idle');
        setConfidence(0);
      }, 3000);
    }
  };

  const handleFingerprintAuth = () => {
    setAuthMethod('fingerprint');
    simulateBiometricScan();
  };

  const handleFaceAuth = () => {
    setAuthMethod('face');
    simulateBiometricScan();
  };

  const handleVoiceAuth = () => {
    setAuthMethod('voice');
    // Simulate voice recognition
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        simulateBiometricScan();
      })
      .catch(() => {
        setAuthStatus('failed');
      });
  };

  const renderScanningAnimation = () => {
    switch (authMethod) {
      case 'fingerprint':
        return (
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 border-2 border-blue-300 rounded-full animate-ping"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Fingerprint className="w-16 h-16 text-blue-500" />
            </div>
            {isScanning && (
              <motion.div
                className="absolute inset-0 border-4 border-green-500 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        );
      
      case 'face':
        return (
          <div className="relative w-64 h-48 mx-auto mb-6 bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            {isScanning && (
              <div className="absolute inset-0 border-4 border-green-500 animate-pulse">
                <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-green-500"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-green-500"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-green-500"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-green-500"></div>
              </div>
            )}
          </div>
        );
      
      case 'voice':
        return (
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={isScanning ? { scale: [1, 1.2, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <Scan className="w-16 h-16 text-purple-500" />
              </motion.div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {/* Biometric Auth Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-44 left-6 z-50 bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Shield className="w-6 h-6" />
      </motion.button>

      {/* Biometric Authentication Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 text-center">
                <Shield className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-2xl font-bold">Biometric Authentication</h3>
                <p className="text-green-100 mt-2">Secure your account with biometric verification</p>
              </div>

              {/* Content */}
              <div className="p-6">
                {authStatus === 'idle' && (
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-apple-gray-900 mb-6">
                      Choose Authentication Method
                    </h4>
                    
                    <div className="space-y-4">
                      <button
                        onClick={handleFingerprintAuth}
                        className="w-full flex items-center justify-between p-4 border-2 border-apple-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <Fingerprint className="w-6 h-6 text-blue-500" />
                          <div className="text-left">
                            <p className="font-semibold text-apple-gray-900">Fingerprint</p>
                            <p className="text-sm text-apple-gray-600">Touch sensor authentication</p>
                          </div>
                        </div>
                        <div className="text-green-500">
                          <Check className="w-5 h-5" />
                        </div>
                      </button>

                      <button
                        onClick={handleFaceAuth}
                        className="w-full flex items-center justify-between p-4 border-2 border-apple-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <Eye className="w-6 h-6 text-blue-500" />
                          <div className="text-left">
                            <p className="font-semibold text-apple-gray-900">Face Recognition</p>
                            <p className="text-sm text-apple-gray-600">Camera-based facial scan</p>
                          </div>
                        </div>
                        <div className="text-green-500">
                          <Check className="w-5 h-5" />
                        </div>
                      </button>

                      <button
                        onClick={handleVoiceAuth}
                        className="w-full flex items-center justify-between p-4 border-2 border-apple-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <Scan className="w-6 h-6 text-blue-500" />
                          <div className="text-left">
                            <p className="font-semibold text-apple-gray-900">Voice Recognition</p>
                            <p className="text-sm text-apple-gray-600">Voice pattern analysis</p>
                          </div>
                        </div>
                        <div className="text-green-500">
                          <Check className="w-5 h-5" />
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {authStatus === 'scanning' && (
                  <div className="text-center">
                    <h4 className="text-xl font-semibold text-apple-gray-900 mb-6">
                      {authMethod === 'fingerprint' && 'Place your finger on the sensor'}
                      {authMethod === 'face' && 'Look directly at the camera'}
                      {authMethod === 'voice' && 'Say "Authenticate my account"'}
                    </h4>
                    
                    {renderScanningAnimation()}
                    
                    <div className="mb-4">
                      <div className="bg-apple-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="bg-blue-500 h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${confidence}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                      <p className="text-sm text-apple-gray-600 mt-2">
                        Scanning... {confidence}%
                      </p>
                    </div>
                  </div>
                )}

                {authStatus === 'success' && (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Check className="w-10 h-10 text-white" />
                    </motion.div>
                    <h4 className="text-xl font-semibold text-green-600 mb-2">
                      Authentication Successful!
                    </h4>
                    <p className="text-apple-gray-600">
                      Your identity has been verified. Redirecting...
                    </p>
                  </div>
                )}

                {authStatus === 'failed' && (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <X className="w-10 h-10 text-white" />
                    </motion.div>
                    <h4 className="text-xl font-semibold text-red-600 mb-2">
                      Authentication Failed
                    </h4>
                    <p className="text-apple-gray-600 mb-4">
                      Unable to verify your identity. Please try again.
                    </p>
                    <button
                      onClick={() => setAuthStatus('idle')}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-apple-gray-50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-apple-gray-600">
                  <Lock className="w-4 h-4" />
                  <span>256-bit encryption</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-apple-gray-500 hover:text-apple-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BiometricAuth;
