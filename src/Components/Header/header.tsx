import { useRef } from "react";
import { useNavigate} from "react-router-dom" 
// import { BorderBeam } from "../Background/border";
export default function header() {
  const navigate = useNavigate()

  return (
    <>
      <div className="fixed z-10 w-[92%] ml-16 flex justify-between items-center bg-gradient-to-br from-slate-900 to-blue-900 mt-2 border-2 border-blue-400/30 rounded-full h-20 shadow-xl backdrop-blur-sm relative overflow-hidden">
        {/* <BorderBeam/> */}
        
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full animate-float"
              style={{
                width: `${8 + i * 4}px`,
                height: `${8 + i * 4}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.3}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Logo Section - Left Corner */}
        <div 
          className="flex items-center cursor-pointer hover:scale-105 transition-transform duration-200 ml-6"
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
        <div className="flex items-center space-x-3 mr-6">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
              alt="User Avatar" 
              className="w-10 h-10 rounded-full object-cover border-2 border-orange-300 hover:border-orange-400 transition-all duration-300 cursor-pointer hover:scale-105"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white hover:text-orange-200 transition-colors duration-200 cursor-pointer">
              John Doe
            </span>
            <span className="text-xs text-orange-100">
              Premium User
            </span>
          </div>
        </div>
      </div>
    </>
  )
}