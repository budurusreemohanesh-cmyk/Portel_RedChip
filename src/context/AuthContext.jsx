import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('innohacks_user');
    const storedAuth = localStorage.getItem('innohacks_auth');
    
    if (storedUser && storedAuth === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    const mockUser = {
      id: '1',
      name: 'Alex Chen',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      role: 'Full Stack Developer',
      team: 'CyberSynthetics',
      teamRole: 'leader',
      skills: ['React', 'Node.js', 'Python'],
      github: 'https://github.com/alexchen',
      linkedin: 'https://linkedin.com/in/alexchen',
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('innohacks_user', JSON.stringify(mockUser));
    localStorage.setItem('innohacks_auth', 'true');
    return { success: true };
  };

  const signup = (name, email, password, college) => {
    const mockUser = {
      id: Date.now().toString(),
      name: name,
      email: email,
      college: college,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      role: 'Developer',
      team: null,
      teamRole: null,
      skills: [],
      github: '',
      linkedin: '',
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('innohacks_user', JSON.stringify(mockUser));
    localStorage.setItem('innohacks_auth', 'true');
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('innohacks_user');
    localStorage.removeItem('innohacks_auth');
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('innohacks_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
