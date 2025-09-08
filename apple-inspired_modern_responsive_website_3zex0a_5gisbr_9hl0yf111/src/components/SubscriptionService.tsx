import React, { useState } from 'react';
import { Check, Crown, Zap, Gift, Calendar, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  color: string;
  icon: React.ReactNode;
}

const SubscriptionService: React.FC = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

  const plans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Apple Basic',
      price: billingInterval === 'monthly' ? 9.99 : 99.99,
      interval: billingInterval,
      features: [
        'Free shipping on all orders',
        'Extended warranty coverage',
        'Priority customer support',
        'Exclusive member discounts',
        'Early access to new products'
      ],
      color: 'bg-apple-gray-100 text-apple-gray-900',
      icon: <Gift className="w-6 h-6" />
    },
    {
      id: 'pro',
      name: 'Apple Pro',
      price: billingInterval === 'monthly' ? 19.99 : 199.99,
      interval: billingInterval,
      features: [
        'All Basic features',
        'AppleCare+ included',
        'Free device setup service',
        'Monthly tech consultations',
        'Exclusive Pro-only products',
        'Trade-in bonus credits'
      ],
      popular: true,
      color: 'bg-apple-blue-500 text-white',
      icon: <Crown className="w-6 h-6" />
    },
    {
      id: 'enterprise',
      name: 'Apple Enterprise',
      price: billingInterval === 'monthly' ? 49.99 : 499.99,
      interval: billingInterval,
      features: [
        'All Pro features',
        'Bulk ordering discounts',
        'Dedicated account manager',
        'Custom deployment services',
        'Advanced device management',
        'Priority repair services',
        '24/7 enterprise support'
      ],
      color: 'bg-purple-600 text-white',
      icon: <Zap className="w-6 h-6" />
    }
  ];

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    // Here you would integrate with payment processing
    console.log(`Subscribing to plan: ${planId}`);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-apple-gray-900 mb-4">
          Apple Subscription Services
        </h2>
        <p className="text-xl text-apple-gray-600 mb-6">
          Unlock premium benefits and exclusive access to Apple products
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-apple-gray-100 rounded-xl p-1">
          <button
            onClick={() => setBillingInterval('monthly')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              billingInterval === 'monthly'
                ? 'bg-white text-apple-gray-900 shadow-sm'
                : 'text-apple-gray-600'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingInterval('yearly')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              billingInterval === 'yearly'
                ? 'bg-white text-apple-gray-900 shadow-sm'
                : 'text-apple-gray-600'
            }`}
          >
            <span>Yearly</span>
            <span className="ml-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl p-6 border-2 transition-all ${
              plan.popular
                ? 'border-apple-blue-500 scale-105'
                : 'border-apple-gray-200 hover:border-apple-gray-300'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-apple-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${plan.color}`}>
                {plan.icon}
              </div>
              <h3 className="text-xl font-bold text-apple-gray-900 mb-2">
                {plan.name}
              </h3>
              <div className="text-3xl font-bold text-apple-gray-900">
                ${plan.price}
                <span className="text-base font-normal text-apple-gray-600">
                  /{plan.interval === 'monthly' ? 'mo' : 'yr'}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-apple-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.id)}
              className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                plan.popular
                  ? 'bg-apple-blue-500 text-white hover:bg-apple-blue-600'
                  : 'bg-apple-gray-100 text-apple-gray-900 hover:bg-apple-gray-200'
              }`}
            >
              {selectedPlan === plan.id ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      {/* Current Subscription Status */}
      {user && (
        <div className="mt-12 bg-apple-gray-50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-apple-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-apple-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-apple-gray-900">Current Plan</h4>
                <p className="text-apple-gray-600">Free Tier - Upgrade to unlock premium features</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
              <CreditCard className="w-4 h-4" />
              <span>Manage Billing</span>
            </button>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-apple-gray-900 mb-6">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {[
            {
              question: "Can I cancel my subscription anytime?",
              answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period."
            },
            {
              question: "What happens to my benefits if I downgrade?",
              answer: "If you downgrade, you'll lose access to premium features but keep any earned credits or rewards."
            },
            {
              question: "Do you offer student discounts?",
              answer: "Yes, we offer special pricing for students and educators. Contact our support team for more information."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-apple-gray-200">
              <h4 className="font-semibold text-apple-gray-900 mb-2">{faq.question}</h4>
              <p className="text-apple-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionService;
