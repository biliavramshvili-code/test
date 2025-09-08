import React, { useState } from 'react';
import { Crown, Gift, Star, Trophy, Zap, Calendar, ArrowRight, Check } from 'lucide-react';
import { useLoyalty } from '../context/LoyaltyContext';
import { useNotification } from '../context/NotificationContext';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: 'discount' | 'product' | 'experience' | 'exclusive';
  image: string;
  available: boolean;
  expiresAt?: string;
}

interface Tier {
  name: string;
  minPoints: number;
  benefits: string[];
  color: string;
  icon: React.ReactNode;
}

const LoyaltyProgram: React.FC = () => {
  const { points, tier, totalSpent, redeemReward } = useLoyalty();
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState<'overview' | 'rewards' | 'history'>('overview');

  const tiers: Tier[] = [
    {
      name: 'Silver',
      minPoints: 0,
      benefits: ['1 point per $1 spent', 'Birthday discount', 'Free shipping'],
      color: 'text-gray-600',
      icon: <Star className="w-6 h-6" />
    },
    {
      name: 'Gold',
      minPoints: 1000,
      benefits: ['1.5 points per $1 spent', 'Early access to sales', 'Priority support', 'Extended warranty'],
      color: 'text-yellow-600',
      icon: <Crown className="w-6 h-6" />
    },
    {
      name: 'Platinum',
      minPoints: 2500,
      benefits: ['2 points per $1 spent', 'Exclusive products', 'Personal shopper', 'VIP events'],
      color: 'text-purple-600',
      icon: <Trophy className="w-6 h-6" />
    },
    {
      name: 'Diamond',
      minPoints: 5000,
      benefits: ['3 points per $1 spent', 'Concierge service', 'Beta access', 'Custom products'],
      color: 'text-blue-600',
      icon: <Zap className="w-6 h-6" />
    }
  ];

  const rewards: Reward[] = [
    {
      id: '1',
      title: '$10 Off Your Next Purchase',
      description: 'Get $10 off any purchase over $100',
      pointsCost: 500,
      category: 'discount',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      available: true,
      expiresAt: '2024-03-01'
    },
    {
      id: '2',
      title: 'AirPods Case',
      description: 'Premium leather AirPods case in multiple colors',
      pointsCost: 1200,
      category: 'product',
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      available: true
    },
    {
      id: '3',
      title: 'Apple Store Workshop',
      description: 'Free Today at Apple creative session',
      pointsCost: 800,
      category: 'experience',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      available: true
    },
    {
      id: '4',
      title: 'Early Access: iPhone 16',
      description: 'Be among the first to pre-order the next iPhone',
      pointsCost: 2000,
      category: 'exclusive',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      available: false
    },
    {
      id: '5',
      title: '$50 Off MacBook',
      description: 'Save $50 on any MacBook purchase',
      pointsCost: 2500,
      category: 'discount',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      available: true
    },
    {
      id: '6',
      title: 'Apple Watch Band',
      description: 'Sport Loop band in seasonal colors',
      pointsCost: 1500,
      category: 'product',
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      available: true
    }
  ];

  const currentTier = tiers.find(t => points >= t.minPoints && (tiers[tiers.indexOf(t) + 1]?.minPoints > points || !tiers[tiers.indexOf(t) + 1])) || tiers[0];
  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const progressToNext = nextTier ? ((points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 : 100;

  const handleRedeemReward = (reward: Reward) => {
    if (points >= reward.pointsCost && reward.available) {
      redeemReward(reward.pointsCost);
      showNotification(`Successfully redeemed: ${reward.title}`, 'success');
    } else if (!reward.available) {
      showNotification('This reward is currently unavailable', 'warning');
    } else {
      showNotification('Insufficient points for this reward', 'warning');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'discount':
        return <Gift className="w-5 h-5" />;
      case 'product':
        return <Star className="w-5 h-5" />;
      case 'experience':
        return <Calendar className="w-5 h-5" />;
      case 'exclusive':
        return <Crown className="w-5 h-5" />;
      default:
        return <Gift className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'discount':
        return 'bg-green-100 text-green-800';
      case 'product':
        return 'bg-blue-100 text-blue-800';
      case 'experience':
        return 'bg-purple-100 text-purple-800';
      case 'exclusive':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-apple-gray-900 mb-4">Apple Rewards</h2>
        <p className="text-lg text-apple-gray-600">Earn points with every purchase and unlock exclusive rewards</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-apple-gray-200">
        <nav className="flex space-x-8 justify-center">
          {[
            { id: 'overview', name: 'Overview', icon: <Star className="w-4 h-4" /> },
            { id: 'rewards', name: 'Rewards', icon: <Gift className="w-4 h-4" /> },
            { id: 'history', name: 'History', icon: <Calendar className="w-4 h-4" /> }
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Current Status */}
          <div className="bg-gradient-to-r from-apple-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{points.toLocaleString()}</div>
                <div className="text-blue-100">Available Points</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className={currentTier.color}>{currentTier.icon}</div>
                  <span className="text-2xl font-bold ml-2">{currentTier.name}</span>
                </div>
                <div className="text-blue-100">Current Tier</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">${totalSpent.toLocaleString()}</div>
                <div className="text-blue-100">Total Spent</div>
              </div>
            </div>
          </div>

          {/* Progress to Next Tier */}
          {nextTier && (
            <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-apple-gray-900">Progress to {nextTier.name}</h3>
                <span className="text-sm text-apple-gray-600">
                  {points} / {nextTier.minPoints} points
                </span>
              </div>
              <div className="w-full bg-apple-gray-200 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-apple-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progressToNext, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-apple-gray-600">
                Earn {nextTier.minPoints - points} more points to reach {nextTier.name} tier
              </p>
            </div>
          )}

          {/* Tier Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tierInfo, index) => (
              <div
                key={tierInfo.name}
                className={`bg-white rounded-xl shadow-sm border-2 p-6 ${
                  tierInfo.name === currentTier.name
                    ? 'border-apple-blue-500 ring-2 ring-apple-blue-100'
                    : 'border-apple-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${tierInfo.color}`}>
                    {tierInfo.icon}
                  </div>
                  {tierInfo.name === currentTier.name && (
                    <span className="px-2 py-1 bg-apple-blue-100 text-apple-blue-800 text-xs font-medium rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-apple-gray-900 mb-2">{tierInfo.name}</h3>
                <p className="text-sm text-apple-gray-600 mb-4">
                  {tierInfo.minPoints.toLocaleString()}+ points
                </p>
                <ul className="space-y-2">
                  {tierInfo.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-apple-gray-700">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-apple-gray-600">You have <span className="font-semibold text-apple-blue-600">{points.toLocaleString()} points</span> to spend</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <div key={reward.id} className="bg-white rounded-xl shadow-sm border border-apple-gray-200 overflow-hidden">
                <div className="relative">
                  <img
                    src={reward.image}
                    alt={reward.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-medium flex items-center ${getCategoryColor(reward.category)}`}>
                    {getCategoryIcon(reward.category)}
                    <span className="ml-1 capitalize">{reward.category}</span>
                  </div>
                  {!reward.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-apple-gray-900">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-apple-gray-900 mb-2">{reward.title}</h3>
                  <p className="text-sm text-apple-gray-600 mb-4">{reward.description}</p>
                  
                  {reward.expiresAt && (
                    <p className="text-xs text-red-600 mb-4">
                      Expires: {new Date(reward.expiresAt).toLocaleDateString()}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-semibold text-apple-gray-900">
                        {reward.pointsCost.toLocaleString()} pts
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleRedeemReward(reward)}
                      disabled={points < reward.pointsCost || !reward.available}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        points >= reward.pointsCost && reward.available
                          ? 'bg-apple-blue-500 text-white hover:bg-apple-blue-600'
                          : 'bg-apple-gray-200 text-apple-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {points >= reward.pointsCost && reward.available ? 'Redeem' : 'Insufficient Points'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
          <h3 className="text-lg font-semibold text-apple-gray-900 mb-6">Points History</h3>
          
          <div className="space-y-4">
            {[
              { date: '2024-01-15', description: 'Purchase: MacBook Pro 16-inch', points: 2499, type: 'earned' },
              { date: '2024-01-10', description: 'Redeemed: $10 Off Coupon', points: -500, type: 'redeemed' },
              { date: '2024-01-08', description: 'Purchase: iPhone 15 Pro', points: 999, type: 'earned' },
              { date: '2024-01-05', description: 'Birthday Bonus', points: 100, type: 'bonus' },
              { date: '2024-01-03', description: 'Purchase: AirPods Pro', points: 249, type: 'earned' }
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-apple-gray-900">{transaction.description}</p>
                  <p className="text-sm text-apple-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'earned' || transaction.type === 'bonus'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {transaction.points > 0 ? '+' : ''}{transaction.points.toLocaleString()} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoyaltyProgram;
