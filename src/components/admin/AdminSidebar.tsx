import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, MessageSquare, Settings, LogOut } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
    { to: '/admin/orders', icon: ShoppingCart, text: 'Orders' },
    { to: '/admin/inquiries', icon: MessageSquare, text: 'Inquiries' },
    { to: '/admin/settings', icon: Settings, text: 'Settings' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800/50 border-r border-gray-700/50 flex flex-col">
      <div className="h-20 flex items-center justify-center px-4 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CW</span>
          </div>
          <span className="text-xl font-bold text-white">Admin</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`
            }
          >
            <link.icon size={20} />
            <span className="font-medium">{link.text}</span>
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-6 border-t border-gray-700/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600/50 hover:text-white transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
