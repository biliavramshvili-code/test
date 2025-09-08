import React, { useState } from 'react';
import { Share2, Heart, MessageCircle, Users, UserPlus, Star, ShoppingCart, Eye } from 'lucide-react';

interface SocialUser {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  following: number;
  isFollowing: boolean;
  recentPurchases: number;
}

interface SocialPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  productId: number;
  productName: string;
  productImage: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  createdAt: string;
  rating?: number;
}

const SocialShopping: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  
  const [socialUsers] = useState<SocialUser[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      followers: 1250,
      following: 340,
      isFollowing: false,
      recentPurchases: 5
    },
    {
      id: "2",
      name: "Mike Chen",
      avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      followers: 890,
      following: 210,
      isFollowing: true,
      recentPurchases: 3
    },
    {
      id: "3",
      name: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      followers: 2100,
      following: 450,
      isFollowing: false,
      recentPurchases: 8
    }
  ]);

  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([
    {
      id: "1",
      userId: "1",
      userName: "Sarah Johnson",
      userAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      productId: 1,
      productName: "iPhone 15 Pro",
      productImage: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      content: "Just got my new iPhone 15 Pro and the camera quality is absolutely incredible! The night mode photos are stunning. Highly recommend for photography enthusiasts! 📸✨",
      likes: 45,
      comments: 12,
      shares: 8,
      isLiked: false,
      createdAt: "2024-01-15",
      rating: 5
    },
    {
      id: "2",
      userId: "2",
      userName: "Mike Chen",
      userAvatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      productId: 2,
      productName: "MacBook Pro 16-inch",
      productImage: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      content: "Upgraded to the MacBook Pro 16-inch for video editing. The M3 chip performance is mind-blowing! Rendering times cut in half. Perfect for creative professionals.",
      likes: 67,
      comments: 23,
      shares: 15,
      isLiked: true,
      createdAt: "2024-01-12",
      rating: 5
    }
  ]);

  const toggleLike = (postId: string) => {
    setSocialPosts(posts => posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const shareProduct = (productId: number) => {
    // Implement share functionality
    navigator.share?.({
      title: 'Check out this product!',
      url: `${window.location.origin}/product/${productId}`
    });
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-apple-gray-200">
        <div className="border-b border-apple-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'feed', name: 'Social Feed', icon: <MessageCircle className="w-4 h-4" /> },
              { id: 'following', name: 'Following', icon: <Users className="w-4 h-4" /> },
              { id: 'trending', name: 'Trending', icon: <Star className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-apple-blue-500 text-apple-blue-600'
                    : 'border-transparent text-apple-gray-500 hover:text-apple-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'feed' && (
            <div className="space-y-6">
              {socialPosts.map((post) => (
                <div key={post.id} className="border border-apple-gray-200 rounded-xl p-6">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.userAvatar}
                        alt={post.userName}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium text-apple-gray-900">{post.userName}</h4>
                        <p className="text-sm text-apple-gray-600">{post.createdAt}</p>
                      </div>
                    </div>
                    <button className="p-2 text-apple-gray-400 hover:text-apple-gray-600">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="flex items-center space-x-4 mb-4 p-3 bg-apple-gray-50 rounded-lg">
                    <img
                      src={post.productImage}
                      alt={post.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium text-apple-gray-900">{post.productName}</h5>
                      {post.rating && (
                        <div className="flex items-center space-x-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= post.rating!
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-apple-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors text-sm">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-apple-gray-700 mb-4">{post.content}</p>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-apple-gray-200">
                    <div className="flex items-center space-x-6">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center space-x-2 transition-colors ${
                          post.isLiked ? 'text-red-500' : 'text-apple-gray-600 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 text-apple-gray-600 hover:text-apple-blue-500 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>
                      <button
                        onClick={() => shareProduct(post.productId)}
                        className="flex items-center space-x-2 text-apple-gray-600 hover:text-green-500 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-2 text-apple-gray-500">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">234 views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'following' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-apple-gray-900">People You Follow</h3>
                <button className="px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
                  Find Friends
                </button>
              </div>
              {socialUsers.filter(user => user.isFollowing).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border border-apple-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-medium text-apple-gray-900">{user.name}</h4>
                      <p className="text-sm text-apple-gray-600">
                        {user.followers} followers • {user.recentPurchases} recent purchases
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-apple-gray-200 text-apple-gray-700 rounded-lg hover:bg-apple-gray-300 transition-colors">
                    Following
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'trending' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-apple-gray-900">Trending Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "iPhone 15 Pro",
                    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
                    mentions: 156,
                    sentiment: 92
                  },
                  {
                    name: "MacBook Pro 16-inch",
                    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
                    mentions: 89,
                    sentiment: 88
                  }
                ].map((product, index) => (
                  <div key={index} className="border border-apple-gray-200 rounded-xl p-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h4 className="font-medium text-apple-gray-900 mb-2">{product.name}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-apple-gray-600">{product.mentions} mentions</span>
                      <span className="text-green-600">{product.sentiment}% positive</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialShopping;
