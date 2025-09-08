import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Product, ProductOption, ProductConfiguration } from '../types';

interface ProductConfiguratorProps {
  product: Product;
  onConfigurationChange: (config: ProductConfiguration, totalPrice: number) => void;
}

const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({
  product,
  onConfigurationChange
}) => {
  const [configuration, setConfiguration] = useState<ProductConfiguration>({});

  // Initialize with default selections (first variant of each required option)
  useEffect(() => {
    if (product.options) {
      const defaultConfig: ProductConfiguration = {};
      product.options.forEach(option => {
        if (option.required && option.variants.length > 0) {
          defaultConfig[option.id] = option.variants[0].id;
        }
      });
      setConfiguration(defaultConfig);
    }
  }, [product]);

  // Calculate total price whenever configuration changes
  useEffect(() => {
    if (product.options) {
      let totalPrice = product.price;
      
      Object.entries(configuration).forEach(([optionId, variantId]) => {
        const option = product.options?.find(opt => opt.id === optionId);
        const variant = option?.variants.find(v => v.id === variantId);
        if (variant) {
          totalPrice += variant.price;
        }
      });

      onConfigurationChange(configuration, totalPrice);
    }
  }, [configuration, product, onConfigurationChange]);

  const handleOptionChange = (optionId: string, variantId: string) => {
    setConfiguration(prev => ({
      ...prev,
      [optionId]: variantId
    }));
  };

  if (!product.customizable || !product.options) {
    return null;
  }

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-bold text-apple-gray-700">Configure your {product.name}</h3>
      
      {product.options.map((option) => (
        <div key={option.id} className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-apple-gray-700">{option.name}</h4>
            {option.required && (
              <span className="text-sm text-apple-gray-500">Required</span>
            )}
          </div>
          
          <div className="grid gap-3">
            {option.variants.map((variant) => {
              const isSelected = configuration[option.id] === variant.id;
              const priceText = variant.price > 0 ? ` (+$${variant.price})` : '';
              
              return (
                <button
                  key={variant.id}
                  onClick={() => handleOptionChange(option.id, variant.id)}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                    isSelected
                      ? 'border-apple-blue-500 bg-apple-blue-50'
                      : 'border-apple-gray-200 hover:border-apple-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-apple-gray-700">
                        {variant.name}
                        {priceText && (
                          <span className="text-apple-blue-600 font-semibold">
                            {priceText}
                          </span>
                        )}
                      </div>
                      {variant.description && (
                        <p className="text-sm text-apple-gray-500 mt-1">
                          {variant.description}
                        </p>
                      )}
                    </div>
                    
                    {isSelected && (
                      <div className="ml-4 flex-shrink-0">
                        <div className="w-6 h-6 bg-apple-blue-500 rounded-full flex items-center justify-center">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductConfigurator;
