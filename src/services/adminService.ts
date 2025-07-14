import api from './api';
import type { 
  User, 
  ApiResponse, 
  PaginationParams, 
  PaginatedResponse, 
  Transaction, 
  AuditLog 
} from '../types';

export const adminService = {
  // Get all users with pagination and filters
  getAllUsers: async (params?: PaginationParams): Promise<PaginatedResponse<User>> => {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.role) queryParams.append('role', params.role);
    if (params?.search) queryParams.append('search', params.search);

    const queryString = queryParams.toString();
    const url = `/admin/users${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get(url);
    
    // According to API docs, the response should have data and pagination at root level
    // If it's wrapped in success/data, we need to extract it
    if (response.data.success) {
      return {
        data: response.data.data,
        pagination: response.data.pagination
      };
    }
    
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },

  // Update user status
  updateUserStatus: async (id: string, status: 'active' | 'locked' | 'close'): Promise<ApiResponse<User>> => {
    const response = await api.put(`/admin/users/${id}/status`, { status });
    return response.data;
  },

  // Get admin transactions (placeholder)
  getTransactions: async (): Promise<ApiResponse<Transaction[]>> => {
    const response = await api.get('/admin/transactions');
    return response.data;
  },

  // Get audit logs (placeholder)
  getAuditLogs: async (): Promise<ApiResponse<AuditLog[]>> => {
    const response = await api.get('/admin/audit-logs');
    return response.data;
  },
};
