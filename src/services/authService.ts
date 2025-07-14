import api from './api';
import type { LoginCredentials, RegisterData, User, ApiResponse } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string; refreshToken: string }>> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Public registration - creates account with staff role
  createAccount: async (userData: RegisterData): Promise<ApiResponse<{ user: User; token: string; refreshToken: string }>> => {
    const response = await api.post('/auth/create-account', userData);
    return response.data;
  },

  // Admin registration - can set specific roles
  register: async (userData: RegisterData): Promise<ApiResponse<{ user: User; token: string; refreshToken: string }>> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<void>> => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<ApiResponse<User>> => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },

  refreshToken: async (refreshToken: string): Promise<ApiResponse<{ token: string; refreshToken: string }>> => {
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data;
  },
};
