import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const getPageTitle = () => {
    const path = location.pathname.split('/').pop() || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const getDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    return user?.email?.split('@')[0] || 'Admin';
  };

  return (
    <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 bg-gray-800/50 border-b border-gray-700/50">
      <div>
        <h1 className="text-2xl font-bold text-white">{getPageTitle()}</h1>
      </div>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="relative text-gray-300 hover:text-white">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
            <User size={20} className="text-gray-300" />
          </div>
          <div>
            <div className="font-semibold text-white">{getDisplayName()}</div>
            <div className="text-xs text-gray-400">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );

};

export default AdminHeader;
