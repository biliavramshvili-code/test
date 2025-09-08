import React, { useState, useEffect } from 'react';
import { Bell, X, Clock, Tag, TrendingUp, Heart, ShoppingCart, Package, AlertCircle, CheckCircle, Info, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'promotion' | 'order' | 'recommendation';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  actionUrl?: string;
  imageUrl?: string;
  isRead: boolean;
  metadata?: {
    productId?: string;
    orderId?: string;
    discount?: number;
    expiresAt?: Date;
  };
}

interface NotificationSettings {
  enabled: boolean;
  sound: boolean;
  desktop: boolean;
  email: boolean;
  categories: {
    orders: boolean;
    promotions: boolean;
    recommendations: boolean;
    system: boolean;
  };
}

const SmartNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<NotificationSettings>({
    enabled: true,
    sound: true,
    desktop: true,
    email: false,
    categories: {
      orders: true,
      promotions: true,
      recommendations: true,
      system: true
    }
  });
  const [filter, setFilter] = useState<'all' | 'unread' | 'high' | 'urgent'>('all');

  // Sample notifications
  const sampleNotifications: Notification[] = [
    {
      id: '1',
      type: 'order',
      title: 'Order Shipped',
      message: 'Your iPhone 15 Pro Max has been shipped and will arrive tomorrow',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      priority: 'high',
      category: 'Orders',
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      isRead: false,
      metadata: {
        orderId: 'ORD-2024-001',
        productId: 'iphone-15-pro-max'
      }
    },
    {
      id: '2',
      type: 'promotion',
      title: 'Flash Sale Alert',
      message: 'Limited time: 25% off MacBook Pro M3 - Only 2 hours left!',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      priority: 'urgent',
      category: 'Promotions',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      isRead: false,
      metadata: {
        discount: 25,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 2),
        productId: 'macbook-pro-m3'
      }
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'Perfect Match Found',
      message: 'Based on your browsing, we found the ideal Apple Watch Ultra 2 for you',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      priority: 'medium',
      category: 'Recommendations',
      imageUrl: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      isRead: true,
      metadata: {
        productId: 'apple-watch-ultra-2'
      }
    },
    {
      id: '4',
      type: 'success',
      title: 'Payment Confirmed',
      message: 'Your payment for iPad Pro 12.9" has been successfully processed',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      priority: 'high',
      category: 'Orders',
      imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      isRead: true,
      metadata: {
        orderId: 'ORD-2024-002',
        productId: 'ipad-pro-129'
      }
    },
    {
      id: '5',
      type: 'info',
      title: 'System Update',
      message: 'New features available: Enhanced AR try-on and improved recommendations',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      priority: 'low',
      category: 'System',
      isRead: false
    }
  ];

  useEffect(() => {
    setNotifications(sampleNotifications);
  }, []);

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && settings.desktop) {
      Notification.requestPermission();
    }
  }, [settings.desktop]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order': return Package;
      case 'promotion': return Tag;
      case 'recommendation': return TrendingUp;
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'error': return AlertCircle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'urgent') return 'from-red-500 to-pink-600';
    
    switch (type) {
      case 'order': return 'from-blue-500 to-cyan-600';
      case 'promotion': return 'from-orange-500 to-red-600';
      case 'recommendation': return 'from-purple-500 to-indigo-600';
      case 'success': return 'from-green-500 to-emerald-600';
      case 'warning': return 'from-yellow-500 to-orange-600';
      case 'error': return 'from-red-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.isRead;
      case 'high': return notification.priority === 'high';
      case 'urgent': return notification.priority === 'urgent';
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent' && !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
      >
        <Bell className="w-6 h-6" />
        
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.div>
        )}
        
        {urgentCount > 0 && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"
          />
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Smart Notifications
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'All', count: notifications.length },
                  { key: 'unread', label: 'Unread', count: unreadCount },
                  { key: 'urgent', label: 'Urgent', count: urgentCount }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as any)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filter === tab.key
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tab.label} {tab.count > 0 && `(${tab.count})`}
                  </button>
                ))}
              </div>
              
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="mt-2 text-sm text-blue-500 hover:text-blue-600 font-medium"
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No notifications to show</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredNotifications.map((notification, index) => {
                    const IconComponent = getNotificationIcon(notification.type);
                    
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
                          !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          {/* Icon */}
                          <div className={`p-2 rounded-full bg-gradient-to-r ${getNotificationColor(notification.type, notification.priority)}`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`text-sm font-medium ${
                                !notification.isRead 
                                  ? 'text-gray-900 dark:text-white' 
                                  : 'text-gray-600 dark:text-gray-300'
                              }`}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityBadge(notification.priority)}`}>
                                  {notification.priority.toUpperCase()}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                                >
                                  <X className="w-3 h-3 text-gray-400" />
                                </button>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {formatTimeAgo(notification.timestamp)}
                                </span>
                              </div>
                              
                              {notification.metadata?.discount && (
                                <div className="flex items-center space-x-1 text-green-600">
                                  <Tag className="w-3 h-3" />
                                  <span className="text-xs font-medium">
                                    {notification.metadata.discount}% OFF
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            {notification.imageUrl && (
                              <img
                                src={notification.imageUrl}
                                alt=""
                                className="w-12 h-12 rounded-lg object-cover mt-2"
                              />
                            )}
                          </div>
                          
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    AI-powered smart notifications
                  </span>
                </div>
                <button className="text-xs text-blue-500 hover:text-blue-600 font-medium">
                  Settings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartNotifications;
