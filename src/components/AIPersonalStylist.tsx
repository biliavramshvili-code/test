import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, Palette, Shirt, Star, TrendingUp } from 'lucide-react';

const AIPersonalStylist: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const styleProfiles = [
    { id: 'minimalist', name: 'Minimalist', color: 'from-gray-400 to-gray-600' },
    { id: 'bold', name: 'Bold & Vibrant', color: 'from-red-400 to-pink-600' },
    { id: 'classic', name: 'Classic Elegance', color: 'from-blue-400 to-indigo-600' },
    { id: 'trendy', name: 'Trendy Modern', color: 'from-purple-400 to-pink-600' }
  ];

  const recommendations = [
    {
      id: 1,
      name: 'iPhone 15 Pro - Natural Titanium',
      category: 'Tech Accessory',
      match: 98,
      reason: 'Matches your minimalist aesthetic perfectly',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      name: 'Apple Watch Ultra - Alpine Loop',
      category: 'Wearable',
      match: 95,
      reason: 'Complements your active lifestyle',
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      name: 'AirPods Pro - White',
      category: 'Audio',
      match: 92,
      reason: 'Clean design aligns with your style preferences',
      image: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-100 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            AI Personal Stylist
          </h2>
          <p className="text-gray-600">
            Get personalized product recommendations based on your style preferences and lifestyle
          </p>
        </div>
        <motion.div
          animate={{ rotate: isAnalyzing ? 360 : 0 }}
          transition={{ duration: 2, repeat: isAnalyzing ? Infinity : 0, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Style Analysis */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Style Analysis</h3>
          
          {!analysisComplete ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-16 h-16 text-pink-500" />
                </div>
                <p className="text-gray-600 mb-4">
                  Upload a photo or answer style questions to get personalized recommendations
                </p>
                
                {isAnalyzing ? (
                  <div className="space-y-4">
                    <div className="text-sm text-gray-600">Analyzing your style preferences...</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3 }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={startAnalysis}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-colors"
                  >
                    Start Style Analysis
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Your Style Profile</h4>
              
              <div className="grid grid-cols-2 gap-3">
                {styleProfiles.map((style) => (
                  <motion.div
                    key={style.id}
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedStyle === style.id ? 'ring-2 ring-pink-500' : ''
                    }`}
                    style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    }}
                    onClick={() => setSelectedStyle(style.id)}
                  >
                    <div className={`bg-gradient-to-r ${style.color} rounded-lg p-3 text-white text-center`}>
                      <Palette className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">{style.name}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-pink-50 rounded-lg p-4">
                <h5 className="font-medium text-pink-900 mb-2">Style Insights</h5>
                <ul className="text-sm text-pink-700 space-y-1">
                  <li>• Prefers clean, minimalist designs</li>
                  <li>• Values functionality over flashiness</li>
                  <li>• Gravitates toward neutral colors</li>
                  <li>• Appreciates premium materials</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Personalized Recommendations */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalized Recommendations</h3>
          
          {analysisComplete ? (
            <div className="space-y-4">
              {recommendations.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-pink-300 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.reason}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{item.match}%</span>
                    </div>
                    <div className="text-xs text-gray-500">Match</div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shirt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Complete style analysis to see recommendations</p>
            </div>
          )}
        </div>
      </div>

      {/* Style Trends */}
      <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Current Style Trends</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              trend: 'Sustainable Tech',
              description: 'Eco-friendly materials and packaging',
              growth: '+45%',
              icon: TrendingUp
            },
            {
              trend: 'Minimalist Design',
              description: 'Clean lines and neutral colors',
              growth: '+32%',
              icon: Palette
            },
            {
              trend: 'Smart Integration',
              description: 'Seamless device connectivity',
              growth: '+28%',
              icon: Sparkles
            }
          ].map((trend, index) => {
            const Icon = trend.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-pink-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{trend.trend}</h4>
                <p className="text-sm text-gray-600 mb-2">{trend.description}</p>
                <span className="text-sm font-medium text-green-600">{trend.growth}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AIPersonalStylist;
