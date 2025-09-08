import React, { useState } from 'react';
import { Package, ArrowLeft, CheckCircle, Clock, XCircle, Camera, FileText, Truck } from 'lucide-react';

interface ReturnRequest {
  id: string;
  orderId: string;
  productId: number;
  productName: string;
  productImage: string;
  reason: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
  requestDate: string;
  refundAmount: number;
  trackingNumber?: string;
  estimatedRefund?: string;
}

const ReturnRefundSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('returns');
  const [showCreateReturn, setShowCreateReturn] = useState(false);
  
  const [returnRequests, setReturnRequests] = useState<ReturnRequest[]>([
    {
      id: "RET001",
      orderId: "ORD123456",
      productId: 1,
      productName: "iPhone 15 Pro",
      productImage: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      reason: "defective",
      description: "Screen has dead pixels in the upper right corner",
      status: "approved",
      requestDate: "2024-01-20",
      refundAmount: 999.00,
      trackingNumber: "1Z999AA1234567890",
      estimatedRefund: "2024-01-30"
    },
    {
      id: "RET002",
      orderId: "ORD123457",
      productId: 2,
      productName: "MacBook Pro 16-inch",
      productImage: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      reason: "not-as-described",
      description: "Performance not meeting expectations for video editing",
      status: "pending",
      requestDate: "2024-01-22",
      refundAmount: 2499.00
    }
  ]);

  const [newReturn, setNewReturn] = useState({
    orderId: '',
    productId: 0,
    reason: '',
    description: '',
    photos: [] as File[]
  });

  const returnReasons = [
    { id: 'defective', name: 'Defective/Damaged' },
    { id: 'not-as-described', name: 'Not as Described' },
    { id: 'wrong-item', name: 'Wrong Item Received' },
    { id: 'changed-mind', name: 'Changed Mind' },
    { id: 'compatibility', name: 'Compatibility Issues' },
    { id: 'quality', name: 'Quality Issues' },
    { id: 'other', name: 'Other' }
  ];

  const getStatusIcon = (status: ReturnRequest['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'approved': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'processing': return <Package className="w-5 h-5 text-blue-500" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      default: return <Clock className="w-5 h-5 text-apple-gray-400" />;
    }
  };

  const getStatusColor = (status: ReturnRequest['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'approved': return 'text-green-600 bg-green-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-green-700 bg-green-100';
      default: return 'text-apple-gray-600 bg-apple-gray-50';
    }
  };

  const handlePhotoUpload = (files: FileList | null) => {
    if (files) {
      const newPhotos = Array.from(files);
      setNewReturn(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos].slice(0, 5) // Max 5 photos
      }));
    }
  };

  const submitReturnRequest = () => {
    const request: ReturnRequest = {
      id: `RET${String(returnRequests.length + 1).padStart(3, '0')}`,
      orderId: newReturn.orderId,
      productId: newReturn.productId,
      productName: "Selected Product", // Would be fetched based on productId
      productImage: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      reason: newReturn.reason,
      description: newReturn.description,
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      refundAmount: 999.00 // Would be calculated based on product
    };

    setReturnRequests([request, ...returnRequests]);
    setNewReturn({ orderId: '', productId: 0, reason: '', description: '', photos: [] });
    setShowCreateReturn(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-apple-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-apple-gray-900">Returns & Refunds</h2>
            <p className="text-apple-gray-600">Manage your return requests and track refunds</p>
          </div>
          <button
            onClick={() => setShowCreateReturn(true)}
            className="flex items-center space-x-2 px-6 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Request Return</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-apple-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-apple-gray-900">
              {returnRequests.length}
            </div>
            <div className="text-sm text-apple-gray-600">Total Returns</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {returnRequests.filter(r => r.status === 'pending').length}
            </div>
            <div className="text-sm text-apple-gray-600">Pending</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {returnRequests.filter(r => r.status === 'approved').length}
            </div>
            <div className="text-sm text-apple-gray-600">Approved</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              ${returnRequests.reduce((total, r) => 
                r.status === 'completed' ? total + r.refundAmount : total, 0
              ).toFixed(2)}
            </div>
            <div className="text-sm text-apple-gray-600">Refunded</div>
          </div>
        </div>
      </div>

      {/* Return Requests List */}
      <div className="space-y-4">
        {returnRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl p-6 border border-apple-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={request.productImage}
                  alt={request.productName}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-apple-gray-900">{request.productName}</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-apple-gray-600">
                      Return ID: {request.id}
                    </span>
                    <span className="text-sm text-apple-gray-600">
                      Order: {request.orderId}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    {getStatusIcon(request.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-apple-gray-900">
                  ${request.refundAmount.toFixed(2)}
                </div>
                <div className="text-sm text-apple-gray-600">Refund Amount</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-apple-gray-900 mb-1">Reason</h4>
                <p className="text-sm text-apple-gray-600">
                  {returnReasons.find(r => r.id === request.reason)?.name || request.reason}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-apple-gray-900 mb-1">Request Date</h4>
                <p className="text-sm text-apple-gray-600">{request.requestDate}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-apple-gray-900 mb-1">Description</h4>
              <p className="text-sm text-apple-gray-600">{request.description}</p>
            </div>

            {/* Tracking Information */}
            {request.trackingNumber && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Return Shipping</h4>
                </div>
                <p className="text-sm text-blue-700">
                  Tracking Number: {request.trackingNumber}
                </p>
                {request.estimatedRefund && (
                  <p className="text-sm text-blue-700">
                    Estimated Refund: {request.estimatedRefund}
                  </p>
                )}
              </div>
            )}

            {/* Status-specific Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-apple-gray-200">
              <div className="flex items-center space-x-2">
                {request.status === 'approved' && !request.trackingNumber && (
                  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    Print Return Label
                  </button>
                )}
                {request.trackingNumber && (
                  <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                    Track Package
                  </button>
                )}
              </div>
              <div className="text-sm text-apple-gray-500">
                {request.status === 'pending' && 'Awaiting review'}
                {request.status === 'approved' && 'Ready for return'}
                {request.status === 'processing' && 'Processing refund'}
                {request.status === 'completed' && 'Refund completed'}
                {request.status === 'rejected' && 'Return denied'}
              </div>
            </div>
          </div>
        ))}

        {returnRequests.length === 0 && (
          <div className="bg-white rounded-xl p-12 border border-apple-gray-200 text-center">
            <Package className="w-16 h-16 text-apple-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-apple-gray-900 mb-2">No Return Requests</h3>
            <p className="text-apple-gray-600 mb-6">
              You haven't submitted any return requests yet.
            </p>
          </div>
        )}
      </div>

      {/* Create Return Modal */}
      {showCreateReturn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-apple-gray-900">Request Return</h3>
              <button
                onClick={() => setShowCreateReturn(false)}
                className="p-2 text-apple-gray-400 hover:text-apple-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Order ID */}
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  value={newReturn.orderId}
                  onChange={(e) => setNewReturn(prev => ({ ...prev, orderId: e.target.value }))}
                  placeholder="Enter your order ID"
                  className="w-full px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                />
              </div>

              {/* Return Reason */}
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                  Reason for Return
                </label>
                <select
                  value={newReturn.reason}
                  onChange={(e) => setNewReturn(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                >
                  <option value="">Select a reason</option>
                  {returnReasons.map(reason => (
                    <option key={reason.id} value={reason.id}>
                      {reason.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newReturn.description}
                  onChange={(e) => setNewReturn(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Please provide details about the issue..."
                  rows={4}
                  className="w-full px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                  Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-apple-gray-300 rounded-lg p-6 text-center">
                  <Camera className="w-8 h-8 text-apple-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-apple-gray-600 mb-2">
                    Upload photos to help us understand the issue
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(e.target.files)}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors cursor-pointer"
                  >
                    Choose Photos
                  </label>
                  {newReturn.photos.length > 0 && (
                    <p className="text-sm text-apple-gray-600 mt-2">
                      {newReturn.photos.length} photo(s) selected
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-apple-gray-200">
                <button
                  onClick={() => setShowCreateReturn(false)}
                  className="px-6 py-2 bg-apple-gray-200 text-apple-gray-700 rounded-lg hover:bg-apple-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitReturnRequest}
                  disabled={!newReturn.orderId || !newReturn.reason || !newReturn.description}
                  className="px-6 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnRefundSystem;
