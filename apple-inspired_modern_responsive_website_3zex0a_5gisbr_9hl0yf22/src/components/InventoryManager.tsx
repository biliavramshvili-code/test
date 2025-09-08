import React, { useState } from 'react';
import { Package, AlertTriangle, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { products } from '../data/products';

const InventoryManager: React.FC = () => {
  const { inventory, loading, updateStock, getLowStockItems } = useInventory();
  const [editingStock, setEditingStock] = useState<{ [key: number]: string }>({});

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-apple-gray-200">
              <div className="h-4 bg-apple-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-apple-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-apple-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const lowStockItems = getLowStockItems();

  const getProductName = (productId: number) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : `Product ${productId}`;
  };

  const getStockStatus = (item: any) => {
    if (item.available <= 0) return { status: 'out-of-stock', color: 'text-red-600', bg: 'bg-red-100' };
    if (item.available <= item.lowStockThreshold) return { status: 'low-stock', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { status: 'in-stock', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const handleStockUpdate = (productId: number) => {
    const newStock = parseInt(editingStock[productId] || '0');
    if (newStock >= 0) {
      updateStock(productId, newStock);
      setEditingStock(prev => ({ ...prev, [productId]: '' }));
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-apple-gray-900">Inventory Management</h1>
          <p className="text-apple-gray-600 mt-1">Monitor and manage product stock levels</p>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-yellow-800">Low Stock Alert</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockItems.map((item) => (
              <div key={item.productId} className="bg-white rounded-lg p-4 border border-yellow-200">
                <h4 className="font-medium text-apple-gray-900">{getProductName(item.productId)}</h4>
                <p className="text-sm text-apple-gray-600">
                  Only {item.available} left in stock
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-apple-gray-900">
            {inventory.reduce((total, item) => total + item.available, 0)}
          </h3>
          <p className="text-apple-gray-600 text-sm">Total Available Stock</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <TrendingDown className="w-5 h-5 text-yellow-500" />
          </div>
          <h3 className="text-2xl font-bold text-apple-gray-900">
            {lowStockItems.length}
          </h3>
          <p className="text-apple-gray-600 text-sm">Low Stock Items</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-apple-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <RefreshCw className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-apple-gray-900">
            {inventory.reduce((total, item) => total + item.reserved, 0)}
          </h3>
          <p className="text-apple-gray-600 text-sm">Reserved Stock</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-apple-gray-200 overflow-hidden">
        <div className="p-6 border-b border-apple-gray-200">
          <h3 className="text-xl font-semibold text-apple-gray-900">Product Inventory</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-apple-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-apple-gray-700">Product</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-apple-gray-700">Total Stock</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-apple-gray-700">Available</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-apple-gray-700">Reserved</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-apple-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-apple-gray-700">Last Updated</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-apple-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-apple-gray-200">
              {inventory.map((item) => {
                const stockStatus = getStockStatus(item);
                return (
                  <tr key={item.productId} className="hover:bg-apple-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-apple-gray-900">
                        {getProductName(item.productId)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {editingStock[item.productId] !== undefined ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={editingStock[item.productId]}
                              onChange={(e) => setEditingStock(prev => ({
                                ...prev,
                                [item.productId]: e.target.value
                              }))}
                              className="w-20 px-2 py-1 border border-apple-gray-300 rounded text-sm"
                              min="0"
                            />
                            <button
                              onClick={() => handleStockUpdate(item.productId)}
                              className="px-2 py-1 bg-apple-blue-500 text-white rounded text-xs hover:bg-apple-blue-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingStock(prev => {
                                const newState = { ...prev };
                                delete newState[item.productId];
                                return newState;
                              })}
                              className="px-2 py-1 bg-apple-gray-300 text-apple-gray-700 rounded text-xs hover:bg-apple-gray-400"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span className="text-apple-gray-900">{item.stock}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-apple-gray-900">{item.available}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-apple-gray-600">{item.reserved}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                        {stockStatus.status === 'out-of-stock' && 'Out of Stock'}
                        {stockStatus.status === 'low-stock' && 'Low Stock'}
                        {stockStatus.status === 'in-stock' && 'In Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-apple-gray-600">
                      {formatDate(item.lastUpdated)}
                    </td>
                    <td className="px-6 py-4">
                      {editingStock[item.productId] === undefined && (
                        <button
                          onClick={() => setEditingStock(prev => ({
                            ...prev,
                            [item.productId]: item.stock.toString()
                          }))}
                          className="text-apple-blue-500 hover:text-apple-blue-600 text-sm font-medium"
                        >
                          Edit Stock
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryManager;
