import React, { useState } from 'react';
import { Camera, RotateCcw, ZoomIn, ZoomOut, X } from 'lucide-react';
import { Product } from '../types';

interface ARViewerProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ARViewer: React.FC<ARViewerProps> = ({ product, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);

  if (!isOpen) return null;

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="relative w-full h-full max-w-4xl max-h-4xl bg-white rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-apple-gray-200">
          <h3 className="text-lg font-semibold text-apple-gray-900">
            AR View: {product.name}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-apple-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AR Viewer */}
        <div className="relative flex-1 bg-gradient-to-br from-apple-gray-50 to-apple-gray-100">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue-500"></div>
            </div>
          )}
          
          <div className="relative h-96 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain transition-transform duration-300"
              style={{ 
                transform: `rotate(${rotation}deg) scale(${zoom})`,
              }}
              onLoad={handleLoadComplete}
            />
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
            <button
              onClick={() => setRotation(rotation - 90)}
              className="p-2 hover:bg-apple-gray-100 rounded-full transition-colors"
              title="Rotate Left"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
              className="p-2 hover:bg-apple-gray-100 rounded-full transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={() => setZoom(Math.min(3, zoom + 0.1))}
              className="p-2 hover:bg-apple-gray-100 rounded-full transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                setRotation(0);
                setZoom(1);
              }}
              className="px-4 py-2 bg-apple-blue-500 text-white rounded-full hover:bg-apple-blue-600 transition-colors text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Info Panel */}
        <div className="p-4 bg-apple-gray-50 border-t border-apple-gray-200">
          <div className="flex items-center space-x-2 text-sm text-apple-gray-600">
            <Camera className="w-4 h-4" />
            <span>Use controls to rotate and zoom. AR experience simulated for demo.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARViewer;
