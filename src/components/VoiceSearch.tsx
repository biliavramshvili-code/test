import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Search } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { useNotification } from '../context/NotificationContext';

interface VoiceSearchProps {
  onResults?: (query: string) => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ onResults }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { setQuery, performSearch } = useSearch();
  const { showNotification } = useNotification();

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        setTranscript("");
      };
      
      recognition.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            setConfidence(result[0].confidence);
          } else {
            interimTranscript += result[0].transcript;
          }
        }
        
        setTranscript(finalTranscript || interimTranscript);
        
        if (finalTranscript) {
          handleVoiceCommand(finalTranscript.trim());
        }
      };
      
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        
        let errorMessage = "Voice search failed. Please try again.";
        if (event.error === 'not-allowed') {
          errorMessage = "Microphone access denied. Please enable microphone permissions.";
        } else if (event.error === 'no-speech') {
          errorMessage = "No speech detected. Please try speaking again.";
        }
        
        showNotification(errorMessage, "error");
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [showNotification]);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Voice commands for navigation and actions
    if (lowerCommand.includes('search for') || lowerCommand.includes('find')) {
      const searchQuery = lowerCommand
        .replace(/search for|find/g, '')
        .trim();
      
      if (searchQuery) {
        setQuery(searchQuery);
        performSearch(searchQuery);
        onResults?.(searchQuery);
        showNotification(`Searching for "${searchQuery}"`, "success");
      }
    } else if (lowerCommand.includes('add to cart')) {
      showNotification("Voice command: Add to cart", "info");
    } else if (lowerCommand.includes('show cart') || lowerCommand.includes('open cart')) {
      showNotification("Voice command: Opening cart", "info");
    } else if (lowerCommand.includes('go to') || lowerCommand.includes('navigate to')) {
      const destination = lowerCommand
        .replace(/go to|navigate to/g, '')
        .trim();
      showNotification(`Voice command: Navigate to ${destination}`, "info");
    } else {
      // Default to search
      setQuery(command);
      performSearch(command);
      onResults?.(command);
      showNotification(`Searching for "${command}"`, "success");
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        showNotification("Failed to start voice search", "error");
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <button
          onClick={isListening ? stopListening : startListening}
          className={`p-2 rounded-lg transition-all ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-apple-gray-100 text-apple-gray-600 hover:bg-apple-gray-200'
          }`}
          title={isListening ? 'Stop listening' : 'Start voice search'}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
        
        {transcript && (
          <button
            onClick={() => speakText(transcript)}
            className="p-2 bg-apple-blue-100 text-apple-blue-600 rounded-lg hover:bg-apple-blue-200 transition-colors"
            title="Repeat transcript"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Voice feedback overlay */}
      {isListening && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-apple-gray-200 p-4 z-50">
          <div className="flex items-center space-x-3 mb-3">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-red-500 rounded-full animate-pulse"
                  style={{
                    height: '20px',
                    animationDelay: `${i * 0.2}s`
                  }}
                ></div>
              ))}
            </div>
            <span className="text-sm font-medium text-apple-gray-900">
              Listening...
            </span>
          </div>
          
          {transcript && (
            <div className="space-y-2">
              <div className="text-sm text-apple-gray-600">
                You said:
              </div>
              <div className="text-apple-gray-900 font-medium">
                "{transcript}"
              </div>
              {confidence > 0 && (
                <div className="text-xs text-apple-gray-500">
                  Confidence: {Math.round(confidence * 100)}%
                </div>
              )}
            </div>
          )}
          
          <div className="mt-3 text-xs text-apple-gray-500">
            Try saying: "Search for iPhone", "Add to cart", "Show my orders"
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;
