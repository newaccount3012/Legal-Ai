import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LexiHeader() {
  const navigate = useNavigate();

  return (
    <header className="p-4 bg-gradient-to-br from-slate-900 to-blue-900 border-b border-blue-400/30 shadow-lg relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full animate-float"
            style={{
              width: `${6 + i * 3}px`,
              height: `${6 + i * 3}px`,
              left: `${5 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2.5 + i * 0.2}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="flex items-center justify-between w-full relative z-10">
         {/* Logo Section - Left Corner */}
         <div 
            className="flex items-center cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl text-white">⚖</span>
              <h1 className="text-xl font-semibold text-white hover:text-gray-200 transition-all duration-300">
                LegalAI
              </h1>
            </div>
          </div>



         {/* User Profile Section - Right Corner */}
         <div className="flex items-center space-x-3">
           <div className="relative">
             <img 
               src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
               alt="User Avatar" 
               className="w-10 h-10 rounded-full object-cover border-2 border-blue-300 hover:border-blue-400 transition-all duration-300 cursor-pointer hover:scale-105"
             />
             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
           </div>
           <div className="flex flex-col">
             <span className="text-sm font-semibold text-white hover:text-blue-300 transition-colors duration-200 cursor-pointer">
               John Doe
             </span>
             <span className="text-xs text-blue-200">
               Premium User
             </span>
           </div>
         </div>
      </div>
    </header>
  );
}