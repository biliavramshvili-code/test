import React, { useState, useEffect } from 'react';
import { Camera, Smile, Frown, Meh, Heart, TrendingUp, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmotionData {
  emotion: 'happy' | 'sad' | 'neutral' | 'excited' | 'frustrated' | 'surprised';
  confidence: number;
  intensity: number;
}

interface EmotionRecommendation {
  id: string;
  productId: number;
  reason: string;
  emotionMatch: number;
  category: string;
}

const EmotionRecognitionShopping: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null);
  const [emotionHistory, setEmotionHistory] = useState<EmotionData[]>([]);
  const [recommendations, setRecommendations] = useState<EmotionRecommendation[]>([]);
  const [calibrating, setCalibrating] = useState(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        // Simulate emotion detection
        const emotions: EmotionData['emotion'][] = ['happy', 'sad', 'neutral', 'excited', 'frustrated', 'surprised'];
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        
        const emotionData: EmotionData = {
          emotion: randomEmotion,
          confidence: 0.7 + Math.random() * 0.3,
          intensity: Math.random()
        };
        
        setCurrentEmotion(emotionData);
        setEmotionHistory(prev => [...prev.slice(-9), emotionData]);
        
        // Generate emotion-based recommendations
        generateEmotionRecommendations(emotionData);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const generateEmotionRecommendations = (emotion: EmotionData) => {
    const emotionRecommendations: Record<string, EmotionRecommendation[]> = {
      happy: [
        {
          id: 'er1',
          productId: 1,
          reason: "Your happiness suggests you're ready for something new and exciting!",
          emotionMatch: 0.95,
          category: 'Latest Tech'
        },
        {
          id: 'er2',
          productId: 3,
          reason: "Happy customers love our premium accessories",
          emotionMatch: 0.88,
          category: 'Accessories'
        }
      ],
      sad: [
        {
          id: 'er3',
          productId: 2,
          reason: "A new device might brighten your day",
          emotionMatch: 0.82,
          category: 'Comfort Tech'
        }
      ],
      excited: [
        {
          id: 'er4',
          productId: 1,
          reason: "Your excitement matches perfectly with our latest innovations!",
          emotionMatch: 0.97,
          category: 'Innovation'
        }
      ],
      frustrated: [
        {
          id: 'er5',
          productId: 4,
          reason: "Let our reliable products solve your tech frustrations",
          emotionMatch: 0.85,
          category: 'Reliable Solutions'
        }
      ],
      neutral: [
        {
          id: 'er6',
          productId: 2,
          reason: "Perfect time to explore our balanced product range",
          emotionMatch: 0.75,
          category: 'Everyday Tech'
        }
      ],
      surprised: [
        {
          id: 'er7',
          productId: 5,
          reason: "Since you love surprises, check out our newest releases!",
          emotionMatch: 0.92,
          category: 'New Releases'
        }
      ]
    };

    setRecommendations(emotionRecommendations[emotion.emotion] || []);
  };

  const startEmotionDetection = async () => {
    setCalibrating(true);
    
    // Simulate camera initialization and calibration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsActive(true);
    setCalibrating(false);
  };

  const stopEmotionDetection = () => {
    setIsActive(false);
    setCurrentEmotion(null);
    setEmotionHistory([]);
    setRecommendations([]);
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'happy': return <Smile className="w-6 h-6 text-green-400" />;
      case 'sad': return <Frown className="w-6 h-6 text-blue-400" />;
      case 'excited': return <Heart className="w-6 h-6 text-red-400" />;
      case 'frustrated': return <Frown className="w-6 h-6 text-orange-400" />;
      case 'surprised': return <Eye className="w-6 h-6 text-purple-400" />;
      default: return <Meh className="w-6 h-6 text-gray-400" />;
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'happy': return 'text-green-400';
      case 'sad': return 'text-blue-400';
      case 'excited': return 'text-red-400';
      case 'frustrated': return 'text-orange-400';
      case 'surprised': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Camera className="w-8 h-8 text-pink-400" />
            {isActive && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold">Emotion Recognition Shopping</h3>
            <p className="text-pink-200">AI-powered emotional shopping experience</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-pink-200">Status</div>
          <div className={`font-bold ${isActive ? 'text-green-400' : 'text-gray-400'}`}>
            {isActive ? 'DETECTING' : 'INACTIVE'}
          </div>
        </div>
      </div>

      {!isActive ? (
        <div className="text-center py-12">
          <Camera className="w-16 h-16 text-pink-400 mx-auto mb-4" />
          <h4 className="text-xl font-semibold mb-2">Start Emotion Detection</h4>
          <p className="text-pink-200 mb-6">
            Allow camera access to personalize your shopping experience based on your emotions
          </p>
          <button
            onClick={startEmotionDetection}
            disabled={calibrating}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50"
          >
            {calibrating ? (
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Eye className="w-5 h-5" />
                </motion.div>
                <span>Calibrating Camera...</span>
              </div>
            ) : (
              "Start Emotion Detection"
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Current Emotion Display */}
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">Current Emotion</h4>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Live Detection</span>
              </div>
            </div>
            
            {currentEmotion && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  {getEmotionIcon(currentEmotion.emotion)}
                  <div>
                    <div className={`text-2xl font-bold capitalize ${getEmotionColor(currentEmotion.emotion)}`}>
                      {currentEmotion.emotion}
                    </div>
                    <div className="text-sm text-pink-200">
                      Confidence: {(currentEmotion.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-pink-200">Intensity</div>
                  <div className="text-lg font-bold">
                    {(currentEmotion.intensity * 100).toFixed(0)}%
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Emotion History */}
          <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
            <h4 className="text-lg font-semibold mb-4">Emotion Timeline</h4>
            <div className="flex space-x-2 overflow-x-auto">
              {emotionHistory.map((emotion, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex-shrink-0 bg-white/5 rounded-lg p-3 text-center min-w-20"
                >
                  {getEmotionIcon(emotion.emotion)}
                  <div className={`text-xs mt-1 capitalize ${getEmotionColor(emotion.emotion)}`}>
                    {emotion.emotion}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Emotion-Based Recommendations */}
          {recommendations.length > 0 && (
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <h4 className="text-lg font-semibold">Emotion-Based Recommendations</h4>
              </div>
              
              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold">Product #{rec.productId}</div>
                        <div className="text-sm text-pink-200">{rec.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-pink-200">Match</div>
                        <div className="font-bold text-green-400">
                          {(rec.emotionMatch * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-pink-200">{rec.reason}</p>
                    <button className="w-full mt-3 bg-purple-500/20 border border-purple-500/30 text-purple-300 py-2 rounded-lg hover:bg-purple-500/30 transition-all">
                      View Product
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={stopEmotionDetection}
            className="w-full bg-red-500/20 border border-red-500/30 text-red-300 py-3 rounded-xl font-semibold hover:bg-red-500/30 transition-all"
          >
            Stop Emotion Detection
          </button>
        </div>
      )}
    </div>
  );
};

export default EmotionRecognitionShopping;
