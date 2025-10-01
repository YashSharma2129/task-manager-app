import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/api/authService';
import type { User, LoginCredentials, SignupData } from '@/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = !!token && !!user;

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch {
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };
    
    initializeAuth();
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const token = await authService.login(credentials);
      setToken(token);
      localStorage.setItem('token', token);
      
      const userData = await authService.getCurrentUser();
      setUser(userData);
      
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const signup = useCallback(async (data: SignupData) => {
    try {
      setIsLoading(true);
      await authService.signup(data);
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
  };
};
