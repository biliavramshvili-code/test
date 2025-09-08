import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Instagram, Link, Mail, MessageCircle, Heart, Users, Copy, Check } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

interface SocialSharingProps {
  product?: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  wishlist?: {
    id: string;
    name: string;
    items: any[];
  };
  type: 'product' | 'wishlist';
}

const SocialSharing: React.FC<SocialSharingProps> = ({ product, wishlist, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showNotification } = useNotification();

  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    if (type === 'product' && product) {
      return `${baseUrl}/product/${product.id}`;
    } else if (type === 'wishlist' && wishlist) {
      return `${baseUrl}/wishlist/shared/${wishlist.id}`;
    }
    return baseUrl;
  };

  const getShareText = () => {
    if (type === 'product' && product) {
      return `Check out this amazing ${product.name} for $${product.price.toLocaleString()} at Apple Store!`;
    } else if (type === 'wishlist' && wishlist) {
      return `Check out my Apple wishlist "${wishlist.name}" with ${wishlist.items.length} amazing products!`;
    }
    return 'Check out Apple Store for amazing products!';
  };

  const shareUrl = getShareUrl();
  const shareText = getShareText();

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      url: '#',
      action: () => showNotification('Instagram sharing requires the mobile app', 'info')
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      color: 'bg-gray-600 hover:bg-gray-700',
      url: `mailto:?subject=${encodeURIComponent(type === 'product' ? `Check out this ${product?.name}` : `My Apple Wishlist`)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      showNotification('Link copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showNotification('Failed to copy link', 'error');
    }
  };

  const handleSocialShare = (platform: any) => {
    if (platform.action) {
      platform.action();
    } else {
      window.open(platform.url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-apple-gray-100 text-apple-gray-700 rounded-lg hover:bg-apple-gray-200 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share Menu */}
          <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-apple-gray-200 z-50 p-4">
            <div className="mb-4">
              <h3 className="font-semibold text-apple-gray-900 mb-2">
                Share {type === 'product' ? 'Product' : 'Wishlist'}
              </h3>
              {type === 'product' && product && (
                <div className="flex items-center space-x-3 p-3 bg-apple-gray-50 rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-apple-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-apple-gray-600">${product.price.toLocaleString()}</p>
                  </div>
                </div>
              )}
              {type === 'wishlist' && wishlist && (
                <div className="p-3 bg-apple-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <p className="font-medium text-apple-gray-900">{wishlist.name}</p>
                  </div>
                  <p className="text-sm text-apple-gray-600 flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {wishlist.items.length} items
                  </p>
                </div>
              )}
            </div>

            {/* Social Platforms */}
            <div className="space-y-2 mb-4">
              <p className="text-sm font-medium text-apple-gray-700">Share on social media</p>
              <div className="grid grid-cols-2 gap-2">
                {socialPlatforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => handleSocialShare(platform)}
                    className={`flex items-center space-x-2 px-3 py-2 text-white rounded-lg transition-colors ${platform.color}`}
                  >
                    {platform.icon}
                    <span className="text-sm">{platform.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Copy Link */}
            <div className="border-t border-apple-gray-200 pt-4">
              <p className="text-sm font-medium text-apple-gray-700 mb-2">Or copy link</p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-apple-gray-50 border border-apple-gray-300 rounded-lg text-sm"
                />
                <button
                  onClick={copyToClipboard}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-apple-blue-500 text-white hover:bg-apple-blue-600'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Share Stats (for wishlist) */}
            {type === 'wishlist' && (
              <div className="border-t border-apple-gray-200 pt-4 mt-4">
                <div className="flex items-center justify-between text-sm text-apple-gray-600">
                  <span>Shared 12 times</span>
                  <span>3 people viewed</span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SocialSharing;
