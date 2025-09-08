import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Clock, Users, Target, BarChart3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingFactor {
  name: string;
  impact: number; // -100 to 100
  description: string;
  icon: React.ReactNode;
}

interface DynamicPrice {
  basePrice: number;
  currentPrice: number;
  factors: PricingFactor[];
  confidence: number;
  nextUpdate: Date;
}

interface Product {
  id: number;
  name: string;
  pricing: DynamicPrice;
}

const DynamicPricing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [priceHistory, setPriceHistory] = useState<{ time: string; price: number }[]>([]);

  useEffect(() => {
    // Initialize with sample products
    const sampleProducts: Product[] = [
      {
        id: 1,
        name: "iPhone 15 Pro",
        pricing: {
          basePrice: 999,
          currentPrice: 949,
          confidence: 87,
          nextUpdate: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
          factors: [
            {
              name: "High Demand",
              impact: 15,
              description: "Increased customer interest in the last 24 hours",
              icon: <TrendingUp className="w-4 h-4" />
            },
            {
              name: "Competitor Pricing",
              impact: -8,
              description: "Competitors offering similar products at lower prices",
              icon: <Target className="w-4 h-4" />
            },
            {
              name: "Inventory Level",
              impact: -12,
              description: "High stock levels allowing for promotional pricing",
              icon: <BarChart3 className="w-4 h-4" />
            },
            {
              name: "Time of Day",
              impact: 5,
              description: "Peak shopping hours with higher conversion rates",
              icon: <Clock className="w-4 h-4" />
            }
          ]
        }
      },
      {
        id: 2,
        name: "MacBook Pro M3",
        pricing: {
          basePrice: 1999,
          currentPrice: 2049,
          confidence: 92,
          nextUpdate: new Date(Date.now() + 8 * 60 * 1000), // 8 minutes
          factors: [
            {
              name: "Low Inventory",
              impact: 25,
              description: "Limited stock creating urgency",
              icon: <TrendingUp className="w-4 h-4" />
            },
            {
              name: "Seasonal Demand",
              impact: 18,
              description: "Back-to-school season driving higher demand",
              icon: <Users className="w-4 h-4" />
            },
            {
              name: "User Behavior",
              impact: 7,
              description: "High engagement and cart additions",
              icon: <Zap className="w-4 h-4" />
            }
          ]
        }
      },
      {
        id: 3,
        name: "AirPods Pro",
        pricing: {
          basePrice: 249,
          currentPrice: 229,
          confidence: 78,
          nextUpdate: new Date(Date.now() + 22 * 60 * 1000), // 22 minutes
          factors: [
            {
              name: "Bundle Promotion",
              impact: -15,
              description: "Part of iPhone bundle promotion",
              icon: <TrendingDown className="w-4 h-4" />
            },
            {
              name: "Market Saturation",
              impact: -5,
              description: "High competition in wireless earbuds market",
              icon: <Target className="w-4 h-4" />
            }
          ]
        }
      }
    ];

    setProducts(sampleProducts);
    setSelectedProduct(sampleProducts[0]);

    // Generate price history
    const history = Array.from({ length: 24 }, (_, i) => ({
      time: `${23 - i}h ago`,
      price: sampleProducts[0].pricing.basePrice + (Math.random() - 0.5) * 100
    }));
    setPriceHistory(history);
  }, []);

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setProducts(prev => prev.map(product => {
        const priceChange = (Math.random() - 0.5) * 20; // Random change up to ±$20
        const newPrice = Math.max(
          product.pricing.basePrice * 0.8, // Minimum 20% discount
          Math.min(
            product.pricing.basePrice * 1.3, // Maximum 30% markup
            product.pricing.currentPrice + priceChange
          )
        );

        return {
          ...product,
          pricing: {
            ...product.pricing,
            currentPrice: Math.round(newPrice),
            nextUpdate: new Date(Date.now() + Math.random() * 30 * 60 * 1000) // Next 30 minutes
          }
        };
      }));

      // Update price history for selected product
      if (selectedProduct) {
        setPriceHistory(prev => [
          ...prev.slice(1),
          {
            time: 'Now',
            price: selectedProduct.pricing.currentPrice
          }
        ]);
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [selectedProduct]);

  const getPriceChangePercentage = (product: Product) => {
    const change = ((product.pricing.currentPrice - product.pricing.basePrice) / product.pricing.basePrice) * 100;
    return Math.round(change * 100) / 100;
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-red-500';
    if (change < 0) return 'text-green-500';
    return 'text-apple-gray-600';
  };

  const getTimeUntilUpdate = (nextUpdate: Date) => {
    const now = new Date();
    const diff = nextUpdate.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-apple-gray-900">Dynamic Pricing Engine</h3>
            <p className="text-sm text-apple-gray-600">AI-powered real-time price optimization</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-apple-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live Updates</span>
        </div>
      </div>

      {/* Product Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {products.map((product) => {
          const priceChange = getPriceChangePercentage(product);
          return (
            <motion.button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedProduct?.id === product.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-apple-gray-200 hover:border-blue-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h4 className="font-semibold text-apple-gray-900 mb-2">{product.name}</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-apple-gray-900">
                    ${product.pricing.currentPrice}
                  </p>
                  <p className="text-sm text-apple-gray-500 line-through">
                    ${product.pricing.basePrice}
                  </p>
                </div>
                <div className={`text-right ${getPriceChangeColor(priceChange)}`}>
                  <div className="flex items-center space-x-1">
                    {priceChange > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="font-semibold">{Math.abs(priceChange)}%</span>
                  </div>
                  <p className="text-xs">vs base price</p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {selectedProduct && (
        <div className="space-y-6">
          {/* Price Details */}
          <div className="bg-apple-gray-50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-sm text-apple-gray-600 mb-1">Current Price</p>
                <p className="text-3xl font-bold text-apple-gray-900">
                  ${selectedProduct.pricing.currentPrice}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-apple-gray-600 mb-1">Confidence Level</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-20 bg-apple-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${selectedProduct.pricing.confidence}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-green-500">
                    {selectedProduct.pricing.confidence}%
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-apple-gray-600 mb-1">Next Update</p>
                <p className="text-lg font-bold text-apple-blue-500">
                  {getTimeUntilUpdate(selectedProduct.pricing.nextUpdate)}
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Factors */}
          <div>
            <h4 className="text-lg font-semibold text-apple-gray-900 mb-4">Pricing Factors</h4>
            <div className="space-y-3">
              {selectedProduct.pricing.factors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white border border-apple-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      factor.impact > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {factor.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-apple-gray-900">{factor.name}</p>
                      <p className="text-sm text-apple-gray-600">{factor.description}</p>
                    </div>
                  </div>
                  <div className={`text-right ${
                    factor.impact > 0 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    <p className="font-bold">
                      {factor.impact > 0 ? '+' : ''}{factor.impact}%
                    </p>
                    <p className="text-xs">impact</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price History Chart */}
          <div>
            <h4 className="text-lg font-semibold text-apple-gray-900 mb-4">24-Hour Price History</h4>
            <div className="bg-white border border-apple-gray-200 rounded-lg p-4">
              <div className="flex items-end justify-between h-32 space-x-1">
                {priceHistory.map((point, index) => {
                  const height = ((point.price - Math.min(...priceHistory.map(p => p.price))) / 
                    (Math.max(...priceHistory.map(p => p.price)) - Math.min(...priceHistory.map(p => p.price)))) * 100;
                  
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <motion.div
                        className="w-full bg-blue-500 rounded-t"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      />
                      {index % 4 === 0 && (
                        <p className="text-xs text-apple-gray-500 mt-2 transform -rotate-45">
                          {point.time}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button className="flex-1 bg-apple-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-apple-blue-600 transition-colors">
              Buy Now at Current Price
            </button>
            <button className="px-6 py-3 border-2 border-apple-gray-300 text-apple-gray-700 rounded-xl font-semibold hover:border-apple-blue-500 hover:text-apple-blue-500 transition-colors">
              Set Price Alert
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicPricing;
