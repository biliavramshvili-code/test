import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Truck, 
  Factory, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Leaf,
  Shield,
  Thermometer,
  Zap,
  Globe
} from 'lucide-react';

interface SupplyChainStep {
  id: string;
  title: string;
  location: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'pending' | 'delayed';
  description: string;
  temperature?: number;
  humidity?: number;
  carbonFootprint: number;
  certifications: string[];
  estimatedArrival?: string;
}

interface Shipment {
  id: string;
  productName: string;
  orderId: string;
  currentLocation: string;
  progress: number;
  steps: SupplyChainStep[];
  sustainabilityScore: number;
  totalCarbonFootprint: number;
  estimatedDelivery: string;
}

const SupplyChainTracker: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  useEffect(() => {
    // Simulate supply chain data
    const mockShipments: Shipment[] = [
      {
        id: 'SH001',
        productName: 'iPhone 15 Pro Max',
        orderId: 'ORD-2024-001',
        currentLocation: 'Distribution Center - California',
        progress: 75,
        sustainabilityScore: 92,
        totalCarbonFootprint: 2.4,
        estimatedDelivery: '2024-01-18T14:00:00Z',
        steps: [
          {
            id: '1',
            title: 'Manufacturing',
            location: 'Foxconn Factory - Shenzhen, China',
            timestamp: '2024-01-10T08:00:00Z',
            status: 'completed',
            description: 'Device assembled with premium materials',
            temperature: 22,
            humidity: 45,
            carbonFootprint: 0.8,
            certifications: ['ISO 14001', 'RoHS Compliant', 'Fair Trade']
          },
          {
            id: '2',
            title: 'Quality Control',
            location: 'Apple QC Center - Shenzhen, China',
            timestamp: '2024-01-11T10:30:00Z',
            status: 'completed',
            description: 'Passed all quality and performance tests',
            temperature: 20,
            humidity: 40,
            carbonFootprint: 0.1,
            certifications: ['Apple Certified', 'CE Marking']
          },
          {
            id: '3',
            title: 'International Shipping',
            location: 'Cargo Ship - Pacific Ocean',
            timestamp: '2024-01-12T16:00:00Z',
            status: 'completed',
            description: 'Eco-friendly sea freight transport',
            carbonFootprint: 0.3,
            certifications: ['Green Shipping', 'Carbon Neutral']
          },
          {
            id: '4',
            title: 'Port Processing',
            location: 'Port of Los Angeles - USA',
            timestamp: '2024-01-15T09:00:00Z',
            status: 'completed',
            description: 'Customs cleared and processed',
            carbonFootprint: 0.2,
            certifications: ['Customs Approved', 'FDA Cleared']
          },
          {
            id: '5',
            title: 'Distribution Center',
            location: 'Apple Distribution - California',
            timestamp: '2024-01-16T11:00:00Z',
            status: 'in-progress',
            description: 'Preparing for final delivery',
            temperature: 18,
            humidity: 35,
            carbonFootprint: 0.1,
            certifications: ['Warehouse Certified'],
            estimatedArrival: '2024-01-17T15:00:00Z'
          },
          {
            id: '6',
            title: 'Local Delivery',
            location: 'Your Address',
            timestamp: '',
            status: 'pending',
            description: 'Final mile delivery via electric vehicle',
            carbonFootprint: 0.9,
            certifications: ['Electric Delivery', 'Carbon Neutral'],
            estimatedArrival: '2024-01-18T14:00:00Z'
          }
        ]
      }
    ];

    setShipments(mockShipments);
    setSelectedShipment(mockShipments[0].id);
    setLoading(false);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    if (!realTimeUpdates) return;

    const interval = setInterval(() => {
      setShipments(prev => prev.map(shipment => ({
        ...shipment,
        progress: Math.min(shipment.progress + Math.random() * 2, 100),
        currentLocation: shipment.progress > 80 ? 'Out for Delivery' : shipment.currentLocation
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />;
      case 'delayed': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'manufacturing': return <Factory className="w-5 h-5" />;
      case 'quality control': return <Shield className="w-5 h-5" />;
      case 'international shipping': return <Globe className="w-5 h-5" />;
      case 'port processing': return <Package className="w-5 h-5" />;
      case 'distribution center': return <Package className="w-5 h-5" />;
      case 'local delivery': return <Truck className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const selectedShipmentData = shipments.find(s => s.id === selectedShipment);

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Supply Chain Tracker</h1>
          <p className="text-gray-600">Real-time visibility into your product journey</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setRealTimeUpdates(!realTimeUpdates)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              realTimeUpdates 
                ? 'bg-green-100 text-green-700' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Real-time Updates</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipment List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Active Shipments</h2>
          {shipments.map(shipment => (
            <motion.div
              key={shipment.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedShipment(shipment.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                selectedShipment === shipment.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{shipment.productName}</h3>
                  <p className="text-sm text-gray-600">{shipment.orderId}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-blue-600">{shipment.progress}%</div>
                  <div className="text-xs text-gray-500">Complete</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${shipment.progress}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{shipment.currentLocation}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Leaf className="w-4 h-4 text-green-500" />
                  <span className="text-green-600">{shipment.sustainabilityScore}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Tracking */}
        <div className="lg:col-span-2 space-y-6">
          {selectedShipmentData && (
            <>
              {/* Shipment Overview */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedShipmentData.productName}</h2>
                    <p className="text-gray-600">Order ID: {selectedShipmentData.orderId}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{selectedShipmentData.progress}%</div>
                    <div className="text-sm text-gray-500">Complete</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <Leaf className="w-5 h-5 text-green-500" />
                      <span className="font-medium text-green-700">Sustainability</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600">{selectedShipmentData.sustainabilityScore}%</div>
                    <div className="text-sm text-green-600">Eco-friendly journey</div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-blue-700">Carbon Footprint</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-600">{selectedShipmentData.totalCarbonFootprint}kg</div>
                    <div className="text-sm text-blue-600">CO₂ equivalent</div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-purple-500" />
                      <span className="font-medium text-purple-700">Delivery</span>
                    </div>
                    <div className="text-lg font-bold text-purple-600">
                      {new Date(selectedShipmentData.estimatedDelivery).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-purple-600">Estimated arrival</div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${selectedShipmentData.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Journey Timeline */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Journey Timeline</h3>
                <div className="space-y-6">
                  {selectedShipmentData.steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        step.status === 'completed' ? 'bg-green-100' :
                        step.status === 'in-progress' ? 'bg-blue-100' :
                        step.status === 'delayed' ? 'bg-red-100' :
                        'bg-gray-100'
                      }`}>
                        {getStepIcon(step.title)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{step.title}</h4>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(step.status)}
                            <span className="text-sm text-gray-500">
                              {step.timestamp ? new Date(step.timestamp).toLocaleString() : 'Pending'}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{step.location}</span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{step.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm">
                          {step.temperature && (
                            <div className="flex items-center space-x-1">
                              <Thermometer className="w-4 h-4 text-blue-400" />
                              <span className="text-gray-600">{step.temperature}°C</span>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-1">
                            <Leaf className="w-4 h-4 text-green-400" />
                            <span className="text-gray-600">{step.carbonFootprint}kg CO₂</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {step.certifications.map(cert => (
                              <span key={cert} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {step.estimatedArrival && step.status === 'pending' && (
                          <div className="mt-2 text-sm text-blue-600">
                            Expected: {new Date(step.estimatedArrival).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplyChainTracker;
