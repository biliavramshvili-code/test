import React, { useState, useEffect } from 'react';
import { Globe, DollarSign, TrendingUp, MapPin, Calculator, RefreshCw } from 'lucide-react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  flag: string;
}

interface RegionalPricing {
  region: string;
  currency: string;
  basePrice: number;
  tax: number;
  shipping: number;
  totalPrice: number;
  priceAdjustment: number;
}

const MultiCurrencyPricing: React.FC<{ basePrice: number; productId: number }> = ({ 
  basePrice, 
  productId 
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState<Currency[]>([
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.0, flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.85, flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.73, flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 110.0, flag: '🇯🇵' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.25, flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.35, flag: '🇦🇺' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', rate: 0.92, flag: '🇨🇭' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', rate: 6.45, flag: '🇨🇳' }
  ]);

  const [regionalPricing, setRegionalPricing] = useState<RegionalPricing[]>([
    {
      region: 'United States',
      currency: 'USD',
      basePrice: basePrice,
      tax: basePrice * 0.08,
      shipping: 0,
      totalPrice: basePrice * 1.08,
      priceAdjustment: 0
    },
    {
      region: 'European Union',
      currency: 'EUR',
      basePrice: basePrice * 0.85,
      tax: basePrice * 0.85 * 0.20,
      shipping: 15,
      totalPrice: (basePrice * 0.85 * 1.20) + 15,
      priceAdjustment: 5
    },
    {
      region: 'United Kingdom',
      currency: 'GBP',
      basePrice: basePrice * 0.73,
      tax: basePrice * 0.73 * 0.20,
      shipping: 10,
      totalPrice: (basePrice * 0.73 * 1.20) + 10,
      priceAdjustment: 3
    },
    {
      region: 'Japan',
      currency: 'JPY',
      basePrice: basePrice * 110,
      tax: basePrice * 110 * 0.10,
      shipping: 500,
      totalPrice: (basePrice * 110 * 1.10) + 500,
      priceAdjustment: 2000
    }
  ]);

  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isUpdating, setIsUpdating] = useState(false);

  const updateExchangeRates = async () => {
    setIsUpdating(true);
    // Simulate API call to get real exchange rates
    setTimeout(() => {
      setExchangeRates(rates => rates.map(rate => ({
        ...rate,
        rate: rate.code === 'USD' ? 1.0 : rate.rate * (0.98 + Math.random() * 0.04)
      })));
      setLastUpdated(new Date());
      setIsUpdating(false);
    }, 1000);
  };

  const getCurrentCurrency = () => {
    return exchangeRates.find(currency => currency.code === selectedCurrency) || exchangeRates[0];
  };

  const convertPrice = (price: number, toCurrency: string) => {
    const currency = exchangeRates.find(c => c.code === toCurrency);
    if (!currency) return price;
    return price * currency.rate;
  };

  const formatPrice = (price: number, currencyCode: string) => {
    const currency = exchangeRates.find(c => c.code === currencyCode);
    if (!currency) return price.toFixed(2);
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: currencyCode === 'JPY' ? 0 : 2
    }).format(price);
  };

  const currentCurrency = getCurrentCurrency();
  const convertedPrice = convertPrice(basePrice, selectedCurrency);

  return (
    <div className="space-y-6">
      {/* Currency Selector */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5 text-apple-blue-500" />
            <h3 className="text-lg font-semibold text-apple-gray-900">Currency & Region</h3>
          </div>
          <button
            onClick={updateExchangeRates}
            disabled={isUpdating}
            className="flex items-center space-x-2 px-3 py-1 text-sm text-apple-gray-600 hover:text-apple-gray-800 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
            <span>Update Rates</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {exchangeRates.map((currency) => (
            <button
              key={currency.code}
              onClick={() => setSelectedCurrency(currency.code)}
              className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                selectedCurrency === currency.code
                  ? 'border-apple-blue-500 bg-apple-blue-50'
                  : 'border-apple-gray-200 hover:border-apple-gray-300'
              }`}
            >
              <span className="text-lg">{currency.flag}</span>
              <div className="text-left">
                <div className="font-medium text-apple-gray-900">{currency.code}</div>
                <div className="text-xs text-apple-gray-600">{currency.symbol}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-xs text-apple-gray-500">
          Last updated: {lastUpdated.toLocaleString()}
        </div>
      </div>

      {/* Price Display */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-apple-gray-900">Price in {currentCurrency.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-apple-gray-600">
            <TrendingUp className="w-4 h-4" />
            <span>Rate: {currentCurrency.rate.toFixed(4)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-apple-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-apple-gray-900 mb-1">
              {formatPrice(convertedPrice, selectedCurrency)}
            </div>
            <div className="text-sm text-apple-gray-600">Base Price</div>
          </div>

          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {formatPrice(basePrice, 'USD')}
            </div>
            <div className="text-sm text-apple-gray-600">Original (USD)</div>
          </div>

          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {selectedCurrency !== 'USD' ? 
                `${((convertedPrice - basePrice) / basePrice * 100).toFixed(1)}%` : 
                '0%'
              }
            </div>
            <div className="text-sm text-apple-gray-600">Price Difference</div>
          </div>
        </div>
      </div>

      {/* Regional Pricing */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <div className="flex items-center space-x-2 mb-6">
          <MapPin className="w-5 h-5 text-apple-blue-500" />
          <h3 className="text-lg font-semibold text-apple-gray-900">Regional Pricing</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regionalPricing.map((pricing, index) => (
            <div key={index} className="border border-apple-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-apple-gray-900">{pricing.region}</h4>
                <span className="text-sm text-apple-gray-600">{pricing.currency}</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-apple-gray-600">Base Price:</span>
                  <span className="font-medium">{formatPrice(pricing.basePrice, pricing.currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-apple-gray-600">Tax:</span>
                  <span className="font-medium">{formatPrice(pricing.tax, pricing.currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-apple-gray-600">Shipping:</span>
                  <span className="font-medium">
                    {pricing.shipping === 0 ? 'Free' : formatPrice(pricing.shipping, pricing.currency)}
                  </span>
                </div>
                {pricing.priceAdjustment !== 0 && (
                  <div className="flex justify-between">
                    <span className="text-apple-gray-600">Regional Adjustment:</span>
                    <span className="font-medium text-blue-600">
                      {formatPrice(pricing.priceAdjustment, pricing.currency)}
                    </span>
                  </div>
                )}
                <div className="border-t border-apple-gray-200 pt-2 flex justify-between">
                  <span className="font-semibold text-apple-gray-900">Total:</span>
                  <span className="font-bold text-apple-gray-900">
                    {formatPrice(pricing.totalPrice, pricing.currency)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Currency Calculator */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Calculator className="w-5 h-5 text-apple-blue-500" />
          <h3 className="text-lg font-semibold text-apple-gray-900">Currency Calculator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">
              Convert from USD
            </label>
            <div className="space-y-2">
              {exchangeRates.slice(1, 5).map((currency) => (
                <div key={currency.code} className="flex items-center justify-between p-2 bg-apple-gray-50 rounded">
                  <span className="flex items-center space-x-2">
                    <span>{currency.flag}</span>
                    <span className="font-medium">{currency.code}</span>
                  </span>
                  <span className="font-bold">
                    {formatPrice(convertPrice(basePrice, currency.code), currency.code)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">
              Exchange Rate Trends
            </label>
            <div className="space-y-2">
              {exchangeRates.slice(1, 5).map((currency) => (
                <div key={currency.code} className="flex items-center justify-between p-2 bg-apple-gray-50 rounded">
                  <span className="flex items-center space-x-2">
                    <span>{currency.flag}</span>
                    <span className="font-medium">1 USD = {currency.rate.toFixed(4)} {currency.code}</span>
                  </span>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">+0.2%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiCurrencyPricing;
