
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, LayoutDashboard, Settings, User, BarChart2, PlusCircle, ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Calendar', icon: <Calendar size={20} />, path: '/calendar' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/analytics' },
    { name: 'Suggestions', icon: <Lightbulb size={20} />, path: '/suggestions' },
    { name: 'Profile', icon: <User size={20} />, path: '/profile' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];
  
  return (
    <aside 
      className={`h-screen bg-muted/30 dark:bg-gray-800 border-r border-border transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      } fixed left-0 top-0 z-30`}
    >
      <div className="flex items-center h-16 px-4 border-b border-border">
        {!collapsed && (
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="font-bold text-xl">Habito</span>
          </Link>
        )}
        {collapsed && (
          <Link to="/" className="mx-auto">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
          </Link>
        )}
      </div>
      
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-3 py-3 rounded-md transition-colors ${
                  location.pathname === item.path 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                {item.icon}
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-3 border-t border-border">
        <Link
          to="/add-habit"
          className={`flex items-center justify-center px-3 py-3 bg-secondary text-secondary-foreground rounded-md transition-colors hover:bg-secondary/90`}
        >
          <PlusCircle size={20} />
          {!collapsed && <span className="ml-2">Add New Habit</span>}
        </Link>
      </div>
      
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-background border border-border rounded-full p-1 text-muted-foreground hover:text-foreground"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
};

export default Sidebar;
