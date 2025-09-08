import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';

const Testimonials: React.FC = () => {
  return (
    <section className="section-padding bg-apple-gray-50">
      <div className="container-padding">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-display font-bold text-apple-gray-700 mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-apple-gray-500 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their workflow with our innovative products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="card p-8 hover-lift animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-6">
                <Quote className="h-8 w-8 text-apple-blue-500 mb-4" />
              </div>
              
              <p className="text-apple-gray-600 leading-relaxed mb-6">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-apple-gray-700">{testimonial.name}</h4>
                  <p className="text-sm text-apple-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
