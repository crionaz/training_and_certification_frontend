import api from './api';
import type { Training, ApiResponse } from '../types';

export const trainingService = {
  getAll: async (): Promise<ApiResponse<Training[]>> => {
    const response = await api.get('/trainings');
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Training>> => {
    const response = await api.get(`/trainings/${id}`);
    return response.data;
  },

  create: async (trainingData: Omit<Training, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Training>> => {
    const response = await api.post('/trainings', trainingData);
    return response.data;
  },

  update: async (id: string, trainingData: Partial<Training>): Promise<ApiResponse<Training>> => {
    const response = await api.put(`/trainings/${id}`, trainingData);
    return response.data;
  },

  assignUsers: async (id: string, userIds: string[]): Promise<ApiResponse<Training>> => {
    const response = await api.post(`/trainings/${id}/assign`, { userIds });
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/trainings/${id}`);
    return response.data;
  },
};
