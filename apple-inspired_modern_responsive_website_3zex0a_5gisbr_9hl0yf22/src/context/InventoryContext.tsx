import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

interface InventoryItem {
  productId: number;
  stock: number;
  reserved: number;
  lowStockThreshold: number;
  lastUpdated: Date;
}

interface InventoryContextType {
  inventory: Record<number, InventoryItem>;
  getStock: (productId: number) => number;
  reserveStock: (productId: number, quantity: number) => boolean;
  releaseStock: (productId: number, quantity: number) => void;
  updateStock: (productId: number, newStock: number) => void;
  isLowStock: (productId: number) => boolean;
  isOutOfStock: (productId: number) => boolean;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<Record<number, InventoryItem>>({});
  const { showNotification } = useNotification();

  // Initialize inventory with mock data
  useEffect(() => {
    const mockInventory: Record<number, InventoryItem> = {
      1: { productId: 1, stock: 15, reserved: 2, lowStockThreshold: 5, lastUpdated: new Date() },
      2: { productId: 2, stock: 25, reserved: 3, lowStockThreshold: 10, lastUpdated: new Date() },
      3: { productId: 3, stock: 8, reserved: 1, lowStockThreshold: 5, lastUpdated: new Date() },
      4: { productId: 4, stock: 30, reserved: 5, lowStockThreshold: 10, lastUpdated: new Date() },
      5: { productId: 5, stock: 2, reserved: 0, lowStockThreshold: 5, lastUpdated: new Date() },
      6: { productId: 6, stock: 12, reserved: 2, lowStockThreshold: 5, lastUpdated: new Date() },
    };
    
    setInventory(mockInventory);
  }, []);

  const getStock = (productId: number): number => {
    const item = inventory[productId];
    return item ? Math.max(0, item.stock - item.reserved) : 0;
  };

  const reserveStock = (productId: number, quantity: number): boolean => {
    const item = inventory[productId];
    if (!item) return false;

    const availableStock = item.stock - item.reserved;
    if (availableStock >= quantity) {
      setInventory(prev => ({
        ...prev,
        [productId]: {
          ...item,
          reserved: item.reserved + quantity,
          lastUpdated: new Date()
        }
      }));
      return true;
    }
    return false;
  };

  const releaseStock = (productId: number, quantity: number): void => {
    const item = inventory[productId];
    if (!item) return;

    setInventory(prev => ({
      ...prev,
      [productId]: {
        ...item,
        reserved: Math.max(0, item.reserved - quantity),
        lastUpdated: new Date()
      }
    }));
  };

  const updateStock = (productId: number, newStock: number): void => {
    const item = inventory[productId];
    if (!item) return;

    const wasLowStock = isLowStock(productId);
    const wasOutOfStock = isOutOfStock(productId);

    setInventory(prev => ({
      ...prev,
      [productId]: {
        ...item,
        stock: Math.max(0, newStock),
        lastUpdated: new Date()
      }
    }));

    // Show notifications for stock changes
    if (wasOutOfStock && newStock > 0) {
      showNotification(`Product ${productId} is back in stock!`, "success");
    } else if (!wasLowStock && newStock <= item.lowStockThreshold && newStock > 0) {
      showNotification(`Product ${productId} is running low on stock`, "warning");
    } else if (newStock === 0) {
      showNotification(`Product ${productId} is out of stock`, "error");
    }
  };

  const isLowStock = (productId: number): boolean => {
    const item = inventory[productId];
    if (!item) return false;
    const availableStock = item.stock - item.reserved;
    return availableStock <= item.lowStockThreshold && availableStock > 0;
  };

  const isOutOfStock = (productId: number): boolean => {
    const item = inventory[productId];
    if (!item) return true;
    return (item.stock - item.reserved) <= 0;
  };

  // Monitor inventory levels and send alerts
  useEffect(() => {
    const checkInventoryLevels = () => {
      Object.values(inventory).forEach(item => {
        if (isOutOfStock(item.productId)) {
          console.log(`Alert: Product ${item.productId} is out of stock`);
        } else if (isLowStock(item.productId)) {
          console.log(`Warning: Product ${item.productId} is low on stock`);
        }
      });
    };

    const interval = setInterval(checkInventoryLevels, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [inventory]);

  const value: InventoryContextType = {
    inventory,
    getStock,
    reserveStock,
    releaseStock,
    updateStock,
    isLowStock,
    isOutOfStock
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
