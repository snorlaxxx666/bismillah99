import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProgress {
  dailyStreak: number;
  xp: number;
  level: number;
  completedTasks: number;
  completedChallenges: number;
}

interface UserPreferences {
  learningStyle: string;
  interests: string[];
  notifications: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  progress: number;
  level: number;
  userProgress: UserProgress;
  preferences: UserPreferences;
  isAuthenticated: boolean;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data - in a real app this would come from an API/auth service
  const mockUser: User = {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: undefined,
    progress: 65,
    level: 3,
    userProgress: {
      dailyStreak: 5,
      xp: 1250,
      level: 3,
      completedTasks: 28,
      completedChallenges: 4
    },
    preferences: {
      learningStyle: 'visual',
      interests: ['programming', 'languages', 'science'],
      notifications: true
    },
    isAuthenticated: true
  };

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    
    // Simulate loading delay
    setTimeout(() => {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, validate credentials with backend
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUserProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const updatePreferences = (preferences: Partial<UserPreferences>) => {
    if (user) {
      const updatedPreferences = { ...user.preferences, ...preferences };
      const updatedUser = { ...user, preferences: updatedPreferences };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, updateUserProfile, updatePreferences, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};