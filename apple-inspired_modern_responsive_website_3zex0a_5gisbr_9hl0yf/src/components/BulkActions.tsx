import React, { useState } from 'react';
import { Check, Trash2, Archive, Tag, Download, MoreHorizontal } from 'lucide-react';

interface BulkActionsProps {
  selectedItems: string[];
  totalItems: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBulkDelete: (ids: string[]) => void;
  onBulkArchive?: (ids: string[]) => void;
  onBulkTag?: (ids: string[], tag: string) => void;
  onBulkExport?: (ids: string[]) => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedItems,
  totalItems,
  onSelectAll,
  onClearSelection,
  onBulkDelete,
  onBulkArchive,
  onBulkTag,
  onBulkExport
}) => {
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagValue, setTagValue] = useState('');
  const [showMoreActions, setShowMoreActions] = useState(false);

  const handleBulkTag = () => {
    if (tagValue.trim() && onBulkTag) {
      onBulkTag(selectedItems, tagValue.trim());
      setTagValue('');
      setShowTagInput(false);
    }
  };

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-2xl shadow-lg border border-apple-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-apple-blue-500 rounded flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-apple-gray-900">
                {selectedItems.length} selected
              </span>
            </div>

            <button
              onClick={selectedItems.length === totalItems ? onClearSelection : onSelectAll}
              className="text-sm text-apple-blue-500 hover:text-apple-blue-600 transition-colors"
            >
              {selectedItems.length === totalItems ? 'Deselect all' : 'Select all'}
            </button>
          </div>

          <div className="h-6 w-px bg-apple-gray-300" />

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onBulkDelete(selectedItems)}
              className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm">Delete</span>
            </button>

            {onBulkArchive && (
              <button
                onClick={() => onBulkArchive(selectedItems)}
                className="flex items-center space-x-1 px-3 py-2 text-apple-gray-600 hover:bg-apple-gray-50 rounded-lg transition-colors"
              >
                <Archive className="w-4 h-4" />
                <span className="text-sm">Archive</span>
              </button>
            )}

            {onBulkTag && (
              <div className="relative">
                <button
                  onClick={() => setShowTagInput(!showTagInput)}
                  className="flex items-center space-x-1 px-3 py-2 text-apple-gray-600 hover:bg-apple-gray-50 rounded-lg transition-colors"
                >
                  <Tag className="w-4 h-4" />
                  <span className="text-sm">Tag</span>
                </button>

                {showTagInput && (
                  <div className="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg border border-apple-gray-200 p-3 min-w-48">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tagValue}
                        onChange={(e) => setTagValue(e.target.value)}
                        placeholder="Enter tag..."
                        className="flex-1 px-3 py-2 border border-apple-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && handleBulkTag()}
                      />
                      <button
                        onClick={handleBulkTag}
                        className="px-3 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors text-sm"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {onBulkExport && (
              <button
                onClick={() => onBulkExport(selectedItems)}
                className="flex items-center space-x-1 px-3 py-2 text-apple-gray-600 hover:bg-apple-gray-50 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Export</span>
              </button>
            )}

            <div className="relative">
              <button
                onClick={() => setShowMoreActions(!showMoreActions)}
                className="p-2 text-apple-gray-600 hover:bg-apple-gray-50 rounded-lg transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {showMoreActions && (
                <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border border-apple-gray-200 py-2 min-w-32">
                  <button className="w-full px-4 py-2 text-left text-sm text-apple-gray-700 hover:bg-apple-gray-50 transition-colors">
                    Duplicate
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-apple-gray-700 hover:bg-apple-gray-50 transition-colors">
                    Move to folder
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-apple-gray-700 hover:bg-apple-gray-50 transition-colors">
                    Change status
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;
