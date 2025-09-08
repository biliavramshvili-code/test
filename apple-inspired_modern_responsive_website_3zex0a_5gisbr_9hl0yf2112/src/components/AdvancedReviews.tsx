import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Camera, Shield, Filter, ChevronDown } from 'lucide-react';

interface ReviewPhoto {
  id: string;
  url: string;
  caption?: string;
}

interface DetailedReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: number;
  rating: number;
  title: string;
  comment: string;
  photos: ReviewPhoto[];
  verified: boolean;
  helpful: number;
  notHelpful: number;
  createdAt: string;
  pros: string[];
  cons: string[];
  wouldRecommend: boolean;
}

const AdvancedReviews: React.FC<{ productId: number }> = ({ productId }) => {
  const [reviews, setReviews] = useState<DetailedReview[]>([
    {
      id: "1",
      userId: "user1",
      userName: "Sarah Johnson",
      userAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      productId: 1,
      rating: 5,
      title: "Absolutely love this iPhone!",
      comment: "The camera quality is incredible and the battery life exceeds my expectations. Perfect for my daily photography needs.",
      photos: [
        { id: "p1", url: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" },
        { id: "p2", url: "https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" }
      ],
      verified: true,
      helpful: 24,
      notHelpful: 2,
      createdAt: "2024-01-15",
      pros: ["Amazing camera", "Long battery life", "Smooth performance"],
      cons: ["Price is high"],
      wouldRecommend: true
    },
    {
      id: "2",
      userId: "user2",
      userName: "Mike Chen",
      userAvatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      productId: 1,
      rating: 4,
      title: "Great phone with minor issues",
      comment: "Overall excellent device. The build quality is premium and iOS is very smooth. Only complaint is the storage fills up quickly.",
      photos: [],
      verified: true,
      helpful: 18,
      notHelpful: 1,
      createdAt: "2024-01-10",
      pros: ["Premium build", "Smooth iOS", "Great display"],
      cons: ["Limited storage", "No headphone jack"],
      wouldRecommend: true
    }
  ]);

  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');
  const [showWriteReview, setShowWriteReview] = useState(false);

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100
  }));

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-apple-gray-900 mb-2">Customer Reviews</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-apple-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-apple-gray-900">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-apple-gray-600">({reviews.length} reviews)</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowWriteReview(true)}
            className="px-6 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
          >
            Write Review
          </button>
        </div>

        {/* Rating Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm text-apple-gray-600 w-8">{rating}★</span>
                <div className="flex-1 bg-apple-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-apple-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-apple-gray-600">Verified Purchases</span>
              <span className="text-sm font-medium text-apple-gray-900">
                {reviews.filter(r => r.verified).length}/{reviews.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-apple-gray-600">Would Recommend</span>
              <span className="text-sm font-medium text-apple-gray-900">
                {Math.round((reviews.filter(r => r.wouldRecommend).length / reviews.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-apple-gray-600" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="border border-apple-gray-300 rounded-lg px-3 py-1 text-sm"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-apple-gray-300 rounded-lg px-3 py-1 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl p-6 border border-apple-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {review.userAvatar ? (
                  <img
                    src={review.userAvatar}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-apple-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-apple-gray-600 font-medium">
                      {review.userName.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-apple-gray-900">{review.userName}</h4>
                    {review.verified && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Shield className="w-4 h-4" />
                        <span className="text-xs">Verified</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-apple-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-apple-gray-600">{review.createdAt}</span>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="font-semibold text-apple-gray-900 mb-2">{review.title}</h5>
            <p className="text-apple-gray-700 mb-4">{review.comment}</p>

            {/* Pros and Cons */}
            {(review.pros.length > 0 || review.cons.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {review.pros.length > 0 && (
                  <div>
                    <h6 className="font-medium text-green-600 mb-2">Pros:</h6>
                    <ul className="space-y-1">
                      {review.pros.map((pro, index) => (
                        <li key={index} className="text-sm text-apple-gray-700 flex items-center">
                          <span className="w-1 h-1 bg-green-500 rounded-full mr-2" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {review.cons.length > 0 && (
                  <div>
                    <h6 className="font-medium text-red-600 mb-2">Cons:</h6>
                    <ul className="space-y-1">
                      {review.cons.map((con, index) => (
                        <li key={index} className="text-sm text-apple-gray-700 flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Review Photos */}
            {review.photos.length > 0 && (
              <div className="mb-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {review.photos.map((photo) => (
                    <img
                      key={photo.id}
                      src={photo.url}
                      alt="Review photo"
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Helpful Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-apple-gray-200">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-apple-gray-600 hover:text-apple-blue-500">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">Helpful ({review.helpful})</span>
                </button>
                <button className="flex items-center space-x-1 text-apple-gray-600 hover:text-red-500">
                  <ThumbsDown className="w-4 h-4" />
                  <span className="text-sm">Not Helpful ({review.notHelpful})</span>
                </button>
              </div>
              {review.wouldRecommend && (
                <span className="text-sm text-green-600 font-medium">Recommends this product</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvancedReviews;
