import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Mic, MicOff, Bot, User, Sparkles, ShoppingBag, Heart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  products?: any[];
}

interface ShoppingContext {
  preferences: string[];
  budget: number;
  occasion: string;
  style: string;
}

const AIShoppingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your AI Shopping Assistant. I can help you find the perfect Apple products based on your needs, budget, and preferences. What are you looking for today?",
      timestamp: new Date(),
      suggestions: ["Find me a MacBook", "Best iPhone for photography", "Accessories under $100", "Gaming setup recommendations"]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [shoppingContext, setShoppingContext] = useState<ShoppingContext>({
    preferences: [],
    budget: 0,
    occasion: '',
    style: ''
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      recognition.current = new (window as any).webkitSpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateAIResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses = {
      macbook: {
        content: "Based on your needs, I'd recommend the MacBook Air M2 for everyday use or MacBook Pro M3 for professional work. What will you primarily use it for?",
        suggestions: ["Video editing", "Programming", "Student use", "Business presentations"],
        products: [
          { id: 1, name: "MacBook Air M2", price: 1199, image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300" },
          { id: 2, name: "MacBook Pro M3", price: 1999, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300" }
        ]
      },
      iphone: {
        content: "For photography, the iPhone 15 Pro Max has the best camera system with 5x telephoto zoom and advanced computational photography. The iPhone 15 Pro is also excellent if you prefer a smaller size.",
        suggestions: ["Compare camera specs", "Show accessories", "Check trade-in value", "See color options"],
        products: [
          { id: 3, name: "iPhone 15 Pro Max", price: 1199, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300" },
          { id: 4, name: "iPhone 15 Pro", price: 999, image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300" }
        ]
      },
      accessories: {
        content: "Here are some great accessories under $100: AirPods (3rd gen), MagSafe chargers, Apple Watch bands, and cases. What device do you need accessories for?",
        suggestions: ["iPhone accessories", "MacBook accessories", "Apple Watch bands", "Audio accessories"],
        products: [
          { id: 5, name: "AirPods (3rd gen)", price: 179, image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300" },
          { id: 6, name: "MagSafe Charger", price: 39, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300" }
        ]
      },
      default: {
        content: "I understand you're looking for Apple products. Could you tell me more about your specific needs, budget, or what you'll be using the device for? This helps me give you the best recommendations.",
        suggestions: ["MacBook recommendations", "iPhone options", "iPad for work", "Apple Watch features"]
      }
    };

    const lowerMessage = userMessage.toLowerCase();
    let response = responses.default;

    if (lowerMessage.includes('macbook') || lowerMessage.includes('laptop')) {
      response = responses.macbook;
    } else if (lowerMessage.includes('iphone') || lowerMessage.includes('phone') || lowerMessage.includes('photography')) {
      response = responses.iphone;
    } else if (lowerMessage.includes('accessories') || lowerMessage.includes('under') || lowerMessage.includes('$100')) {
      response = responses.accessories;
    }

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: response.content,
      timestamp: new Date(),
      suggestions: response.suggestions,
      products: response.products
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const aiResponse = await generateAIResponse(inputValue);
    setIsTyping(false);
    setMessages(prev => [...prev, aiResponse]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      recognition.current?.stop();
      setIsListening(false);
    } else {
      recognition.current?.start();
      setIsListening(true);
    }
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="relative">
          <Bot className="w-6 h-6" />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.button>

      {/* AI Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">AI Shopping Assistant</h3>
                    <p className="text-purple-100 text-sm">Powered by advanced AI</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-start space-x-3">
                        {message.type === 'assistant' && (
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`rounded-2xl p-4 ${
                            message.type === 'user'
                              ? 'bg-apple-blue-500 text-white'
                              : 'bg-apple-gray-100 text-apple-gray-900'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          
                          {/* Product Recommendations */}
                          {message.products && (
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {message.products.map((product) => (
                                <div key={product.id} className="bg-white rounded-xl p-3 shadow-sm border">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-24 object-cover rounded-lg mb-2"
                                  />
                                  <h4 className="font-semibold text-sm text-apple-gray-900">{product.name}</h4>
                                  <p className="text-apple-blue-500 font-bold">${product.price}</p>
                                  <div className="flex space-x-2 mt-2">
                                    <button className="flex-1 bg-apple-blue-500 text-white text-xs py-1 px-2 rounded-lg hover:bg-apple-blue-600 transition-colors">
                                      View
                                    </button>
                                    <button className="p-1 text-apple-gray-400 hover:text-red-500 transition-colors">
                                      <Heart className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Suggestions */}
                          {message.suggestions && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  className="text-xs bg-white/20 hover:bg-white/30 text-apple-gray-700 px-3 py-1 rounded-full transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {message.type === 'user' && (
                          <div className="w-8 h-8 bg-apple-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-apple-gray-100 rounded-2xl p-4">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-apple-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-apple-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-apple-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-apple-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask me anything about Apple products..."
                      className="w-full px-4 py-3 pr-12 border border-apple-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={toggleVoiceInput}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
                        isListening ? 'text-red-500 bg-red-50' : 'text-apple-gray-400 hover:text-purple-500'
                      }`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIShoppingAssistant;
