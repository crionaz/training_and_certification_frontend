import api from './api';
import type { Notification, ApiResponse } from '../types';

export const notificationService = {
  getMyNotifications: async (): Promise<ApiResponse<Notification[]>> => {
    const response = await api.get('/notifications/my-notifications');
    return response.data;
  },

  getAll: async (): Promise<ApiResponse<Notification[]>> => {
    const response = await api.get('/notifications');
    return response.data;
  },

  markAsSent: async (id: string): Promise<ApiResponse<Notification>> => {
    const response = await api.put(`/notifications/${id}/mark-sent`);
    return response.data;
  },
};
