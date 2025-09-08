import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, RotateCw, Move, ZoomIn, ZoomOut } from 'lucide-react';
import { Product } from '../types';

interface ARPreviewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ARPreview: React.FC<ARPreviewProps> = ({ product, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCamera, setHasCamera] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
        video: { facingMode: 'environment' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setHasCamera(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasCamera(false);
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleProductMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  const takeScreenshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        
        // Draw video frame
        ctx.drawImage(videoRef.current, 0, 0);
        
        // Create download link
        const link = document.createElement('a');
        link.download = `${product.name}-ar-preview.png`;
        link.href = canvas.toDataURL();
        link.click();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="text-white">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-white/80">AR Preview</p>
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
        {isLoading ? (
          <div className="flex items-center justify-center h-full bg-black">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Starting camera...</p>
            </div>
          </div>
        ) : hasCamera ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              onClick={handleProductMove}
            />
            
            {/* Virtual Product Overlay */}
            <div
              className="absolute pointer-events-none transition-all duration-300 ease-out"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-contain drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                }}
              />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-black text-white">
            <div className="text-center">
              <Camera className="w-16 h-16 mx-auto mb-4 text-white/60" />
              <p className="text-lg mb-2">Camera not available</p>
              <p className="text-sm text-white/80">
                Please allow camera access to use AR preview
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      {hasCamera && !isLoading && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
          <div className="flex items-center justify-center space-x-6">
            {/* Scale Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-white text-sm min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale(Math.min(2, scale + 0.1))}
                className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            {/* Rotation Control */}
            <button
              onClick={() => setRotation((rotation + 45) % 360)}
              className="p-3 text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <RotateCw className="w-6 h-6" />
            </button>

            {/* Screenshot */}
            <button
              onClick={takeScreenshot}
              className="p-3 bg-white/20 text-white hover:bg-white/30 rounded-full transition-colors"
            >
              <Camera className="w-6 h-6" />
            </button>

            {/* Reset Position */}
            <button
              onClick={() => {
                setPosition({ x: 50, y: 50 });
                setScale(1);
                setRotation(0);
              }}
              className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            >
              <Move className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-center mt-2">
            <p className="text-white/80 text-sm">
              Tap to move • Use controls to adjust size and rotation
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARPreview;
