import React, { useState, useRef, useEffect } from 'react';
import { Fingerprint, Eye, Shield, Check, X, Scan, Lock, User, Camera, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BiometricData {
  type: 'fingerprint' | 'face' | 'voice' | 'iris' | 'palm';
  confidence: number;
  timestamp: Date;
  userId?: string;
}

const BiometricAuthentication: React.FC = () => {
  const [authMethod, setAuthMethod] = useState<'fingerprint' | 'face' | 'voice' | 'iris' | 'palm'>('fingerprint');
  const [isScanning, setIsScanning] = useState(false);
  const [authStatus, setAuthStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [confidence, setConfidence] = useState(0);
  const [enrolledBiometrics, setEnrolledBiometrics] = useState<BiometricData[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (authMethod === 'face' && isScanning) {
      initializeFaceRecognition();
    }
    
    return () => {
      stopCamera();
    };
  }, [authMethod, isScanning]);

  const initializeFaceRecognition = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setAuthStatus('failed');
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

    // Simulate scanning progress with realistic timing
    const scanDuration = authMethod === 'voice' ? 3000 : 2000;
    const steps = 40;
    const stepDuration = scanDuration / steps;

    for (let i = 0; i <= steps; i++) {
      const progress = Math.min((i / steps) * 100, 100);
      setConfidence(Math.round(progress));
      await new Promise(resolve => setTimeout(resolve, stepDuration));
    }

    // Simulate authentication result with high success rate
    const success = Math.random() > 0.15;
    setAuthStatus(success ? 'success' : 'failed');
    setIsScanning(false);

    if (success) {
      // Add to enrolled biometrics
      const newBiometric: BiometricData = {
        type: authMethod,
        confidence: 95 + Math.random() * 5,
        timestamp: new Date(),
        userId: 'user_' + Math.random().toString(36).substr(2, 9)
      };
      setEnrolledBiometrics(prev => [...prev, newBiometric]);

      setTimeout(() => {
        setAuthStatus('idle');
        setConfidence(0);
      }, 2500);
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
    // Request microphone access
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        simulateBiometricScan();
      })
      .catch(() => {
        setAuthStatus('failed');
      });
  };

  const handleIrisAuth = () => {
    setAuthMethod('iris');
    simulateBiometricScan();
  };

  const handlePalmAuth = () => {
    setAuthMethod('palm');
    simulateBiometricScan();
  };

  const renderScanningAnimation = () => {
    switch (authMethod) {
      case 'fingerprint':
        return (
          <div className="relative w-40 h-40 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 border-2 border-blue-300 rounded-full animate-ping"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Fingerprint className="w-20 h-20 text-blue-500" />
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
          <div className="relative w-80 h-60 mx-auto mb-6 bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            {isScanning && (
              <div className="absolute inset-0">
                <div className="absolute inset-0 border-4 border-green-500 animate-pulse">
                  <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-green-500"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 border-r-4 border-t-4 border-green-500"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-l-4 border-b-4 border-green-500"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-green-500"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-32 h-24 border-2 border-green-400 rounded-lg"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      
      case 'voice':
        return (
          <div className="relative w-40 h-40 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-purple-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={isScanning ? { scale: [1, 1.3, 1] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <Mic className="w-20 h-20 text-purple-500" />
              </motion.div>
            </div>
            {isScanning && (
              <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 border-2 border-purple-400 rounded-full"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.6
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        );

      case 'iris':
        return (
          <div className="relative w-40 h-40 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-cyan-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Eye className="w-20 h-20 text-cyan-500" />
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

      case 'palm':
        return (
          <div className="relative w-40 h-40 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-orange-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="w-20 h-20 text-orange-500" />
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
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Shield className="w-10 h-10 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Advanced Biometric Authentication
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Multi-modal biometric security with AI-powered verification
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Authentication Interface */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Authentication Methods</h3>
          
          {authStatus === 'idle' && (
            <div className="space-y-4">
              <button
                onClick={handleFingerprintAuth}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Fingerprint className="w-6 h-6 text-blue-500" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Fingerprint Scan</p>
                    <p className="text-sm text-gray-600">Touch sensor authentication</p>
                  </div>
                </div>
                <div className="text-green-500">
                  <Check className="w-5 h-5" />
                </div>
              </button>

              <button
                onClick={handleFaceAuth}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Camera className="w-6 h-6 text-blue-500" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Face Recognition</p>
                    <p className="text-sm text-gray-600">3D facial structure analysis</p>
                  </div>
                </div>
                <div className="text-green-500">
                  <Check className="w-5 h-5" />
                </div>
              </button>

              <button
                onClick={handleVoiceAuth}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Mic className="w-6 h-6 text-blue-500" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Voice Recognition</p>
                    <p className="text-sm text-gray-600">Voice pattern analysis</p>
                  </div>
                </div>
                <div className="text-green-500">
                  <Check className="w-5 h-5" />
                </div>
              </button>

              <button
                onClick={handleIrisAuth}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <Eye className="w-6 h-6 text-blue-500" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Iris Scan</p>
                    <p className="text-sm text-gray-600">Iris pattern recognition</p>
                  </div>
                </div>
                <div className="text-green-500">
                  <Check className="w-5 h-5" />
                </div>
              </button>

              <button
                onClick={handlePalmAuth}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-blue-500" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">Palm Vein Scan</p>
                    <p className="text-sm text-gray-600">Vascular pattern analysis</p>
                  </div>
                </div>
                <div className="text-green-500">
                  <Check className="w-5 h-5" />
                </div>
              </button>
            </div>
          )}

          {authStatus === 'scanning' && (
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">
                {authMethod === 'fingerprint' && 'Place your finger on the sensor'}
                {authMethod === 'face' && 'Look directly at the camera'}
                {authMethod === 'voice' && 'Say "Authenticate my account"'}
                {authMethod === 'iris' && 'Look into the iris scanner'}
                {authMethod === 'palm' && 'Place your palm over the scanner'}
              </h4>
              
              {renderScanningAnimation()}
              
              <div className="mb-4">
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
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
                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-12 h-12 text-white" />
              </motion.div>
              <h4 className="text-2xl font-semibold text-green-600 mb-2">
                Authentication Successful!
              </h4>
              <p className="text-gray-600 mb-4">
                Your biometric identity has been verified with {Math.round(95 + Math.random() * 5)}% confidence.
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Lock className="w-4 h-4" />
                <span>Secured with 256-bit encryption</span>
              </div>
            </div>
          )}

          {authStatus === 'failed' && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <X className="w-12 h-12 text-white" />
              </motion.div>
              <h4 className="text-2xl font-semibold text-red-600 mb-2">
                Authentication Failed
              </h4>
              <p className="text-gray-600 mb-4">
                Unable to verify your biometric identity. Please try again or use an alternative method.
              </p>
              <button
                onClick={() => setAuthStatus('idle')}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Enrolled Biometrics */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Enrolled Biometrics</h3>
          
          {enrolledBiometrics.length === 0 ? (
            <div className="text-center py-8">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No biometric data enrolled yet</p>
              <p className="text-sm text-gray-400 mt-2">Complete an authentication to enroll</p>
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledBiometrics.map((biometric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {biometric.type === 'fingerprint' && <Fingerprint className="w-5 h-5 text-blue-500" />}
                    {biometric.type === 'face' && <Camera className="w-5 h-5 text-blue-500" />}
                    {biometric.type === 'voice' && <Mic className="w-5 h-5 text-purple-500" />}
                    {biometric.type === 'iris' && <Eye className="w-5 h-5 text-cyan-500" />}
                    {biometric.type === 'palm' && <User className="w-5 h-5 text-orange-500" />}
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{biometric.type}</p>
                      <p className="text-sm text-gray-500">
                        {biometric.confidence.toFixed(1)}% confidence
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {biometric.timestamp.toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {biometric.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Security Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl p-6 shadow-lg text-center"
        >
          <Shield className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Multi-Factor Security</h4>
          <p className="text-sm text-gray-600">Combine multiple biometric methods for enhanced security</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl p-6 shadow-lg text-center"
        >
          <Lock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Encrypted Storage</h4>
          <p className="text-sm text-gray-600">All biometric templates are encrypted and stored securely</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl p-6 shadow-lg text-center"
        >
          <Scan className="w-8 h-8 text-purple-500 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Liveness Detection</h4>
          <p className="text-sm text-gray-600">Advanced anti-spoofing technology prevents fraud</p>
        </motion.div>
      </div>
    </div>
  );
};

export default BiometricAuthentication;
