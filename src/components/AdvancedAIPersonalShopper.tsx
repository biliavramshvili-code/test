import React, { useState, useEffect } from 'react';
import { Brain, MessageCircle, Sparkles, TrendingUp, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const AdvancedAIPersonalShopper: React.FC = () => {
  const [conversation, setConversation] = useState([
    {
      id: 1,
      type: 'ai',
      message: "Hello! I'm your advanced AI personal shopper. I've analyzed your preferences, purchase history, and current trends. How can I help you find the perfect products today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState({
    style: 'Modern Minimalist',
    budget: '$500-2000',
    preferences: ['Tech Gadgets', 'Premium Quality', 'Sustainable Products'],
    mood: 'Adventurous'
  });

  const aiResponses = [
    "Based on your love for minimalist design, I recommend the new MacBook Air M3. Its sleek profile matches your aesthetic perfectly!",
    "I notice you're interested in sustainable tech. The iPhone 15 has 75% recycled aluminum - perfect for your eco-conscious lifestyle.",
    "Your purchase pattern suggests you value premium audio. The AirPods Pro 2 with spatial audio would complement your setup beautifully.",
    "Given your budget and style preferences, I've curated a collection of products that blend innovation with elegance.",
    "I see you're feeling adventurous today! How about exploring our new AR shopping experience with the Vision Pro?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: conversation.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toISOString()
    };

    setConversation(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: conversation.length + 2,
        type: 'ai',
        message: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toISOString()
      };
      setConversation(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Advanced AI Personal Shopper</h2>
          <p className="text-gray-600">Your intelligent shopping companion with deep learning insights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Profile */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your AI Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Style Preference</label>
              <div className="mt-1 p-3 bg-purple-50 rounded-lg">
                <span className="text-purple-700 font-medium">{userProfile.style}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Budget Range</label>
              <div className="mt-1 p-3 bg-green-50 rounded-lg">
                <span className="text-green-700 font-medium">{userProfile.budget}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Current Mood</label>
              <div className="mt-1 p-3 bg-orange-50 rounded-lg">
                <span className="text-orange-700 font-medium">{userProfile.mood}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Preferences</label>
              <div className="mt-1 space-y-2">
                {userProfile.preferences.map((pref, index) => (
                  <span key={index} className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm mr-2">
                    {pref}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              AI Shopping Assistant
            </h3>
          </div>
          
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {conversation.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {msg.message}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <TrendingUp className="w-8 h-8 text-green-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Trend Analysis</h3>
          <p className="text-gray-600">AI predicts 87% match with your style preferences</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <Heart className="w-8 h-8 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Emotional Intelligence</h3>
          <p className="text-gray-600">Products curated based on your current mood</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <Star className="w-8 h-8 text-yellow-500 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Satisfaction Score</h3>
          <p className="text-gray-600">95% predicted satisfaction with recommendations</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedAIPersonalShopper;
