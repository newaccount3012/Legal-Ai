import React, { useState } from 'react';
import LexiHeader from '../Header/LexiHeader';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const reports = [
    {
      id: '1',
      title: 'Risk Assessment Report',
      description: 'Comprehensive analysis of contract risks across your organization',
      date: '2024-01-15',
      status: 'completed',
      type: 'risk'
    },
    {
      id: '2',
      title: 'Compliance Summary',
      description: 'Legal compliance status and recommendations',
      date: '2024-01-14',
      status: 'completed',
      type: 'compliance'
    },
    {
      id: '3',
      title: 'Contract Analytics',
      description: 'Performance metrics and contract insights',
      date: '2024-01-13',
      status: 'generating',
      type: 'analytics'
    }
  ];

  const stats = [
    { label: 'Documents Analyzed', value: '247', change: '+12%', trend: 'up' },
    { label: 'High Risk Issues', value: '8', change: '-25%', trend: 'down' },
    { label: 'Compliance Score', value: '94%', change: '+3%', trend: 'up' },
    { label: 'Cost Savings', value: '$45K', change: '+18%', trend: 'up' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <LexiHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-black mb-2">Reports & Analytics</h1>
              <p className="text-gray-600">Track performance and generate insights from your documents</p>
            </div>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-black bg-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{stat.label}</span>
                <span className={`text-xs px-2 py-1 ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-xl font-medium text-black">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Reports List */}
        <div className="bg-white border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-black">Recent Reports</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {reports.map((report, index) => (
              <div
                key={report.id}
                className="p-4 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 flex items-center justify-center ${
                      report.type === 'risk' ? 'bg-red-100' :
                      report.type === 'compliance' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      <span className="text-sm">
                        {report.type === 'risk' ? '⚠️' :
                         report.type === 'compliance' ? '✅' : '📊'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-black">{report.title}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{report.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs ${
                      report.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status === 'completed' ? 'Completed' : 'Generating...'}
                    </span>
                    
                    {report.status === 'completed' && (
                      <div className="flex space-x-2">
                        <button className="bg-black text-white px-3 py-1 text-sm hover:bg-gray-800">
                          View
                        </button>
                        <button className="bg-gray-100 text-gray-700 px-3 py-1 text-sm hover:bg-gray-200">
                          Download
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Generate New Report */}
        <div className="mt-8 bg-white border border-gray-200 p-4">
          <h2 className="text-lg font-medium text-black mb-4">Generate New Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-50 text-center">
              <div className="text-xl mb-2">⚠️</div>
              <div className="font-medium text-black">Risk Assessment</div>
              <div className="text-sm text-gray-600">Analyze contract risks</div>
            </button>
            
            <button className="p-4 border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-50 text-center">
              <div className="text-xl mb-2">✅</div>
              <div className="font-medium text-black">Compliance Check</div>
              <div className="text-sm text-gray-600">Review compliance status</div>
            </button>
            
            <button className="p-4 border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-50 text-center">
              <div className="text-xl mb-2">📊</div>
              <div className="font-medium text-black">Analytics Report</div>
              <div className="text-sm text-gray-600">Performance insights</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;