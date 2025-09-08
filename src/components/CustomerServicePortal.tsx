import React, { useState } from 'react';
import { MessageSquare, User, Clock, CheckCircle, AlertCircle, Search, Filter, Plus, Eye, Edit, Archive } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

interface SupportTicket {
  id: string;
  ticketNumber: string;
  customer: {
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  responses: number;
}

interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  views: number;
  helpful: number;
  notHelpful: number;
  createdAt: string;
  updatedAt: string;
}

const CustomerServicePortal: React.FC = () => {
  const [tickets] = useState<SupportTicket[]>([
    {
      id: '1',
      ticketNumber: 'TKT-2024-001',
      customer: {
        name: 'John Smith',
        email: 'john@example.com'
      },
      subject: 'Order delivery issue',
      description: 'My order was supposed to arrive yesterday but I haven\'t received it yet.',
      status: 'open',
      priority: 'high',
      category: 'Shipping',
      assignedTo: 'Sarah Johnson',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      responses: 0
    },
    {
      id: '2',
      ticketNumber: 'TKT-2024-002',
      customer: {
        name: 'Emily Davis',
        email: 'emily@example.com'
      },
      subject: 'Product return request',
      description: 'I would like to return my MacBook Pro as it doesn\'t meet my requirements.',
      status: 'in-progress',
      priority: 'medium',
      category: 'Returns',
      assignedTo: 'Mike Wilson',
      createdAt: '2024-01-14T15:20:00Z',
      updatedAt: '2024-01-15T09:15:00Z',
      responses: 3
    },
    {
      id: '3',
      ticketNumber: 'TKT-2024-003',
      customer: {
        name: 'Robert Brown',
        email: 'robert@example.com'
      },
      subject: 'Payment processing error',
      description: 'I\'m getting an error when trying to complete my purchase.',
      status: 'resolved',
      priority: 'urgent',
      category: 'Payment',
      assignedTo: 'Lisa Chen',
      createdAt: '2024-01-13T11:45:00Z',
      updatedAt: '2024-01-14T16:30:00Z',
      responses: 5
    }
  ]);

  const [knowledgeBase] = useState<KnowledgeBaseArticle[]>([
    {
      id: '1',
      title: 'How to track your order',
      content: 'You can track your order by logging into your account and visiting the Orders section...',
      category: 'Shipping',
      tags: ['tracking', 'orders', 'delivery'],
      views: 1250,
      helpful: 98,
      notHelpful: 12,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-10T00:00:00Z'
    },
    {
      id: '2',
      title: 'Return and refund policy',
      content: 'Our return policy allows you to return items within 30 days of purchase...',
      category: 'Returns',
      tags: ['returns', 'refunds', 'policy'],
      views: 890,
      helpful: 76,
      notHelpful: 8,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-05T00:00:00Z'
    },
    {
      id: '3',
      title: 'Payment methods accepted',
      content: 'We accept all major credit cards, PayPal, Apple Pay, and Google Pay...',
      category: 'Payment',
      tags: ['payment', 'credit cards', 'paypal'],
      views: 654,
      helpful: 45,
      notHelpful: 3,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-08T00:00:00Z'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'tickets' | 'knowledge' | 'analytics'>('tickets');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { showNotification } = useNotification();

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed': return <Archive className="w-4 h-4 text-gray-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-apple-gray-900">Customer Service Portal</h2>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Article</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-apple-blue-500 text-white rounded-lg hover:bg-apple-blue-600 transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span>New Ticket</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-apple-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'tickets', name: 'Support Tickets', icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'knowledge', name: 'Knowledge Base', icon: <Search className="w-4 h-4" /> },
            { id: 'analytics', name: 'Service Analytics', icon: <CheckCircle className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-apple-blue-500 text-apple-blue-600'
                  : 'border-transparent text-apple-gray-500 hover:text-apple-gray-700'
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'tickets' && (
        <div className="space-y-6">
          {/* Ticket Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Open Tickets</p>
                  <p className="text-2xl font-bold text-red-600">
                    {tickets.filter(t => t.status === 'open').length}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {tickets.filter(t => t.status === 'in-progress').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">
                    {tickets.filter(t => t.status === 'resolved').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Avg Response Time</p>
                  <p className="text-2xl font-bold text-blue-600">2.4h</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-apple-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search tickets, customers, or subjects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-2 border border-apple-gray-300 rounded-lg focus:ring-2 focus:ring-apple-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="bg-white rounded-xl border border-apple-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-apple-gray-50 border-b border-apple-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Ticket
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-apple-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-apple-gray-200">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-apple-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(ticket.status)}
                          <div>
                            <div className="font-medium text-apple-gray-900">{ticket.ticketNumber}</div>
                            <div className="text-sm text-apple-gray-500">{ticket.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-apple-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-apple-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-apple-gray-900">{ticket.customer.name}</div>
                            <div className="text-sm text-apple-gray-500">{ticket.customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="font-medium text-apple-gray-900 truncate">{ticket.subject}</div>
                          <div className="text-sm text-apple-gray-500 truncate">{ticket.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-apple-gray-900">
                        {ticket.assignedTo || 'Unassigned'}
                      </td>
                      <td className="px-6 py-4 text-sm text-apple-gray-500">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-apple-blue-500 hover:text-apple-blue-700">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-apple-gray-500 hover:text-apple-gray-700">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'knowledge' && (
        <div className="space-y-6">
          {/* Knowledge Base Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Total Articles</p>
                  <p className="text-2xl font-bold text-blue-600">{knowledgeBase.length}</p>
                </div>
                <Search className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-green-600">
                    {knowledgeBase.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-apple-gray-600">Helpfulness Rate</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round(
                      (knowledgeBase.reduce((sum, article) => sum + article.helpful, 0) /
                       knowledgeBase.reduce((sum, article) => sum + article.helpful + article.notHelpful, 0)) * 100
                    )}%
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Knowledge Base Articles */}
          <div className="bg-white rounded-xl border border-apple-gray-200">
            <div className="p-6 border-b border-apple-gray-200">
              <h3 className="text-lg font-semibold text-apple-gray-900">Knowledge Base Articles</h3>
            </div>
            <div className="divide-y divide-apple-gray-200">
              {knowledgeBase.map((article) => (
                <div key={article.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-apple-gray-900 mb-2">{article.title}</h4>
                      <p className="text-apple-gray-600 mb-3 line-clamp-2">{article.content}</p>
                      <div className="flex items-center space-x-4 mb-3">
                        <span className="bg-apple-blue-100 text-apple-blue-700 px-2 py-1 rounded text-sm">
                          {article.category}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {article.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-apple-gray-100 text-apple-gray-600 px-2 py-1 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-6 text-sm text-apple-gray-500">
                        <span>{article.views} views</span>
                        <span>{article.helpful} helpful</span>
                        <span>{article.notHelpful} not helpful</span>
                        <span>Updated {new Date(article.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-apple-blue-500 hover:text-apple-blue-700">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-apple-gray-500 hover:text-apple-gray-700">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-white p-6 rounded-xl border border-apple-gray-200">
          <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Customer Service Analytics</h3>
          <p className="text-apple-gray-600">Comprehensive service analytics including response times, resolution rates, customer satisfaction scores, and agent performance metrics would be implemented here.</p>
        </div>
      )}
    </div>
  );
};

export default CustomerServicePortal;
