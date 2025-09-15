import React from 'react';
import LexiHeader from '../Header/LexiHeader';

const Templates = () => {
  const templates = [
    {
      id: '1',
      name: 'Service Agreement Template',
      description: 'Standard service agreement for technology companies',
      category: 'Technology',
      downloads: 1250
    },
    {
      id: '2',
      name: 'Privacy Policy Template',
      description: 'GDPR compliant privacy policy template',
      category: 'Privacy',
      downloads: 890
    },
    {
      id: '3',
      name: 'NDA Template',
      description: 'Non-disclosure agreement for business partnerships',
      category: 'Legal',
      downloads: 2100
    },
    {
      id: '4',
      name: 'Employment Contract',
      description: 'Standard employment contract template',
      category: 'HR',
      downloads: 750
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <LexiHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-2xl font-medium text-black mb-2">Legal Templates</h1>
          <p className="text-gray-600">Pre-built legal document templates for common business needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded border border-gray-200 p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-sm text-gray-500">
                  {template.category}
                </span>
              </div>
              
              <h3 className="font-medium text-black mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {template.downloads.toLocaleString()} downloads
                </span>
                <button
                  className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800 transition-colors"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;