import React, { useState } from 'react';
import { X, CreditCard, Truck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, total, clearCart } = useCart();
  const { createOrder } = useOrders();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping
    name: user?.name || '',
    email: user?.email || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    // Payment
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      addNotification({
        type: 'error',
        title: 'Please sign in',
        message: 'You need to sign in to place an order.'
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const shippingAddress = {
        name: formData.name,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      };

      const paymentMethod = {
        type: 'card' as const,
        last4: formData.cardNumber.slice(-4)
      };

      const orderId = await createOrder(items, shippingAddress, paymentMethod);
      
      addNotification({
        type: 'success',
        title: 'Order placed successfully!',
        message: `Your order ${orderId} has been placed and is being processed.`
      });

      clearCart();
      onClose();
      setStep(1);
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Order failed',
        message: 'There was an error placing your order. Please try again.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-apple-gray-200">
          <h2 className="text-2xl font-bold text-apple-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-apple-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-apple-gray-600" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-apple-gray-200">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? 'bg-apple-blue-500 text-white' 
                    : 'bg-apple-gray-200 text-apple-gray-600'
                }`}>
                  {stepNumber}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= stepNumber ? 'text-apple-blue-500' : 'text-apple-gray-600'
                }`}>
                  {stepNumber === 1 ? 'Shipping' : stepNumber === 2 ? 'Payment' : 'Review'}
                </span>
                {stepNumber < 3 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    step > stepNumber ? 'bg-apple-blue-500' : 'bg-apple-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Step 1: Shipping Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Truck className="w-5 h-5 text-apple-blue-500" />
                <h3 className="text-lg font-semibold text-apple-gray-900">Shipping Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Information */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="w-5 h-5 text-apple-blue-500" />
                <h3 className="text-lg font-semibold text-apple-gray-900">Payment Information</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                  className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 p-4 bg-apple-gray-50 rounded-lg">
                <Lock className="w-5 h-5 text-green-500" />
                <span className="text-sm text-apple-gray-600">Your payment information is secure and encrypted</span>
              </div>
            </div>
          )}

          {/* Step 3: Order Review */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-apple-gray-900">Order Review</h3>

              {/* Order Items */}
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-apple-gray-50 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-apple-gray-900">{item.product.name}</h4>
                      <p className="text-sm text-apple-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-apple-gray-900">
                        ${((item.configuredPrice || item.product.price) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-apple-gray-200 pt-4">
                <div className="flex justify-between items-center text-xl font-bold text-apple-gray-900">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Shipping & Payment Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-apple-gray-900 mb-2">Shipping Address</h4>
                  <div className="text-sm text-apple-gray-600">
                    <p>{formData.name}</p>
                    <p>{formData.street}</p>
                    <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-apple-gray-900 mb-2">Payment Method</h4>
                  <div className="text-sm text-apple-gray-600">
                    <p>Card ending in {formData.cardNumber.slice(-4)}</p>
                    <p>{formData.cardName}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-6 border-t border-apple-gray-200">
          <div className="text-lg font-semibold text-apple-gray-900">
            Total: ${total.toLocaleString()}
          </div>
          <div className="flex space-x-3">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-apple-gray-300 text-apple-gray-700 rounded-lg hover:bg-apple-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
