import React, { useState, useEffect } from 'react';
import { Crown, Star, Gift, Zap, Calendar, Phone, MessageCircle, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface PremiumService {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  available: boolean;
  tier: 'gold' | 'platinum' | 'diamond';
}

interface PersonalShopper {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  rating: number;
  available: boolean;
}

interface ConciergeRequest {
  id: string;
  type: 'appointment' | 'consultation' | 'support' | 'custom';
  title: string;
  description: string;
  status: 'pending' | 'confirmed' | 'completed';
  scheduledFor?: string;
}

const PremiumCustomerExperience: React.FC = () => {
  const { user } = useAuth();
  const [customerTier, setCustomerTier] = useState<'standard' | 'gold' | 'platinum' | 'diamond'>('gold');
  const [personalShoppers, setPersonalShoppers] = useState<PersonalShopper[]>([]);
  const [conciergeRequests, setConciergeRequests] = useState<ConciergeRequest[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  useEffect(() => {
    loadPremiumData();
  }, []);

  const loadPremiumData = () => {
    // Simulate premium customer data
    setPersonalShoppers([
      {
        id: '1',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        specialties: ['iPhone', 'Mac', 'Accessories'],
        rating: 4.9,
        available: true
      },
      {
        id: '2',
        name: 'Michael Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        specialties: ['iPad', 'Apple Watch', 'AirPods'],
        rating: 4.8,
        available: false
      },
      {
        id: '3',
        name: 'Emily Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        specialties: ['Business Solutions', 'Pro Products'],
        rating: 5.0,
        available: true
      }
    ]);

    setConciergeRequests([
      {
        id: '1',
        type: 'appointment',
        title: 'In-Store Consultation',
        description: 'MacBook Pro configuration for video editing',
        status: 'confirmed',
        scheduledFor: '2024-01-20T14:00:00Z'
      },
      {
        id: '2',
        type: 'support',
        title: 'Technical Support',
        description: 'iPhone data migration assistance',
        status: 'pending'
      }
    ]);
  };

  const premiumServices: PremiumService[] = [
    {
      id: 'personal-shopper',
      name: 'Personal Shopping',
      description: 'Dedicated expert to help you find the perfect Apple products',
      icon: <Crown className="w-6 h-6" />,
      available: customerTier !== 'standard',
      tier: 'gold'
    },
    {
      id: 'white-glove',
      name: 'White Glove Setup',
      description: 'Professional setup and data migration at your location',
      icon: <Star className="w-6 h-6" />,
      available: ['platinum', 'diamond'].includes(customerTier),
      tier: 'platinum'
    },
    {
      id: 'priority-support',
      name: 'Priority Support',
      description: '24/7 dedicated support line with zero wait time',
      icon: <Zap className="w-6 h-6" />,
      available: customerTier === 'diamond',
      tier: 'diamond'
    },
    {
      id: 'exclusive-events',
      name: 'Exclusive Events',
      description: 'VIP access to Apple product launches and events',
      icon: <Calendar className="w-6 h-6" />,
      available: ['platinum', 'diamond'].includes(customerTier),
      tier: 'platinum'
    },
    {
      id: 'concierge',
      name: 'Concierge Service',
      description: 'Personal assistant for all your Apple needs',
      icon: <Phone className="w-6 h-6" />,
      available: customerTier === 'diamond',
      tier: 'diamond'
    },
    {
      id: 'custom-solutions',
      name: 'Custom Solutions',
      description: 'Bespoke Apple solutions for unique requirements',
      icon: <Gift className="w-6 h-6" />,
      available: customerTier === 'diamond',
      tier: 'diamond'
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'gold': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'platinum': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'diamond': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Premium Status */}
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 border border-yellow-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-500 rounded-full">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-apple-gray-900">Premium Customer</h2>
              <p className="text-apple-gray-600">
                {customerTier.charAt(0).toUpperCase() + customerTier.slice(1)} Tier Member
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
              ))}
            </div>
            <p className="text-sm text-apple-gray-600">Lifetime Value: $12,450</p>
          </div>
        </div>
      </div>

      {/* Premium Services */}
      <div className="bg-white rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-apple-gray-900 mb-6">Premium Services</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumServices.map(service => (
            <div
              key={service.id}
              className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                service.available
                  ? 'border-apple-blue-200 hover:border-apple-blue-300 bg-white'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
              onClick={() => service.available && setSelectedService(service.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${
                  service.available ? 'bg-apple-blue-100 text-apple-blue-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {service.icon}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTierColor(service.tier)}`}>
                  {service.tier}
                </span>
              </div>
              
              <h4 className="font-semibold text-apple-gray-900 mb-2">{service.name}</h4>
              <p className="text-sm text-apple-gray-600 mb-4">{service.description}</p>
              
              {service.available ? (
                <button className="w-full py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
                  Access Service
                </button>
              ) : (
                <button className="w-full py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
                  Upgrade Required
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Personal Shoppers */}
      <div className="bg-white rounded-2xl p-8">
        <h3 className="text-xl font-semibold text-apple-gray-900 mb-6">Your Personal Shoppers</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personalShoppers.map(shopper => (
            <div key={shopper.id} className="p-6 border border-apple-gray-200 rounded-xl">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={shopper.avatar}
                  alt={shopper.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-apple-gray-900">{shopper.name}</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-apple-gray-600">{shopper.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-apple-gray-600 mb-2">Specialties:</p>
                <div className="flex flex-wrap gap-2">
                  {shopper.specialties.map(specialty => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-apple-blue-100 text-apple-blue-600 rounded-full text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  disabled={!shopper.available}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    shopper.available
                      ? 'bg-apple-blue-500 text-white hover:bg-apple-blue-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 inline mr-1" />
                  Chat
                </button>
                <button
                  disabled={!shopper.available}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    shopper.available
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Phone className="w-4 h-4 inline mr-1" />
                  Call
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Concierge Requests */}
      <div className="bg-white rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-apple-gray-900">Concierge Requests</h3>
          <button className="px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
            New Request
          </button>
        </div>
        
        <div className="space-y-4">
          {conciergeRequests.map(request => (
            <div key={request.id} className="p-6 border border-apple-gray-200 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-apple-blue-100 rounded-lg">
                    {request.type === 'appointment' && <Calendar className="w-5 h-5 text-apple-blue-600" />}
                    {request.type === 'support' && <Phone className="w-5 h-5 text-apple-blue-600" />}
                    {request.type === 'consultation' && <MessageCircle className="w-5 h-5 text-apple-blue-600" />}
                    {request.type === 'custom' && <Award className="w-5 h-5 text-apple-blue-600" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-apple-gray-900">{request.title}</h4>
                    <p className="text-sm text-apple-gray-600">{request.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
              
              {request.scheduledFor && (
                <div className="flex items-center space-x-2 text-sm text-apple-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Scheduled for {new Date(request.scheduledFor).toLocaleString()}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumCustomerExperience;
