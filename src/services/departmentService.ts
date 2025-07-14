import api from './api';
import type { Department, ApiResponse } from '../types';

export const departmentService = {
  getAll: async (): Promise<ApiResponse<Department[]>> => {
    const response = await api.get('/departments');
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Department>> => {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  },

  create: async (departmentData: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Department>> => {
    const response = await api.post('/departments', departmentData);
    return response.data;
  },

  update: async (id: string, departmentData: Partial<Department>): Promise<ApiResponse<Department>> => {
    const response = await api.put(`/departments/${id}`, departmentData);
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/departments/${id}`);
    return response.data;
  },
};
