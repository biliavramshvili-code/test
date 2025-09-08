import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Headphones, Package, CreditCard, Truck } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'product-card';
  data?: any;
}

interface QuickReply {
  text: string;
  action: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Apple Store assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'quick-reply',
      data: {
        quickReplies: [
          { text: 'Product Information', action: 'product-info' },
          { text: 'Order Status', action: 'order-status' },
          { text: 'Technical Support', action: 'tech-support' },
          { text: 'Store Locations', action: 'store-locations' }
        ]
      }
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'user' | 'bot', type: string = 'text', data?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type: type as any,
      data
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    addMessage(text, 'user');
    setInputText('');
    simulateTyping();

    // Simulate bot response
    setTimeout(() => {
      const response = getBotResponse(text.toLowerCase());
      addMessage(response.text, 'bot', response.type, response.data);
    }, 1500);
  };

  const handleQuickReply = (action: string, text: string) => {
    addMessage(text, 'user');
    simulateTyping();

    setTimeout(() => {
      const response = getBotResponse(action);
      addMessage(response.text, 'bot', response.type, response.data);
    }, 1500);
  };

  const getBotResponse = (input: string): { text: string; type: string; data?: any } => {
    if (input.includes('product') || input === 'product-info') {
      return {
        text: "I can help you with product information! What would you like to know?",
        type: 'quick-reply',
        data: {
          quickReplies: [
            { text: 'MacBook Pro specs', action: 'macbook-specs' },
            { text: 'iPhone 15 Pro features', action: 'iphone-features' },
            { text: 'iPad Pro comparison', action: 'ipad-comparison' },
            { text: 'Apple Watch models', action: 'watch-models' }
          ]
        }
      };
    }

    if (input.includes('order') || input === 'order-status') {
      return {
        text: "To check your order status, please provide your order number or email address. You can also:",
        type: 'quick-reply',
        data: {
          quickReplies: [
            { text: 'Track my order', action: 'track-order' },
            { text: 'Cancel order', action: 'cancel-order' },
            { text: 'Return policy', action: 'return-policy' },
            { text: 'Shipping info', action: 'shipping-info' }
          ]
        }
      };
    }

    if (input.includes('support') || input === 'tech-support') {
      return {
        text: "I'm here to help with technical support! What issue are you experiencing?",
        type: 'quick-reply',
        data: {
          quickReplies: [
            { text: 'Device not working', action: 'device-issue' },
            { text: 'Software problems', action: 'software-issue' },
            { text: 'Setup assistance', action: 'setup-help' },
            { text: 'Contact specialist', action: 'contact-specialist' }
          ]
        }
      };
    }

    if (input.includes('store') || input === 'store-locations') {
      return {
        text: "Find Apple Stores near you! I can help you locate stores, check availability, and schedule appointments.",
        type: 'quick-reply',
        data: {
          quickReplies: [
            { text: 'Find nearest store', action: 'find-store' },
            { text: 'Check store hours', action: 'store-hours' },
            { text: 'Schedule appointment', action: 'schedule-appointment' },
            { text: 'Store services', action: 'store-services' }
          ]
        }
      };
    }

    if (input.includes('macbook') || input === 'macbook-specs') {
      return {
        text: "MacBook Pro 16-inch features:\n• M2 Pro chip with 12-core CPU\n• 19-core GPU\n• 16GB unified memory\n• 512GB SSD storage\n• 16-inch Liquid Retina XDR display\n• Up to 22 hours battery life\n\nWould you like more details or help with purchasing?",
        type: 'quick-reply',
        data: {
          quickReplies: [
            { text: 'View product page', action: 'view-macbook' },
            { text: 'Compare models', action: 'compare-macbook' },
            { text: 'Check availability', action: 'check-macbook-stock' },
            { text: 'Add to cart', action: 'add-macbook-cart' }
          ]
        }
      };
    }

    if (input.includes('price') || input.includes('cost')) {
      return {
        text: "I can help you with pricing information! Our current featured products:\n• MacBook Pro 16-inch: Starting at $2,499\n• iPhone 15 Pro: Starting at $999\n• iPad Pro 12.9-inch: Starting at $1,099\n• Apple Watch Series 9: Starting at $399\n\nWould you like detailed pricing for any specific product?",
        type: 'text'
      };
    }

    if (input.includes('thank') || input.includes('thanks')) {
      return {
        text: "You're welcome! Is there anything else I can help you with today?",
        type: 'quick-reply',
        data: {
          quickReplies: [
            { text: 'Browse products', action: 'browse-products' },
            { text: 'Contact support', action: 'contact-support' },
            { text: 'Store locations', action: 'store-locations' },
            { text: 'End chat', action: 'end-chat' }
          ]
        }
      };
    }

    // Default response
    return {
      text: "I understand you're looking for help. Let me connect you with the right information:",
      type: 'quick-reply',
      data: {
        quickReplies: [
          { text: 'Product Information', action: 'product-info' },
          { text: 'Order Support', action: 'order-status' },
          { text: 'Technical Help', action: 'tech-support' },
          { text: 'Talk to Human', action: 'human-support' }
        ]
      }
    };
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-apple-blue-500 text-white rounded-full shadow-lg hover:bg-apple-blue-600 transition-all duration-300 flex items-center justify-center z-40 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-apple-gray-200 z-50 flex flex-col transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-apple-gray-200 bg-apple-blue-500 text-white rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Apple Assistant</h3>
              <p className="text-xs opacity-90">Online now</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-apple-blue-500' : 'bg-apple-gray-200'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-apple-gray-600" />
                    )}
                  </div>
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-apple-blue-500 text-white'
                      : 'bg-apple-gray-100 text-apple-gray-900'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-apple-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>

                {/* Quick Replies */}
                {message.type === 'quick-reply' && message.data?.quickReplies && (
                  <div className="mt-2 space-y-1">
                    {message.data.quickReplies.map((reply: QuickReply, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply.action, reply.text)}
                        className="block w-full text-left px-3 py-2 text-sm bg-white border border-apple-gray-300 rounded-lg hover:bg-apple-gray-50 transition-colors"
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-apple-gray-200 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-apple-gray-600" />
                </div>
                <div className="bg-apple-gray-100 rounded-2xl px-4 py-2">
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
        <div className="p-4 border-t border-apple-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-apple-gray-300 rounded-full focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent outline-none"
            />
            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={!inputText.trim()}
              className="w-10 h-10 bg-apple-blue-500 text-white rounded-full flex items-center justify-center hover:bg-apple-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
