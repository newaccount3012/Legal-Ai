import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LexiHeader from "../Components/Header/LexiHeader";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: 'analyzing' | 'completed' | 'failed' | 'pending';
  size: string;
  verificationScore?: number;
  riskLevel?: 'low' | 'medium' | 'high';
}

interface StatusBadgeProps {
  status: string;
  riskLevel?: string;
}

const StatusBadge = ({ status, riskLevel }: StatusBadgeProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return { color: 'bg-green-100 text-green-800', text: 'Completed' };
      case 'analyzing':
        return { color: 'bg-blue-100 text-blue-800', text: 'Analyzing' };
      case 'failed':
        return { color: 'bg-red-100 text-red-800', text: 'Failed' };
      case 'pending':
        return { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' };
      default:
        return { color: 'bg-gray-100 text-gray-800', text: 'Unknown' };
    }
  };

  const getRiskConfig = () => {
    switch (riskLevel) {
      case 'high':
        return { color: 'bg-red-100 text-red-800', text: 'High Risk' };
      case 'medium':
        return { color: 'bg-yellow-100 text-yellow-800', text: 'Medium Risk' };
      case 'low':
        return { color: 'bg-green-100 text-green-800', text: 'Low Risk' };
      default:
        return null;
    }
  };

  const statusConfig = getStatusConfig();
  const riskConfig = getRiskConfig();

  return (
    <div className="flex items-center space-x-2">
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusConfig.color}`}>
        {statusConfig.text}
      </span>
      {riskConfig && (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${riskConfig.color}`}>
          {riskConfig.text}
        </span>
      )}
    </div>
  );
};

const DocCard = ({ document, onView, onDownload, onDelete }: { 
  document: Document; 
  onView: (id: string) => void;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'docx':
      case 'doc': return '📝';
      case 'txt': return '📃';
      default: return '📄';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm">
            {getDocumentIcon(document.type)}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 truncate max-w-[200px]">
              {document.name}
            </h3>
            <p className="text-xs text-gray-500">
              {document.size} • {document.uploadDate}
            </p>
          </div>
        </div>
        <StatusBadge status={document.status} riskLevel={document.riskLevel} />
      </div>

      {document.verificationScore && (
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-500">Verification Score</span>
            <span className="font-semibold">{document.verificationScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              style={{ width: `${document.verificationScore}%` }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                document.verificationScore >= 80 ? 'bg-green-500' :
                document.verificationScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
            />
          </div>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onView(document.id)}
          className="flex-1 bg-blue-600 text-white text-xs px-3 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          View Analysis
        </button>
        <button
          onClick={() => onDownload(document.id)}
          className="bg-gray-100 text-gray-700 px-2 py-2 text-xs rounded-md hover:bg-gray-200 transition-colors"
          title="Download"
        >
          ↓
        </button>
        <button
          onClick={() => onDelete(document.id)}
          className="bg-gray-100 text-red-600 px-2 py-2 text-xs rounded-md hover:bg-red-50 hover:text-red-700 transition-colors"
          title="Delete"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Legal Service Agreement.pdf',
      type: 'pdf',
      uploadDate: '2024-01-15',
      status: 'completed',
      size: '2.4 MB',
      verificationScore: 92,
      riskLevel: 'low'
    },
    {
      id: '2',
      name: 'Contract Amendment.docx',
      type: 'docx',
      uploadDate: '2024-01-14',
      status: 'completed',
      size: '1.8 MB',
      verificationScore: 78,
      riskLevel: 'medium'
    },
    {
      id: '3',
      name: 'NDA Template.pdf',
      type: 'pdf',
      uploadDate: '2024-01-13',
      status: 'analyzing',
      size: '1.2 MB'
    },
    {
      id: '4',
      name: 'Partnership Agreement.pdf',
      type: 'pdf',
      uploadDate: '2024-01-12',
      status: 'failed',
      size: '3.1 MB',
      riskLevel: 'high'
    }
  ]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleViewDocument = (id: string) => {
    navigate(`/analysis/${id}`);
  };

  const handleDownloadDocument = (id: string) => {
    // Implement download functionality
    console.log('Downloading document:', id);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const filteredDocuments = filterStatus === 'all' 
    ? documents 
    : documents.filter(doc => doc.status === filterStatus);

  const getStatusCount = (status: string) => {
    return documents.filter(doc => doc.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LexiHeader />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Overview of your legal document analysis and management</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => navigate('/analyzer')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                New Analysis
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-blue-600 text-lg">📄</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Documents</div>
                <div className="text-2xl font-bold text-gray-900">{documents.length}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-green-600 text-lg">✅</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Completed</div>
                <div className="text-2xl font-bold text-gray-900">{getStatusCount('completed')}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-yellow-600 text-lg">⏳</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">In Progress</div>
                <div className="text-2xl font-bold text-gray-900">{getStatusCount('analyzing')}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-red-600 text-lg">⚠️</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">High Risk</div>
                <div className="text-2xl font-bold text-gray-900">{getStatusCount('failed')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-0 space-y-4 sm:space-y-0 sm:space-x-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All ({documents.length})</option>
                  <option value="completed">Completed ({getStatusCount('completed')})</option>
                  <option value="analyzing">In Progress ({getStatusCount('analyzing')})</option>
                  <option value="failed">High Risk ({getStatusCount('failed')})</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort</label>
                <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="date">Date</option>
                  <option value="name">Name</option>
                  <option value="risk">Risk</option>
                  <option value="score">Score</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/upload')}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium"
              >
                Upload
              </button>
              <button
                onClick={() => navigate('/analyzer')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Analyze
              </button>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((document) => (
              <DocCard
                key={document.id}
                document={document}
                onView={handleViewDocument}
                onDownload={handleDownloadDocument}
                onDelete={handleDeleteDocument}
              />
            ))
          ) : (
            <div className="col-span-full">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No documents found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {filterStatus === 'all' 
                    ? "Upload your first legal document to get started with AI-powered analysis."
                    : `No documents match the current filter: ${filterStatus}`
                  }
                </p>
                <button
                  onClick={() => navigate('/analysis/sample')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Analysis
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
