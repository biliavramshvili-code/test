import React, { useState, useEffect } from 'react';
import { Users, Heart, MessageCircle, Share2, Star, Crown, Zap, Gift, Camera, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialPost {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    followers: number;
    level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  };
  content: {
    type: 'review' | 'unboxing' | 'comparison' | 'recommendation';
    text: string;
    media?: string[];
    product?: {
      id: number;
      name: string;
      price: number;
      image: string;
    };
    rating?: number;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
  timestamp: Date;
  trending: boolean;
}

interface Influencer {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  followers: number;
  engagement: number;
  verified: boolean;
  recentPosts: number;
}

const SocialShoppingNetwork: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'influencers' | 'trending' | 'live'>('feed');
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);

  useEffect(() => {
    // Initialize sample data
    const samplePosts: SocialPost[] = [
      {
        id: '1',
        user: {
          id: 'tech_sarah',
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
          verified: true,
          followers: 125000,
          level: 'Platinum'
        },
        content: {
          type: 'unboxing',
          text: "Just got the new iPhone 15 Pro! The titanium build quality is incredible. Here's my first impressions after 24 hours of use. The camera improvements are game-changing for content creators! 📱✨",
          media: [
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
          ],
          product: {
            id: 1,
            name: 'iPhone 15 Pro',
            price: 999,
            image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200'
          },
          rating: 5
        },
        engagement: {
          likes: 2847,
          comments: 156,
          shares: 89,
          saves: 234
        },
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        trending: true
      },
      {
        id: '2',
        user: {
          id: 'apple_enthusiast',
          name: 'Mike Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          verified: false,
          followers: 8500,
          level: 'Gold'
        },
        content: {
          type: 'comparison',
          text: "MacBook Air M2 vs MacBook Pro M3 - Which one should you buy? I've been using both for a month. Here's my honest comparison for different use cases. Swipe for detailed specs! 💻",
          media: [
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'
          ],
          rating: 4
        },
        engagement: {
          likes: 1234,
          comments: 78,
          shares: 45,
          saves: 167
        },
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        trending: false
      },
      {
        id: '3',
        user: {
          id: 'audio_alex',
          name: 'Alex Thompson',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
          verified: true,
          followers: 67000,
          level: 'Platinum'
        },
        content: {
          type: 'review',
          text: "AirPods Pro 2nd Gen review after 6 months of daily use. The adaptive transparency and personalized spatial audio are still blowing my mind. Worth every penny! 🎧",
          media: [
            'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400'
          ],
          product: {
            id: 2,
            name: 'AirPods Pro (2nd Gen)',
            price: 249,
            image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=200'
          },
          rating: 5
        },
        engagement: {
          likes: 1876,
          comments: 92,
          shares: 67,
          saves: 198
        },
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        trending: true
      }
    ];

    const sampleInfluencers: Influencer[] = [
      {
        id: 'tech_sarah',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
        specialty: 'Mobile Technology',
        followers: 125000,
        engagement: 8.5,
        verified: true,
        recentPosts: 12
      },
      {
        id: 'audio_alex',
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        specialty: 'Audio & Accessories',
        followers: 67000,
        engagement: 7.2,
        verified: true,
        recentPosts: 8
      },
      {
        id: 'creative_emma',
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        specialty: 'Creative Workflows',
        followers: 89000,
        engagement: 9.1,
        verified: true,
        recentPosts: 15
      }
    ];

    setPosts(samplePosts);
    setInfluencers(sampleInfluencers);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, engagement: { ...post.engagement, likes: post.engagement.likes + 1 } }
        : post
    ));
  };

  const handleShare = (post: SocialPost) => {
    if (navigator.share) {
      navigator.share({
        title: `${post.user.name}'s post about ${post.content.product?.name || 'Apple products'}`,
        text: post.content.text,
        url: window.location.href
      });
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bronze': return 'text-orange-600 bg-orange-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Platinum': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const renderPost = (post: SocialPost) => (
    <motion.div
      key={post.id}
      className="bg-white rounded-2xl shadow-sm border border-apple-gray-200 overflow-hidden mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-apple-gray-900">{post.user.name}</h4>
              {post.user.verified && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(post.user.level)}`}>
                {post.user.level}
              </span>
            </div>
            <p className="text-sm text-apple-gray-600">
              {post.user.followers.toLocaleString()} followers • {formatTimeAgo(post.timestamp)}
            </p>
          </div>
        </div>
        {post.trending && (
          <div className="flex items-center space-x-1 text-orange-500">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-medium">Trending</span>
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4">
        <p className="text-apple-gray-900 mb-4">{post.content.text}</p>
        
        {/* Media */}
        {post.content.media && (
          <div className={`grid gap-2 mb-4 ${
            post.content.media.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
          }`}>
            {post.content.media.map((media, index) => (
              <img
                key={index}
                src={media}
                alt="Post media"
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        {/* Product Card */}
        {post.content.product && (
          <div className="bg-apple-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={post.content.product.image}
                alt={post.content.product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h5 className="font-semibold text-apple-gray-900">{post.content.product.name}</h5>
                <p className="text-apple-blue-500 font-bold">${post.content.product.price}</p>
                {post.content.rating && (
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < post.content.rating! ? 'text-yellow-400 fill-current' : 'text-apple-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <button className="px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
                View
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Engagement */}
      <div className="border-t border-apple-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => handleLike(post.id)}
              className="flex items-center space-x-2 text-apple-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="text-sm">{post.engagement.likes}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-apple-gray-600 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{post.engagement.comments}</span>
            </button>
            
            <button
              onClick={() => handleShare(post)}
              className="flex items-center space-x-2 text-apple-gray-600 hover:text-green-500 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span className="text-sm">{post.engagement.shares}</span>
            </button>
          </div>
          
          <button className="text-apple-gray-600 hover:text-apple-blue-500 transition-colors">
            <Gift className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Social Shopping Network</h3>
              <p className="text-pink-100">Discover, share, and shop with the community</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Live</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-apple-gray-200">
        <div className="flex">
          {[
            { id: 'feed', label: 'Feed', icon: <Users className="w-4 h-4" /> },
            { id: 'influencers', label: 'Influencers', icon: <Crown className="w-4 h-4" /> },
            { id: 'trending', label: 'Trending', icon: <Zap className="w-4 h-4" /> },
            { id: 'live', label: 'Live', icon: <Video className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                  : 'text-apple-gray-600 hover:text-purple-600'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-h-96 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'feed' && (
            <motion.div
              key="feed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {posts.map(renderPost)}
            </motion.div>
          )}

          {activeTab === 'influencers' && (
            <motion.div
              key="influencers"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {influencers.map((influencer) => (
                <div key={influencer.id} className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <img
                      src={influencer.avatar}
                      alt={influencer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-apple-gray-900">{influencer.name}</h4>
                        {influencer.verified && (
                          <Crown className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-apple-gray-600">{influencer.specialty}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-apple-gray-500">
                        <span>{influencer.followers.toLocaleString()} followers</span>
                        <span>{influencer.engagement}% engagement</span>
                        <span>{influencer.recentPosts} recent posts</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                    Follow
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'trending' && (
            <motion.div
              key="trending"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {posts.filter(post => post.trending).map(renderPost)}
            </motion.div>
          )}

          {activeTab === 'live' && (
            <motion.div
              key="live"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="text-center py-12"
            >
              <Video className="w-16 h-16 text-apple-gray-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-apple-gray-900 mb-2">Live Shopping Events</h4>
              <p className="text-apple-gray-600 mb-6">
                Join live product demonstrations and exclusive shopping events
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                Join Next Live Event
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SocialShoppingNetwork;
