import React, { useState } from 'react';
import { 
  Wrench, 
  Shield, 
  Truck, 
  Users, 
  Clock, 
  CheckCircle,
  Phone,
  MessageCircle,
  Calendar,
  Star,
  Award,
  Headphones
} from 'lucide-react';
import PersonalShopper from '../components/PersonalShopper';
import SubscriptionService from '../components/SubscriptionService';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'personal-shopper' | 'subscriptions'>('overview');

  const services = [
    {
      icon: <Wrench className="w-8 h-8 text-blue-500" />,
      title: "Technical Support",
      description: "Get expert help with setup, troubleshooting, and repairs from certified Apple technicians.",
      features: ["24/7 Support", "Remote Assistance", "In-Store Genius Bar", "Hardware Diagnostics"],
      price: "Free with AppleCare+"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: "AppleCare+ Protection",
      description: "Comprehensive coverage for your Apple devices with accidental damage protection.",
      features: ["Hardware Coverage", "Accidental Damage", "Battery Service", "Express Replacement"],
      price: "From $7.99/month"
    },
    {
      icon: <Truck className="w-8 h-8 text-purple-500" />,
      title: "Delivery & Setup",
      description: "Fast delivery and professional setup service for all your Apple products.",
      features: ["Same-Day Delivery", "Professional Setup", "Data Transfer", "Training Session"],
      price: "From $49"
    },
    {
      icon: <Users className="w-8 h-8 text-orange-500" />,
      title: "Personal Training",
      description: "One-on-one sessions to help you get the most out of your Apple devices.",
      features: ["Device Mastery", "App Recommendations", "Productivity Tips", "Creative Workflows"],
      price: "From $99/session"
    }
  ];

  const supportOptions = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone Support",
      description: "Speak directly with an Apple specialist",
      availability: "24/7",
      waitTime: "< 2 minutes"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Get instant help through our chat system",
      availability: "24/7",
      waitTime: "< 30 seconds"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Schedule Appointment",
      description: "Book a session at your local Apple Store",
      availability: "Store Hours",
      waitTime: "Same Day"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Creative Professional",
      content: "The personal training session helped me unlock features I never knew existed. My productivity has increased dramatically!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Michael Chen",
      role: "Small Business Owner",
      content: "AppleCare+ saved me thousands when I accidentally damaged my MacBook. The replacement was seamless.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Emily Rodriguez",
      role: "Student",
      content: "The technical support team helped me recover all my files when my iPhone wouldn't start. Incredible service!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
    }
  ];

  const renderOverview = () => (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-apple-gray-900 mb-6">
          Apple Services & Support
        </h1>
        <p className="text-xl text-apple-gray-600 max-w-3xl mx-auto">
          Get the most out of your Apple products with our comprehensive services, 
          expert support, and personalized assistance.
        </p>
      </section>

      {/* Services Grid */}
      <section>
        <h2 className="text-3xl font-bold text-apple-gray-900 text-center mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-apple-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-apple-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-apple-gray-600 mb-4">
                    {service.description}
                  </p>
                  <div className="text-lg font-semibold text-apple-blue-600">
                    {service.price}
                  </div>
                </div>
              </div>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-apple-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full mt-6 px-6 py-3 bg-apple-blue-500 text-white rounded-xl font-semibold hover:bg-apple-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Support Options */}
      <section className="bg-apple-gray-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-apple-gray-900 text-center mb-12">
          Get Support Now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {supportOptions.map((option, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-apple-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                {option.icon}
              </div>
              <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">
                {option.title}
              </h3>
              <p className="text-apple-gray-600 mb-4">
                {option.description}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-apple-gray-500">Available:</span>
                  <span className="font-medium text-apple-gray-900">{option.availability}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-apple-gray-500">Wait Time:</span>
                  <span className="font-medium text-green-600">{option.waitTime}</span>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
                Contact Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Service Stats */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {[
          { number: "99.9%", label: "Uptime Guarantee", icon: <Clock className="w-8 h-8 text-green-500" /> },
          { number: "24/7", label: "Support Available", icon: <Headphones className="w-8 h-8 text-blue-500" /> },
          { number: "< 2min", label: "Average Response", icon: <MessageCircle className="w-8 h-8 text-purple-500" /> },
          { number: "98%", label: "Customer Satisfaction", icon: <Award className="w-8 h-8 text-yellow-500" /> }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-center mb-4">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-apple-gray-900 mb-2">
              {stat.number}
            </div>
            <div className="text-apple-gray-600">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section>
        <h2 className="text-3xl font-bold text-apple-gray-900 text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-apple-gray-200">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-apple-gray-600 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-apple-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-apple-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen pt-20">
      <div className="container-padding py-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-apple-gray-100 rounded-xl p-1 inline-flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-white text-apple-gray-900 shadow-sm'
                  : 'text-apple-gray-600 hover:text-apple-gray-900'
              }`}
            >
              Services Overview
            </button>
            <button
              onClick={() => setActiveTab('personal-shopper')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'personal-shopper'
                  ? 'bg-white text-apple-gray-900 shadow-sm'
                  : 'text-apple-gray-600 hover:text-apple-gray-900'
              }`}
            >
              Personal Shopper
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'subscriptions'
                  ? 'bg-white text-apple-gray-900 shadow-sm'
                  : 'text-apple-gray-600 hover:text-apple-gray-900'
              }`}
            >
              Subscriptions
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'personal-shopper' && <PersonalShopper />}
        {activeTab === 'subscriptions' && <SubscriptionService />}
      </div>
    </div>
  );
};

export default Services;
