import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Gift,
  Store,
  CreditCard
} from 'lucide-react';
import StoreLocator from './StoreLocator';
import GiftCardPurchase from './GiftCardPurchase';

const Footer: React.FC = () => {
  const [showStoreLocator, setShowStoreLocator] = useState(false);
  const [showGiftCards, setShowGiftCards] = useState(false);

  const footerSections = [
    {
      title: 'Shop and Learn',
      links: [
        { name: 'iPhone', path: '/products?category=iPhone' },
        { name: 'iPad', path: '/products?category=iPad' },
        { name: 'Mac', path: '/products?category=Mac' },
        { name: 'Apple Watch', path: '/products?category=Watch' },
        { name: 'AirPods', path: '/products?category=AirPods' },
        { name: 'Accessories', path: '/products?category=Accessories' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Apple Store', action: () => setShowStoreLocator(true) },
        { name: 'Gift Cards', action: () => setShowGiftCards(true) },
        { name: 'AppleCare+', path: '/services' },
        { name: 'Financing', path: '/services' },
        { name: 'Trade In', path: '/services' },
        { name: 'Business', path: '/services' }
      ]
    },
    {
      title: 'Account',
      links: [
        { name: 'Manage Your Apple ID', path: '/account' },
        { name: 'Apple Store Account', path: '/account' },
        { name: 'iCloud.com', path: '/account' },
        { name: 'Order Status', path: '/orders' },
        { name: 'Shopping Help', path: '/contact' }
      ]
    },
    {
      title: 'Apple Store',
      links: [
        { name: 'Find a Store', action: () => setShowStoreLocator(true) },
        { name: 'Genius Bar', path: '/services' },
        { name: 'Today at Apple', path: '/services' },
        { name: 'Apple Camp', path: '/services' },
        { name: 'Apple Store App', path: '/services' },
        { name: 'Refurbished', path: '/products?filter=refurbished' }
      ]
    }
  ];

  return (
    <>
      <footer className="bg-apple-gray-50 border-t border-apple-gray-200">
        {/* Newsletter Section */}
        <div className="bg-apple-gray-900 text-white">
          <div className="container-padding py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Stay in the loop</h3>
              <p className="text-apple-gray-300 mb-8">
                Get the latest news, exclusive offers, and product updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-apple-blue-500"
                />
                <button className="px-8 py-3 bg-apple-blue-500 text-white rounded-lg font-semibold hover:bg-apple-blue-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container-padding py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-apple-gray-900 mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.path ? (
                        <Link
                          to={link.path}
                          className="text-apple-gray-600 hover:text-apple-blue-500 transition-colors text-sm"
                        >
                          {link.name}
                        </Link>
                      ) : (
                        <button
                          onClick={link.action}
                          className="text-apple-gray-600 hover:text-apple-blue-500 transition-colors text-sm text-left"
                        >
                          {link.name}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="border-t border-apple-gray-200 pt-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-apple-blue-500" />
                <div>
                  <p className="font-medium text-apple-gray-900">Call us</p>
                  <p className="text-sm text-apple-gray-600">1-800-APL-CARE</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-apple-blue-500" />
                <div>
                  <p className="font-medium text-apple-gray-900">Email us</p>
                  <p className="text-sm text-apple-gray-600">support@applestore.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-apple-blue-500" />
                <div>
                  <p className="font-medium text-apple-gray-900">Visit us</p>
                  <button
                    onClick={() => setShowStoreLocator(true)}
                    className="text-sm text-apple-blue-500 hover:text-apple-blue-600 transition-colors"
                  >
                    Find a store near you
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-apple-gray-200 pt-8 mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setShowStoreLocator(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-white border border-apple-gray-300 rounded-lg hover:bg-apple-gray-50 transition-colors"
              >
                <Store className="w-5 h-5 text-apple-gray-600" />
                <span className="text-apple-gray-700 font-medium">Find a Store</span>
              </button>
              <button
                onClick={() => setShowGiftCards(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-white border border-apple-gray-300 rounded-lg hover:bg-apple-gray-50 transition-colors"
              >
                <Gift className="w-5 h-5 text-apple-gray-600" />
                <span className="text-apple-gray-700 font-medium">Gift Cards</span>
              </button>
              <Link
                to="/services"
                className="flex items-center space-x-2 px-6 py-3 bg-white border border-apple-gray-300 rounded-lg hover:bg-apple-gray-50 transition-colors"
              >
                <CreditCard className="w-5 h-5 text-apple-gray-600" />
                <span className="text-apple-gray-700 font-medium">Financing</span>
              </Link>
            </div>
          </div>

          {/* Social Media & Bottom */}
          <div className="border-t border-apple-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-apple-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold text-apple-gray-900">Apple Store</span>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <a
                    href="#"
                    className="text-apple-gray-400 hover:text-apple-blue-500 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-apple-gray-400 hover:text-apple-blue-500 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-apple-gray-400 hover:text-apple-blue-500 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-apple-gray-400 hover:text-apple-blue-500 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-apple-gray-200 text-center">
              <div className="flex flex-wrap justify-center items-center space-x-6 text-sm text-apple-gray-500 mb-4">
                <Link to="/privacy" className="hover:text-apple-blue-500 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-apple-blue-500 transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="hover:text-apple-blue-500 transition-colors">
                  Cookie Policy
                </Link>
                <Link to="/accessibility" className="hover:text-apple-blue-500 transition-colors">
                  Accessibility
                </Link>
                <Link to="/sitemap" className="hover:text-apple-blue-500 transition-colors">
                  Site Map
                </Link>
              </div>
              <p className="text-sm text-apple-gray-500">
                © 2024 Apple Store. All rights reserved. More ways to shop: Find an Apple Store or other retailer near you.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Store Locator Modal */}
      <StoreLocator
        isOpen={showStoreLocator}
        onClose={() => setShowStoreLocator(false)}
      />

      {/* Gift Card Purchase Modal */}
      <GiftCardPurchase
        isOpen={showGiftCards}
        onClose={() => setShowGiftCards(false)}
      />
    </>
  );
};

export default Footer;
