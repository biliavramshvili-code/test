import React, { useState, useEffect } from 'react';
import { Shield, Link, Coins, FileText, CheckCircle, AlertCircle, Clock, Users } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BlockchainTransaction {
  id: string;
  type: 'purchase' | 'warranty' | 'authenticity' | 'loyalty';
  hash: string;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'failed';
  gasUsed: number;
  value: number;
  productId?: string;
  customerId: string;
}

interface NFTAsset {
  id: string;
  name: string;
  description: string;
  image: string;
  owner: string;
  mintDate: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  attributes: { trait: string; value: string }[];
}

interface SmartContract {
  address: string;
  name: string;
  type: 'warranty' | 'loyalty' | 'authenticity' | 'payment';
  status: 'active' | 'paused' | 'deprecated';
  transactions: number;
  gasOptimization: number;
}

const BlockchainIntegration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'transactions' | 'nft' | 'contracts' | 'analytics'>('transactions');
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [nftAssets, setNftAssets] = useState<NFTAsset[]>([]);
  const [contracts, setContracts] = useState<SmartContract[]>([]);
  const [blockchainStats, setBlockchainStats] = useState({
    totalTransactions: 0,
    gasOptimization: 0,
    securityScore: 0,
    networkHealth: 0
  });

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    // Simulate blockchain data loading
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockTransactions: BlockchainTransaction[] = [
      {
        id: '1',
        type: 'purchase',
        hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
        timestamp: '2024-01-15T10:30:00Z',
        status: 'confirmed',
        gasUsed: 21000,
        value: 1299,
        productId: 'iphone-15-pro',
        customerId: 'user123'
      },
      {
        id: '2',
        type: 'warranty',
        hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef123a',
        timestamp: '2024-01-15T11:15:00Z',
        status: 'confirmed',
        gasUsed: 45000,
        value: 0,
        productId: 'macbook-pro-m3',
        customerId: 'user456'
      },
      {
        id: '3',
        type: 'loyalty',
        hash: '0x3c4d5e6f7890abcdef1234567890abcdef123a2b',
        timestamp: '2024-01-15T12:00:00Z',
        status: 'pending',
        gasUsed: 0,
        value: 50,
        customerId: 'user789'
      }
    ];

    const mockNFTs: NFTAsset[] = [
      {
        id: 'nft-001',
        name: 'Apple Store VIP Membership',
        description: 'Exclusive VIP membership with premium benefits',
        image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300',
        owner: 'user123',
        mintDate: '2024-01-10T00:00:00Z',
        rarity: 'legendary',
        attributes: [
          { trait: 'Tier', value: 'Platinum' },
          { trait: 'Benefits', value: 'Unlimited' },
          { trait: 'Valid Until', value: '2025-01-10' }
        ]
      },
      {
        id: 'nft-002',
        name: 'iPhone 15 Pro Authenticity Certificate',
        description: 'Digital certificate proving product authenticity',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
        owner: 'user456',
        mintDate: '2024-01-12T00:00:00Z',
        rarity: 'rare',
        attributes: [
          { trait: 'Product', value: 'iPhone 15 Pro' },
          { trait: 'Serial', value: 'F2LLD***' },
          { trait: 'Warranty', value: '2 Years' }
        ]
      }
    ];

    const mockContracts: SmartContract[] = [
      {
        address: '0xabcdef1234567890abcdef1234567890abcdef12',
        name: 'Product Warranty Contract',
        type: 'warranty',
        status: 'active',
        transactions: 1247,
        gasOptimization: 85
      },
      {
        address: '0xbcdef1234567890abcdef1234567890abcdef123',
        name: 'Loyalty Points Contract',
        type: 'loyalty',
        status: 'active',
        transactions: 3456,
        gasOptimization: 92
      },
      {
        address: '0xcdef1234567890abcdef1234567890abcdef1234',
        name: 'Authenticity Verification',
        type: 'authenticity',
        status: 'active',
        transactions: 892,
        gasOptimization: 78
      }
    ];

    setTransactions(mockTransactions);
    setNftAssets(mockNFTs);
    setContracts(mockContracts);
    setBlockchainStats({
      totalTransactions: 5595,
      gasOptimization: 85,
      securityScore: 98,
      networkHealth: 99
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'epic': return 'bg-gradient-to-r from-purple-400 to-pink-500';
      case 'rare': return 'bg-gradient-to-r from-blue-400 to-cyan-500';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  };

  const chartData = [
    { name: 'Jan', transactions: 400, gas: 2400 },
    { name: 'Feb', transactions: 300, gas: 1398 },
    { name: 'Mar', transactions: 200, gas: 9800 },
    { name: 'Apr', transactions: 278, gas: 3908 },
    { name: 'May', transactions: 189, gas: 4800 },
    { name: 'Jun', transactions: 239, gas: 3800 }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blockchain Integration</h1>
        <p className="text-gray-600">Secure, transparent, and decentralized commerce operations</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Link className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12.5%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{blockchainStats.totalTransactions.toLocaleString()}</h3>
          <p className="text-gray-600">Total Transactions</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Coins className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+8.3%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{blockchainStats.gasOptimization}%</h3>
          <p className="text-gray-600">Gas Optimization</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">Excellent</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{blockchainStats.securityScore}%</h3>
          <p className="text-gray-600">Security Score</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">Optimal</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{blockchainStats.networkHealth}%</h3>
          <p className="text-gray-600">Network Health</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'transactions', label: 'Transactions', icon: Link },
          { id: 'nft', label: 'NFT Assets', icon: FileText },
          { id: 'contracts', label: 'Smart Contracts', icon: Shield },
          { id: 'analytics', label: 'Analytics', icon: Coins }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
              activeTab === id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Blockchain Transactions</h3>
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(tx.status)}
                    <div>
                      <h4 className="font-semibold text-gray-900 capitalize">{tx.type} Transaction</h4>
                      <p className="text-sm text-gray-600">Hash: {tx.hash}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${tx.value}</p>
                    <p className="text-sm text-gray-600">{tx.gasUsed.toLocaleString()} gas</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className={`ml-2 capitalize ${
                      tx.status === 'confirmed' ? 'text-green-600' :
                      tx.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Timestamp:</span>
                    <span className="ml-2 text-gray-900">
                      {new Date(tx.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Customer:</span>
                    <span className="ml-2 text-gray-900">{tx.customerId}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NFT Assets Tab */}
      {activeTab === 'nft' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-2">NFT Marketplace</h2>
            <p className="opacity-90">Digital assets and certificates for enhanced customer experience</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nftAssets.map((nft) => (
              <div key={nft.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={nft.image} alt={nft.name} className="w-full h-48 object-cover" />
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold text-white ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity.toUpperCase()}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{nft.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{nft.description}</p>
                  <div className="space-y-2 mb-4">
                    {nft.attributes.map((attr, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">{attr.trait}:</span>
                        <span className="font-medium text-gray-900">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Owner: {nft.owner}</span>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Smart Contracts Tab */}
      {activeTab === 'contracts' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Smart Contract Management</h3>
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div key={contract.address} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{contract.name}</h4>
                    <p className="text-sm text-gray-600">Address: {contract.address}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      contract.status === 'active' ? 'bg-green-100 text-green-800' :
                      contract.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {contract.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{contract.transactions.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Total Transactions</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{contract.gasOptimization}%</p>
                    <p className="text-sm text-gray-600">Gas Optimization</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 capitalize">{contract.type}</p>
                    <p className="text-sm text-gray-600">Contract Type</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Blockchain Analytics</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Transaction Volume</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="transactions" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Gas Usage Optimization</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="gas" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Security Level</h4>
              <p className="text-3xl font-bold text-blue-600 mb-2">Enterprise</p>
              <p className="text-sm text-gray-600">256-bit encryption with multi-sig</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <Coins className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Cost Efficiency</h4>
              <p className="text-3xl font-bold text-green-600 mb-2">85%</p>
              <p className="text-sm text-gray-600">Gas optimization achieved</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <Link className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h4 className="font-bold text-gray-900 mb-2">Network Status</h4>
              <p className="text-3xl font-bold text-purple-600 mb-2">Optimal</p>
              <p className="text-sm text-gray-600">99.9% uptime maintained</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainIntegration;
