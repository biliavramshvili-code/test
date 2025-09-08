import React, { useState } from 'react';
import { Gift, CreditCard, Mail, Phone, Calendar, Check, Copy, Download } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

interface GiftCard {
  id: string;
  amount: number;
  design: string;
  code: string;
  purchaseDate: string;
  expiryDate: string;
  status: 'active' | 'used' | 'expired';
  balance: number;
}

const GiftCards: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'purchase' | 'redeem' | 'balance'>('purchase');
  const [purchaseForm, setPurchaseForm] = useState({
    amount: 100,
    design: 'classic',
    recipientEmail: '',
    recipientName: '',
    senderName: '',
    message: '',
    deliveryDate: '',
    deliveryMethod: 'email'
  });
  const [redeemCode, setRedeemCode] = useState('');
  const [balanceCode, setBalanceCode] = useState('');
  
  const { showNotification } = useNotification();

  const giftCardDesigns = [
    { id: 'classic', name: 'Classic Apple', image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 'modern', name: 'Modern Minimal', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 'celebration', name: 'Celebration', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
    { id: 'holiday', name: 'Holiday Special', image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' }
  ];

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  const mockGiftCards: GiftCard[] = [
    {
      id: '1',
      amount: 100,
      design: 'classic',
      code: 'APPLE-GIFT-2024-ABC123',
      purchaseDate: '2024-01-10',
      expiryDate: '2025-01-10',
      status: 'active',
      balance: 75
    },
    {
      id: '2',
      amount: 250,
      design: 'modern',
      code: 'APPLE-GIFT-2024-XYZ789',
      purchaseDate: '2023-12-25',
      expiryDate: '2024-12-25',
      status: 'active',
      balance: 250
    }
  ];

  const handlePurchaseGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate gift card purchase
    const newGiftCard = {
      id: Date.now().toString(),
      amount: purchaseForm.amount,
      design: purchaseForm.design,
      code: `APPLE-GIFT-2024-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      purchaseDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'active' as const,
      balance: purchaseForm.amount
    };

    showNotification(
      `Gift card purchased successfully! ${purchaseForm.deliveryMethod === 'email' ? 'Email sent to recipient.' : 'Gift card ready for pickup.'}`,
      'success'
    );

    // Reset form
    setPurchaseForm({
      amount: 100,
      design: 'classic',
      recipientEmail: '',
      recipientName: '',
      senderName: '',
      message: '',
      deliveryDate: '',
      deliveryMethod: 'email'
    });
  };

  const handleRedeemGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (redeemCode.trim()) {
      showNotification('Gift card redeemed successfully! $100 added to your account.', 'success');
      setRedeemCode('');
    } else {
      showNotification('Please enter a valid gift card code', 'warning');
    }
  };

  const handleCheckBalance = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (balanceCode.trim()) {
      showNotification('Gift card balance: $75.00', 'info');
    } else {
      showNotification('Please enter a valid gift card code', 'warning');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showNotification('Gift card code copied to clipboard', 'success');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-apple-gray-900 mb-4">Apple Gift Cards</h2>
        <p className="text-lg text-apple-gray-600">Give the gift of Apple products and experiences</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-apple-gray-200">
        <nav className="flex space-x-8 justify-center">
          {[
            { id: 'purchase', name: 'Purchase Gift Card', icon: <Gift className="w-4 h-4" /> },
            { id: 'redeem', name: 'Redeem Gift Card', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'balance', name: 'Check Balance', icon: <Check className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-apple-blue-500 text-apple-blue-600'
                  : 'border-transparent text-apple-gray-500 hover:text-apple-gray-700 hover:border-apple-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Purchase Tab */}
      {activeTab === 'purchase' && (
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handlePurchaseGiftCard} className="space-y-8">
            {/* Amount Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Select Amount</h3>
              
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-4">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => setPurchaseForm({ ...purchaseForm, amount })}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      purchaseForm.amount === amount
                        ? 'border-apple-blue-500 bg-apple-blue-50 text-apple-blue-700'
                        : 'border-apple-gray-300 hover:border-apple-gray-400'
                    }`}
                  >
                    <div className="text-lg font-semibold">${amount}</div>
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-apple-gray-700">Custom amount:</span>
                <input
                  type="number"
                  min="10"
                  max="2000"
                  value={purchaseForm.amount}
                  onChange={(e) => setPurchaseForm({ ...purchaseForm, amount: parseInt(e.target.value) || 0 })}
                  className="px-3 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent w-24"
                />
                <span className="text-apple-gray-500">($10 - $2,000)</span>
              </div>
            </div>

            {/* Design Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Choose Design</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {giftCardDesigns.map((design) => (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => setPurchaseForm({ ...purchaseForm, design: design.id })}
                    className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                      purchaseForm.design === design.id
                        ? 'border-apple-blue-500 ring-2 ring-apple-blue-100'
                        : 'border-apple-gray-300 hover:border-apple-gray-400'
                    }`}
                  >
                    <img
                      src={design.image}
                      alt={design.name}
                      className="w-full h-24 object-cover"
                    />
                    <div className="p-2">
                      <p className="text-sm font-medium text-apple-gray-900">{design.name}</p>
                    </div>
                    {purchaseForm.design === design.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-apple-blue-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Information */}
            <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Recipient Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Recipient Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={purchaseForm.recipientName}
                    onChange={(e) => setPurchaseForm({ ...purchaseForm, recipientName: e.target.value })}
                    className="w-full px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    placeholder="Enter recipient's name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={purchaseForm.senderName}
                    onChange={(e) => setPurchaseForm({ ...purchaseForm, senderName: e.target.value })}
                    className="w-full px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                  Personal Message (Optional)
                </label>
                <textarea
                  rows={3}
                  value={purchaseForm.message}
                  onChange={(e) => setPurchaseForm({ ...purchaseForm, message: e.target.value })}
                  className="w-full px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                  placeholder="Add a personal message..."
                />
              </div>
            </div>

            {/* Delivery Options */}
            <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Delivery Options</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="email-delivery"
                    name="delivery"
                    value="email"
                    checked={purchaseForm.deliveryMethod === 'email'}
                    onChange={(e) => setPurchaseForm({ ...purchaseForm, deliveryMethod: e.target.value as any })}
                    className="text-apple-blue-500"
                  />
                  <label htmlFor="email-delivery" className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-apple-gray-600" />
                    Email Delivery (Instant)
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="sms-delivery"
                    name="delivery"
                    value="sms"
                    checked={purchaseForm.deliveryMethod === 'sms'}
                    onChange={(e) => setPurchaseForm({ ...purchaseForm, deliveryMethod: e.target.value as any })}
                    className="text-apple-blue-500"
                  />
                  <label htmlFor="sms-delivery" className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-apple-gray-600" />
                    SMS Delivery
                  </label>
                </div>
              </div>
              
              {purchaseForm.deliveryMethod === 'email' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Recipient Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={purchaseForm.recipientEmail}
                    onChange={(e) => setPurchaseForm({ ...purchaseForm, recipientEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    placeholder="recipient@example.com"
                  />
                </div>
              )}
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                  Delivery Date (Optional)
                </label>
                <input
                  type="date"
                  value={purchaseForm.deliveryDate}
                  onChange={(e) => setPurchaseForm({ ...purchaseForm, deliveryDate: e.target.value })}
                  className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                />
                <p className="text-sm text-apple-gray-500 mt-1">Leave blank for immediate delivery</p>
              </div>
            </div>

            {/* Purchase Summary */}
            <div className="bg-apple-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-apple-gray-700">Gift Card Amount:</span>
                  <span className="font-semibold">${purchaseForm.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-apple-gray-700">Processing Fee:</span>
                  <span className="font-semibold">$0.00</span>
                </div>
                <div className="border-t border-apple-gray-300 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${purchaseForm.amount}</span>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full mt-6 px-6 py-3 bg-apple-blue-500 text-white rounded-xl hover:bg-apple-blue-600 transition-colors font-semibold"
              >
                Purchase Gift Card
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Redeem Tab */}
      {activeTab === 'redeem' && (
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-apple-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-apple-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-apple-gray-900">Redeem Gift Card</h3>
              <p className="text-apple-gray-600">Enter your gift card code to add credit to your account</p>
            </div>
            
            <form onSubmit={handleRedeemGiftCard} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                  Gift Card Code
                </label>
                <input
                  type="text"
                  value={redeemCode}
                  onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent text-center font-mono"
                  placeholder="APPLE-GIFT-2024-XXXXXX"
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-apple-blue-500 text-white rounded-xl hover:bg-apple-blue-600 transition-colors font-semibold"
              >
                Redeem Gift Card
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Balance Tab */}
      {activeTab === 'balance' && (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Check Balance Form */}
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-apple-gray-900">Check Balance</h3>
                <p className="text-apple-gray-600">Enter your gift card code to check remaining balance</p>
              </div>
              
              <form onSubmit={handleCheckBalance} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Gift Card Code
                  </label>
                  <input
                    type="text"
                    value={balanceCode}
                    onChange={(e) => setBalanceCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent text-center font-mono"
                    placeholder="APPLE-GIFT-2024-XXXXXX"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-semibold"
                >
                  Check Balance
                </button>
              </form>
            </div>
          </div>

          {/* My Gift Cards */}
          <div>
            <h3 className="text-xl font-semibold text-apple-gray-900 mb-6 text-center">My Gift Cards</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockGiftCards.map((giftCard) => (
                <div key={giftCard.id} className="bg-white rounded-xl shadow-sm border border-apple-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-apple-blue-500 to-purple-600 p-6 text-white">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold">Apple Gift Card</h4>
                        <p className="text-blue-100">Original Amount: ${giftCard.amount}</p>
                      </div>
                      <Gift className="w-8 h-8 text-blue-200" />
                    </div>
                    
                    <div className="text-2xl font-bold mb-2">${giftCard.balance}</div>
                    <div className="text-blue-100 text-sm">Remaining Balance</div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-apple-gray-600">Gift Card Code:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-apple-gray-900">{giftCard.code}</span>
                          <button
                            onClick={() => copyToClipboard(giftCard.code)}
                            className="text-apple-blue-500 hover:text-apple-blue-600"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-apple-gray-600">Purchase Date:</span>
                        <span className="text-apple-gray-900">{new Date(giftCard.purchaseDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-apple-gray-600">Expires:</span>
                        <span className="text-apple-gray-900">{new Date(giftCard.expiryDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-apple-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          giftCard.status === 'active' ? 'bg-green-100 text-green-800' :
                          giftCard.status === 'used' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {giftCard.status.charAt(0).toUpperCase() + giftCard.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors text-sm">
                        Use Gift Card
                      </button>
                      <button className="px-4 py-2 border border-apple-gray-300 text-apple-gray-700 rounded-lg hover:bg-apple-gray-50 transition-colors text-sm">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftCards;
