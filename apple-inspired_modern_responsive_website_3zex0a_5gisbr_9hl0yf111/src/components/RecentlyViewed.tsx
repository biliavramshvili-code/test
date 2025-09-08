import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import ProductCard from './ProductCard';

const RecentlyViewed: React.FC = () => {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-padding">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Clock className="w-6 h-6 text-apple-blue-500" />
            <h2 className="text-2xl font-bold text-apple-gray-900">Recently Viewed</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={clearRecentlyViewed}
              className="text-sm text-apple-gray-600 hover:text-apple-blue-500 transition-colors"
            >
              Clear All
            </button>
            <Link
              to="/products"
              className="flex items-center space-x-1 text-sm text-apple-blue-500 hover:text-apple-blue-600 transition-colors"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyViewed.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
