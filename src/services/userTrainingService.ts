import api from './api';
import type { UserTraining, ComplianceDashboard, ApiResponse } from '../types';

export const userTrainingService = {
  getMyTrainings: async (): Promise<ApiResponse<UserTraining[]>> => {
    const response = await api.get('/user-trainings/my-trainings');
    return response.data;
  },

  getAll: async (): Promise<ApiResponse<UserTraining[]>> => {
    const response = await api.get('/user-trainings');
    return response.data;
  },

  updateStatus: async (id: string, status: UserTraining['status']): Promise<ApiResponse<UserTraining>> => {
    const response = await api.put(`/user-trainings/${id}/status`, { status });
    return response.data;
  },

  getComplianceDashboard: async (departmentId?: string): Promise<ApiResponse<ComplianceDashboard>> => {
    const params = departmentId ? `?departmentId=${departmentId}` : '';
    const response = await api.get(`/user-trainings/compliance-dashboard${params}`);
    return response.data;
  },
};
