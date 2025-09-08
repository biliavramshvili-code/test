import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Paperclip, Phone, Video, X, Bot, User, Clock, CheckCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  attachments?: string[];
}

interface SupportAgent {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  department: string;
  rating: number;
}

const CustomerSupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'system',
      content: 'Welcome to Apple Support! How can we help you today?',
      timestamp: new Date(Date.now() - 60000),
      status: 'read'
    },
    {
      id: '2',
      type: 'agent',
      content: "Hi! I'm Sarah from Apple Support. I see you're looking at the iPhone 15 Pro. Do you have any questions about it?",
      timestamp: new Date(Date.now() - 30000),
      status: 'read'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent] = useState<SupportAgent>({
    id: 'agent1',
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    status: 'online',
    department: 'Product Support',
    rating: 4.9
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false);
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: getAgentResponse(newMessage),
        timestamp: new Date(),
        status: 'read'
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 2000);
  };

  const getAgentResponse = (userMessage: string): string => {
    const responses = [
      "I'd be happy to help you with that! Let me check our latest information for you.",
      "That's a great question! The iPhone 15 Pro has some amazing features. Would you like me to walk you through them?",
      "I can definitely assist you with that. Is there a specific aspect you'd like to know more about?",
      "Thanks for reaching out! I can help you find the perfect Apple product for your needs.",
      "Let me get you the most up-to-date information on that. One moment please!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: `Shared ${files.length} file(s)`,
        timestamp: new Date(),
        status: 'sent',
        attachments: Array.from(files).map(file => file.name)
      };
      setMessages(prev => [...prev, fileMessage]);
    }
  };

  const quickReplies = [
    "Tell me about iPhone 15 Pro features",
    "What's the return policy?",
    "Check order status",
    "Technical support",
    "Pricing information"
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-apple-blue-500 text-white rounded-full shadow-lg hover:bg-apple-blue-600 transition-all duration-300 flex items-center justify-center z-40"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-xl shadow-2xl border border-apple-gray-200 flex flex-col z-40">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-apple-gray-200 bg-apple-blue-500 text-white rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={currentAgent.avatar}
              alt={currentAgent.name}
              className="w-10 h-10 rounded-full"
            />
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
              currentAgent.status === 'online' ? 'bg-green-500' : 
              currentAgent.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
            }`}></div>
          </div>
          <div>
            <h3 className="font-semibold">{currentAgent.name}</h3>
            <p className="text-xs opacity-90">{currentAgent.department}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Phone className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <Video className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${
              message.type === 'user' 
                ? 'bg-apple-blue-500 text-white rounded-l-xl rounded-tr-xl' 
                : message.type === 'agent'
                ? 'bg-apple-gray-100 text-apple-gray-900 rounded-r-xl rounded-tl-xl'
                : 'bg-yellow-50 text-yellow-800 rounded-xl text-center'
            } p-3`}>
              {message.type === 'agent' && (
                <div className="flex items-center space-x-2 mb-2">
                  <img
                    src={currentAgent.avatar}
                    alt={currentAgent.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-xs font-medium">{currentAgent.name}</span>
                </div>
              )}
              
              <p className="text-sm">{message.content}</p>
              
              {message.attachments && (
                <div className="mt-2 space-y-1">
                  {message.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs bg-white/20 rounded p-2">
                      <Paperclip className="w-3 h-3" />
                      <span>{attachment}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.type === 'user' && (
                  <div className="flex items-center space-x-1">
                    {message.status === 'sent' && <Clock className="w-3 h-3 opacity-70" />}
                    {message.status === 'delivered' && <CheckCircle className="w-3 h-3 opacity-70" />}
                    {message.status === 'read' && <CheckCircle className="w-3 h-3 text-blue-200" />}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-apple-gray-100 rounded-r-xl rounded-tl-xl p-3 max-w-[80%]">
              <div className="flex items-center space-x-2 mb-2">
                <img
                  src={currentAgent.avatar}
                  alt={currentAgent.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-xs font-medium">{currentAgent.name}</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-apple-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-apple-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-apple-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-4 py-2 border-t border-apple-gray-200">
        <div className="flex flex-wrap gap-2">
          {quickReplies.slice(0, 2).map((reply, index) => (
            <button
              key={index}
              onClick={() => setNewMessage(reply)}
              className="text-xs bg-apple-gray-100 text-apple-gray-700 px-3 py-1 rounded-full hover:bg-apple-gray-200 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-apple-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            multiple
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-apple-gray-400 hover:text-apple-gray-600 transition-colors"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent text-sm"
          />
          
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportChat;
