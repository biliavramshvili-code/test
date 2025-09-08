import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { Review, User } from '../types';
import { useAuth } from '../context/AuthContext';

interface ProductReviewsProps {
  productId: number;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  reviews,
  onAddReview
}) => {
  const { user } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 
      : 0
  }));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    onAddReview({
      userId: user.id,
      productId,
      rating: newReview.rating,
      comment: newReview.comment
    });

    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-apple-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-apple-gray-50 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-apple-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            {renderStars(Math.round(averageRating), 'lg')}
            <p className="text-apple-gray-600 mt-2">
              Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm text-apple-gray-700 w-8">{rating}★</span>
                <div className="flex-1 bg-apple-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-apple-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Review Button */}
      {user && !showReviewForm && (
        <div className="text-center">
          <button
            onClick={() => setShowReviewForm(true)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="bg-white border border-apple-gray-200 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-apple-gray-900 mb-4">Write Your Review</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newReview.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-apple-gray-300 hover:text-yellow-300'
                      } transition-colors`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-apple-gray-600">
                  {newReview.rating} star{newReview.rating !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent resize-none"
                placeholder="Share your experience with this product..."
                required
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="submit"
                className="px-6 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-2 border border-apple-gray-300 text-apple-gray-700 rounded-lg hover:bg-apple-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-apple-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-apple-gray-900 mb-2">No Reviews Yet</h3>
            <p className="text-apple-gray-600">Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="bg-white border border-apple-gray-200 rounded-2xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-apple-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {review.userId.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-apple-gray-900">User {review.userId}</h4>
                    <p className="text-sm text-apple-gray-600">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-apple-gray-700 leading-relaxed">{review.comment}</p>
              
              <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-apple-gray-100">
                <button className="flex items-center space-x-1 text-sm text-apple-gray-600 hover:text-apple-blue-500 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful</span>
                </button>
                <button className="flex items-center space-x-1 text-sm text-apple-gray-600 hover:text-apple-blue-500 transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                  <span>Not Helpful</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
