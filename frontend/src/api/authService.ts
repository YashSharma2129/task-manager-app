import { apiClient } from './apiClient';
import type { LoginCredentials, SignupData, User } from '@/types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<string> {
    const response = await apiClient.post<{ access_token: string }>('/auth/login', credentials);
    return response.access_token;
  },

  async signup(data: SignupData): Promise<User> {
    const response = await apiClient.post<User>('/users/signup', data);
    return response;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>('/users/me');
    return response;
  },

};
