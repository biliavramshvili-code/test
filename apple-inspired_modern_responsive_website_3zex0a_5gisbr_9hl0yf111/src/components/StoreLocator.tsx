import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, X } from 'lucide-react';

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  distance: string;
  services: string[];
  image: string;
}

interface StoreLocatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const StoreLocator: React.FC<StoreLocatorProps> = ({ isOpen, onClose }) => {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const stores: Store[] = [
    {
      id: "1",
      name: "Apple Store Fifth Avenue",
      address: "767 5th Ave, New York, NY 10153",
      phone: "(212) 336-1440",
      hours: "Mon-Sun: 8:00 AM - 10:00 PM",
      distance: "0.5 miles",
      services: ["Genius Bar", "Today at Apple", "Personal Setup"],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "2", 
      name: "Apple Store SoHo",
      address: "103 Prince St, New York, NY 10012",
      phone: "(212) 226-3126",
      hours: "Mon-Sun: 10:00 AM - 9:00 PM",
      distance: "1.2 miles",
      services: ["Genius Bar", "Today at Apple", "Business"],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "3",
      name: "Apple Store Brooklyn",
      address: "123 Flatbush Ave, Brooklyn, NY 11217", 
      phone: "(718) 246-3900",
      hours: "Mon-Sun: 10:00 AM - 8:00 PM",
      distance: "3.8 miles",
      services: ["Genius Bar", "Today at Apple"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-apple-gray-200">
          <h2 className="text-2xl font-bold text-apple-gray-900">Find a Store</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-apple-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[600px]">
          {/* Store List */}
          <div className="w-1/2 border-r border-apple-gray-200 overflow-y-auto">
            {/* Search */}
            <div className="p-6 border-b border-apple-gray-200">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-apple-gray-400" />
                <input
                  type="text"
                  placeholder="Enter city, state, or zip code"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-apple-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-apple-blue-500"
                />
              </div>
            </div>

            {/* Store List */}
            <div className="p-4 space-y-4">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedStore?.id === store.id
                      ? 'border-apple-blue-500 bg-apple-blue-50'
                      : 'border-apple-gray-200 hover:border-apple-gray-300'
                  }`}
                  onClick={() => setSelectedStore(store)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-apple-gray-900">{store.name}</h3>
                    <span className="text-sm text-apple-gray-500">{store.distance}</span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-apple-gray-600">
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{store.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{store.hours}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {store.services.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-apple-gray-100 text-apple-gray-700 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map/Details */}
          <div className="w-1/2 bg-apple-gray-50">
            {selectedStore ? (
              <div className="h-full flex flex-col">
                {/* Store Image */}
                <div className="h-48 relative">
                  <img
                    src={selectedStore.image}
                    alt={selectedStore.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{selectedStore.name}</h3>
                  </div>
                </div>

                {/* Store Details */}
                <div className="flex-1 p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-apple-gray-900 mb-2">Address</h4>
                      <p className="text-apple-gray-600">{selectedStore.address}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-apple-gray-900 mb-2">Phone</h4>
                      <p className="text-apple-gray-600">{selectedStore.phone}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-apple-gray-900 mb-2">Hours</h4>
                      <p className="text-apple-gray-600">{selectedStore.hours}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-apple-gray-900 mb-2">Services</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStore.services.map((service) => (
                          <span
                            key={service}
                            className="px-3 py-1 bg-apple-blue-100 text-apple-blue-700 text-sm rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <button className="w-full flex items-center justify-center px-4 py-3 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
                      <Navigation className="w-5 h-5 mr-2" />
                      Get Directions
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-3 border border-apple-gray-300 text-apple-gray-700 rounded-lg hover:bg-apple-gray-50 transition-colors">
                      <Phone className="w-5 h-5 mr-2" />
                      Call Store
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-apple-gray-300 mx-auto mb-4" />
                  <p className="text-apple-gray-500">Select a store to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreLocator;
