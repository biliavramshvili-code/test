import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MessageCircle, Filter, ChevronDown } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  images?: string[];
  pros?: string[];
  cons?: string[];
}

interface CustomerReviewsProps {
  productId: number;
  productName: string;
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ productId, productName }) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Sarah Johnson',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      title: 'Absolutely amazing performance!',
      comment: "I've been using this MacBook Pro for 3 months now and it's incredible. The M2 chip handles everything I throw at it - from video editing to running multiple development environments. The battery life is outstanding, easily lasting a full workday.",
      date: '2024-01-10',
      verified: true,
      helpful: 24,
      notHelpful: 2,
      pros: ['Excellent performance', 'Great battery life', 'Beautiful display'],
      cons: ['Expensive', 'Limited ports']
    },
    {
      id: '2',
      userId: '2',
      userName: 'Mike Chen',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 4,
      title: 'Great laptop, but pricey',
      comment: "The build quality is exceptional and the performance is top-notch. However, the price point is quite high. If you can afford it and need the power, it's worth it.",
      date: '2024-01-08',
      verified: true,
      helpful: 18,
      notHelpful: 5,
      pros: ['Build quality', 'Performance', 'macOS ecosystem'],
      cons: ['Price', 'Learning curve for new users']
    },
    {
      id: '3',
      userId: '3',
      userName: 'Emily Rodriguez',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: 5,
      title: 'Perfect for creative work',
      comment: "As a graphic designer, this MacBook Pro has transformed my workflow. The color accuracy is phenomenal, and rendering times are incredibly fast. Highly recommend for any creative professional.",
      date: '2024-01-05',
      verified: true,
      helpful: 31,
      notHelpful: 1,
      pros: ['Color accuracy', 'Fast rendering', 'Reliable'],
      cons: ['Heavy for travel']
    }
  ]);

  const [showWriteReview, setShowWriteReview] = useState(false);
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    pros: '',
    cons: ''
  });

  const { showNotification } = useNotification();

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  const filteredReviews = reviews.filter(review => 
    filterRating === 0 || review.rating === filterRating
  ).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    const review: Review = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false,
      helpful: 0,
      notHelpful: 0,
      pros: newReview.pros ? newReview.pros.split(',').map(s => s.trim()) : [],
      cons: newReview.cons ? newReview.cons.split(',').map(s => s.trim()) : []
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, title: '', comment: '', pros: '', cons: '' });
    setShowWriteReview(false);
    showNotification('Review submitted successfully!', 'success');
  };

  const handleHelpful = (reviewId: string, helpful: boolean) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            helpful: helpful ? review.helpful + 1 : review.helpful,
            notHelpful: !helpful ? review.notHelpful + 1 : review.notHelpful
          }
        : review
    ));
    showNotification(helpful ? 'Marked as helpful' : 'Feedback recorded', 'info');
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-apple-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl font-bold text-apple-gray-900">
                {averageRating.toFixed(1)}
              </div>
              <div>
                {renderStars(Math.round(averageRating), 'lg')}
                <p className="text-sm text-apple-gray-600 mt-1">
                  Based on {reviews.length} reviews
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowWriteReview(true)}
              className="px-6 py-3 bg-apple-blue-500 text-white rounded-xl hover:bg-apple-blue-600 transition-colors"
            >
              Write a Review
            </button>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm text-apple-gray-600 w-8">{rating}★</span>
                <div className="flex-1 bg-apple-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-apple-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(parseInt(e.target.value))}
            className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
          >
            <option value={0}>All Ratings</option>
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
        
        <p className="text-sm text-apple-gray-600">
          Showing {filteredReviews.length} of {reviews.length} reviews
        </p>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm border border-apple-gray-200 p-6">
            <div className="flex items-start space-x-4">
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-apple-gray-900">{review.userName}</h4>
                    {review.verified && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-apple-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 mb-3">
                  {renderStars(review.rating)}
                  <h5 className="font-medium text-apple-gray-900">{review.title}</h5>
                </div>
                
                <p className="text-apple-gray-700 mb-4">{review.comment}</p>
                
                {(review.pros || review.cons) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {review.pros && review.pros.length > 0 && (
                      <div>
                        <h6 className="font-medium text-green-700 mb-2">Pros:</h6>
                        <ul className="space-y-1">
                          {review.pros.map((pro, index) => (
                            <li key={index} className="text-sm text-apple-gray-700 flex items-center">
                              <ThumbsUp className="w-3 h-3 text-green-500 mr-2" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {review.cons && review.cons.length > 0 && (
                      <div>
                        <h6 className="font-medium text-red-700 mb-2">Cons:</h6>
                        <ul className="space-y-1">
                          {review.cons.map((con, index) => (
                            <li key={index} className="text-sm text-apple-gray-700 flex items-center">
                              <ThumbsDown className="w-3 h-3 text-red-500 mr-2" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center space-x-4 text-sm">
                  <button
                    onClick={() => handleHelpful(review.id, true)}
                    className="flex items-center space-x-1 text-apple-gray-600 hover:text-green-600 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  
                  <button
                    onClick={() => handleHelpful(review.id, false)}
                    className="flex items-center space-x-1 text-apple-gray-600 hover:text-red-600 transition-colors"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>Not Helpful ({review.notHelpful})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showWriteReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-apple-gray-900 mb-6">Write a Review</h3>
              
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Rating *
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= newReview.rating 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-apple-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Review Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="w-full px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    placeholder="Summarize your experience"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                    placeholder="Share your experience with this product"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                      Pros (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newReview.pros}
                      onChange={(e) => setNewReview({ ...newReview, pros: e.target.value })}
                      className="w-full px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                      placeholder="Great performance, Beautiful design"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                      Cons (comma separated)
                    </label>
                    <input
                      type="text"
                      value={newReview.cons}
                      onChange={(e) => setNewReview({ ...newReview, cons: e.target.value })}
                      className="w-full px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                      placeholder="Expensive, Limited ports"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowWriteReview(false)}
                    className="flex-1 px-6 py-3 border border-apple-gray-300 text-apple-gray-700 rounded-xl hover:bg-apple-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-apple-blue-500 text-white rounded-xl hover:bg-apple-blue-600 transition-colors"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
