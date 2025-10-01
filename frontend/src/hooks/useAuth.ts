import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
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
      
      toast.success('Login successful! Welcome back.', { id: 'auth-success' });
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const signup = useCallback(async (data: SignupData) => {
    try {
      setIsLoading(true);
      await authService.signup(data);
      toast.success('Account created successfully! Please log in.', { id: 'auth-success' });
      navigate('/login');
    } catch (error) {
      toast.error('Account creation failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    toast.success('Logged out successfully!', { id: 'auth-success' });
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
