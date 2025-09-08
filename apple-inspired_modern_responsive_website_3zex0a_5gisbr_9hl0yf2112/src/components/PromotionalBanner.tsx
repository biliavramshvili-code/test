import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Gift, Zap, Percent } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Promotion {
  id: string;
  type: 'sale' | 'new-product' | 'limited-time' | 'free-shipping';
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  backgroundColor: string;
  textColor: string;
  icon: React.ReactNode;
  expiresAt?: string;
  dismissible: boolean;
}

const PromotionalBanner: React.FC = () => {
  const [currentPromo, setCurrentPromo] = useState<Promotion | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  const promotions: Promotion[] = [
    {
      id: 'black-friday-2024',
      type: 'sale',
      title: 'Black Friday Sale',
      description: 'Up to 30% off on selected Apple products. Limited time only!',
      ctaText: 'Shop Now',
      ctaLink: '/products?sale=true',
      backgroundColor: 'bg-gradient-to-r from-red-600 to-red-700',
      textColor: 'text-white',
      icon: <Percent className="w-5 h-5" />,
      expiresAt: '2024-11-30T23:59:59Z',
      dismissible: true
    },
    {
      id: 'new-iphone-launch',
      type: 'new-product',
      title: 'iPhone 15 Pro Now Available',
      description: 'Experience the most advanced iPhone ever with titanium design.',
      ctaText: 'Learn More',
      ctaLink: '/products/iphone-15-pro',
      backgroundColor: 'bg-gradient-to-r from-apple-blue-600 to-apple-blue-700',
      textColor: 'text-white',
      icon: <Zap className="w-5 h-5" />,
      dismissible: true
    },
    {
      id: 'free-shipping',
      type: 'free-shipping',
      title: 'Free Shipping on All Orders',
      description: 'No minimum purchase required. Fast delivery to your door.',
      ctaText: 'Start Shopping',
      ctaLink: '/products',
      backgroundColor: 'bg-gradient-to-r from-green-600 to-green-700',
      textColor: 'text-white',
      icon: <Gift className="w-5 h-5" />,
      dismissible: false
    }
  ];

  useEffect(() => {
    // Select promotion based on current date and user preferences
    const activePromotions = promotions.filter(promo => {
      if (promo.expiresAt) {
        return new Date() < new Date(promo.expiresAt);
      }
      return true;
    });

    if (activePromotions.length > 0) {
      // For demo, rotate through promotions every 10 seconds
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * activePromotions.length);
        setCurrentPromo(activePromotions[randomIndex]);
      }, 10000);

      // Set initial promotion
      setCurrentPromo(activePromotions[0]);

      return () => clearInterval(interval);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    // In a real app, you'd store this in localStorage or user preferences
    localStorage.setItem(`promo-dismissed-${currentPromo?.id}`, 'true');
  };

  if (!currentPromo || isDismissed) {
    return null;
  }

  // Check if this promotion was previously dismissed
  const wasDismissed = localStorage.getItem(`promo-dismissed-${currentPromo.id}`) === 'true';
  if (wasDismissed && currentPromo.dismissible) {
    return null;
  }

  return (
    <div className={`relative ${currentPromo.backgroundColor} ${currentPromo.textColor} py-3 px-4`}>
      <div className="container-padding">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex-shrink-0">
              {currentPromo.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <h3 className="font-semibold text-sm sm:text-base">
                  {currentPromo.title}
                </h3>
                <p className="text-sm opacity-90 hidden sm:block">
                  {currentPromo.description}
                </p>
              </div>
              <p className="text-xs opacity-90 sm:hidden mt-1">
                {currentPromo.description}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link
              to={currentPromo.ctaLink}
              className="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
            >
              <span>{currentPromo.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {currentPromo.dismissible && (
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Dismiss promotion"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Countdown Timer for Limited Time Offers */}
      {currentPromo.expiresAt && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-white/40 transition-all duration-1000"
            style={{
              width: `${Math.max(0, Math.min(100, 
                (new Date(currentPromo.expiresAt).getTime() - Date.now()) / 
                (24 * 60 * 60 * 1000) * 100
              ))}%`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PromotionalBanner;
