import React, { useState, useRef } from 'react';
import LexiHeader from '../Header/LexiHeader';

interface IndustryPreset {
  id: string;
  name: string;
  selected: boolean;
}

interface DocumentType {
  id: string;
  name: string;
  selected: boolean;
}

interface RiskCategory {
  id: string;
  name: string;
  checked: boolean;
}

interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  summary?: string;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const LegalAnalyzer = () => {
  const [industryPresets, setIndustryPresets] = useState<IndustryPreset[]>([
    { id: '1', name: 'Technology', selected: true },
    { id: '2', name: 'Healthcare', selected: false },
    { id: '3', name: 'Finance', selected: false },
    { id: '4', name: 'E-commerce', selected: false },
    { id: '5', name: 'Manufacturing', selected: false }
  ]);

  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([
    { id: '1', name: 'Service Agreement', selected: true },
    { id: '2', name: 'Privacy Policy', selected: false },
    { id: '3', name: 'NDA', selected: false },
    { id: '4', name: 'Employment Contract', selected: false },
    { id: '5', name: 'Terms of Service', selected: false }
  ]);

  const [riskCategories, setRiskCategories] = useState<RiskCategory[]>([
    { id: '1', name: 'Liability', checked: true },
    { id: '2', name: 'Termination', checked: true },
    { id: '3', name: 'Payment Terms', checked: true }
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState<UploadedDocument | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIndustrySelect = (id: string) => {
    setIndustryPresets(prev => prev.map(item => 
      ({ ...item, selected: item.id === id })
    ));
  };

  const handleDocumentTypeSelect = (id: string) => {
    setDocumentTypes(prev => prev.map(item => 
      ({ ...item, selected: item.id === id })
    ));
  };

  const handleRiskCategoryToggle = (id: string) => {
    setRiskCategories(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate file upload and analysis
    const newDocument: UploadedDocument = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date(),
      summary: 'This service agreement outlines the terms and conditions between Acme Corp and Your Company for the provision of software development services. Key highlights include: 12-month term with auto-renewal, liability limitations, confidentiality clauses, and payment terms of Net 30 days. The agreement includes provisions for intellectual property rights, termination procedures, and dispute resolution mechanisms.'
    };

    // Simulate API delay
    setTimeout(() => {
      setUploadedDocument(newDocument);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim() || !uploadedDocument) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: chatInput,
      sender: 'user',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: `Based on the document analysis, I can help you understand that aspect. The ${chatInput.toLowerCase()} relates to the key terms outlined in your service agreement. Would you like me to explain any specific clauses in more detail?`,
        sender: 'ai',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LexiHeader />
      </div>
      
      <div className="flex pt-24">
        {/* GitHub-style Left Sidebar */}
        <div className="w-80 bg-gray-50 border-r border-gray-200 h-screen fixed left-0 top-16 overflow-y-auto">
          <div className="p-6">
            {/* Industry Presets */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Industry Presets
              </h3>
              <div className="space-y-1">
                {industryPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleIndustrySelect(preset.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      preset.selected
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{preset.name}</span>
                      {preset.selected && <span className="text-blue-600 text-xs">✓</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Document Types */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Document Types
              </h3>
              <div className="space-y-1">
                {documentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleDocumentTypeSelect(type.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      type.selected
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{type.name}</span>
                      {type.selected && <span className="text-blue-600 text-xs">✓</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Categories */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                Risk Categories
              </h3>
              <div className="space-y-2">
                {riskCategories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={category.checked}
                      onChange={() => handleRiskCategoryToggle(category.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GitHub-style Main Content */}
        <div className="flex-1 ml-80 mr-80">
          <div className="p-8 mt-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Contract Analyzer</h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">Upload your contracts or legal documents to identify risks and get AI-powered insights with our advanced AI assistant</p>
              </div>
              
              {/* Upload Area */}
              {!uploadedDocument && (
                <div className="border-2 border-dashed border-gray-300 rounded-xl mb-8 hover:border-blue-400 transition-colors">
                  <div
                    className={`text-center py-16 transition-all duration-200 rounded-xl ${
                      dragActive ? 'bg-blue-50 border-blue-400 scale-105' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {isAnalyzing ? (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-spin">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Analyzing Document...</h3>
                        <p className="text-gray-600">Please wait while our AI processes your document</p>
                        <div className="mt-4 w-48 bg-gray-200 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Upload your document</h3>
                        <p className="text-gray-600 mb-6 text-lg">Drag and drop your PDF file here, or click to browse</p>
                        
                        <button 
                          onClick={handleFileInputClick}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                          📄 Upload Document
                        </button>
                        
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf"
                          onChange={handleFileInputChange}
                          className="hidden"
                        />
                      
                        <div className="mt-8">
                          <p className="text-gray-500 mb-3">Or try with a sample document</p>
                          <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
                            📋 Use Sample Template
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Document Summary */}
              {uploadedDocument && (
                <div className="space-y-6">
                  {/* Document Info */}
                  <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{uploadedDocument.name}</h3>
                          <p className="text-gray-500">{formatFileSize(uploadedDocument.size)} • Uploaded {uploadedDocument.uploadDate.toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setUploadedDocument(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                        Document Summary
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 leading-relaxed">{uploadedDocument.summary}</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Interface */}
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="border-b border-gray-200 p-6">
                      <h4 className="text-xl font-bold text-gray-900 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        Chat with AI Assistant
                      </h4>
                      <p className="text-gray-600 mt-1">Ask questions about your document and get instant insights</p>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="h-80 overflow-y-auto p-6 space-y-4 bg-gray-50">
                      {chatMessages.length === 0 ? (
                        <div className="text-center text-gray-500 py-12">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                          </div>
                          <h5 className="font-semibold text-gray-700 mb-2">Ready to help!</h5>
                          <p className="text-gray-500">Start a conversation about your document</p>
                        </div>
                      ) : (
                        chatMessages.map((message) => (
                          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                              message.sender === 'user' 
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                                : 'bg-white text-gray-900 border border-gray-200'
                            }`}>
                              <p className="text-sm leading-relaxed">{message.text}</p>
                              <p className={`text-xs mt-2 ${
                                message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    {/* Chat Input */}
                    <div className="border-t border-gray-200 p-6 bg-white">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Ask a question about your document..."
                          className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={!chatInput.trim()}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 text-white px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:transform-none disabled:shadow-none"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 h-screen fixed right-0 top-16 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Document Details
            </h3>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Document Type</label>
                <p className="text-gray-600 font-medium">Service Agreement</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Parties</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-600 font-medium">Acme Corp (Provider)</span>
                    <span className="text-xs text-gray-500 font-medium">and</span>
                  </div>
                  <div className="text-sm text-purple-600 font-medium">Your Company (Customer)</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Effective Date</label>
                <p className="text-gray-600 font-medium">June 15, 2023</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Term</label>
                <p className="text-gray-600 font-medium">12 months with auto-renewal</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Risk Summary</label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm text-gray-700 font-medium">Liability</span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">High Risk</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm text-gray-700 font-medium">Termination</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">Medium Risk</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm text-gray-700 font-medium">Payment Terms</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Low Risk</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm text-gray-700 font-medium">Confidentiality</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">Medium Risk</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-sm text-gray-700 font-medium">IP Rights</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">Medium Risk</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <label className="block text-sm font-semibold text-gray-700 mb-4">Key Definitions</label>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-3">
                    <p className="font-medium text-gray-700 mb-1">"Services"</p>
                    <p className="text-xs text-gray-500">Services as described in Exhibit A</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-3">
                    <p className="font-medium text-gray-700 mb-1">"Confidential Information"</p>
                    <p className="text-xs text-gray-500">Information marked as confidential or...</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">?</span>
                </div>
                <span className="font-bold text-gray-900">Need Help?</span>
              </div>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                Our AI can help you understand complex legal terms and identify potential risks.
              </p>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                💬 Ask AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalAnalyzer;