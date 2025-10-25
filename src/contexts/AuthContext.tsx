// contexts/AuthContext.tsx
'use client';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { apiService } from '@/services/api';

export interface User {
  id: number;
  username: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token and validate it on app load
    const savedToken = Cookies.get('auth_token');
    if (savedToken) {
      validateToken(savedToken);
    } else {
      setIsLoading(false);
    }
  }, []);

// contexts/AuthContext.tsx - Fix the validateToken function
const validateToken = async (token: string) => {
  try {
    // Use your API service instead of direct fetch
    const result = await apiService.validateToken();
    if (result.valid) {
      setToken(token);
      setUser(result.user);
      Cookies.set('auth_token', token, { expires: 1 });
    } else {
      logout();
    }
  } catch (error) {
    console.error('Token validation failed:', error);
    logout();
  } finally {
    setIsLoading(false);
  }
};
// In the login function:
const login = (newToken: string, userData: User) => {
  setToken(newToken);
  setUser(userData);
  Cookies.set('auth_token', newToken, { expires: 1 });
  apiService.setToken(newToken); // Add this line
};

 // In the logout function:
const logout = () => {
  setToken(null);
  setUser(null);
  Cookies.remove('auth_token');
  apiService.clearToken(); // Add this line
};

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated: !!token && !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};