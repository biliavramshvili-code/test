import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCw, ZoomIn, ZoomOut, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { Product } from '../types';

interface InteractiveProductDemoProps {
  product: Product;
}

const InteractiveProductDemo: React.FC<InteractiveProductDemoProps> = ({ product }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Demo video URL (using a placeholder for demo)
  const demoVideoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  // Interactive hotspots for product features
  const hotspots = [
    { id: 1, x: 30, y: 40, title: "Premium Display", description: "Retina display with True Tone technology" },
    { id: 2, x: 70, y: 60, title: "Advanced Camera", description: "Professional-grade camera system" },
    { id: 3, x: 50, y: 80, title: "Touch ID", description: "Secure fingerprint authentication" }
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = parseFloat(e.target.value);
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const rotate360 = () => {
    setRotation(prev => prev + 90);
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-2xl font-bold text-apple-gray-900 mb-6">
        Interactive Product Demo
      </h3>

      <div 
        ref={containerRef}
        className="relative bg-black rounded-xl overflow-hidden aspect-video mb-6"
      >
        {/* Video Player */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          style={{
            transform: `rotate(${rotation}deg) scale(${zoom})`,
            transition: 'transform 0.3s ease'
          }}
          poster={product.image}
        >
          <source src={demoVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Interactive Hotspots */}
        {hotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className="absolute w-6 h-6 bg-apple-blue-500 rounded-full border-2 border-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2 animate-pulse hover:animate-none hover:scale-125 transition-transform"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
          >
            <div className="w-full h-full bg-apple-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        ))}

        {/* Hotspot Info */}
        {activeHotspot && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 max-w-xs">
            {(() => {
              const hotspot = hotspots.find(h => h.id === activeHotspot);
              return hotspot ? (
                <>
                  <h4 className="font-semibold text-apple-gray-900 mb-1">
                    {hotspot.title}
                  </h4>
                  <p className="text-sm text-apple-gray-600">
                    {hotspot.description}
                  </p>
                </>
              ) : null;
            })()}
          </div>
        )}

        {/* Control Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity">
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={rotate360}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              title="Rotate"
            >
              <RotateCw className="w-5 h-5" />
            </button>
            <button
              onClick={zoomOut}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <button
              onClick={zoomIn}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-apple-gray-600 min-w-[40px]">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-2 bg-apple-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-apple-gray-600 min-w-[40px]">
            {formatTime(duration)}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-12 h-12 bg-apple-blue-500 text-white rounded-full hover:bg-apple-blue-600 transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="p-2 text-apple-gray-600 hover:text-apple-blue-500 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-2 bg-apple-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="text-sm text-apple-gray-600">
            Zoom: {Math.round(zoom * 100)}% | Rotation: {rotation}°
          </div>
        </div>
      </div>

      {/* Demo Features */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "360° View", description: "Rotate to see every angle" },
          { title: "Zoom & Pan", description: "Get up close to details" },
          { title: "Interactive Hotspots", description: "Click to learn about features" }
        ].map((feature, index) => (
          <div key={index} className="bg-apple-gray-50 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-apple-gray-900 mb-1">
              {feature.title}
            </h4>
            <p className="text-sm text-apple-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveProductDemo;
