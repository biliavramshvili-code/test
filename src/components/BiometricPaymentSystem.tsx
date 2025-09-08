import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Eye, Scan, Shield, CheckCircle, AlertCircle } from 'lucide-react';

const BiometricPaymentSystem: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'success' | 'error' | null>(null);

  const biometricMethods = [
    {
      id: 'fingerprint',
      name: 'Fingerprint',
      icon: Fingerprint,
      description: 'Touch sensor authentication',
      accuracy: '99.8%',
      speed: '0.3s'
    },
    {
      id: 'iris',
      name: 'Iris Scan',
      icon: Eye,
      description: 'Advanced iris recognition',
      accuracy: '99.9%',
      speed: '0.5s'
    },
    {
      id: 'facial',
      name: 'Facial Recognition',
      icon: Scan,
      description: '3D facial mapping',
      accuracy: '99.7%',
      speed: '0.4s'
    }
  ];

  const startScan = (methodId: string) => {
    setActiveMethod(methodId);
    setIsScanning(true);
    setScanResult(null);

    // Simulate biometric scan
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(Math.random() > 0.1 ? 'success' : 'error');
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Biometric Payment System
          </h2>
          <p className="text-gray-600">
            Secure, instant payments using advanced biometric authentication
          </p>
        </div>
        <motion.div
          animate={{ scale: isScanning ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 1, repeat: isScanning ? Infinity : 0 }}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
        >
          <Shield className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Biometric Methods */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentication Methods</h3>
          
          {biometricMethods.map((method) => {
            const Icon = method.icon;
            const isActive = activeMethod === method.id;
            
            return (
              <motion.div
                key={method.id}
                whileHover={{ scale: 1.02 }}
                className={`bg-white rounded-xl p-6 shadow-lg cursor-pointer transition-all ${
                  isActive ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => !isScanning && startScan(method.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isActive && isScanning ? 'bg-green-500 animate-pulse' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isActive && isScanning ? 'text-white' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{method.name}</h4>
                    <p className="text-sm text-gray-600">{method.description}</p>
                    
                    <div className="flex space-x-4 mt-2">
                      <span className="text-xs text-gray-500">
                        Accuracy: {method.accuracy}
                      </span>
                      <span className="text-xs text-gray-500">
                        Speed: {method.speed}
                      </span>
                    </div>
                  </div>

                  {isActive && scanResult && (
                    <div className="flex items-center">
                      {scanResult === 'success' ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  )}
                </div>

                {isActive && isScanning && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Scanning...</span>
                      <span>Please hold still</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-green-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2 }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Payment Status */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Status</h3>
          
          {!activeMethod ? (
            <div className="text-center py-8">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a biometric method to begin</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  scanResult === 'success' ? 'bg-green-100' :
                  scanResult === 'error' ? 'bg-red-100' :
                  'bg-blue-100'
                }`}>
                  {scanResult === 'success' ? (
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  ) : scanResult === 'error' ? (
                    <AlertCircle className="w-10 h-10 text-red-500" />
                  ) : (
                    <Scan className="w-10 h-10 text-blue-500" />
                  )}
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {scanResult === 'success' ? 'Authentication Successful' :
                   scanResult === 'error' ? 'Authentication Failed' :
                   isScanning ? 'Scanning in Progress' : 'Ready to Scan'}
                </h4>
                
                <p className="text-gray-600">
                  {scanResult === 'success' ? 'Payment authorized and processed' :
                   scanResult === 'error' ? 'Please try again' :
                   isScanning ? 'Please remain still during scan' : 'Position yourself for scanning'}
                </p>
              </div>

              {scanResult === 'success' && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 mb-2">Transaction Details</h5>
                  <div className="space-y-1 text-sm text-green-700">
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span>$1,299.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Method:</span>
                      <span>{biometricMethods.find(m => m.id === activeMethod)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transaction ID:</span>
                      <span>BIO-{Date.now()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Security Features */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Features</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Multi-Factor Authentication',
              description: 'Combines multiple biometric factors for enhanced security',
              icon: Shield
            },
            {
              title: 'Liveness Detection',
              description: 'Advanced algorithms prevent spoofing attempts',
              icon: Eye
            },
            {
              title: 'Encrypted Storage',
              description: 'Biometric templates stored with military-grade encryption',
              icon: Fingerprint
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BiometricPaymentSystem;
