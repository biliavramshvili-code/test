import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Phone, Mail, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

interface ChatMessage {
  id: string;
  type: 'user' | 'agent' | 'bot';
  message: string;
  timestamp: Date;
  agentName?: string;
  agentAvatar?: string;
}

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatStatus, setChatStatus] = useState<'connecting' | 'connected' | 'offline'>('offline');
  const [agentInfo, setAgentInfo] = useState<{
    name: string;
    avatar: string;
    status: 'online' | 'busy' | 'offline';
  } | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const { showNotification } = useNotification();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize chat with welcome message
      const welcomeMessage: ChatMessage = {
        id: '1',
        type: 'bot',
        message: "Hello! I'm here to help you with any questions about our Apple products. How can I assist you today?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      
      // Simulate connecting to agent
      setTimeout(() => {
        setChatStatus('connecting');
        setTimeout(() => {
          setChatStatus('connected');
          setAgentInfo({
            name: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
            status: 'online'
          });
          
          const agentMessage: ChatMessage = {
            id: '2',
            type: 'agent',
            message: "Hi there! I'm Sarah, your Apple specialist. I see you're browsing our products. Is there anything specific you'd like to know about?",
            timestamp: new Date(),
            agentName: 'Sarah Johnson',
            agentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
          };
          setMessages(prev => [...prev, agentMessage]);
        }, 2000);
      }, 1000);
    }
  }, [isOpen]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "That's a great question! Let me help you with that.",
        "I'd be happy to provide more information about that product.",
        "Based on your needs, I can recommend a few options.",
        "Let me check our current inventory and pricing for you.",
        "That's one of our most popular products! Here's what you should know...",
      ];

      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        agentName: agentInfo?.name,
        agentAvatar: agentInfo?.avatar
      };

      setMessages(prev => [...prev, agentResponse]);
    }, 1500 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    { text: "Product recommendations", action: () => setInputMessage("I need product recommendations") },
    { text: "Check order status", action: () => setInputMessage("I want to check my order status") },
    { text: "Technical support", action: () => setInputMessage("I need technical support") },
    { text: "Return policy", action: () => setInputMessage("What's your return policy?") }
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 p-4 bg-apple-blue-500 text-white rounded-full shadow-lg hover:bg-apple-blue-600 transition-all ${
          isOpen ? 'hidden' : 'block'
        }`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-apple-gray-200 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-apple-gray-200 bg-apple-blue-500 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              {agentInfo ? (
                <>
                  <div className="relative">
                    <img
                      src={agentInfo.avatar}
                      alt={agentInfo.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      agentInfo.status === 'online' ? 'bg-green-500' : 
                      agentInfo.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}></div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{agentInfo.name}</div>
                    <div className="text-xs text-white/80 capitalize">{agentInfo.status}</div>
                  </div>
                </>
              ) : (
                <>
                  <Bot className="w-8 h-8" />
                  <div>
                    <div className="font-semibold text-sm">Apple Support</div>
                    <div className="text-xs text-white/80">
                      {chatStatus === 'connecting' ? 'Connecting...' : 'Online'}
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  {message.type !== 'user' && (
                    <div className="flex-shrink-0">
                      {message.agentAvatar ? (
                        <img
                          src={message.agentAvatar}
                          alt={message.agentName}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-apple-blue-100 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-apple-blue-500" />
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.type === 'user'
                      ? 'bg-apple-blue-500 text-white'
                      : 'bg-apple-gray-100 text-apple-gray-900'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-white/70' : 'text-apple-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-apple-blue-100 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-apple-blue-500" />
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

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-apple-gray-200">
              <div className="text-xs text-apple-gray-600 mb-2">Quick actions:</div>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className="text-xs px-3 py-1 bg-apple-gray-100 text-apple-gray-700 rounded-full hover:bg-apple-gray-200 transition-colors"
                  >
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-apple-gray-200">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-apple-gray-300 rounded-full focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="p-2 bg-apple-blue-500 text-white rounded-full hover:bg-apple-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;
