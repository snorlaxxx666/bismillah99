import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useTheme } from '../contexts/ThemeContext';
import { Save, Bell, Eye, EyeOff, User, Lock, LogOut, Moon, Sun, Volume2 } from 'lucide-react';

const Settings: React.FC = () => {
  const { user, updateUserProfile, updatePreferences, logout } = useUser();
  const { theme, toggleTheme } = useTheme();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: user?.preferences.notifications || true,
    learningStyle: user?.preferences.learningStyle || 'visual',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: formData.name,
      email: formData.email
    });
    alert('Profile updated successfully!');
  };
  
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // In a real app, would call an API to update the password
    alert('Password updated successfully!');
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };
  
  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences({
      notifications: formData.notifications,
      learningStyle: formData.learningStyle,
      interests: user?.preferences.interests || []
    });
    alert('Preferences updated successfully!');
  };
  
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      logout();
      window.location.href = '/';
    }
  };

  return (
    <div className="animate-fade-in space-y-8">
      <header>
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-slate-600">Manage your account preferences and personal settings</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="card p-4 sticky top-20">
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  activeTab === 'profile'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <User size={18} className="mr-3" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  activeTab === 'security'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Lock size={18} className="mr-3" />
                <span>Security</span>
              </button>
              <button
                onClick={() => setActiveTab('preferences')}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  activeTab === 'preferences'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Bell size={18} className="mr-3" />
                <span>Preferences</span>
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`flex items-center px-3 py-2 rounded-lg ${
                  activeTab === 'appearance'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {theme === 'dark' ? (
                  <Moon size={18} className="mr-3" />
                ) : (
                  <Sun size={18} className="mr-3" />
                )}
                <span>Appearance</span>
              </button>
            </div>
            
            <div className="mt-8 pt-4 border-t border-slate-200">
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 w-full text-left rounded-lg text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} className="mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-3">
          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
              
              <form onSubmit={handleProfileSubmit}>
                <div className="mb-6 flex items-center">
                  <div className="avatar w-24 h-24 mr-6">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="User avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="bg-blue-100 text-blue-600 w-full h-full flex items-center justify-center text-2xl font-medium">
                        {user?.name?.charAt(0) || '?'}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">Profile Picture</h3>
                    <p className="text-sm text-slate-500 mb-2">Upload a new profile picture</p>
                    <button type="button" className="btn btn-secondary !py-1.5">
                      Choose Image
                    </button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Level & Progress</h3>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-700">Current Level</span>
                        <span className="font-medium">{user?.level || 1}</span>
                      </div>
                      <div className="progress-bar mb-4">
                        <div 
                          className="progress-bar-fill"
                          style={{ width: `${user?.progress || 0}%` }}
                        />
                      </div>
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">{1000 - (user?.userProgress.xp || 0) % 1000} XP</span> until next level
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button type="submit" className="btn btn-primary flex items-center">
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Security */}
          {activeTab === 'security' && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
              
              <form onSubmit={handlePasswordSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-700 mb-1">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700 mb-1">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">Password Requirements</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>At least 8 characters long</li>
                      <li>Include at least one uppercase letter</li>
                      <li>Include at least one number</li>
                      <li>Include at least one special character</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button 
                    type="submit" 
                    className="btn btn-primary flex items-center"
                    disabled={!formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
                  >
                    <Save size={18} className="mr-2" />
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Preferences */}
          {activeTab === 'preferences' && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-6">Preferences</h2>
              
              <form onSubmit={handlePreferencesSubmit}>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="notifications"
                          checked={formData.notifications}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-slate-700">Enable notifications</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="emailNotifications"
                          checked={true}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-slate-700">Send email reminders</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="studyReminders"
                          checked={true}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-slate-700">Daily study reminders</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Learning Style</h3>
                    <select
                      name="learningStyle"
                      value={formData.learningStyle}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="visual">Visual</option>
                      <option value="auditory">Auditory</option>
                      <option value="reading">Reading/Writing</option>
                      <option value="kinesthetic">Kinesthetic</option>
                    </select>
                    <p className="text-sm text-slate-500 mt-1">
                      This helps us personalize your learning experience
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {user?.preferences.interests.map((interest, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="text-blue-600 text-sm mt-2 hover:underline"
                    >
                      Edit Interests
                    </button>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button type="submit" className="btn btn-primary flex items-center">
                    <Save size={18} className="mr-2" />
                    Save Preferences
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Appearance */}
          {activeTab === 'appearance' && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Theme</h3>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => theme === 'dark' && toggleTheme()}
                      className={`flex-1 p-4 rounded-lg border ${
                        theme === 'light'
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-3">
                        <Sun size={24} className="text-amber-500" />
                      </div>
                      <h4 className="font-medium">Light Mode</h4>
                      <p className="text-sm text-slate-500 mt-1">
                        Bright interface for daytime use
                      </p>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => theme === 'light' && toggleTheme()}
                      className={`flex-1 p-4 rounded-lg border ${
                        theme === 'dark'
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-3">
                        <Moon size={24} className="text-indigo-500" />
                      </div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-sm text-slate-500 mt-1">
                        Darker interface for low-light environments
                      </p>
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Accessibility</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="highContrast"
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-slate-700">High contrast mode</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="reducedMotion"
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-slate-700">Reduced motion</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="largeText"
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-slate-700">Larger text</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Sound Effects</h3>
                  <div className="flex items-center">
                    <Volume2 size={20} className="text-slate-500 mr-2" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="70"
                      className="flex-1"
                    />
                  </div>
                  <div className="space-y-3 mt-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="achievementSounds"
                        defaultChecked
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-slate-700">Achievement sounds</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="notificationSounds"
                        defaultChecked
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-slate-700">Notification sounds</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button className="btn btn-primary flex items-center">
                  <Save size={18} className="mr-2" />
                  Save Appearance
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;