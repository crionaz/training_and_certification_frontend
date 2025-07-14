export interface User {
  id: string;
  empNo: string;
  fullName: string;
  email: string;
  departmentId?: string;
  role: 'staff' | 'admin' | 'manager';
  managerId?: string;
  address: string;
  phone: string;
  dateOfBirth: string;
  status: 'active' | 'locked' | 'close';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Training {
  id: string;
  trainingName: string;
  department: string | Department;
  content: string;
  lastDate: string;
  users: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserTraining {
  id: string;
  userId: string;
  trainingId: string;
  content: string;
  status: 'pending' | 'inprogress' | 'completed' | 'expired';
  retrainingDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  userId: string;
  trainingId: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  users: string[];
  event: 'assignments' | 'compliance' | 'completion';
  description: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  empNo: string;
  fullName: string;
  email: string;
  password: string;
  departmentId?: string;
  role: 'staff' | 'admin' | 'manager';
  managerId?: string;
  address: string;
  phone: string;
  dateOfBirth: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface ComplianceDashboard {
  totalUsers: number;
  compliantUsers: number;
  pendingTrainings: number;
  expiredCertifications: number;
  upcomingDeadlines: UserTraining[];
  departmentCompliance: {
    department: string;
    total: number;
    compliant: number;
    percentage: number;
  }[];
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'locked' | 'close';
  role?: 'staff' | 'manager' | 'admin';
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    offset: number;
  };
}

export interface Transaction {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}
