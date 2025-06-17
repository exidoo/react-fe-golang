// React Tools
import { useState } from 'react';

// Icons
import { Home, BarChart3, Calendar, FileText, MessageSquare, Video, Menu } from 'lucide-react';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Calendar, label: 'Calendar' },
    { icon: FileText, label: 'Documents' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: Video, label: 'Video Calls' },
  ];
  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-16'} h-screen bg-white shadow-2xl flex flex-col transition-all duration-300`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4  ">
        {sidebarOpen && <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>}
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className=" p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <li key={index}>
                <a href="#" className={`flex items-center  rounded-lg transition-colors  ${item.active ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600 p-[6px]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 p-[6px]'}`}>
                  <IconComponent size={20} />
                  {sidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
