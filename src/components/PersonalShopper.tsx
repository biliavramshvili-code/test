import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User, ShoppingBag, Heart, Star } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  products?: Product[];
}

const PersonalShopper: React.FC = () => {
  const { products } = useProducts();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hi! I'm your personal Apple shopping assistant. I can help you find the perfect products based on your needs, budget, and preferences. What are you looking for today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "I need a new iPhone",
    "Best laptop for students",
    "Accessories for MacBook",
    "Gaming setup recommendations",
    "Professional photography gear"
  ];

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    let response = "";
    let recommendedProducts: Product[] = [];

    // Simple AI-like responses based on keywords
    if (lowerMessage.includes('iphone') || lowerMessage.includes('phone')) {
      response = "Great choice! iPhones are perfect for their seamless integration and premium quality. Based on your needs, here are my top recommendations:";
      recommendedProducts = products.filter(p => p.name.toLowerCase().includes('iphone')).slice(0, 3);
    } else if (lowerMessage.includes('laptop') || lowerMessage.includes('macbook') || lowerMessage.includes('computer')) {
      response = "MacBooks are excellent for both personal and professional use. Here are some options that might interest you:";
      recommendedProducts = products.filter(p => p.name.toLowerCase().includes('macbook')).slice(0, 3);
    } else if (lowerMessage.includes('student') || lowerMessage.includes('school') || lowerMessage.includes('education')) {
      response = "For students, I'd recommend products that offer great value and portability. Here are my top picks:";
      recommendedProducts = products.filter(p => p.price < 1500).slice(0, 3);
    } else if (lowerMessage.includes('gaming') || lowerMessage.includes('game')) {
      response = "For gaming, you'll want powerful performance and great graphics. Here are some recommendations:";
      recommendedProducts = products.filter(p => p.name.toLowerCase().includes('pro')).slice(0, 3);
    } else if (lowerMessage.includes('budget') || lowerMessage.includes('cheap') || lowerMessage.includes('affordable')) {
      response = "I understand budget is important. Here are some great value options that don't compromise on quality:";
      recommendedProducts = products.sort((a, b) => a.price - b.price).slice(0, 3);
    } else if (lowerMessage.includes('professional') || lowerMessage.includes('work') || lowerMessage.includes('business')) {
      response = "For professional use, you'll want reliable, high-performance products. Here are my recommendations:";
      recommendedProducts = products.filter(p => p.name.toLowerCase().includes('pro')).slice(0, 3);
    } else {
      response = "I'd be happy to help you find the perfect Apple products! Could you tell me more about what you're looking for? For example, are you interested in phones, computers, accessories, or something specific for work, school, or entertainment?";
      recommendedProducts = products.slice(0, 3);
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      products: recommendedProducts.length > 0 ? recommendedProducts : undefined
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-apple-blue-500 to-apple-blue-600 text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Personal Shopping Assistant</h2>
            <p className="text-apple-blue-100">AI-powered product recommendations</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs lg:max-w-md ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-apple-blue-500 text-white'
                    : 'bg-apple-gray-100 text-apple-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <div className={`flex items-center mt-1 space-x-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-apple-blue-100 order-2' : 'bg-apple-gray-200 order-1'}`}>
                  {message.type === 'user' ? (
                    <User className="w-3 h-3 text-apple-blue-600" />
                  ) : (
                    <Bot className="w-3 h-3 text-apple-gray-600" />
                  )}
                </div>
                <span className="text-xs text-apple-gray-500">
                  {formatTime(message.timestamp)}
                </span>
              </div>

              {/* Product Recommendations */}
              {message.products && (
                <div className="mt-4 space-y-3">
                  {message.products.map((product) => (
                    <div key={product.id} className="bg-white border border-apple-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex space-x-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-contain bg-apple-gray-50 rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-apple-gray-900 text-sm">
                            {product.name}
                          </h4>
                          <p className="text-xs text-apple-gray-600 mt-1">
                            {product.description.substring(0, 80)}...
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-apple-blue-600">
                              ${product.price.toLocaleString()}
                            </span>
                            <div className="flex space-x-2">
                              <button className="p-1 text-apple-gray-400 hover:text-red-500 transition-colors">
                                <Heart className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-apple-gray-400 hover:text-apple-blue-500 transition-colors">
                                <ShoppingBag className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-apple-gray-100 rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-apple-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-apple-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-apple-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions */}
      <div className="px-6 py-4 border-t border-apple-gray-200">
        <p className="text-sm text-apple-gray-600 mb-3">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question)}
              className="px-3 py-2 bg-apple-gray-100 text-apple-gray-700 rounded-lg text-sm hover:bg-apple-gray-200 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-6 border-t border-apple-gray-200">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about Apple products..."
            className="flex-1 px-4 py-3 border border-apple-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="px-6 py-3 bg-apple-blue-500 text-white rounded-xl hover:bg-apple-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalShopper;
