import React from 'react';
import { motion } from 'framer-motion';
import QuantumRecommendationEngine from '../components/QuantumRecommendationEngine';
import NeuralInterfaceShopping from '../components/NeuralInterfaceShopping';
import HolographicDisplay from '../components/HolographicDisplay';
import SpaceCommerceIntegration from '../components/SpaceCommerceIntegration';
import EmotionRecognitionShopping from '../components/EmotionRecognitionShopping';

const AdvancedFeatures: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-apple-gray-900 mb-4">
            Next-Generation Commerce Features
          </h1>
          <p className="text-xl text-apple-gray-600 max-w-3xl mx-auto">
            Experience the future of shopping with quantum computing, neural interfaces, 
            holographic displays, space commerce, and emotion recognition technology.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Quantum Recommendation Engine */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <QuantumRecommendationEngine />
          </motion.div>

          {/* Neural Interface Shopping */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <NeuralInterfaceShopping />
          </motion.div>

          {/* Holographic Display */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <HolographicDisplay />
          </motion.div>

          {/* Space Commerce Integration */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <SpaceCommerceIntegration />
          </motion.div>

          {/* Emotion Recognition Shopping */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <EmotionRecognitionShopping />
          </motion.div>
        </div>

        {/* Feature Overview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-br from-apple-gray-50 to-apple-blue-50 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-apple-gray-900 mb-6 text-center">
            Revolutionary Shopping Technologies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Quantum Computing",
                description: "Ultra-precise product matching using quantum algorithms and superposition calculations",
                color: "from-purple-500 to-cyan-500"
              },
              {
                title: "Neural Interfaces",
                description: "Shop with your thoughts using advanced brain-computer interface technology",
                color: "from-pink-500 to-purple-500"
              },
              {
                title: "Holographic Display",
                description: "3D holographic product visualization with interactive controls and real-time manipulation",
                color: "from-cyan-500 to-blue-500"
              },
              {
                title: "Space Commerce",
                description: "Interplanetary shopping with satellite delivery and orbital marketplace integration",
                color: "from-blue-500 to-purple-500"
              },
              {
                title: "Emotion Recognition",
                description: "AI-powered facial emotion analysis for personalized shopping experiences",
                color: "from-pink-500 to-red-500"
              },
              {
                title: "Smart Automation",
                description: "Blockchain smart contracts for automated purchasing and delivery processes",
                color: "from-green-500 to-blue-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg mb-4`}></div>
                <h3 className="text-xl font-semibold text-apple-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-apple-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedFeatures;
