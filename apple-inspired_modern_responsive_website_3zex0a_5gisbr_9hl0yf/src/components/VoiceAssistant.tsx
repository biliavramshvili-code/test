import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, MessageSquare, Search, ShoppingCart } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';

interface VoiceCommand {
  command: string;
  action: string;
  confidence: number;
}

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [commands, setCommands] = useState<VoiceCommand[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { products } = useProducts();
  const { addItem } = useCart();
  const { setQuery } = useSearch();

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);

        if (event.results[current].isFinal) {
          processVoiceCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    let responseText = '';
    let action = '';

    // Search commands
    if (lowerCommand.includes('search for') || lowerCommand.includes('find')) {
      const searchTerm = lowerCommand.replace(/search for|find/g, '').trim();
      setQuery(searchTerm);
      responseText = `Searching for ${searchTerm}`;
      action = 'search';
    }
    // Add to cart commands
    else if (lowerCommand.includes('add') && lowerCommand.includes('cart')) {
      const productName = lowerCommand.replace(/add|to|cart/g, '').trim();
      const foundProduct = products.find(p => 
        p.name.toLowerCase().includes(productName) || 
        productName.includes(p.name.toLowerCase())
      );
      
      if (foundProduct) {
        addItem(foundProduct);
        responseText = `Added ${foundProduct.name} to your cart`;
        action = 'add_to_cart';
      } else {
        responseText = `Sorry, I couldn't find a product matching "${productName}"`;
        action = 'product_not_found';
      }
    }
    // Product information commands
    else if (lowerCommand.includes('tell me about') || lowerCommand.includes('what is')) {
      const productName = lowerCommand.replace(/tell me about|what is/g, '').trim();
      const foundProduct = products.find(p => 
        p.name.toLowerCase().includes(productName) || 
        productName.includes(p.name.toLowerCase())
      );
      
      if (foundProduct) {
        responseText = `${foundProduct.name} costs $${foundProduct.price}. ${foundProduct.description}`;
        action = 'product_info';
      } else {
        responseText = `I don't have information about "${productName}"`;
        action = 'product_not_found';
      }
    }
    // Price commands
    else if (lowerCommand.includes('price of') || lowerCommand.includes('how much')) {
      const productName = lowerCommand.replace(/price of|how much|is|the|costs?/g, '').trim();
      const foundProduct = products.find(p => 
        p.name.toLowerCase().includes(productName) || 
        productName.includes(p.name.toLowerCase())
      );
      
      if (foundProduct) {
        responseText = `The ${foundProduct.name} costs $${foundProduct.price}`;
        action = 'price_check';
      } else {
        responseText = `I couldn't find pricing for "${productName}"`;
        action = 'product_not_found';
      }
    }
    // Help commands
    else if (lowerCommand.includes('help') || lowerCommand.includes('what can you do')) {
      responseText = "I can help you search for products, add items to cart, check prices, and provide product information. Try saying 'search for iPhone' or 'add MacBook to cart'";
      action = 'help';
    }
    // Default response
    else {
      responseText = "I'm not sure how to help with that. Try asking me to search for products, add items to cart, or check prices.";
      action = 'unknown';
    }

    setResponse(responseText);
    speak(responseText);

    // Add command to history
    const newCommand: VoiceCommand = {
      command: command,
      action: action,
      confidence: 0.9 // Mock confidence score
    };
    setCommands(prev => [newCommand, ...prev.slice(0, 4)]);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-36 right-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Voice Assistant</h2>
                <p className="text-gray-600">Speak naturally to search and shop</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Voice Controls */}
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={isListening ? stopListening : startListening}
                className={`p-4 rounded-full transition-all duration-300 ${
                  isListening
                    ? 'bg-red-500 text-white animate-pulse'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
              <button
                onClick={isSpeaking ? stopSpeaking : () => speak(response)}
                disabled={!response}
                className={`p-4 rounded-full transition-all duration-300 ${
                  isSpeaking
                    ? 'bg-green-500 text-white animate-pulse'
                    : 'bg-gray-500 text-white hover:bg-gray-600 disabled:opacity-50'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
              </button>
            </div>
            <p className="text-sm text-gray-600">
              {isListening ? 'Listening...' : 'Click the microphone to start'}
            </p>
          </div>

          {/* Current Transcript */}
          {transcript && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">You said:</h3>
              <p className="text-blue-800">{transcript}</p>
            </div>
          )}

          {/* Assistant Response */}
          {response && (
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Assistant:</h3>
              <p className="text-green-800">{response}</p>
            </div>
          )}

          {/* Quick Commands */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Try these commands:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "Search for iPhone",
                "Add MacBook to cart",
                "What's the price of iPad?",
                "Tell me about AirPods",
                "Find wireless headphones",
                "Help me shop"
              ].map((command, index) => (
                <button
                  key={index}
                  onClick={() => processVoiceCommand(command)}
                  className="text-left p-2 bg-white rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm"
                >
                  "{command}"
                </button>
              ))}
            </div>
          </div>

          {/* Command History */}
          {commands.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Recent Commands:</h3>
              <div className="space-y-2">
                {commands.map((cmd, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                    <span className="text-sm text-gray-700">"{cmd.command}"</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{cmd.action}</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
