import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

const FeatureCard = ({ icon, title, description, benefits }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div 
      className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-100/50 hover:-translate-y-4 hover:rotate-1 relative overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/70 group-hover:to-purple-50/50 transition-all duration-500"></div>
      
      {/* Magnetic Hover Effect */}
      {isHovered && (
        <div 
          className="absolute w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl transition-all duration-300 pointer-events-none"
          style={{
            left: mousePos.x - 64,
            top: mousePos.y - 64,
          }}
        ></div>
      )}
      
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
      
      {/* Enhanced Animated Icon */}
      <div className="relative w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 group-hover:from-blue-200 group-hover:to-purple-200 rounded-2xl flex items-center justify-center text-2xl mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 animate-float group-hover:animate-pulse-glow">
        <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">{icon}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      </div>
      
      <h3 className="relative text-xl font-semibold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
        {title}
      </h3>
      <p className="relative text-gray-600 leading-relaxed mb-6 group-hover:text-gray-800 transition-colors duration-300">
        {description}
      </p>

      {/* Enhanced Animated Benefits List */}
      <div className="relative space-y-3">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="flex items-center space-x-3 text-sm text-gray-700 group-hover:text-gray-800 transition-all duration-300 hover:translate-x-2 group">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex-shrink-0 group-hover:scale-150 group-hover:animate-pulse transition-all duration-300" style={{ animationDelay: `${idx * 0.1}s` }}></div>
            <span className="group-hover:font-medium transition-all duration-300">{benefit}</span>
            <div className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300" style={{ animationDelay: `${idx * 0.15}s` }}></div>
          </div>
        ))}
      </div>
      
      {/* Enhanced Decorative Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-100/20 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-125"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-float"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '2s'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

const LexiFeatures = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const features = [
    {
      icon: "⚖️",
      title: "AI Legal Analysis",
      description: "Advanced AI algorithms analyze legal documents and provide comprehensive insights in seconds.",
      benefits: [
        "Document review automation",
        "Risk assessment",
        "Compliance checking",
        "Legal precedent analysis"
      ]
    },
    {
      icon: "📋",
      title: "Smart Contract Generation",
      description: "Generate legally sound contracts tailored to your specific needs with AI assistance.",
      benefits: [
        "Custom contract templates",
        "Clause optimization",
        "Legal compliance",
        "Multi-jurisdiction support"
      ]
    },
    {
      icon: "🔍",
      title: "Legal Research Assistant",
      description: "Comprehensive legal research powered by AI to find relevant cases and statutes quickly.",
      benefits: [
        "Case law search",
        "Statute analysis",
        "Citation verification",
        "Research summarization"
      ]
    },
    {
      icon: "💼",
      title: "Case Management",
      description: "Streamline your legal practice with intelligent case tracking and management tools.",
      benefits: [
        "Client communication",
        "Deadline tracking",
        "Document organization",
        "Billing integration"
      ]
    },
    {
      icon: "📊",
      title: "Legal Analytics",
      description: "Data-driven insights to optimize your legal strategies and improve case outcomes.",
      benefits: [
        "Success rate analysis",
        "Cost optimization",
        "Performance metrics",
        "Predictive modeling"
      ]
    },
    {
      icon: "🤝",
      title: "Client Portal",
      description: "Secure client communication platform with real-time updates and document sharing.",
      benefits: [
        "Secure messaging",
        "Document sharing",
        "Progress tracking",
        "Appointment scheduling"
      ]
    }
  ];

  return (
    <section className="relative py-12 bg-gray-50 overflow-hidden">
      {/* Cursor-following Dark Blue Gradient Background */}
      <div 
        className="absolute inset-0 opacity-40 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(30, 58, 138, 0.3) 0%, 
            rgba(30, 64, 175, 0.2) 25%, 
            rgba(37, 99, 235, 0.15) 50%, 
            rgba(59, 130, 246, 0.1) 75%, 
            transparent 100%)`
        }}
      ></div>
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(900px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(15, 23, 42, 0.2) 0%, 
            rgba(30, 41, 59, 0.15) 30%, 
            rgba(51, 65, 85, 0.1) 60%, 
            transparent 100%)`
        }}
      ></div>
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
            <span className="text-sm font-medium text-blue-700">Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for
            <span className="block text-blue-600">
              Legal Excellence
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive suite of AI-powered legal tools designed to streamline your practice, 
            enhance efficiency, and deliver exceptional results for your clients.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              benefits={feature.benefits}
            />
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center mt-20">
          <div className="relative bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-8 border border-gray-200 hover:border-blue-300 max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full -translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-100/30 to-transparent rounded-full translate-x-12 translate-y-12 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">Ready to Transform Your Legal Practice?</h3>
              <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">Join thousands of legal professionals who trust LexiAI for their daily operations.</p>
              <button className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group/btn overflow-hidden">
                <span className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default LexiFeatures;