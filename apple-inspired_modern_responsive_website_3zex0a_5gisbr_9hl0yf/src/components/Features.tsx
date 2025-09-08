import React from 'react';
import { Zap, Shield, Smartphone, Headphones, Monitor, Keyboard } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience unprecedented speed with our advanced processing technology that handles any task effortlessly."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with industry-leading security measures and privacy-first design principles."
    },
    {
      icon: Smartphone,
      title: "Seamless Integration",
      description: "All our products work together harmoniously, creating a unified ecosystem for maximum productivity."
    },
    {
      icon: Headphones,
      title: "Premium Audio",
      description: "Immerse yourself in crystal-clear sound with our advanced audio technology and spatial audio support."
    },
    {
      icon: Monitor,
      title: "Stunning Displays",
      description: "Every pixel matters with our high-resolution displays that bring your content to life with vivid colors."
    },
    {
      icon: Keyboard,
      title: "Precision Input",
      description: "Type with confidence using our precision-engineered keyboards designed for comfort and accuracy."
    }
  ];

  return (
    <section id="features" className="section-padding bg-apple-gray-50">
      <div className="container-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-display font-bold text-apple-gray-700 mb-6">
            Why Choose Innovation
          </h2>
          <p className="text-xl text-apple-gray-500 max-w-3xl mx-auto">
            Our products are designed with cutting-edge technology and user-centric features that set new standards in the industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card p-8 text-center hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-apple-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <feature.icon className="h-8 w-8 text-apple-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-apple-gray-700 mb-4">
                {feature.title}
              </h3>
              <p className="text-apple-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
