import React, { useState } from 'react';
import { Gift, CreditCard, X, Check } from 'lucide-react';

interface GiftCardPurchaseProps {
  isOpen: boolean;
  onClose: () => void;
}

const GiftCardPurchase: React.FC<GiftCardPurchaseProps> = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDesign, setSelectedDesign] = useState("classic");
  const [deliveryDate, setDeliveryDate] = useState("");

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];
  
  const designs = [
    { id: "classic", name: "Classic Apple", preview: "🍎" },
    { id: "birthday", name: "Birthday", preview: "🎂" },
    { id: "holiday", name: "Holiday", preview: "🎄" },
    { id: "graduation", name: "Graduation", preview: "🎓" },
    { id: "thank-you", name: "Thank You", preview: "🙏" }
  ];

  if (!isOpen) return null;

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handlePurchase = () => {
    // Handle gift card purchase logic
    console.log("Gift card purchase:", {
      amount: finalAmount,
      recipientEmail,
      recipientName,
      senderName,
      message,
      design: selectedDesign,
      deliveryDate
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-apple-gray-200">
          <div className="flex items-center space-x-3">
            <Gift className="w-8 h-8 text-apple-blue-500" />
            <h2 className="text-2xl font-bold text-apple-gray-900">Apple Gift Card</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-apple-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Amount Selection */}
          <div>
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Select Amount</h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount("");
                  }}
                  className={`p-3 rounded-lg border-2 font-semibold transition-colors ${
                    selectedAmount === amount && !customAmount
                      ? 'border-apple-blue-500 bg-apple-blue-50 text-apple-blue-700'
                      : 'border-apple-gray-200 hover:border-apple-gray-300'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Or enter custom amount ($25 - $2000)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-apple-gray-500">$</span>
                <input
                  type="number"
                  min="25"
                  max="2000"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(0);
                  }}
                  className="w-full pl-8 pr-4 py-3 border border-apple-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-blue-500"
                  placeholder="Enter amount"
                />
              </div>
            </div>
          </div>

          {/* Design Selection */}
          <div>
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Choose Design</h3>
            <div className="grid grid-cols-5 gap-3">
              {designs.map((design) => (
                <button
                  key={design.id}
                  onClick={() => setSelectedDesign(design.id)}
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    selectedDesign === design.id
                      ? 'border-apple-blue-500 bg-apple-blue-50'
                      : 'border-apple-gray-200 hover:border-apple-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-2">{design.preview}</div>
                  <div className="text-xs font-medium text-apple-gray-700">
                    {design.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recipient Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Recipient Name
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-blue-500"
                placeholder="Enter recipient's name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Recipient Email
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-blue-500"
                placeholder="Enter recipient's email"
              />
            </div>
          </div>

          {/* Sender Information */}
          <div>
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Personal Message */}
          <div>
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">
              Personal Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              maxLength={200}
              className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-blue-500 resize-none"
              placeholder="Add a personal message..."
            />
            <div className="text-right text-sm text-apple-gray-500 mt-1">
              {message.length}/200
            </div>
          </div>

          {/* Delivery Date */}
          <div>
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">
              Delivery Date (Optional)
            </label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-blue-500"
            />
            <p className="text-sm text-apple-gray-500 mt-1">
              Leave blank to send immediately
            </p>
          </div>

          {/* Summary */}
          <div className="bg-apple-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-apple-gray-900 mb-2">Order Summary</h4>
            <div className="flex justify-between items-center">
              <span className="text-apple-gray-600">Gift Card Amount:</span>
              <span className="font-bold text-xl text-apple-blue-500">
                ${finalAmount || 0}
              </span>
            </div>
          </div>

          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            disabled={!finalAmount || !recipientEmail || !recipientName || !senderName}
            className="w-full flex items-center justify-center px-6 py-4 bg-apple-blue-500 text-white rounded-lg font-semibold hover:bg-apple-blue-600 disabled:bg-apple-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Purchase Gift Card - ${finalAmount || 0}
          </button>

          <div className="text-center text-sm text-apple-gray-500">
            <p>Gift cards are delivered via email and never expire.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardPurchase;
