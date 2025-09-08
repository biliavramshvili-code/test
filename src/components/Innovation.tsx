import React from 'react';
import { ArrowRight, Cpu, Palette, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const Innovation: React.FC = () => {
  const innovations = [
    {
      icon: Cpu,
      title: "Advanced Processing",
      description: "Our custom-designed chips deliver unprecedented performance while maintaining energy efficiency.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Palette,
      title: "Design Excellence",
      description: "Every product is crafted with meticulous attention to detail and premium materials.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Layers,
      title: "Ecosystem Integration",
      description: "Seamless connectivity across all devices creates a unified and intuitive user experience.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="innovation" className="section-padding bg-white">
      <div className="container-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-display font-bold text-apple-gray-700 mb-6">
            Innovation at Its Core
          </h2>
          <p className="text-xl text-apple-gray-500 max-w-3xl mx-auto">
            We push the boundaries of what's possible, creating technology that enhances human potential and transforms industries.
          </p>
        </div>

        <div className="space-y-24">
          {innovations.map((innovation, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1 animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="w-16 h-16 bg-apple-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <innovation.icon className="h-8 w-8 text-apple-blue-500" />
                </div>
                <h3 className="text-heading font-bold text-apple-gray-700 mb-6">
                  {innovation.title}
                </h3>
                <p className="text-lg text-apple-gray-500 leading-relaxed mb-8">
                  {innovation.description}
                </p>
                <Link to="/about" className="btn-secondary">
                  <span>Learn More</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              
              <div className="flex-1 animate-slide-up" style={{ animationDelay: `${index * 0.2 + 0.1}s` }}>
                <img
                  src={innovation.image}
                  alt={innovation.title}
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl hover-lift"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Innovation;
