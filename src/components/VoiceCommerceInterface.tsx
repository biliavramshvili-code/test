import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, ShoppingCart, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';

const VoiceCommerceInterface: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState([
    {
      id: 1,
      type: 'assistant',
      message: "Hello! I'm your voice shopping assistant. You can ask me to find products, check prices, or help with your orders. Try saying 'Show me the latest iPhones' or 'Add AirPods to my cart'.",
      timestamp: new Date().toISOString()
    }
  ]);
  const [voiceSettings, setVoiceSettings] = useState({
    voice: 'female',
    speed: 1.0,
    volume: 0.8,
    language: 'en-US'
  });

  const voiceCommands = [
    {
      command: "Show me [product]",
      description: "Search for specific products",
      example: "Show me MacBook Pro"
    },
    {
      command: "Add [product] to cart",
      description: "Add items to your shopping cart",
      example: "Add iPhone 15 to cart"
    },
    {
      command: "What's in my cart?",
      description: "Check your current cart contents",
      example: "What's in my cart?"
    },
    {
      command: "Compare [product A] and [product B]",
      description: "Compare two products",
      example: "Compare iPhone 15 and iPhone 14"
    },
    {
      command: "Check my orders",
      description: "View your recent orders",
      example: "Check my orders"
    },
    {
      command: "Find deals on [category]",
      description: "Search for discounts and offers",
      example: "Find deals on laptops"
    }
  ];

  const quickActions = [
    { icon: Search, label: "Search Products", command: "search for products" },
    { icon: ShoppingCart, label: "Check Cart", command: "what's in my cart" },
    { icon: User, label: "My Account", command: "show my account" },
    { icon: MessageSquare, label: "Help", command: "help me shop" }
  ];

  const handleVoiceCommand = (command: string) => {
    const newMessage = {
      id: conversation.length + 1,
      type: 'user',
      message: command,
      timestamp: new Date().toISOString()
    };

    setConversation(prev => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      let response = "I understand you want to " + command.toLowerCase() + ". Let me help you with that.";
      
      if (command.toLowerCase().includes('iphone')) {
        response = "I found several iPhone models for you. The iPhone 15 Pro starts at $999, and the iPhone 15 starts at $799. Would you like to see more details or add one to your cart?";
      } else if (command.toLowerCase().includes('cart')) {
        response = "Your cart currently has 2 items: iPhone 15 Pro ($999) and AirPods Pro ($249). Your total is $1,248. Would you like to proceed to checkout?";
      } else if (command.toLowerCase().includes('macbook')) {
        response = "I found the MacBook Air M3 starting at $1,099 and MacBook Pro M3 starting at $1,599. Both are available with fast shipping. Which one interests you more?";
      }

      const aiResponse = {
        id: conversation.length + 2,
        type: 'assistant',
        message: response,
        timestamp: new Date().toISOString()
      };

      setConversation(prev => [...prev, aiResponse]);
      
      // Simulate text-to-speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        utterance.rate = voiceSettings.speed;
        utterance.volume = voiceSettings.volume;
        utterance.lang = voiceSettings.language;
        
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        speechSynthesis.speak(utterance);
      }
    }, 1000);
  };

  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      const sampleCommands = [
        "Show me the latest MacBook Pro",
        "Add AirPods Pro to my cart",
        "What's the price of iPhone 15?",
        "Find deals on Apple Watch"
      ];
      const randomCommand = sampleCommands[Math.floor(Math.random() * sampleCommands.length)];
      setTranscript(randomCommand);
      setIsListening(false);
      handleVoiceCommand(randomCommand);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    setTranscript('');
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
          <Mic className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Voice Commerce Interface</h2>
          <p className="text-gray-600">Shop hands-free with advanced voice recognition and AI assistance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Voice Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Voice Controls */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isListening ? stopListening : startListening}
                className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-200' 
                    : 'bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-200'
                }`}
              >
                {isListening ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <MicOff className="w-12 h-12 text-white" />
                  </motion.div>
                ) : (
                  <Mic className="w-12 h-12 text-white" />
                )}
              </motion.button>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isListening ? 'Listening...' : 'Tap to speak'}
              </h3>
              
              {transcript && (
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 italic">"{transcript}"</p>
                </div>
              )}

              <div className="flex justify-center space-x-4">
                <button
                  onClick={toggleSpeaking}
                  className={`p-3 rounded-full transition-colors ${
                    isSpeaking 
                      ? 'bg-orange-500 text-white' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Voice Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleVoiceCommand(action.command)}
                  className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <action.icon className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-gray-900">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Conversation History */}
          <div className="bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Conversation</h3>
            </div>
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {conversation.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p>{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings & Commands */}
        <div className="space-y-6">
          {/* Voice Settings */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Voice Type</label>
                <select
                  value={voiceSettings.voice}
                  onChange={(e) => setVoiceSettings(prev => ({ ...prev, voice: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Speed</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={voiceSettings.speed}
                  onChange={(e) => setVoiceSettings(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                  className="w-full"
                />
                <span className="text-sm text-gray-600">{voiceSettings.speed}x</span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Volume</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={voiceSettings.volume}
                  onChange={(e) => setVoiceSettings(prev => ({ ...prev, volume: parseFloat(e.target.value) }))}
                  className="w-full"
                />
                <span className="text-sm text-gray-600">{Math.round(voiceSettings.volume * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Voice Commands Guide */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Commands</h3>
            <div className="space-y-3">
              {voiceCommands.map((cmd, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900">{cmd.command}</h4>
                  <p className="text-sm text-gray-600 mb-1">{cmd.description}</p>
                  <p className="text-xs text-blue-600 italic">{cmd.example}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Voice Analytics */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Analytics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Recognition Accuracy</span>
                <span className="font-semibold text-green-600">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Commands Today</span>
                <span className="font-semibold text-blue-600">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-semibold text-purple-600">89%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Response Time</span>
                <span className="font-semibold text-orange-600">1.2s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommerceInterface;
