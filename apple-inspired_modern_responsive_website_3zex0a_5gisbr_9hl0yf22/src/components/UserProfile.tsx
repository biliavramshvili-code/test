import React, { useState } from 'react';
import { User, Edit3, Save, X, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile, logout } = useAuth();
  const { addNotification } = useNotifications();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });

  const handleSave = async () => {
    const success = await updateProfile(formData);
    if (success) {
      addNotification({
        type: 'success',
        title: 'Profile updated',
        message: 'Your profile has been updated successfully.'
      });
      setIsEditing(false);
    } else {
      addNotification({
        type: 'error',
        title: 'Update failed',
        message: 'Failed to update profile. Please try again.'
      });
    }
  };

  const handleLogout = () => {
    logout();
    addNotification({
      type: 'info',
      title: 'Logged out',
      message: 'You have been logged out successfully.'
    });
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-apple-gray-200">
          <h2 className="text-2xl font-bold text-apple-gray-900">Profile</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-apple-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-apple-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-apple-gray-200 flex items-center justify-center overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-apple-gray-500" />
                )}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 bg-apple-blue-500 text-white p-2 rounded-full hover:bg-apple-blue-600 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              )}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-apple-gray-900">{user.name}</h3>
            <p className="text-apple-gray-600">{user.email}</p>
          </div>

          {/* Form Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent disabled:bg-apple-gray-50 disabled:text-apple-gray-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent disabled:bg-apple-gray-50 disabled:text-apple-gray-500 transition-colors"
              />
            </div>

            <div className="pt-4 space-y-3">
              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-apple-blue-500 text-white py-3 rounded-lg font-medium hover:bg-apple-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-3 border border-apple-gray-300 text-apple-gray-700 rounded-lg hover:bg-apple-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-apple-gray-100 text-apple-gray-700 py-3 rounded-lg font-medium hover:bg-apple-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
