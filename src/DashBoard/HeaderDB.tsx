import { useNavigate} from "react-router-dom" 
import Avatar from '../assets/Avatar.png'
export default function HeaderDB() {
  const navigate = useNavigate()

  return (
    <>
      <div className="fixed left-6 top-6 w-64 h-[calc(100vh-3rem)] bg-white border border-gray-200 rounded-xl shadow-sm z-10">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <img src={Avatar} className="w-10 h-10 object-cover rounded-full"></img>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">Priyansh Neel</h1>
              <div className="text-xs text-gray-500">Joined August 2023</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => navigate("/Dash")} 
                className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="mr-3 text-gray-500">📊</span>
                Dashboard
              </button>
            </li>
            <li>
              <button className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
                <span className="mr-3 text-gray-500">💻</span>
                Attendance System
              </button>
            </li>
            <li>
              <button 
                onClick={()=>navigate("/Trainer")} 
                className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="mr-3 text-gray-500">📝</span>
                Internal Assessment
              </button>
            </li>
            <li>
              <button 
                onClick={()=>navigate("/Time")} 
                className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="mr-3 text-gray-500">🤖</span>
                Class_Owl.AI
              </button>
            </li>
            <li>
              <button 
                onClick={()=>navigate("/Search")} 
                className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="mr-3 text-gray-500">🔍</span>
                Search Faculty
              </button>
            </li>
            <li>
              <button 
                onClick={()=>navigate("/Event")} 
                className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="mr-3 text-gray-500">📅</span>
                Event Planner
              </button>
            </li>
            <li>
              <div className="px-3 py-2.5 text-sm font-medium text-gray-400">
                <span className="mr-3">⏰</span>
                Coming Soon
              </div>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Online</span>
            </div>
            <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
              Settings
            </button>
          </div>
        </div>
      </div>
    </>
  )
}


