import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, Move3D, Eye, Info } from 'lucide-react';
import { Product } from '../types';

interface InteractiveShowroomProps {
  product: Product;
  className?: string;
}

const InteractiveShowroom: React.FC<InteractiveShowroomProps> = ({ 
  product, 
  className = "" 
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showHotspots, setShowHotspots] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const hotspots = [
    { x: 30, y: 40, title: "Display", description: "Retina Display with True Tone" },
    { x: 70, y: 20, title: "Camera", description: "Advanced camera system" },
    { x: 50, y: 80, title: "Home Button", description: "Touch ID sensor" },
    { x: 20, y: 60, title: "Speakers", description: "Stereo speakers" }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <div className={`bg-gradient-to-br from-apple-gray-50 to-white rounded-2xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-apple-gray-900">Interactive Showroom</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`p-2 rounded-lg transition-colors ${
              showHotspots 
                ? 'bg-apple-blue-500 text-white' 
                : 'bg-apple-gray-200 text-apple-gray-600 hover:bg-apple-gray-300'
            }`}
            title="Toggle hotspots"
          >
            <Info className="w-4 h-4" />
          </button>
          <button
            onClick={zoomOut}
            className="p-2 bg-apple-gray-200 text-apple-gray-600 rounded-lg hover:bg-apple-gray-300 transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={zoomIn}
            className="p-2 bg-apple-gray-200 text-apple-gray-600 rounded-lg hover:bg-apple-gray-300 transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            className="p-2 bg-apple-gray-200 text-apple-gray-600 rounded-lg hover:bg-apple-gray-300 transition-colors"
            title="Reset view"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative h-96 bg-gradient-to-b from-apple-gray-100 to-apple-gray-200 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ perspective: '1000px' }}
      >
        {/* 3D Product Container */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-200"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Main Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-64 h-64 object-contain drop-shadow-2xl"
              draggable={false}
            />
            
            {/* Reflection */}
            <div 
              className="absolute top-full left-0 w-full h-32 opacity-20"
              style={{
                background: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))`,
                transform: 'rotateX(180deg) translateY(-100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)'
              }}
            >
              <img
                src={product.image}
                alt=""
                className="w-full h-64 object-contain transform scale-y-[-1]"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Interactive Hotspots */}
        {showHotspots && hotspots.map((hotspot, index) => (
          <div
            key={index}
            className="absolute group"
            style={{
              left: `${hotspot.x}%`,
              top: `${hotspot.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="w-4 h-4 bg-apple-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse cursor-pointer">
              <div className="absolute inset-0 bg-apple-blue-500 rounded-full animate-ping opacity-75"></div>
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                <div className="font-semibold">{hotspot.title}</div>
                <div className="text-gray-300">{hotspot.description}</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Instructions */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center space-x-4 text-white text-sm">
              <div className="flex items-center space-x-1">
                <Move3D className="w-4 h-4" />
                <span>Drag to rotate</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>Zoom: {Math.round(zoom * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-apple-gray-200">
          <h4 className="font-semibold text-apple-gray-900 mb-2">Dimensions</h4>
          <p className="text-sm text-apple-gray-600">
            {product.specifications?.dimensions || "146.7 × 71.5 × 7.4 mm"}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-apple-gray-200">
          <h4 className="font-semibold text-apple-gray-900 mb-2">Weight</h4>
          <p className="text-sm text-apple-gray-600">
            {product.specifications?.weight || "174 grams"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveShowroom;
