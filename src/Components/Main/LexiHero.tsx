import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const LexiHero = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [splashEffects, setSplashEffects] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);
  const heroRef = useRef<HTMLElement>(null);
  
  const stats = [
    { number: "50,000+", label: "Documents Analyzed" },
    { number: "99.8%", label: "Accuracy Rate" },
    { number: "<90s", label: "Average Analysis Time" },
    { number: "2,500+", label: "Legal Professionals" }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    const handleClick = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newSplash = { id: Date.now(), x, y };
        setSplashEffects(prev => [...prev, newSplash]);
        
        setTimeout(() => {
          setSplashEffects(prev => prev.filter(splash => splash.id !== newSplash.id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    // Generate floating elements
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setFloatingElements(elements);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-white flex items-center justify-center py-8 overflow-hidden cursor-none">
      {/* Cursor-following Dark Blue Gradient Background */}
      <div 
        className="absolute inset-0 opacity-70 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(30, 58, 138, 0.6) 0%, 
            rgba(30, 64, 175, 0.4) 25%, 
            rgba(37, 99, 235, 0.3) 50%, 
            rgba(59, 130, 246, 0.2) 75%, 
            transparent 100%)`
        }}
      ></div>
      <div 
        className="absolute inset-0 opacity-50 transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(1200px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(15, 23, 42, 0.4) 0%, 
            rgba(30, 41, 59, 0.3) 30%, 
            rgba(51, 65, 85, 0.2) 60%, 
            transparent 100%)`
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-blue-50/60 to-indigo-50/80"></div>
      
      {/* Custom Cursor */}
      <div 
        className="fixed w-6 h-6 bg-blue-500/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100 ease-out"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
      
      {/* Splash Effects */}
      {splashEffects.map(splash => (
        <div
          key={splash.id}
          className="absolute pointer-events-none z-40"
          style={{ left: splash.x, top: splash.y }}
        >
          <div className="w-4 h-4 bg-blue-400/60 rounded-full animate-ping"></div>
          <div className="absolute inset-0 w-8 h-8 bg-blue-300/40 rounded-full animate-ping animation-delay-150"></div>
          <div className="absolute inset-0 w-12 h-12 bg-blue-200/20 rounded-full animate-ping animation-delay-300"></div>
        </div>
      ))}
      
      {/* Floating Elements */}
      {floatingElements.map(element => (
        <div
          key={element.id}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-bounce"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: '3s'
          }}
        ></div>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Enhanced Animated Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 px-4 py-2 rounded-full hover:shadow-lg transition-all duration-300 group">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse group-hover:scale-125 transition-transform duration-300"></div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-300">AI-Powered Legal Intelligence</span>
              <div className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
            </div>

            {/* Animated Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900 animate-fade-in-up">
              <span className="inline-block hover:scale-105 transition-transform duration-300">Transform</span>{' '}
              <span className="inline-block hover:scale-105 transition-transform duration-300 animation-delay-100">Legal</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 transition-all duration-500 inline-block hover:scale-105 animation-delay-200">Complexity</span>
              <br />
              <span className="inline-block hover:scale-105 transition-transform duration-300 animation-delay-300">Into</span>{' '}
              <span className="inline-block hover:scale-105 transition-transform duration-300 animation-delay-400">Clarity</span>
            </h1>

            {/* Clean Subtitle */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Harness the power of advanced AI to analyze contracts, research legal precedents, 
              and streamline your workflow with unprecedented accuracy and speed.
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button
                onClick={() => navigate("/analyzer")}
                className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 min-w-[200px] shadow-lg hover:shadow-xl hover:scale-105 group overflow-hidden"
              >
                <span className="relative z-10">Start Free Analysis</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => navigate("/dashboard")}
                className="relative border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 min-w-[200px] hover:shadow-lg hover:scale-105 group bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
              >
                <span className="relative z-10">View Dashboard</span>
              </button>
            </div>

            {/* Animated Stats Display */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left group">
                  <div className="text-2xl font-bold text-gray-900 mb-1 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                    {stat.label}
                  </div>
                  <div className="w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Clean Visual */}
          <div className="relative">
            {/* Main Visual Container */}
            <div className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              {/* Mock Document Interface */}
              <div className="space-y-6">
                {/* Browser Header */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-500 font-medium">
                    📄 contract-analysis-report.pdf
                  </div>
                  <div className="text-green-600 text-sm font-semibold">✓ Analyzed</div>
                </div>
                
                {/* Document Preview with Highlights */}
                <div className="space-y-3">
                  <div className="h-4 bg-blue-600 rounded-lg w-4/5"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-yellow-100 border-l-4 border-yellow-400 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-3 bg-green-100 border-l-4 border-green-400 rounded w-2/3"></div>
                  <div className="h-3 bg-red-100 border-l-4 border-red-400 rounded w-3/5"></div>
                </div>
                
                {/* AI Analysis Results Panel */}
                <div className="mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">🤖</span>
                    <span className="font-bold text-gray-900 text-lg">AI Analysis Complete</span>
                    <div className="ml-auto bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                      98% Confidence
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-gray-700 font-medium">15 Key clauses identified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-gray-700 font-medium">Risk assessment: Low</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span className="text-gray-700 font-medium">Summary generated</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span className="text-gray-700 font-medium">3 Recommendations</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default LexiHero;