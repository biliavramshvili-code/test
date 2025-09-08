import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Heart, User, Package, BarChart3, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import EnhancedSearchBar from './EnhancedSearchBar';
import AuthModal from './AuthModal';
import UserProfile from './UserProfile';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const { items, toggleCart } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user } = useAuth();

  // Safely calculate item count with fallback
  const itemCount = items ? items.reduce((total, item) => total + item.quantity, 0) : 0;
  const wishlistCount = wishlistItems ? wishlistItems.length : 0;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
    { name: 'Advanced Features', path: '/advanced-features' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-apple-gray-200">
        <div className="container-padding">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-apple-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-apple-gray-900">Apple Store</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-apple-blue-500 ${
                    isActive(item.path) 
                      ? 'text-apple-blue-500' 
                      : 'text-apple-gray-700'
                  } ${item.name === 'Advanced Features' ? 'flex items-center space-x-1' : ''}`}
                >
                  {item.name === 'Advanced Features' && <Zap className="w-4 h-4" />}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Enhanced Search Bar */}
            <div className="hidden lg:block flex-1 max-w-md mx-8">
              <EnhancedSearchBar />
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* User Account */}
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/dashboard"
                    className="p-2 text-apple-gray-600 hover:text-apple-blue-500 transition-colors relative"
                    title="Dashboard"
                  >
                    <BarChart3 className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/orders"
                    className="p-2 text-apple-gray-600 hover:text-apple-blue-500 transition-colors relative"
                  >
                    <Package className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => setShowProfile(true)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-apple-gray-100 transition-colors"
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                    ) : (
                      <User className="w-5 h-5 text-apple-gray-600" />
                    )}
                    <span className="hidden sm:block text-sm text-apple-gray-700">{user.name}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:block">Sign In</span>
                </button>
              )}

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-2 text-apple-gray-600 hover:text-apple-blue-500 transition-colors relative"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="p-2 text-apple-gray-600 hover:text-apple-blue-500 transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-apple-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-apple-gray-600 hover:text-apple-blue-500 transition-colors"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-4">
            <EnhancedSearchBar />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-apple-gray-200">
            <div className="container-padding py-4">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-apple-blue-50 text-apple-blue-500'
                        : 'text-apple-gray-700 hover:bg-apple-gray-50'
                    }`}
                  >
                    {item.name === 'Advanced Features' && <Zap className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                ))}
                {user && (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/dashboard')
                        ? 'bg-apple-blue-50 text-apple-blue-500'
                        : 'text-apple-gray-700 hover:bg-apple-gray-50'
                    }`}
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />

      {/* User Profile Modal */}
      <UserProfile 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
    </>
  );
};

export default Navigation;
