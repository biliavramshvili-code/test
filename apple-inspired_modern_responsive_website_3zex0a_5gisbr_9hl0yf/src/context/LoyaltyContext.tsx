import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';

interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  benefits: string[];
  multiplier: number;
  color: string;
}

interface LoyaltyTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  points: number;
  description: string;
  orderId?: string;
  timestamp: Date;
}

interface LoyaltyContextType {
  points: number;
  tier: LoyaltyTier;
  transactions: LoyaltyTransaction[];
  earnPoints: (points: number, description: string, orderId?: string) => void;
  redeemPoints: (points: number, description: string) => boolean;
  getPointsValue: (points: number) => number;
  getNextTier: () => LoyaltyTier | null;
  getProgressToNextTier: () => { current: number; required: number; percentage: number };
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (!context) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider');
  }
  return context;
};

const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    minPoints: 0,
    benefits: ['1x points on purchases', 'Birthday discount'],
    multiplier: 1,
    color: 'text-orange-600'
  },
  {
    id: 'silver',
    name: 'Silver',
    minPoints: 1000,
    benefits: ['1.5x points on purchases', 'Free shipping', 'Early access to sales'],
    multiplier: 1.5,
    color: 'text-gray-600'
  },
  {
    id: 'gold',
    name: 'Gold',
    minPoints: 2500,
    benefits: ['2x points on purchases', 'Priority support', 'Exclusive products'],
    multiplier: 2,
    color: 'text-yellow-600'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    minPoints: 5000,
    benefits: ['3x points on purchases', 'Personal shopper', 'VIP events'],
    multiplier: 3,
    color: 'text-purple-600'
  }
];

export const LoyaltyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const { user } = useAuth();
  const { showNotification } = useNotification();

  // Load user's loyalty data
  useEffect(() => {
    if (user) {
      // In a real app, this would come from your backend
      const savedPoints = localStorage.getItem(`loyalty_points_${user.id}`);
      const savedTransactions = localStorage.getItem(`loyalty_transactions_${user.id}`);
      
      if (savedPoints) {
        setPoints(parseInt(savedPoints));
      } else {
        // New user gets welcome bonus
        setPoints(100);
        const welcomeTransaction: LoyaltyTransaction = {
          id: Date.now().toString(),
          type: 'earned',
          points: 100,
          description: 'Welcome bonus',
          timestamp: new Date()
        };
        setTransactions([welcomeTransaction]);
        showNotification('Welcome! You earned 100 bonus points!', 'success');
      }
      
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      }
    }
  }, [user, showNotification]);

  // Save loyalty data when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`loyalty_points_${user.id}`, points.toString());
      localStorage.setItem(`loyalty_transactions_${user.id}`, JSON.stringify(transactions));
    }
  }, [user, points, transactions]);

  const getCurrentTier = (): LoyaltyTier => {
    return LOYALTY_TIERS.slice().reverse().find(tier => points >= tier.minPoints) || LOYALTY_TIERS[0];
  };

  const getNextTier = (): LoyaltyTier | null => {
    const currentTier = getCurrentTier();
    const currentIndex = LOYALTY_TIERS.findIndex(tier => tier.id === currentTier.id);
    return currentIndex < LOYALTY_TIERS.length - 1 ? LOYALTY_TIERS[currentIndex + 1] : null;
  };

  const getProgressToNextTier = () => {
    const nextTier = getNextTier();
    if (!nextTier) {
      return { current: points, required: points, percentage: 100 };
    }
    
    const currentTier = getCurrentTier();
    const current = points - currentTier.minPoints;
    const required = nextTier.minPoints - currentTier.minPoints;
    const percentage = Math.min(100, (current / required) * 100);
    
    return { current, required, percentage };
  };

  const earnPoints = (earnedPoints: number, description: string, orderId?: string) => {
    const currentTier = getCurrentTier();
    const multipliedPoints = Math.floor(earnedPoints * currentTier.multiplier);
    
    const transaction: LoyaltyTransaction = {
      id: Date.now().toString(),
      type: 'earned',
      points: multipliedPoints,
      description,
      orderId,
      timestamp: new Date()
    };

    const oldTier = getCurrentTier();
    setPoints(prev => prev + multipliedPoints);
    setTransactions(prev => [transaction, ...prev]);

    // Check for tier upgrade
    setTimeout(() => {
      const newTier = getCurrentTier();
      if (newTier.id !== oldTier.id) {
        showNotification(`Congratulations! You've been upgraded to ${newTier.name} tier!`, 'success');
      } else {
        showNotification(`You earned ${multipliedPoints} points!`, 'success');
      }
    }, 100);
  };

  const redeemPoints = (pointsToRedeem: number, description: string): boolean => {
    if (points < pointsToRedeem) {
      showNotification('Insufficient points for redemption', 'error');
      return false;
    }

    const transaction: LoyaltyTransaction = {
      id: Date.now().toString(),
      type: 'redeemed',
      points: pointsToRedeem,
      description,
      timestamp: new Date()
    };

    setPoints(prev => prev - pointsToRedeem);
    setTransactions(prev => [transaction, ...prev]);
    showNotification(`Successfully redeemed ${pointsToRedeem} points!`, 'success');
    
    return true;
  };

  const getPointsValue = (pointsAmount: number): number => {
    // 100 points = $1 USD
    return pointsAmount / 100;
  };

  const value: LoyaltyContextType = {
    points,
    tier: getCurrentTier(),
    transactions,
    earnPoints,
    redeemPoints,
    getPointsValue,
    getNextTier,
    getProgressToNextTier
  };

  return (
    <LoyaltyContext.Provider value={value}>
      {children}
    </LoyaltyContext.Provider>
  );
};
