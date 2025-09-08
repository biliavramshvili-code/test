import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Scan, AlertCircle, CheckCircle } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useNotification } from '../context/NotificationContext';
import { Product } from '../types';

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onProductFound?: (product: Product) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  isOpen,
  onClose,
  onProductFound
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [scannedCode, setScannedCode] = useState("");
  const [foundProduct, setFoundProduct] = useState<Product | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const { products } = useProducts();
  const { showNotification } = useNotification();

  // Mock barcode database - in real app, this would be in your backend
  const barcodeDatabase: Record<string, number> = {
    '123456789012': 1, // MacBook Pro
    '123456789013': 2, // iPhone 15 Pro
    '123456789014': 3, // iPad Air
    '123456789015': 4, // Apple Watch
    '123456789016': 5, // AirPods Pro
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasCamera(true);
        setIsScanning(true);
        
        // Start scanning simulation
        simulateScanning();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasCamera(false);
      showNotification("Camera access denied. Please enable camera permissions.", "error");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  // Simulate barcode scanning - in real app, you'd use a library like QuaggaJS or ZXing
  const simulateScanning = () => {
    const scanInterval = setInterval(() => {
      if (!isScanning) {
        clearInterval(scanInterval);
        return;
      }

      // Simulate finding a barcode (random chance)
      if (Math.random() < 0.1) { // 10% chance per scan
        const barcodes = Object.keys(barcodeDatabase);
        const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)];
        handleBarcodeDetected(randomBarcode);
        clearInterval(scanInterval);
      }
    }, 500);
  };

  const handleBarcodeDetected = (barcode: string) => {
    setScannedCode(barcode);
    setIsScanning(false);
    
    // Look up product by barcode
    const productId = barcodeDatabase[barcode];
    if (productId) {
      const product = products.find(p => p.id === productId);
      if (product) {
        setFoundProduct(product);
        showNotification(`Product found: ${product.name}`, "success");
        onProductFound?.(product);
      } else {
        showNotification("Product not found in catalog", "error");
      }
    } else {
      showNotification("Barcode not recognized", "error");
    }
  };

  const handleManualEntry = (barcode: string) => {
    if (barcode.length >= 8) {
      handleBarcodeDetected(barcode);
    }
  };

  const resetScanner = () => {
    setScannedCode("");
    setFoundProduct(null);
    setIsScanning(true);
    simulateScanning();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="text-white">
            <h2 className="text-lg font-semibold">Barcode Scanner</h2>
            <p className="text-sm text-white/80">
              {isScanning ? 'Point camera at barcode' : 'Scan complete'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Camera View */}
      <div className="relative w-full h-full">
        {hasCamera ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Scanning Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                {/* Scanning Frame */}
                <div className="w-64 h-40 border-2 border-white rounded-lg relative">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-apple-blue-500 rounded-tl-lg"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-apple-blue-500 rounded-tr-lg"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-apple-blue-500 rounded-bl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-apple-blue-500 rounded-br-lg"></div>
                  
                  {/* Scanning Line */}
                  {isScanning && (
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-apple-blue-500 animate-pulse">
                      <div className="w-full h-full bg-gradient-to-r from-transparent via-apple-blue-500 to-transparent animate-bounce"></div>
                    </div>
                  )}
                </div>
                
                <div className="text-center mt-4 text-white">
                  {isScanning ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Scan className="w-5 h-5 animate-pulse" />
                      <span>Scanning for barcode...</span>
                    </div>
                  ) : foundProduct ? (
                    <div className="flex items-center justify-center space-x-2 text-green-400">
                      <CheckCircle className="w-5 h-5" />
                      <span>Product found!</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 text-red-400">
                      <AlertCircle className="w-5 h-5" />
                      <span>No product found</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-black text-white">
            <div className="text-center">
              <Camera className="w-16 h-16 mx-auto mb-4 text-white/60" />
              <p className="text-lg mb-2">Camera not available</p>
              <p className="text-sm text-white/80">
                Please allow camera access to scan barcodes
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Results Panel */}
      {(scannedCode || foundProduct) && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-6 max-h-80 overflow-y-auto">
          {foundProduct ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={foundProduct.image}
                  alt={foundProduct.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-apple-gray-900">
                    {foundProduct.name}
                  </h3>
                  <p className="text-apple-blue-500 font-bold text-xl">
                    ${foundProduct.price.toLocaleString()}
                  </p>
                </div>
              </div>
              
              <p className="text-apple-gray-600 text-sm">
                {foundProduct.description}
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    // Add to cart logic would go here
                    showNotification(`${foundProduct.name} added to cart!`, "success");
                    onClose();
                  }}
                  className="flex-1 py-3 bg-apple-blue-500 text-white rounded-lg font-semibold hover:bg-apple-blue-600 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={resetScanner}
                  className="px-6 py-3 border border-apple-gray-300 text-apple-gray-700 rounded-lg hover:bg-apple-gray-50 transition-colors"
                >
                  Scan Another
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-apple-gray-600">
                Scanned: <span className="font-mono">{scannedCode}</span>
              </div>
              <p className="text-apple-gray-500">Product not found in our catalog</p>
              
              <div className="flex space-x-3">
                <button
                  onClick={resetScanner}
                  className="flex-1 py-3 bg-apple-blue-500 text-white rounded-lg font-semibold hover:bg-apple-blue-600 transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-apple-gray-300 text-apple-gray-700 rounded-lg hover:bg-apple-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Manual Entry */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
          <input
            type="text"
            placeholder="Or enter barcode manually..."
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-white/60 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-apple-blue-500"
            onChange={(e) => handleManualEntry(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
