import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would make an API call
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="section-padding bg-apple-blue-500">
      <div className="container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <Mail className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-display font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Be the first to know about our latest products, exclusive offers, and innovation updates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto animate-slide-up">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full border-0 focus:ring-2 focus:ring-white focus:outline-none text-apple-gray-700"
                required
              />
              <button
                type="submit"
                className="bg-white hover:bg-apple-gray-50 text-apple-blue-500 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </div>
          </form>

          {isSubscribed && (
            <div className="mt-6 flex items-center justify-center text-white animate-fade-in">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Thank you for subscribing!</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
