import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data to a server
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@innovation.com',
      description: 'Send us an email and we will respond within 24 hours.'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Speak with our support team Monday through Friday, 9 AM to 6 PM EST.'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Innovation Street, Tech City, TC 12345',
      description: 'Come visit our headquarters and experience our products firsthand.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="section-padding bg-apple-gray-50">
        <div className="container-padding">
          <div className="text-center mb-16">
            <h1 className="text-display font-bold text-apple-gray-700 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-apple-gray-500 max-w-3xl mx-auto">
              Have questions about our products or need support? We are here to help you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="card p-8 text-center hover-lift">
                <div className="w-16 h-16 bg-apple-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <info.icon className="h-8 w-8 text-apple-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-apple-gray-700 mb-2">
                  {info.title}
                </h3>
                <p className="text-lg font-semibold text-apple-blue-500 mb-3">
                  {info.details}
                </p>
                <p className="text-apple-gray-500 text-sm">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding bg-white">
        <div className="container-padding">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-display font-bold text-apple-gray-700 mb-6">
                Send us a Message
              </h2>
              <p className="text-lg text-apple-gray-500">
                Fill out the form below and we will get back to you as soon as possible.
              </p>
            </div>

            {isSubmitted && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl flex items-center space-x-3 animate-fade-in">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <h4 className="font-semibold text-green-800">Message Sent!</h4>
                  <p className="text-green-600">Thank you for contacting us. We will respond within 24 hours.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-xl focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-apple-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-apple-gray-300 rounded-xl focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-apple-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-apple-gray-300 rounded-xl focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="sales">Sales</option>
                  <option value="partnership">Partnership</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-apple-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-apple-gray-300 rounded-xl focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button type="submit" className="w-full btn-primary justify-center">
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
