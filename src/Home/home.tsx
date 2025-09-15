import React, { useState, useEffect } from 'react'
import LexiHeader from '../Components/Header/LexiHeader'
import LexiHero from '../Components/Main/LexiHero'
import LexiFeatures from '../Components/Features/LexiFeatures'
import LexiFooter from '../Components/Footer/LexiFooter'

export const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeParticles, setActiveParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    setIsLoaded(true);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle system for interactive effects
  const createParticle = (x: number, y: number) => {
    const newParticle = { id: Date.now(), x, y };
    setActiveParticles(prev => [...prev, newParticle]);
    
    setTimeout(() => {
      setActiveParticles(prev => prev.filter(p => p.id !== newParticle.id));
    }, 1000);
  };

  const handleClick = (e: React.MouseEvent) => {
    createParticle(e.clientX, e.clientY);
  };
  return (
    <div 
      className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClick}
    >
      {/* Enhanced Animated Background Gradients */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      ></div>
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.1), transparent 80%)`
        }}
      ></div>
      
      {/* Interactive Particle System */}
      {activeParticles.map(particle => (
        <div
          key={particle.id}
          className="fixed w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none animate-ping"
          style={{
            left: particle.x - 4,
            top: particle.y - 4,
            animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) forwards'
          }}
        ></div>
      ))}
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          ></div>
        ))}
      </div>
      
      <LexiHeader />
      <main>
        <LexiHero />
        <LexiFeatures />
        
        {/* Enhanced Stats Section with Animated Counters */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { number: '10K+', label: 'Active Users', delay: '0s' },
                { number: '95%', label: 'Success Rate', delay: '0.2s' },
                { number: '24/7', label: 'Support', delay: '0.4s' }
              ].map((stat, idx) => (
                <div 
                  key={idx} 
                  className="group cursor-pointer"
                  style={{ animationDelay: stat.delay }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:rotate-1">
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-blue-100 text-lg group-hover:text-white transition-colors duration-300">
                      {stat.label}
                    </div>
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-300 to-purple-300 mx-auto mt-4 rounded-full group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
                style={{
                  left: `${5 + i * 12}%`,
                  top: `${10 + (i % 4) * 25}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '4s'
                }}
              ></div>
            ))}
          </div>
        </section>
        
        {/* Enhanced CTA Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
                Ready to Transform Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 animate-shimmer">
                  Learning Experience?
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Join thousands of learners who have already discovered the power of AI-driven education.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden">
                  <span className="relative z-10">Start Learning Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
                
                <button className="group relative px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-2xl hover:border-white/40 hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  <span className="group-hover:text-blue-300 transition-colors duration-300">Watch Demo</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full animate-float"
                style={{
                  width: `${20 + i * 10}px`,
                  height: `${20 + i * 10}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: `${4 + i * 0.5}s`
                }}
              ></div>
            ))}
          </div>
        </section>
      </main>
      <LexiFooter />
    </div>
  )
}