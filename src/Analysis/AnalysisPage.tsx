import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LexiHeader from '../Components/Header/LexiHeader';

interface VerificationItem {
  id: string;
  category: string;
  status: 'passed' | 'warning' | 'failed';
  message: string;
  details?: string;
}

interface SummaryPoint {
  id: string;
  category: 'key_clause' | 'obligation' | 'term' | 'risk';
  title: string;
  content: string;
  importance: 'high' | 'medium' | 'low';
}

const DocViewer = () => {
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

  const documentSections = [
    { id: 'section1', text: 'WHEREAS, the parties desire to enter into this agreement for the provision of legal services...', highlighted: false },
    { id: 'section2', text: 'The Client agrees to pay the Attorney a retainer fee of $5,000 upon execution of this agreement.', highlighted: true },
    { id: 'section3', text: 'This agreement shall commence on the date of execution and shall continue until terminated by either party...', highlighted: false },
    { id: 'section4', text: 'Either party may terminate this agreement with thirty (30) days written notice to the other party.', highlighted: true },
    { id: 'section5', text: 'The Attorney shall maintain confidentiality of all client information in accordance with applicable professional rules...', highlighted: false }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-full overflow-hidden transition-opacity duration-600">
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-xl">📄</span>
          <div>
            <h3 className="font-semibold">Legal Service Agreement.pdf</h3>
            <p className="text-sm text-gray-300">12 pages • 2.4 MB</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
            Download
          </button>
          <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
            Print
          </button>
        </div>
      </div>
      
      <div className="p-6 h-full overflow-y-auto">
        <div className="space-y-4">
          {documentSections.map((section, index) => (
            <div
              key={section.id}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                section.highlighted ? 'bg-yellow-50 border-l-4 border-yellow-400' : ''
              } ${
                highlightedSection === section.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setHighlightedSection(section.id)}
            >
              <div className="flex items-start space-x-3">
                <span className="text-sm text-gray-500 font-mono mt-1">{index + 1}</span>
                <p className="text-gray-800 leading-relaxed">{section.text}</p>
              </div>
              {section.highlighted && (
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                    Key Section
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VerificationTab = () => {
  const verificationItems: VerificationItem[] = [
    {
      id: '1',
      category: 'Document Authenticity',
      status: 'passed',
      message: 'Digital signature verified',
      details: 'Document contains valid digital signatures from all parties'
    },
    {
      id: '2',
      category: 'Legal Compliance',
      status: 'passed',
      message: 'Compliant with state regulations',
      details: 'Document meets all requirements for legal service agreements in this jurisdiction'
    },
    {
      id: '3',
      category: 'Risk Assessment',
      status: 'warning',
      message: 'Potential liability clause concern',
      details: 'Liability limitation clause may not be enforceable in all jurisdictions'
    },
    {
      id: '4',
      category: 'Completeness Check',
      status: 'failed',
      message: 'Missing required disclosure',
      details: 'Document lacks mandatory fee disclosure statement required by state bar'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return '✅';
      case 'warning': return '⚠️';
      case 'failed': return '❌';
      default: return '❓';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-blue-600 font-serif">Verification Results</h3>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center space-x-1 text-green-600">
            <span>✅</span>
            <span>2 Passed</span>
          </span>
          <span className="flex items-center space-x-1 text-yellow-600">
            <span>⚠️</span>
            <span>1 Warning</span>
          </span>
          <span className="flex items-center space-x-1 text-red-600">
            <span>❌</span>
            <span>1 Failed</span>
          </span>
        </div>
      </div>
      
      {verificationItems.map((item, index) => (
        <div
          key={item.id}
          className={`border rounded-lg p-4 ${getStatusColor(item.status)}`}
        >
          <div className="flex items-start space-x-3">
            <span className="text-xl">{getStatusIcon(item.status)}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{item.category}</h4>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  item.status === 'passed' ? 'bg-green-100 text-green-800' :
                  item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.status.toUpperCase()}
                </span>
              </div>
              <p className="font-medium mb-1">{item.message}</p>
              {item.details && (
                <p className="text-sm opacity-80">{item.details}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SummaryTab = () => {
  const documentSummary = {
    title: "Service Agreement - Acme Corp",
    uploadTime: "5 minutes ago",
    pages: "12 pages",
    preset: "Technology preset",
    keyDefinitions: [
      {
        term: "Services",
        definition: "The software services provided by Acme Corp as described in Exhibit A."
      },
      {
        term: "Confidential Information",
        definition: "Any non-public information disclosed by either party during the term of this agreement."
      }
    ]
  };

  const summaryPoints: SummaryPoint[] = [
    {
      id: '1',
      category: 'key_clause',
      title: 'Retainer Fee',
      content: 'Client must pay $5,000 retainer fee upon agreement execution',
      importance: 'high'
    },
    {
      id: '2',
      category: 'obligation',
      title: 'Confidentiality Requirement',
      content: 'Attorney must maintain strict confidentiality of all client information',
      importance: 'high'
    },
    {
      id: '3',
      category: 'term',
      title: 'Termination Notice',
      content: 'Either party may terminate with 30 days written notice',
      importance: 'medium'
    },
    {
      id: '4',
      category: 'risk',
      title: 'Liability Limitation',
      content: 'Attorney liability limited to fees paid - may not be enforceable',
      importance: 'medium'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'key_clause': return '🔑';
      case 'obligation': return '📋';
      case 'term': return '📅';
      case 'risk': return '⚠️';
      default: return '📄';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'border-l-red-400 bg-red-50';
      case 'medium': return 'border-l-yellow-400 bg-yellow-50';
      case 'low': return 'border-l-green-400 bg-green-50';
      default: return 'border-l-gray-400 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-blue-600">{documentSummary.title}</h2>
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
              Download Report
            </button>
            <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors">
              Share
            </button>
          </div>
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p>Uploaded {documentSummary.uploadTime} • {documentSummary.pages} • {documentSummary.preset}</p>
        </div>
      </div>

      {/* Key Definitions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Definitions</h3>
        <div className="space-y-3">
          {documentSummary.keyDefinitions.map((def, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <h4 className="font-semibold text-blue-600 mb-1">"{def.term}"</h4>
              <p className="text-sm text-gray-700">{def.definition}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Points */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Analysis Summary</h3>
        <div className="space-y-3">
          {summaryPoints.map((point, index) => (
            <div
              key={point.id}
              className={`border-l-4 rounded-lg p-4 ${getImportanceColor(point.importance)}`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-xl">{getCategoryIcon(point.category)}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-blue-600">{point.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      point.importance === 'high' ? 'bg-red-100 text-red-800' :
                      point.importance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {point.importance.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-700">{point.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChatAssistantTab = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'ve analyzed your Service Agreement with Acme Corp. I can help you understand key terms, risks, and obligations. What would you like to know?',
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'assistant',
      content: 'Here are some questions you might want to ask:\n• What are the main obligations for each party?\n• What are the termination conditions?\n• Are there any high-risk clauses I should be aware of?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Based on the Service Agreement analysis, the key obligations include a $5,000 retainer fee upon execution and strict confidentiality requirements. The termination clause allows either party to end the agreement with 30 days written notice.',
        'The document shows medium risk in the liability limitation clause, which may not be enforceable in all jurisdictions. I recommend reviewing this with legal counsel.',
        'Key definitions in this agreement include "Services" (software services by Acme Corp) and "Confidential Information" (non-public information shared between parties).'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-96">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-blue-600 font-serif">Legal Assistant</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span>AI Assistant Online</span>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white border border-gray-200 text-gray-800'
            }`}>
              <p className="text-sm whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-800 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Chat Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask about this document..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isTyping}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export const AnalysisPage = () => {
  const [activeTab, setActiveTab] = useState('verification');
  const navigate = useNavigate();

  const tabs = [
    { id: 'verification', label: 'Verification', icon: '🔍' },
    { id: 'summary', label: 'Summary', icon: '📊' },
    { id: 'chat', label: 'AI Assistant', icon: '💬' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'verification':
        return <VerificationTab />;
      case 'summary':
        return <SummaryTab />;
      case 'chat':
        return <ChatAssistantTab />;
      default:
        return <VerificationTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <LexiHeader />
      
      <main>
        <div className="p-8">
          <div className="mb-8 transition-opacity duration-600">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
                  Document Analysis
                </h1>
                <p className="text-xl text-gray-600">
                  Comprehensive analysis and verification results for your legal document.
                </p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 shadow-md hover:scale-105"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Split View Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
            {/* Left: Document Viewer */}
            <div className="h-full">
              <DocViewer />
            </div>

            {/* Right: Tabbed Panel */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6 h-full overflow-y-auto">
                <div key={activeTab} className="transition-opacity duration-300">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalysisPage;