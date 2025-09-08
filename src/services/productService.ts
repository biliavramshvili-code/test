import { supabase, getTableName } from '../lib/supabase';
import { Product, ProductOption } from '../types';

// Mock data for when Supabase is not configured
const mockProducts: Product[] = [
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
    },
    options: [
      {
        id: "macbook-processor",
        name: "Chip",
        type: "processor",
        required: true,
        variants: [
          { id: "m2-pro", name: "Apple M2 Pro with 12-core CPU, 19-core GPU", price: 0 },
          { id: "m2-max", name: "Apple M2 Max with 12-core CPU, 30-core GPU", price: 500 }
        ]
      },
      {
        id: "macbook-memory",
        name: "Memory",
        type: "memory",
        required: true,
        variants: [
          { id: "16gb", name: "16GB unified memory", price: 0 },
          { id: "32gb", name: "32GB unified memory", price: 400 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The ultimate iPhone with titanium design, A17 Pro chip, and the most advanced camera system ever.",
    category: "Smartphones",
    customizable: true,
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
    },
    options: [
      {
        id: "iphone-storage",
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
        id: "iphone-color",
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
    ]
  },
  {
    id: 3,
    name: "iPad Pro 12.9-inch",
    price: 1099,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The most advanced iPad ever, with M2 chip performance and stunning Liquid Retina XDR display.",
    category: "Tablets",
    customizable: true,
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
    },
    options: [
      {
        id: "ipad-storage",
        name: "Storage",
        type: "storage",
        required: true,
        variants: [
          { id: "128gb", name: "128GB", price: 0 },
          { id: "256gb", name: "256GB", price: 100 },
          { id: "512gb", name: "512GB", price: 300 },
          { id: "1tb", name: "1TB", price: 500 }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    price: 399,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "The most advanced Apple Watch yet, with new health features and the powerful S9 chip.",
    category: "Wearables",
    customizable: false,
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
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Immersive sound with active noise cancellation and spatial audio for the ultimate listening experience.",
    category: "Audio",
    customizable: false,
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
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Extraordinary performance and connectivity in an incredibly compact design with M2 Max or M2 Ultra.",
    category: "Desktops",
    customizable: true,
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
    },
    options: [
      {
        id: "studio-processor",
        name: "Chip",
        type: "processor",
        required: true,
        variants: [
          { id: "m2-max", name: "Apple M2 Max with 12-core CPU, 30-core GPU", price: 0 },
          { id: "m2-ultra", name: "Apple M2 Ultra with 24-core CPU, 60-core GPU", price: 2000 }
        ]
      }
    ]
  }
];

export interface DatabaseProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  category: string;
  customizable: boolean;
  features: string[];
  specifications: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface DatabaseProductOption {
  id: string;
  product_id: number;
  name: string;
  type: string;
  required: boolean;
  created_at: string;
}

export interface DatabaseProductVariant {
  id: string;
  option_id: string;
  name: string;
  price: number;
  description?: string;
  created_at: string;
}

// Get all products with their options and variants
export const getProducts = async (): Promise<Product[]> => {
  // Always return mock data for now to avoid network issues
  console.log('Using mock product data - Supabase connection bypassed');
  return new Promise(resolve => {
    setTimeout(() => resolve(mockProducts), 300); // Simulate API delay
  });

  // Commented out Supabase code to prevent network errors
  /*
  // If Supabase is not configured, return mock data
  if (!supabase) {
    console.log('Using mock product data');
    return new Promise(resolve => {
      setTimeout(() => resolve(mockProducts), 500); // Simulate API delay
    });
  }

  try {
    // Fetch products
    const { data: products, error: productsError } = await supabase
      .from(getTableName('products'))
      .select('*')
      .order('created_at', { ascending: false });

    if (productsError) throw productsError;

    if (!products || products.length === 0) {
      return mockProducts; // Fallback to mock data
    }

    // Fetch options for all products
    const { data: options, error: optionsError } = await supabase
      .from(getTableName('product_options'))
      .select('*')
      .in('product_id', products.map(p => p.id));

    if (optionsError) throw optionsError;

    // Fetch variants for all options
    const optionIds = options?.map(o => o.id) || [];
    const { data: variants, error: variantsError } = await supabase
      .from(getTableName('product_variants'))
      .select('*')
      .in('option_id', optionIds);

    if (variantsError) throw variantsError;

    // Transform data to match frontend types
    return products.map((product: DatabaseProduct): Product => {
      const productOptions = options?.filter(o => o.product_id === product.id) || [];
      
      const transformedOptions: ProductOption[] = productOptions.map(option => {
        const optionVariants = variants?.filter(v => v.option_id === option.id) || [];
        
        return {
          id: option.id,
          name: option.name,
          type: option.type as any,
          required: option.required,
          variants: optionVariants.map(variant => ({
            id: variant.id,
            name: variant.name,
            price: Number(variant.price),
            description: variant.description
          }))
        };
      });

      return {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        gallery: product.gallery || [],
        description: product.description,
        category: product.category,
        customizable: product.customizable,
        features: product.features || [],
        specifications: product.specifications || {},
        options: transformedOptions.length > 0 ? transformedOptions : undefined
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return mockProducts; // Fallback to mock data
  }
  */
};

// Get a single product by ID
export const getProductById = async (id: number): Promise<Product | null> => {
  // Always use mock data for now
  const product = mockProducts.find(p => p.id === id);
  return new Promise(resolve => {
    setTimeout(() => resolve(product || null), 200);
  });

  // Commented out Supabase code
  /*
  // If Supabase is not configured, return mock data
  if (!supabase) {
    const product = mockProducts.find(p => p.id === id);
    return new Promise(resolve => {
      setTimeout(() => resolve(product || null), 300);
    });
  }

  try {
    const { data: product, error: productError } = await supabase
      .from(getTableName('products'))
      .select('*')
      .eq('id', id)
      .single();

    if (productError) throw productError;
    if (!product) {
      // Fallback to mock data
      return mockProducts.find(p => p.id === id) || null;
    }

    // Fetch options for this product
    const { data: options, error: optionsError } = await supabase
      .from(getTableName('product_options'))
      .select('*')
      .eq('product_id', id);

    if (optionsError) throw optionsError;

    // Fetch variants for all options
    const optionIds = options?.map(o => o.id) || [];
    let variants: DatabaseProductVariant[] = [];
    
    if (optionIds.length > 0) {
      const { data: variantsData, error: variantsError } = await supabase
        .from(getTableName('product_variants'))
        .select('*')
        .in('option_id', optionIds);

      if (variantsError) throw variantsError;
      variants = variantsData || [];
    }

    // Transform data to match frontend types
    const transformedOptions: ProductOption[] = options?.map(option => {
      const optionVariants = variants.filter(v => v.option_id === option.id);
      
      return {
        id: option.id,
        name: option.name,
        type: option.type as any,
        required: option.required,
        variants: optionVariants.map(variant => ({
          id: variant.id,
          name: variant.name,
          price: Number(variant.price),
          description: variant.description
        }))
      };
    }) || [];

    return {
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      gallery: product.gallery || [],
      description: product.description,
      category: product.category,
      customizable: product.customizable,
      features: product.features || [],
      specifications: product.specifications || {},
      options: transformedOptions.length > 0 ? transformedOptions : undefined
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return mockProducts.find(p => p.id === id) || null;
  }
  */
};

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  // Always use mock data for now
  const filtered = mockProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );
  return new Promise(resolve => {
    setTimeout(() => resolve(filtered), 200);
  });

  // Commented out Supabase code
  /*
  // If Supabase is not configured, use mock data
  if (!supabase) {
    const filtered = mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    return new Promise(resolve => {
      setTimeout(() => resolve(filtered), 300);
    });
  }

  try {
    const { data: products, error } = await supabase
      .from(getTableName('products'))
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!products || products.length === 0) {
      // Fallback to mock data search
      return mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
    }

    // For search results, we'll return simplified products without options
    return products.map((product: DatabaseProduct): Product => ({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      gallery: product.gallery || [],
      description: product.description,
      category: product.category,
      customizable: product.customizable,
      features: product.features || [],
      specifications: product.specifications || {}
    }));
  } catch (error) {
    console.error('Error searching products:', error);
    // Fallback to mock data search
    return mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
  }
  */
};

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  // Always use mock data for now
  const filtered = mockProducts.filter(product => product.category === category);
  return new Promise(resolve => {
    setTimeout(() => resolve(filtered), 200);
  });

  // Commented out Supabase code
  /*
  // If Supabase is not configured, use mock data
  if (!supabase) {
    const filtered = mockProducts.filter(product => product.category === category);
    return new Promise(resolve => {
      setTimeout(() => resolve(filtered), 300);
    });
  }

  try {
    const { data: products, error } = await supabase
      .from(getTableName('products'))
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!products || products.length === 0) {
      return mockProducts.filter(product => product.category === category);
    }

    // For category results, we'll return simplified products without options
    return products.map((product: DatabaseProduct): Product => ({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      gallery: product.gallery || [],
      description: product.description,
      category: product.category,
      customizable: product.customizable,
      features: product.features || [],
      specifications: product.specifications || {}
    }));
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return mockProducts.filter(product => product.category === category);
  }
  */
};

// Get all categories
export const getCategories = async (): Promise<string[]> => {
  // Always use mock data for now
  const categories = [...new Set(mockProducts.map(p => p.category))];
  return new Promise(resolve => {
    setTimeout(() => resolve(categories), 100);
  });

  // Commented out Supabase code
  /*
  // If Supabase is not configured, use mock data
  if (!supabase) {
    const categories = [...new Set(mockProducts.map(p => p.category))];
    return new Promise(resolve => {
      setTimeout(() => resolve(categories), 200);
    });
  }

  try {
    const { data: products, error } = await supabase
      .from(getTableName('products'))
      .select('category')
      .order('category');

    if (error) throw error;

    const categories = [...new Set(products?.map(p => p.category) || [])];
    
    if (categories.length === 0) {
      return [...new Set(mockProducts.map(p => p.category))];
    }
    
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [...new Set(mockProducts.map(p => p.category))];
  }
  */
};
