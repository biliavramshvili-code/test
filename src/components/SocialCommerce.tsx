import React, { useState, useEffect } from 'react';
import { Share2, Users, MessageCircle, ThumbsUp, Star, Camera, Play } from 'lucide-react';
import { Product } from '../types';

interface SocialPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  products: Product[];
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
}

interface LiveStream {
  id: string;
  hostName: string;
  hostAvatar: string;
  title: string;
  viewers: number;
  products: Product[];
  isLive: boolean;
  thumbnail: string;
}

const SocialCommerce: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'live' | 'create'>('feed');
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);
  const [newPost, setNewPost] = useState({ content: '', selectedProducts: [] as Product[] });

  useEffect(() => {
    // Mock social posts
    const mockPosts: SocialPost[] = [
      {
        id: '1',
        userId: 'user1',
        userName: 'Sarah Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        content: "Just got my new MacBook Pro! The performance is incredible. Perfect for my design work 🎨",
        products: [],
        likes: 124,
        comments: 23,
        shares: 8,
        timestamp: '2 hours ago',
        media: [{
          type: 'image',
          url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'
        }]
      },
      {
        id: '2',
        userId: 'user2',
        userName: 'Mike Chen',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        content: "Unboxing my new iPhone 15 Pro! The camera quality is mind-blowing 📸",
        products: [],
        likes: 89,
        comments: 15,
        shares: 12,
        timestamp: '4 hours ago',
        media: [{
          type: 'video',
          url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'
        }]
      }
    ];

    const mockLiveStreams: LiveStream[] = [
      {
        id: '1',
        hostName: 'Tech Reviewer Pro',
        hostAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        title: 'iPhone 15 Pro Max Deep Dive Review',
        viewers: 1247,
        products: [],
        isLive: true,
        thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'
      },
      {
        id: '2',
        hostName: 'Apple Insider',
        hostAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        title: 'MacBook Pro M3 vs M2 Comparison',
        viewers: 892,
        products: [],
        isLive: true,
        thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'
      }
    ];

    setPosts(mockPosts);
    setLiveStreams(mockLiveStreams);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleShare = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Commerce</h1>
        <p className="text-gray-600">Discover products through community experiences</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'feed', label: 'Community Feed', icon: Users },
          { id: 'live', label: 'Live Shopping', icon: Play },
          { id: 'create', label: 'Create Post', icon: Camera }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Community Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Post Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={post.userAvatar}
                    alt={post.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{post.userName}</h3>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <p className="text-gray-800 mb-4">{post.content}</p>
              </div>

              {/* Post Media */}
              {post.media && post.media.length > 0 && (
                <div className="relative">
                  <img
                    src={post.media[0].url}
                    alt="Post media"
                    className="w-full h-64 object-cover"
                  />
                  {post.media[0].type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-black/50 text-white p-4 rounded-full hover:bg-black/70 transition-colors">
                        <Play className="w-8 h-8" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Post Actions */}
              <div className="p-6 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.comments}</span>
                    </button>
                    <button
                      onClick={() => handleShare(post.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Live Shopping */}
      {activeTab === 'live' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-2">Live Shopping Events</h2>
            <p className="opacity-90">Join live streams and shop in real-time with exclusive deals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveStreams.map((stream) => (
              <div key={stream.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={stream.thumbnail}
                    alt={stream.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      LIVE
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {stream.viewers.toLocaleString()} viewers
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white/20 backdrop-blur-sm text-white p-4 rounded-full hover:bg-white/30 transition-colors">
                      <Play className="w-8 h-8" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={stream.hostAvatar}
                      alt={stream.hostName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{stream.hostName}</h3>
                      <p className="text-sm text-gray-500">Host</p>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{stream.title}</h4>
                  <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                    Join Live Stream
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Post */}
      {activeTab === 'create' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Create New Post</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's on your mind?
              </label>
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="Share your experience with Apple products..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Camera className="w-5 h-5 text-gray-600" />
                <span>Add Photo</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Play className="w-5 h-5 text-gray-600" />
                <span>Add Video</span>
              </button>
            </div>

            <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Share Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialCommerce;
