import React from 'react';
import { Users, Award, Globe, Heart } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { number: '10M+', label: 'Happy Customers' },
    { number: '50+', label: 'Countries Served' },
    { number: '15+', label: 'Years of Innovation' },
    { number: '100+', label: 'Awards Won' }
  ];

  const values = [
    {
      icon: Users,
      title: 'People First',
      description: 'We design technology that puts human needs and experiences at the center of everything we create.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for perfection in every detail, from the smallest component to the overall user experience.'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'We are committed to creating products that are environmentally responsible and built to last.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our love for technology and innovation drives us to push boundaries and create the impossible.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="section-padding bg-apple-gray-50">
        <div className="container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display font-bold text-apple-gray-700 mb-6">
              About Innovation
            </h1>
            <p className="text-xl text-apple-gray-500 leading-relaxed mb-12">
              We are a team of passionate innovators, designers, and engineers dedicated to creating technology that enhances human potential and transforms the way we work, create, and connect.
            </p>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
              alt="Our Team"
              className="w-full h-96 object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-apple-blue-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-apple-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-apple-gray-50">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-display font-bold text-apple-gray-700 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-apple-gray-600 leading-relaxed">
                <p>
                  Founded in 2009, Innovation began with a simple belief: technology should enhance human creativity, not complicate it. Our founders, a group of engineers and designers from leading tech companies, saw an opportunity to create products that were both powerful and intuitive.
                </p>
                <p>
                  Over the years, we have grown from a small startup to a global company, but our core values remain unchanged. We continue to prioritize user experience, sustainable design, and cutting-edge innovation in everything we create.
                </p>
                <p>
                  Today, our products are used by millions of professionals, creators, and everyday users around the world, helping them achieve their goals and bring their ideas to life.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Our Journey"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h2 className="text-display font-bold text-apple-gray-700 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-apple-gray-500 max-w-3xl mx-auto">
              These principles guide every decision we make and every product we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-apple-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-apple-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-apple-gray-700 mb-4">
                  {value.title}
                </h3>
                <p className="text-apple-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
