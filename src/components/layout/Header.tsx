import React from 'react';
import { Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-blue-600">GrowthMind</h1>
      
      <div className="flex items-center space-x-4">
        <button 
          className="btn btn-secondary !p-2"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button 
          className="btn btn-secondary !p-2 relative" 
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;