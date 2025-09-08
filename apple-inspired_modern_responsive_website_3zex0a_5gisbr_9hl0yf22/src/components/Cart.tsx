import React from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { items, isOpen, removeItem, updateQuantity, closeCart } = useCart();

  const updateItemQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  const total = items.reduce((sum, item) => {
    const price = item.configuredPrice || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const getConfigurationSummary = (item: any) => {
    if (!item.configuration || !item.product.options) return null;
    
    const configSummary = Object.entries(item.configuration).map(([optionId, variantId]) => {
      const option = item.product.options?.find((opt: any) => opt.id === optionId);
      const variant = option?.variants.find((v: any) => v.id === variantId);
      return variant ? variant.name : null;
    }).filter(Boolean);
    
    return configSummary.length > 0 ? configSummary.join(', ') : null;
  };

  const handleCheckout = () => {
    // For now, show an alert with order summary
    const orderSummary = items.map(item => {
      const price = item.configuredPrice || item.product.price;
      const config = getConfigurationSummary(item);
      return `${item.product.name}${config ? ` (${config})` : ''} - Qty: ${item.quantity} - $${(price * item.quantity).toFixed(2)}`;
    }).join('\n');

    alert(`Order Summary:\n\n${orderSummary}\n\nTotal: $${total.toFixed(2)}\n\nThank you for your order! This is a demo checkout.`);
    
    // Close cart after checkout
    closeCart();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeCart} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold text-apple-gray-700">Shopping Cart</h2>
            <button
              onClick={closeCart}
              className="text-apple-gray-400 hover:text-apple-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-apple-gray-300 mb-4" />
                <p className="text-apple-gray-500 text-lg">Your cart is empty</p>
                <p className="text-apple-gray-400 text-sm mt-2">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item, index) => {
                  const price = item.configuredPrice || item.product.price;
                  const configSummary = getConfigurationSummary(item);
                  
                  return (
                    <div key={`${item.product.id}-${index}`} className="flex items-start space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-apple-gray-700 truncate">
                          {item.product.name}
                        </h3>
                        {configSummary && (
                          <p className="text-xs text-apple-gray-500 mt-1 line-clamp-2">
                            {configSummary}
                          </p>
                        )}
                        <p className="text-apple-gray-600 text-sm font-semibold mt-1">
                          ${price}
                        </p>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-apple-gray-100 flex items-center justify-center hover:bg-apple-gray-200 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-apple-gray-100 flex items-center justify-center hover:bg-apple-gray-200 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-apple-gray-700">Total</span>
                <span className="text-lg font-semibold text-apple-gray-700">${total.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full btn-primary justify-center hover:bg-apple-blue-600 transition-colors"
              >
                <span>Checkout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
