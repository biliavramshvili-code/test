import React, { createContext, useContext, useState, useCallback } from 'react';
import { CartItem } from '../types';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    type: 'card' | 'paypal' | 'apple_pay';
    last4?: string;
  };
  trackingNumber?: string;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (items: CartItem[], shippingAddress: Order['shippingAddress'], paymentMethod: Order['paymentMethod']) => Promise<string>;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  cancelOrder: (id: string) => Promise<boolean>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = useCallback(async (
    items: CartItem[], 
    shippingAddress: Order['shippingAddress'], 
    paymentMethod: Order['paymentMethod']
  ): Promise<string> => {
    const orderId = `ORD-${Date.now()}`;
    const total = items.reduce((sum, item) => sum + (item.configuredPrice || item.product.price) * item.quantity, 0);
    
    const newOrder: Order = {
      id: orderId,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      shippingAddress,
      paymentMethod,
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };

    setOrders(prev => [newOrder, ...prev]);
    
    // Simulate order processing
    setTimeout(() => {
      updateOrderStatus(orderId, 'processing');
    }, 2000);

    return orderId;
  }, []);

  const getOrder = useCallback((id: string) => {
    return orders.find(order => order.id === id);
  }, [orders]);

  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === id 
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    ));
  }, []);

  const cancelOrder = useCallback(async (id: string): Promise<boolean> => {
    const order = orders.find(o => o.id === id);
    if (!order || order.status === 'shipped' || order.status === 'delivered') {
      return false;
    }

    updateOrderStatus(id, 'cancelled');
    return true;
  }, [orders, updateOrderStatus]);

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      getOrder,
      updateOrderStatus,
      cancelOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};
