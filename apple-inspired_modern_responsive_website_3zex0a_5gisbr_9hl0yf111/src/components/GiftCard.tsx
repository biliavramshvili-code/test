import React, { useState } from 'react';
import { Gift, CreditCard, Mail, Download } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

interface GiftCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const GiftCard: React.FC<GiftCardProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState(100);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [design, setDesign] = useState("classic");
  const { showNotification } = useNotification();

  const predefinedAmounts = [25, 50, 100, 200, 500];
  
  const designs = [
    { id: "classic", name: "Classic Apple", preview: "bg-gradient-to-br from-apple-gray-900 to-apple-blue-900" },
    { id: "modern", name: "Modern Blue", preview: "bg-gradient-to-br from-blue-500 to-blue-700" },
    { id: "elegant", name: "Elegant Black", preview: "bg-gradient-to-br from-gray-800 to-black" },
    { id: "festive", name: "Festive Gold", preview: "bg-gradient-to-br from-yellow-400 to-orange-500" }
  ];

  const handlePurchase = () => {
    if (!recipientEmail || !recipientName || !senderName) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    // Simulate gift card purchase
    showNotification(`Gift card for $${amount} purchased successfully!`, "success");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-apple-gray-900 flex items-center">
                <Gift className="w-6 h-6 mr-2 text-apple-blue-500" />
                Apple Gift Card
              </h2>
              <button
                onClick={onClose}
                className="text-apple-gray-400 hover:text-apple-gray-600"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Gift Card Preview */}
              <div className="space-y-6">
                <div className="relative">
                  <div className={`${designs.find(d => d.id === design)?.preview} rounded-2xl p-8 text-white aspect-[3/2] flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                          <span className="text-apple-blue-500 font-bold">A</span>
                        </div>
                        <span className="font-semibold">Apple Store</span>
                      </div>
                      <div className="text-3xl font-bold mb-2">${amount}</div>
                      <div className="text-sm opacity-90">Gift Card</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm opacity-75">To: {recipientName || "Recipient"}</div>
                      <div className="text-sm opacity-75">From: {senderName || "Sender"}</div>
                    </div>
                  </div>
                </div>

                {/* Design Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">Choose Design</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {designs.map((designOption) => (
                      <button
                        key={designOption.id}
                        onClick={() => setDesign(designOption.id)}
                        className={`p-3 rounded-xl border-2 transition-colors ${
                          design === designOption.id
                            ? 'border-apple-blue-500 bg-apple-blue-50'
                            : 'border-apple-gray-200 hover:border-apple-gray-300'
                        }`}
                      >
                        <div className={`${designOption.preview} h-16 rounded-lg mb-2`}></div>
                        <div className="text-sm font-medium text-apple-gray-900">
                          {designOption.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gift Card Form */}
              <div className="space-y-6">
                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-apple-gray-900 mb-3">
                    Gift Card Amount
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {predefinedAmounts.map((presetAmount) => (
                      <button
                        key={presetAmount}
                        onClick={() => setAmount(presetAmount)}
                        className={`py-2 px-4 rounded-lg border-2 font-medium transition-colors ${
                          amount === presetAmount
                            ? 'border-apple-blue-500 bg-apple-blue-50 text-apple-blue-600'
                            : 'border-apple-gray-200 text-apple-gray-700 hover:border-apple-gray-300'
                        }`}
                      >
                        ${presetAmount}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min="10"
                    max="2000"
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    placeholder="Custom amount"
                  />
                </div>

                {/* Recipient Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-apple-gray-900 mb-2">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-apple-gray-900 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                      placeholder="Jane Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-apple-gray-900 mb-2">
                    Recipient Email *
                  </label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-apple-gray-900 mb-2">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    placeholder="Happy Birthday! Hope you find something you love."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-apple-gray-900 mb-2">
                    Delivery Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-apple-gray-600 mt-1">
                    Leave empty to send immediately
                  </p>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={handlePurchase}
                  className="w-full flex items-center justify-center space-x-2 py-4 bg-apple-blue-500 text-white rounded-xl font-semibold hover:bg-apple-blue-600 transition-colors"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Purchase Gift Card - ${amount}</span>
                </button>

                <div className="text-xs text-apple-gray-500 text-center">
                  Gift cards are delivered via email and never expire. 
                  Terms and conditions apply.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
