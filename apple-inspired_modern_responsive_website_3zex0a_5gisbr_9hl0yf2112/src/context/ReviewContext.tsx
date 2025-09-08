import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Review } from '../types';

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  getProductReviews: (productId: number) => Review[];
  getAverageRating: (productId: number) => number;
  getRatingDistribution: (productId: number) => Record<number, number>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

interface ReviewProviderProps {
  children: ReactNode;
}

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userId: 'user1',
      productId: 1,
      rating: 5,
      comment: "Absolutely love this MacBook! The performance is incredible and the design is stunning.",
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      userId: 'user2',
      productId: 1,
      rating: 4,
      comment: "Great laptop, but the price is quite high. Worth it for the quality though.",
      createdAt: '2024-01-14T15:45:00Z'
    },
    {
      id: '3',
      userId: 'user3',
      productId: 2,
      rating: 5,
      comment: "The iPhone 15 Pro camera is amazing! Best phone I've ever owned.",
      createdAt: '2024-01-13T09:20:00Z'
    }
  ]);

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...reviewData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const getProductReviews = (productId: number) => {
    return reviews.filter(review => review.productId === productId);
  };

  const getAverageRating = (productId: number) => {
    const productReviews = getProductReviews(productId);
    if (productReviews.length === 0) return 0;
    const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / productReviews.length;
  };

  const getRatingDistribution = (productId: number) => {
    const productReviews = getProductReviews(productId);
    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    productReviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  return (
    <ReviewContext.Provider value={{
      reviews,
      addReview,
      getProductReviews,
      getAverageRating,
      getRatingDistribution
    }}>
      {children}
    </ReviewContext.Provider>
  );
};
