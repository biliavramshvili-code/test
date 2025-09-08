import React, { useState, useEffect } from 'react';
import { Sparkles, Camera, Upload, Wand2, Shirt, Eye, Heart } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';

interface StylePreference {
  category: string;
  style: string;
  colors: string[];
  budget: { min: number; max: number };
}

interface OutfitRecommendation {
  id: string;
  products: Product[];
  style: string;
  occasion: string;
  confidence: number;
}

const VirtualStylist: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<StylePreference | null>(null);
  const [recommendations, setRecommendations] = useState<OutfitRecommendation[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { products } = useProducts();

  const generateRecommendations = async () => {
    setLoading(true);
    // Simulate AI-powered style analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockRecommendations: OutfitRecommendation[] = [
      {
        id: '1',
        products: products.slice(0, 3),
        style: 'Professional',
        occasion: 'Business Meeting',
        confidence: 92
      },
      {
        id: '2',
        products: products.slice(3, 6),
        style: 'Casual Chic',
        occasion: 'Weekend Outing',
        confidence: 88
      },
      {
        id: '3',
        products: products.slice(6, 9),
        style: 'Evening Elegant',
        occasion: 'Dinner Date',
        confidence: 95
      }
    ];
    
    setRecommendations(mockRecommendations);
    setLoading(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI Virtual Stylist</h2>
                <p className="text-gray-600">Get personalized style recommendations</p>
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
          {/* Image Upload Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Upload Your Photo or Inspiration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Upload your photo for body type analysis</p>
                </label>
              </div>
              {selectedImage && (
                <div className="rounded-lg overflow-hidden">
                  <img src={selectedImage} alt="Uploaded" className="w-full h-48 object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Style Preferences */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Wand2 className="w-5 h-5 mr-2" />
              Style Preferences
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Casual', 'Professional', 'Elegant', 'Trendy', 'Classic', 'Bohemian', 'Minimalist', 'Bold'].map((style) => (
                <button
                  key={style}
                  className="p-3 border border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-center"
                >
                  <Shirt className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <span className="text-sm font-medium">{style}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Recommendations Button */}
          <button
            onClick={generateRecommendations}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Analyzing Your Style...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Eye className="w-5 h-5 mr-2" />
                Generate Style Recommendations
              </div>
            )}
          </button>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Your Personalized Recommendations</h3>
              {recommendations.map((rec) => (
                <div key={rec.id} className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{rec.style}</h4>
                      <p className="text-gray-600">Perfect for: {rec.occasion}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500">Confidence:</div>
                      <div className="text-lg font-bold text-green-600">{rec.confidence}%</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {rec.products.map((product) => (
                      <div key={product.id} className="text-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">${product.price}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <button className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                      Add Outfit to Cart
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualStylist;
