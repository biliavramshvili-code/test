import React from 'react';
import { ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openVideoModal = () => {
    // In a real app, this would open a video modal
    alert("Video modal would open here with the company story video!");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-apple-gray-50 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-apple-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-apple-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 container-padding text-center">
        <div className="animate-fade-in">
          <h1 className="text-hero font-bold text-apple-gray-700 mb-6 leading-tight">
            Innovation
            <br />
            <span className="text-gradient">Redefined</span>
          </h1>
          
          <p className="text-xl text-apple-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the future of technology with our revolutionary products designed to transform how you work, create, and connect.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button 
              onClick={scrollToProducts}
              className="btn-primary"
            >
              <span>Explore Products</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={openVideoModal}
              className="group flex items-center space-x-3 text-apple-gray-600 hover:text-apple-gray-700 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Play className="h-5 w-5 ml-1" />
              </div>
              <span className="font-medium">Watch the story</span>
            </button>
          </div>
        </div>

        {/* Hero Product Image */}
        <div className="animate-slide-up">
          <div className="relative mx-auto max-w-4xl">
            <img
              src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt="Premium Technology Product"
              className="w-full h-auto rounded-2xl shadow-2xl hover-lift"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
