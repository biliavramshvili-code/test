export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface ProductOption {
  id: string;
  name: string;
  type: 'memory' | 'storage' | 'color' | 'size' | 'processor';
  variants: ProductVariant[];
  required: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  gallery?: string[];
  description: string;
  category: string;
  features?: string[];
  specifications?: Record<string, string>;
  customizable?: boolean;
  options?: ProductOption[];
}

export interface ProductConfiguration {
  [optionId: string]: string; // variant id
}

export interface CartItem {
  product: Product;
  quantity: number;
  configuration?: ProductConfiguration;
  configuredPrice?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Review {
  id: string;
  userId: string;
  productId: number;
  rating: number;
  comment: string;
  createdAt: string;
}
