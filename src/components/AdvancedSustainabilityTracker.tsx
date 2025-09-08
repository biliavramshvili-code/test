import React, { useState, useEffect } from 'react';
import { Leaf, Recycle, Zap, Droplets, TreePine, Award, TrendingDown, Globe, Factory, Wind, Sun, Battery } from 'lucide-react';
import { motion } from 'framer-motion';

interface SustainabilityMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  target: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface CarbonFootprint {
  category: string;
  emissions: number;
  reduction: number;
  color: string;
}

interface SustainabilityGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: string;
  deadline: string;
  status: 'on-track' | 'at-risk' | 'completed';
}

const AdvancedSustainabilityTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState<SustainabilityMetric[]>([
    {
      name: 'Carbon Footprint',
      value: 2.4,
      unit: 'tons CO₂',
      trend: 'down',
      target: 2.0,
      icon: Factory,
      color: 'text-red-500'
    },
    {
      name: 'Renewable Energy',
      value: 78,
      unit: '% renewable',
      trend: 'up',
      target: 100,
      icon: Sun,
      color: 'text-yellow-500'
    },
    {
      name: 'Water Usage',
      value: 1250,
      unit: 'liters/day',
      trend: 'down',
      target: 1000,
      icon: Droplets,
      color: 'text-blue-500'
    },
    {
      name: 'Waste Reduction',
      value: 85,
      unit: '% recycled',
      trend: 'up',
      target: 95,
      icon: Recycle,
      color: 'text-green-500'
    },
    {
      name: 'Energy Efficiency',
      value: 92,
      unit: '% efficient',
      trend: 'up',
      target: 98,
      icon: Zap,
      color: 'text-purple-500'
    },
    {
      name: 'Green Transport',
      value: 65,
      unit: '% electric',
      trend: 'up',
      target: 80,
      icon: Battery,
      color: 'text-emerald-500'
    }
  ]);

  const [carbonFootprint] = useState<CarbonFootprint[]>([
    { category: 'Transportation', emissions: 0.8, reduction: 15, color: '#ef4444' },
    { category: 'Energy Consumption', emissions: 0.6, reduction: 25, color: '#f97316' },
    { category: 'Manufacturing', emissions: 0.5, reduction: 12, color: '#eab308' },
    { category: 'Packaging', emissions: 0.3, reduction: 30, color: '#22c55e' },
    { category: 'Waste Management', emissions: 0.2, reduction: 40, color: '#06b6d4' }
  ]);

  const [sustainabilityGoals] = useState<SustainabilityGoal[]>([
    {
      id: '1',
      title: 'Carbon Neutral Operations',
      description: 'Achieve net-zero carbon emissions across all operations',
      progress: 78,
      target: '100% carbon neutral',
      deadline: '2025-12-31',
      status: 'on-track'
    },
    {
      id: '2',
      title: 'Renewable Energy Transition',
      description: 'Switch to 100% renewable energy sources',
      progress: 85,
      target: '100% renewable',
      deadline: '2024-06-30',
      status: 'on-track'
    },
    {
      id: '3',
      title: 'Circular Economy Implementation',
      description: 'Implement circular economy principles in product lifecycle',
      progress: 45,
      target: '95% circular',
      deadline: '2026-03-31',
      status: 'at-risk'
    },
    {
      id: '4',
      title: 'Sustainable Supply Chain',
      description: 'Ensure 100% sustainable sourcing across supply chain',
      progress: 92,
      target: '100% sustainable',
      deadline: '2024-09-30',
      status: 'on-track'
    }
  ]);

  const [impactScore, setImpactScore] = useState(0);

  useEffect(() => {
    // Calculate overall sustainability impact score
    const totalProgress = sustainabilityGoals.reduce((sum, goal) => sum + goal.progress, 0);
    const avgProgress = totalProgress / sustainabilityGoals.length;
    setImpactScore(Math.round(avgProgress));
  }, [sustainabilityGoals]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'text-green-600 bg-green-100';
      case 'at-risk': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingDown className="w-4 h-4 text-green-500 rotate-180" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Impact Score */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Sustainability Impact Score</h3>
            <p className="text-green-100">Overall environmental performance rating</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{impactScore}</div>
            <div className="text-green-100">out of 100</div>
          </div>
        </div>
        <div className="mt-6 bg-white bg-opacity-20 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${impactScore}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-white rounded-full h-3"
          />
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          const progressPercentage = (metric.value / metric.target) * 100;
          
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${metric.color}`} />
                {getTrendIcon(metric.trend)}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{metric.name}</h4>
              <div className="flex items-baseline space-x-2 mb-3">
                <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                <span className="text-sm text-gray-600">{metric.unit}</span>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{Math.min(progressPercentage, 100).toFixed(0)}%</span>
                </div>
                <div className="bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                    className={`h-2 rounded-full ${
                      progressPercentage >= 100 ? 'bg-green-500' :
                      progressPercentage >= 75 ? 'bg-blue-500' :
                      progressPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">Target: {metric.target} {metric.unit}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  const renderCarbonFootprint = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Carbon Footprint Breakdown</h3>
        <div className="space-y-4">
          {carbonFootprint.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{item.category}</h4>
                  <p className="text-sm text-gray-600">{item.emissions} tons CO₂</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  <span className="text-green-600 font-semibold">{item.reduction}%</span>
                </div>
                <p className="text-xs text-gray-500">reduction</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Carbon Offset Programs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <TreePine className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Forest Restoration</h4>
            <p className="text-sm text-gray-600 mb-3">Supporting reforestation projects worldwide</p>
            <div className="text-2xl font-bold text-green-600">1,250</div>
            <p className="text-xs text-gray-500">trees planted</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <Wind className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Renewable Energy</h4>
            <p className="text-sm text-gray-600 mb-3">Investing in wind and solar projects</p>
            <div className="text-2xl font-bold text-blue-600">500</div>
            <p className="text-xs text-gray-500">MWh generated</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGoals = () => (
    <div className="space-y-6">
      {sustainabilityGoals.map((goal, index) => (
        <motion.div
          key={goal.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{goal.title}</h3>
              <p className="text-gray-600 mb-3">{goal.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Target: {goal.target}</span>
                <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
              {goal.status.replace('-', ' ')}
            </span>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{goal.progress}%</span>
            </div>
            <div className="bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${goal.progress}%` }}
                transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                className={`h-3 rounded-full ${
                  goal.status === 'completed' ? 'bg-blue-500' :
                  goal.status === 'on-track' ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Advanced Sustainability Tracker</h1>
            <p className="text-gray-600">Comprehensive environmental impact monitoring and optimization</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg p-1">
          {[
            { id: 'overview', name: 'Overview', icon: Globe },
            { id: 'carbon', name: 'Carbon Footprint', icon: Factory },
            { id: 'goals', name: 'Sustainability Goals', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-500 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'carbon' && renderCarbonFootprint()}
        {activeTab === 'goals' && renderGoals()}
      </motion.div>
    </div>
  );
};

export default AdvancedSustainabilityTracker;
