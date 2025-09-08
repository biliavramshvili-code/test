import React, { useState } from 'react';
import { Truck, MapPin, Clock, Package, Calculator, Route, Globe, Calendar, Settings, Plus, Edit, Trash2 } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  baseRate: number;
  freeShippingThreshold: number;
  estimatedDays: string;
  carriers: string[];
}

interface ShippingRate {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  weightMultiplier: number;
  dimensionMultiplier: number;
  deliveryTime: string;
  trackingIncluded: boolean;
  insuranceIncluded: boolean;
}

interface DeliverySchedule {
  id: string;
  customerName: string;
  address: string;
  timeSlot: string;
  status: 'scheduled' | 'in-transit' | 'delivered' | 'failed';
  driver: string;
  estimatedArrival: string;
}

const AdvancedShippingLogistics: React.FC = () => {
  const [shippingZones] = useState<ShippingZone[]>([
    {
      id: '1',
      name: 'Domestic (US)',
      countries: ['United States'],
      baseRate: 5.99,
      freeShippingThreshold: 50,
      estimatedDays: '2-5',
      carriers: ['USPS', 'UPS', 'FedEx']
    },
    {
      id: '2',
      name: 'North America',
      countries: ['Canada', 'Mexico'],
      baseRate: 12.99,
      freeShippingThreshold: 100,
      estimatedDays: '5-10',
      carriers: ['UPS', 'FedEx', 'DHL']
    },
    {
      id: '3',
      name: 'Europe',
      countries: ['United Kingdom', 'Germany', 'France', 'Italy', 'Spain'],
      baseRate: 19.99,
      freeShippingThreshold: 150,
      estimatedDays: '7-14',
      carriers: ['DHL', 'FedEx', 'UPS']
    },
    {
      id: '4',
      name: 'Asia Pacific',
      countries: ['Japan', 'Australia', 'Singapore', 'South Korea'],
      baseRate: 24.99,
      freeShippingThreshold: 200,
      estimatedDays: '10-21',
      carriers: ['DHL', 'FedEx']
    }
  ]);

  const [shippingRates] = useState<ShippingRate[]>([
    {
      id: '1',
      name: 'Standard Shipping',
      description: 'Regular delivery with tracking',
      basePrice: 5.99,
      weightMultiplier: 0.5,
      dimensionMultiplier: 0.1,
      deliveryTime: '5-7 business days',
      trackingIncluded: true,
      insuranceIncluded: false
    },
    {
      id: '2',
      name: 'Express Shipping',
      description: 'Fast delivery with priority handling',
      basePrice: 12.99,
      weightMultiplier: 0.8,
      dimensionMultiplier: 0.15,
      deliveryTime: '2-3 business days',
      trackingIncluded: true,
      insuranceIncluded: true
    },
    {
      id: '3',
      name: 'Overnight Shipping',
      description: 'Next business day delivery',
      basePrice: 24.99,
      weightMultiplier: 1.2,
      dimensionMultiplier: 0.25,
      deliveryTime: '1 business day',
      trackingIncluded: true,
      insuranceIncluded: true
    },
    {
      id: '4',
      name: 'Same Day Delivery',
      description: 'Delivery within hours (select areas)',
      basePrice: 19.99,
      weightMultiplier: 1.0,
      dimensionMultiplier: 0.2,
      deliveryTime: '2-6 hours',
      trackingIncluded: true,
      insuranceIncluded: true
    }
  ]);

  const [deliverySchedules] = useState<DeliverySchedule[]>([
    {
      id: '1',
      customerName: 'John Smith',
      address: '123 Main St, New York, NY 10001',
      timeSlot: '9:00 AM - 12:00 PM',
      status: 'scheduled',
      driver: 'Mike Johnson',
      estimatedArrival: '2024-01-16T10:30:00Z'
    },
    {
      id: '2',
      customerName: 'Sarah Davis',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      timeSlot: '2:00 PM - 5:00 PM',
      status: 'in-transit',
      driver: 'Tom Wilson',
      estimatedArrival: '2024-01-16T15:15:00Z'
    },
    {
      id: '3',
      customerName: 'Robert Brown',
      address: '789 Pine St, Chicago, IL 60601',
      timeSlot: '10:00 AM - 1:00 PM',
      status: 'delivered',
      driver: 'Lisa Chen',
      estimatedArrival: '2024-01-15T11:45:00Z'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'zones' | 'rates' | 'schedule' | 'tracking'>('zones');
  const [calculatorData, setCalculatorData] = useState({
    weight: '',
    length: '',
    width: '',
    height: '',
    destination: '',
    value: ''
  });
  const { showNotification } = useNotification();

  const calculateShipping = () => {
    if (!calculatorData.weight || !calculatorData.destination) {
      showNotification('Please fill in weight and destination', 'error');
      return;
    }

    const weight = parseFloat(calculatorData.weight);
    const zone = shippingZones.find(z => z.name.toLowerCase().includes(calculatorData.destination.toLowerCase()));
    
    if (!zone) {
      showNotification('Destination not found in shipping zones', 'error');
      return;
    }

    const rates = shippingRates.map(rate => ({
      ...rate,
      calculatedPrice: rate.basePrice + (weight * rate.weightMultiplier)
    }));

    showNotification(`Shipping rates calculated for ${zone.name}`, 'success');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'in-transit': return 'bg-yellow-100 text-yellow-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-apple-gray-900">Advanced Shipping & Logistics</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Route className="w-4 h-4" />
            <span>Optimize Routes</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
            <Settings className="w-4 h-4" />
            <span>Logistics Settings</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-apple-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'zones', name: 'Shipping Zones', icon: <Globe className="w-4 h-4" /> },
            { id: 'rates', name: 'Shipping Rates', icon: <Calculator className="w-4 h-4" /> },
            { id: 'schedule', name: 'Delivery Schedule', icon: <Calendar className="w-4 h-4" /> },
            { id: 'tracking', name: 'Real-time Tracking', icon: <MapPin className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-apple-blue-500 text-apple-blue-600'
                  : 'border-transparent text-apple-gray-500 hover:text-apple-gray-700'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'zones' && (
        <div className="space-y-6">
          {/* Shipping Calculator */}
          <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Shipping Rate Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-1">Weight (lbs)</label>
                <input
                  type="number"
                  value={calculatorData.weight}
                  onChange={(e) => setCalculatorData({...calculatorData, weight: e.target.value})}
                  className="w-full px-3 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                  placeholder="Enter weight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-1">Destination</label>
                <select
                  value={calculatorData.destination}
                  onChange={(e) => setCalculatorData({...calculatorData, destination: e.target.value})}
                  className="w-full px-3 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                >
                  <option value="">Select destination</option>
                  {shippingZones.map(zone => (
                    <option key={zone.id} value={zone.name}>{zone.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={calculateShipping}
                  className="w-full px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
                >
                  Calculate Rates
                </button>
              </div>
            </div>
          </div>

          {/* Shipping Zones */}
          <div className="bg-white rounded-xl border border-apple-gray-200">
            <div className="p-6 border-b border-apple-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-apple-gray-900">Shipping Zones</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Add Zone</span>
              </button>
            </div>
            <div className="divide-y divide-apple-gray-200">
              {shippingZones.map((zone) => (
                <div key={zone.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-apple-gray-900">{zone.name}</h4>
                        <span className="bg-apple-blue-100 text-apple-blue-700 px-2 py-1 rounded-full text-sm">
                          {zone.countries.length} countries
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {zone.countries.map((country, index) => (
                          <span
                            key={index}
                            className="bg-apple-gray-100 text-apple-gray-700 px-2 py-1 rounded text-sm"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-apple-gray-500">Base Rate</p>
                          <p className="font-semibold text-apple-gray-900">${zone.baseRate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-apple-gray-500">Free Shipping</p>
                          <p className="font-semibold text-apple-gray-900">${zone.freeShippingThreshold}+</p>
                        </div>
                        <div>
                          <p className="text-sm text-apple-gray-500">Delivery Time</p>
                          <p className="font-semibold text-apple-gray-900">{zone.estimatedDays} days</p>
                        </div>
                        <div>
                          <p className="text-sm text-apple-gray-500">Carriers</p>
                          <p className="font-semibold text-apple-gray-900">{zone.carriers.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-apple-gray-500 hover:text-apple-gray-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rates' && (
        <div className="bg-white rounded-xl border border-apple-gray-200">
          <div className="p-6 border-b border-apple-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-apple-gray-900">Shipping Rate Options</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Rate</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-apple-gray-50 border-b border-apple-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                    Shipping Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                    Base Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                    Delivery Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-apple-gray-200">
                {shippingRates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-apple-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-apple-gray-900">{rate.name}</div>
                        <div className="text-sm text-apple-gray-500">{rate.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-apple-gray-900">
                      ${rate.basePrice}
                    </td>
                    <td className="px-6 py-4 text-sm text-apple-gray-900">
                      {rate.deliveryTime}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {rate.trackingIncluded && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Tracking
                          </span>
                        )}
                        {rate.insuranceIncluded && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            Insurance
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-apple-gray-500 hover:text-apple-gray-700">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-red-500 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="space-y-6">
          {/* Delivery Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Scheduled Today</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {deliverySchedules.filter(d => d.status === 'scheduled').length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">In Transit</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {deliverySchedules.filter(d => d.status === 'in-transit').length}
                  </p>
                </div>
                <Truck className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">
                    {deliverySchedules.filter(d => d.status === 'delivered').length}
                  </p>
                </div>
                <Package className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">On-Time Rate</p>
                  <p className="text-2xl font-bold text-purple-600">94%</p>
                </div>
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Delivery Schedule */}
          <div className="bg-white rounded-xl border border-apple-gray-200">
            <div className="p-6 border-b border-apple-gray-200">
              <h3 className="text-lg font-semibold text-apple-gray-900">Today's Delivery Schedule</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-apple-gray-50 border-b border-apple-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Time Slot
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Driver
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      ETA
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-apple-gray-200">
                  {deliverySchedules.map((delivery) => (
                    <tr key={delivery.id} className="hover:bg-apple-gray-50">
                      <td className="px-6 py-4 font-medium text-apple-gray-900">
                        {delivery.customerName}
                      </td>
                      <td className="px-6 py-4 text-sm text-apple-gray-900">
                        {delivery.address}
                      </td>
                      <td className="px-6 py-4 text-sm text-apple-gray-900">
                        {delivery.timeSlot}
                      </td>
                      <td className="px-6 py-4 text-sm text-apple-gray-900">
                        {delivery.driver}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                          {delivery.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-apple-gray-900">
                        {new Date(delivery.estimatedArrival).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tracking' && (
        <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
          <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Real-time Package Tracking</h3>
          <p className="text-apple-gray-600">Real-time tracking interface with GPS integration, delivery notifications, and customer communication would be implemented here.</p>
        </div>
      )}
    </div>
  );
};

export default AdvancedShippingLogistics;
