export const products = [
  {
    id: 1,
    name: "MacBook Pro 16-inch",
    price: 2499,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The most powerful MacBook Pro ever, with the M2 Pro chip for exceptional performance and all-day battery life.",
    category: "Laptops",
    customizable: true,
    options: [
      {
        id: "processor",
        name: "Chip",
        type: "processor",
        required: true,
        variants: [
          { id: "m2-pro", name: "Apple M2 Pro with 12-core CPU, 19-core GPU", price: 0 },
          { id: "m2-max", name: "Apple M2 Max with 12-core CPU, 30-core GPU", price: 500 },
          { id: "m2-max-38", name: "Apple M2 Max with 12-core CPU, 38-core GPU", price: 800 }
        ]
      },
      {
        id: "memory",
        name: "Memory",
        type: "memory",
        required: true,
        variants: [
          { id: "16gb", name: "16GB unified memory", price: 0 },
          { id: "32gb", name: "32GB unified memory", price: 400 },
          { id: "64gb", name: "64GB unified memory", price: 800 },
          { id: "96gb", name: "96GB unified memory", price: 1200 }
        ]
      },
      {
        id: "storage",
        name: "Storage",
        type: "storage",
        required: true,
        variants: [
          { id: "512gb", name: "512GB SSD storage", price: 0 },
          { id: "1tb", name: "1TB SSD storage", price: 200 },
          { id: "2tb", name: "2TB SSD storage", price: 600 },
          { id: "4tb", name: "4TB SSD storage", price: 1200 },
          { id: "8tb", name: "8TB SSD storage", price: 2400 }
        ]
      },
      {
        id: "color",
        name: "Color",
        type: "color",
        required: true,
        variants: [
          { id: "space-gray", name: "Space Gray", price: 0 },
          { id: "silver", name: "Silver", price: 0 }
        ]
      }
    ],
    features: [
      "M2 Pro chip with 12-core CPU",
      "19-core GPU",
      "16GB unified memory",
      "512GB SSD storage",
      "16-inch Liquid Retina XDR display"
    ],
    specifications: {
      "Display": "16-inch Liquid Retina XDR",
      "Chip": "Apple M2 Pro",
      "Memory": "16GB unified memory",
      "Storage": "512GB SSD",
      "Battery": "Up to 22 hours"
    }
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The ultimate iPhone with titanium design, A17 Pro chip, and the most advanced camera system ever.",
    category: "Smartphones",
    customizable: true,
    options: [
      {
        id: "storage",
        name: "Storage",
        type: "storage",
        required: true,
        variants: [
          { id: "128gb", name: "128GB", price: 0 },
          { id: "256gb", name: "256GB", price: 100 },
          { id: "512gb", name: "512GB", price: 300 },
          { id: "1tb", name: "1TB", price: 500 }
        ]
      },
      {
        id: "color",
        name: "Color",
        type: "color",
        required: true,
        variants: [
          { id: "natural-titanium", name: "Natural Titanium", price: 0 },
          { id: "blue-titanium", name: "Blue Titanium", price: 0 },
          { id: "white-titanium", name: "White Titanium", price: 0 },
          { id: "black-titanium", name: "Black Titanium", price: 0 }
        ]
      }
    ],
    features: [
      "A17 Pro chip",
      "Titanium design",
      "48MP Main camera",
      "Action Button",
      "USB-C connector"
    ],
    specifications: {
      "Display": "6.1-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Camera": "48MP Main, 12MP Ultra Wide",
      "Storage": "128GB",
      "Material": "Titanium"
    }
  },
  {
    id: 3,
    name: "iPad Pro 12.9-inch",
    price: 1099,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The most advanced iPad ever, with M2 chip performance and stunning Liquid Retina XDR display.",
    category: "Tablets",
    customizable: true,
    options: [
      {
        id: "storage",
        name: "Storage",
        type: "storage",
        required: true,
        variants: [
          { id: "128gb", name: "128GB", price: 0 },
          { id: "256gb", name: "256GB", price: 100 },
          { id: "512gb", name: "512GB", price: 300 },
          { id: "1tb", name: "1TB", price: 500 },
          { id: "2tb", name: "2TB", price: 900 }
        ]
      },
      {
        id: "connectivity",
        name: "Connectivity",
        type: "size",
        required: true,
        variants: [
          { id: "wifi", name: "Wi-Fi", price: 0 },
          { id: "wifi-cellular", name: "Wi-Fi + Cellular", price: 200 }
        ]
      },
      {
        id: "color",
        name: "Color",
        type: "color",
        required: true,
        variants: [
          { id: "space-gray", name: "Space Gray", price: 0 },
          { id: "silver", name: "Silver", price: 0 }
        ]
      }
    ],
    features: [
      "M2 chip",
      "12.9-inch Liquid Retina XDR display",
      "12MP cameras",
      "Apple Pencil support",
      "Magic Keyboard compatible"
    ],
    specifications: {
      "Display": "12.9-inch Liquid Retina XDR",
      "Chip": "Apple M2",
      "Storage": "128GB",
      "Camera": "12MP Wide, 10MP Ultra Wide",
      "Connectivity": "Wi-Fi 6E, 5G"
    }
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    price: 399,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1510017098667-27dfc7150acb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The most advanced Apple Watch yet, with new health features and the powerful S9 chip.",
    category: "Wearables",
    features: [
      "S9 chip",
      "Always-On Retina display",
      "Blood oxygen monitoring",
      "ECG capability",
      "Water resistant to 50 meters"
    ],
    specifications: {
      "Display": "Always-On Retina LTPO OLED",
      "Chip": "S9 SiP",
      "Case Size": "45mm",
      "Battery": "Up to 18 hours",
      "Connectivity": "GPS + Cellular"
    }
  },
  {
    id: 5,
    name: "AirPods Pro (2nd generation)",
    price: 249,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Immersive sound with active noise cancellation and spatial audio for the ultimate listening experience.",
    category: "Audio",
    features: [
      "Active Noise Cancellation",
      "Transparency mode",
      "Spatial Audio",
      "H2 chip",
      "Up to 6 hours listening time"
    ],
    specifications: {
      "Chip": "Apple H2",
      "Battery": "Up to 6 hours (ANC on)",
      "Case Battery": "Up to 30 hours total",
      "Connectivity": "Bluetooth 5.3",
      "Water Resistance": "IPX4"
    }
  },
  {
    id: 6,
    name: "Mac Studio",
    price: 1999,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Extraordinary performance and connectivity in an incredibly compact design with M2 Max or M2 Ultra.",
    category: "Desktops",
    customizable: true,
    options: [
      {
        id: "processor",
        name: "Chip",
        type: "processor",
        required: true,
        variants: [
          { id: "m2-max", name: "Apple M2 Max with 12-core CPU, 30-core GPU", price: 0 },
          { id: "m2-ultra", name: "Apple M2 Ultra with 24-core CPU, 60-core GPU", price: 2000 }
        ]
      },
      {
        id: "memory",
        name: "Memory",
        type: "memory",
        required: true,
        variants: [
          { id: "32gb", name: "32GB unified memory", price: 0 },
          { id: "64gb", name: "64GB unified memory", price: 400 },
          { id: "128gb", name: "128GB unified memory", price: 800 }
        ]
      },
      {
        id: "storage",
        name: "Storage",
        type: "storage",
        required: true,
        variants: [
          { id: "512gb", name: "512GB SSD storage", price: 0 },
          { id: "1tb", name: "1TB SSD storage", price: 200 },
          { id: "2tb", name: "2TB SSD storage", price: 600 },
          { id: "4tb", name: "4TB SSD storage", price: 1200 },
          { id: "8tb", name: "8TB SSD storage", price: 2400 }
        ]
      }
    ],
    features: [
      "M2 Max chip",
      "32GB unified memory",
      "512GB SSD storage",
      "Extensive connectivity",
      "Compact design"
    ],
    specifications: {
      "Chip": "Apple M2 Max",
      "Memory": "32GB unified memory",
      "Storage": "512GB SSD",
      "Ports": "4x Thunderbolt 4, 2x USB-A",
      "Dimensions": "7.7 x 3.7 inches"
    }
  },
  {
    id: 7,
    name: "Studio Display",
    price: 1599,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "A 27-inch 5K Retina display with exceptional color accuracy and a built-in camera for video calls.",
    category: "Displays",
    features: [
      "27-inch 5K Retina display",
      "12MP Ultra Wide camera",
      "Six-speaker sound system",
      "Three USB-C ports",
      "Height-adjustable stand"
    ],
    specifications: {
      "Display": "27-inch 5K Retina",
      "Resolution": "5120 x 2880",
      "Brightness": "600 nits",
      "Camera": "12MP Ultra Wide",
      "Audio": "Six-speaker system"
    }
  },
  {
    id: 8,
    name: "Magic Keyboard",
    price: 99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515378791036-0648a814c963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Wireless keyboard with scissor mechanism for comfortable and precise typing experience.",
    category: "Accessories",
    features: [
      "Scissor mechanism",
      "Wireless connectivity",
      "Rechargeable battery",
      "Numeric keypad",
      "Touch ID (select models)"
    ],
    specifications: {
      "Connectivity": "Bluetooth",
      "Battery": "Up to 1 month",
      "Compatibility": "Mac, iPad",
      "Layout": "Full-size with numeric keypad",
      "Color": "Silver and Space Gray"
    }
  }
];
