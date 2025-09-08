import React, { useState } from 'react';
import { Share2, Facebook, Twitter, Instagram, Link, MessageCircle, Mail } from 'lucide-react';
import { Product } from '../types';
import { useNotification } from '../context/NotificationContext';

interface SocialShareProps {
  product: Product;
  className?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ product, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { showNotification } = useNotification();

  const shareUrl = `${window.location.origin}/product/${product.id}`;
  const shareText = `Check out this amazing ${product.name} - ${product.description}`;

  const shareOptions = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'hover:bg-sky-500'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
      color: 'hover:bg-green-600'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: `mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
      color: 'hover:bg-gray-600'
    }
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showNotification("Link copied to clipboard!", "success");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to copy link:", error);
      showNotification("Failed to copy link", "error");
    }
  };

  const handleSocialShare = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleNativeShare}
        className="flex items-center space-x-2 px-4 py-2 bg-apple-gray-100 text-apple-gray-700 rounded-lg hover:bg-apple-gray-200 transition-colors"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 z-50 bg-white rounded-xl shadow-lg border border-apple-gray-200 p-4 min-w-[200px]">
            <h3 className="text-sm font-semibold text-apple-gray-900 mb-3">
              Share this product
            </h3>
            
            <div className="space-y-2">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleSocialShare(option.url)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-white transition-colors ${option.color} bg-apple-gray-700`}
                >
                  {option.icon}
                  <span className="text-sm">{option.name}</span>
                </button>
              ))}
              
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-apple-gray-700 hover:bg-apple-gray-100 transition-colors"
              >
                <Link className="w-5 h-5" />
                <span className="text-sm">Copy Link</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialShare;
