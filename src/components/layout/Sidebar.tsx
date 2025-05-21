import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, CheckSquare, Heart, Users, Settings, Menu, X } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Sidebar = () => {
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Learning Path', path: '/learning', icon: <BookOpen size={20} /> },
    { name: 'Tasks & Habits', path: '/tasks', icon: <CheckSquare size={20} /> },
    { name: 'Self Reflection', path: '/reflect', icon: <Heart size={20} /> },
    { name: 'Community', path: '/community', icon: <Users size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  const NavItems = () => (
    <>
      <div className="flex flex-col items-center mb-8">
        <div className="avatar w-16 h-16 mb-2">
          {user?.avatar ? (
            <img src={user.avatar} alt="User avatar" />
          ) : (
            <div className="bg-blue-100 text-blue-600 w-full h-full flex items-center justify-center text-xl font-medium">
              {user?.name?.charAt(0) || '?'}
            </div>
          )}
        </div>
        <h2 className="text-sm font-medium">{user?.name || 'User'}</h2>
        <div className="mt-1 flex items-center">
          <span className="text-xs text-slate-500">{user?.level || 1} lvl</span>
          <div className="ml-2 w-16 progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${user?.progress || 0}%` }}
            />
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-100'
              }`
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed z-30 top-4 left-4 p-2 bg-white rounded-lg shadow-md"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-20 transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="bg-black bg-opacity-25 absolute inset-0" onClick={toggleMobileMenu} />
        <div className="relative w-64 max-w-xs h-full bg-white flex flex-col p-4">
          <NavItems />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-4 overflow-y-auto">
        <NavItems />
      </aside>
    </>
  );
};

export default Sidebar;