import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductRecommendations from '../components/ProductRecommendations';

const Home: React.FC = () => {
  const { products, loading } = useProducts();

  // Get featured products (first 6 products)
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-apple-gray-900 via-apple-gray-800 to-apple-blue-900 text-white pt-20">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Think Different.
                <span className="block text-apple-blue-400">Shop Apple.</span>
              </h1>
              <p className="text-xl text-apple-gray-300 leading-relaxed">
                Discover the latest innovations in technology. From iPhone to Mac, 
                find the perfect Apple products that fit your lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-apple-blue-500 text-white rounded-xl font-semibold hover:bg-apple-blue-600 transition-colors group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/video-demo"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
                >
                  Watch Demo
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="MacBook Pro"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-apple-gray-900 mb-4">
              Why Choose Apple Store?
            </h2>
            <p className="text-xl text-apple-gray-600 max-w-3xl mx-auto">
              Experience premium quality, innovative design, and exceptional service 
              with every Apple product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8 text-yellow-500" />,
                title: "Premium Quality",
                description: "Every product meets Apple's highest standards for quality and performance."
              },
              {
                icon: <Truck className="w-8 h-8 text-green-500" />,
                title: "Free Delivery",
                description: "Fast and free shipping on all orders over $99. Get your products quickly."
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-500" />,
                title: "Warranty Protection",
                description: "Comprehensive warranty coverage and AppleCare+ options available."
              },
              {
                icon: <Headphones className="w-8 h-8 text-purple-500" />,
                title: "Expert Support",
                description: "24/7 customer support from Apple-certified specialists."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:bg-apple-gray-50 transition-colors">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-apple-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-apple-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-apple-gray-50">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-apple-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-apple-gray-600">
              Discover our most popular Apple products
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 animate-pulse">
                  <div className="bg-apple-gray-200 h-48 rounded-xl mb-4"></div>
                  <div className="bg-apple-gray-200 h-6 rounded mb-2"></div>
                  <div className="bg-apple-gray-200 h-4 rounded w-2/3 mb-4"></div>
                  <div className="bg-apple-gray-200 h-8 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-apple-blue-500 text-white rounded-xl font-semibold hover:bg-apple-blue-600 transition-colors group"
            >
              View All Products
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Product Recommendations */}
      <ProductRecommendations 
        title="Trending Now" 
        basedOn="trending" 
      />

      {/* Newsletter Section */}
      <section className="py-20 bg-apple-gray-900 text-white">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-apple-gray-300 mb-8">
              Get the latest news about Apple products, exclusive offers, and tech insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-apple-blue-500"
              />
              <button className="px-8 py-4 bg-apple-blue-500 text-white rounded-xl font-semibold hover:bg-apple-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
