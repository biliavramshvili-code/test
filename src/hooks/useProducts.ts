import { useState, useEffect } from 'react';
import { Product, ProductOption } from '../types';

// Enhanced mock data with customizable products
const mockProducts: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 999,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "The most advanced iPhone ever with titanium design, A17 Pro chip, and pro camera system.",
    category: "iPhone",
    features: ["A17 Pro Chip", "Pro Camera System", "Titanium Design", "USB-C", "Action Button"],
    specifications: {
      display: "6.1-inch Super Retina XDR",
      chip: "A17 Pro",
      camera: "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      battery: "Up to 23 hours video playback",
      storage: "128GB, 256GB, 512GB, 1TB",
      connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3"
    },
    customizable: true,
    options: [
      {
        id: "storage",
        name: "Storage",
        type: "storage",
        required: true,
        variants: [
          { id: "128gb", name: "128GB", price: 999, description: "Perfect for everyday use" },
          { id: "256gb", name: "256GB", price: 1099, description: "Great for photos and apps" },
          { id: "512gb", name: "512GB", price: 1299, description: "Ideal for pro workflows" },
          { id: "1tb", name: "1TB", price: 1499, description: "Maximum storage capacity" }
        ]
      },
      {
        id: "color",
        name: "Color",
        type: "color",
        required: true,
        variants: [
          { id: "natural", name: "Natural Titanium", price: 999 },
          { id: "blue", name: "Blue Titanium", price: 999 },
          { id: "white", name: "White Titanium", price: 999 },
          { id: "black", name: "Black Titanium", price: 999 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "MacBook Pro 14-inch",
    price: 1999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    description: "Supercharged by M3 Pro and M3 Max chips. Built for all types of creatives.",
    category: "Mac",
    features: ["M3 Pro/Max Chip", "Liquid Retina XDR Display", "Up to 22 hours battery", "Advanced Camera", "Six-speaker Sound"],
    specifications: {
      display: "14.2-inch Liquid Retina XDR",
      chip: "M3 Pro or M3 Max",
      memory: "18GB or 36GB unified memory",
      storage: "512GB to 8TB SSD",
      battery: "Up to 22 hours",
      ports: "3x Thunderbolt 4, HDMI, SDXC, MagSafe 3"
    },
    customizable: true,
    options: [
      {
        id: "chip",
        name: "Chip",
        type: "processor",
        required: true,
        variants: [
          { id: "m3-pro", name: "M3 Pro", price: 1999, description: "11-core CPU, 14-core GPU" },
          { id: "m3-max", name: "M3 Max", price: 3199, description: "14-core CPU, 30-core GPU" }
        ]
      },
      {
        id: "memory",
        name: "Memory",
        type: "memory",
        required: true,
        variants: [
          { id: "18gb", name: "18GB", price: 1999 },
          { id: "36gb", name: "36GB", price: 2399 },
          { id: "64gb", name: "64GB", price: 2799 },
          { id: "128gb", name: "128GB", price: 3599 }
        ]
      },
      {
        id: "storage",
        name: "Storage",
        type: "storage",
        required: true,
        variants: [
          { id: "512gb", name: "512GB SSD", price: 1999 },
          { id: "1tb", name: "1TB SSD", price: 2199 },
          { id: "2tb", name: "2TB SSD", price: 2599 },
          { id: "4tb", name: "4TB SSD", price: 3399 },
          { id: "8tb", name: "8TB SSD", price: 4999 }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "iPad Pro 12.9-inch",
    price: 1099,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "The ultimate iPad experience with M2 chip and Liquid Retina XDR display.",
    category: "iPad",
    features: ["M2 Chip", "Liquid Retina XDR", "Apple Pencil Support", "Magic Keyboard Compatible", "5G Capable"],
    specifications: {
      display: "12.9-inch Liquid Retina XDR",
      chip: "M2",
      camera: "12MP Wide, 10MP Ultra Wide",
      battery: "Up to 10 hours",
      connectivity: "Wi-Fi 6E, 5G (cellular models)"
    },
    customizable: true,
    options: [
      {
        id: "storage",
        name: "Storage",
        type: "storage",
        required: true,
        variants: [
          { id: "128gb", name: "128GB", price: 1099 },
          { id: "256gb", name: "256GB", price: 1199 },
          { id: "512gb", name: "512GB", price: 1399 },
          { id: "1tb", name: "1TB", price: 1799 },
          { id: "2tb", name: "2TB", price: 2399 }
        ]
      },
      {
        id: "connectivity",
        name: "Connectivity",
        type: "size",
        required: true,
        variants: [
          { id: "wifi", name: "Wi-Fi", price: 1099 },
          { id: "cellular", name: "Wi-Fi + Cellular", price: 1299 }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    price: 399,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "The most advanced Apple Watch yet with S9 chip and Double Tap gesture.",
    category: "Watch",
    features: ["S9 Chip", "Double Tap", "Precision Finding", "Crash Detection", "Water Resistant"],
    specifications: {
      display: "Always-On Retina LTPO OLED",
      chip: "S9 SiP",
      sensors: "ECG, Blood Oxygen, Temperature",
      battery: "Up to 18 hours",
      connectivity: "GPS, Cellular (optional)"
    },
    customizable: true,
    options: [
      {
        id: "size",
        name: "Size",
        type: "size",
        required: true,
        variants: [
          { id: "41mm", name: "41mm", price: 399 },
          { id: "45mm", name: "45mm", price: 429 }
        ]
      },
      {
        id: "connectivity",
        name: "Connectivity",
        type: "size",
        required: true,
        variants: [
          { id: "gps", name: "GPS", price: 399 },
          { id: "cellular", name: "GPS + Cellular", price: 499 }
        ]
      },
      {
        id: "band",
        name: "Band",
        type: "color",
        required: true,
        variants: [
          { id: "sport", name: "Sport Band", price: 399 },
          { id: "sport-loop", name: "Sport Loop", price: 399 },
          { id: "leather", name: "Leather Link", price: 449 },
          { id: "milanese", name: "Milanese Loop", price: 449 }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "AirPods Pro (2nd generation)",
    price: 249,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Adaptive Audio, Active Noise Cancellation, and Personalized Spatial Audio.",
    category: "AirPods",
    features: ["H2 Chip", "Adaptive Audio", "Active Noise Cancellation", "Spatial Audio", "MagSafe Charging"],
    specifications: {
      chip: "H2",
      battery: "Up to 6 hours listening time",
      charging: "MagSafe, Lightning, Qi wireless",
      features: "Active Noise Cancellation, Transparency mode"
    }
  },
  {
    id: 6,
    name: "Mac Studio",
    price: 1999,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Supercharged by M2 Max and M2 Ultra. Designed for pros.",
    category: "Mac",
    features: ["M2 Max/Ultra", "Extensive Connectivity", "Quiet Operation", "Compact Design"],
    specifications: {
      chip: "M2 Max or M2 Ultra",
      memory: "32GB to 192GB unified memory",
      storage: "512GB to 8TB SSD",
      ports: "Multiple Thunderbolt 4, USB-A, HDMI, Ethernet"
    },
    customizable: true,
    options: [
      {
        id: "chip",
        name: "Chip",
        type: "processor",
        required: true,
        variants: [
          { id: "m2-max", name: "M2 Max", price: 1999, description: "12-core CPU, 30-core GPU" },
          { id: "m2-ultra", name: "M2 Ultra", price: 3999, description: "24-core CPU, 60-core GPU" }
        ]
      }
    ]
  },
  {
    id: 7,
    name: "iMac 24-inch",
    price: 1299,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Strikingly thin design powered by M3 chip in vibrant colors.",
    category: "Mac",
    features: ["M3 Chip", "24-inch 4.5K Display", "1080p FaceTime HD Camera", "Six-Speaker System"],
    specifications: {
      display: "24-inch 4.5K Retina",
      chip: "M3",
      memory: "8GB to 24GB unified memory",
      storage: "256GB to 2TB SSD"
    },
    customizable: true,
    options: [
      {
        id: "color",
        name: "Color",
        type: "color",
        required: true,
        variants: [
          { id: "blue", name: "Blue", price: 1299 },
          { id: "green", name: "Green", price: 1299 },
          { id: "pink", name: "Pink", price: 1299 },
          { id: "silver", name: "Silver", price: 1299 },
          { id: "yellow", name: "Yellow", price: 1299 },
          { id: "orange", name: "Orange", price: 1299 },
          { id: "purple", name: "Purple", price: 1299 }
        ]
      }
    ]
  },
  {
    id: 8,
    name: "Apple TV 4K",
    price: 129,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "The Apple experience you love, now on your biggest screen.",
    category: "Apple TV",
    features: ["A15 Bionic Chip", "4K HDR", "Dolby Vision", "Dolby Atmos", "Siri Remote"],
    specifications: {
      chip: "A15 Bionic",
      video: "4K HDR, Dolby Vision",
      audio: "Dolby Atmos",
      storage: "64GB or 128GB"
    },
    customizable: true,
    options: [
      {
        id: "storage",
        name: "Storage",
        type: "storage",
        required: true,
        variants: [
          { id: "64gb", name: "64GB", price: 129 },
          { id: "128gb", name: "128GB", price: 149 }
        ]
      }
    ]
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = (id: number): Product | undefined => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    return products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  };

  const searchProducts = (query: string): Product[] => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.features?.some(feature => 
        feature.toLowerCase().includes(lowercaseQuery)
      )
    );
  };

  const getCategories = (): string[] => {
    const categories = products.map(product => product.category);
    return Array.from(new Set(categories));
  };

  return {
    products,
    loading,
    error,
    getProductById,
    getProductsByCategory,
    searchProducts,
    getCategories
  };
};

// Also export as useProduct for backward compatibility
export const useProduct = useProducts;
