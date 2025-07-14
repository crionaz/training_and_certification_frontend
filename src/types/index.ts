export interface User {
  _id: string;
  empNo: string;
  fullName: string;
  email: string;
  departmentId?: string;
  role: 'staff' | 'admin' | 'manager';
  managerId?: string;
  address: string;
  phone: string;
  dateOfBirth: string;
  status: 'active' | 'suspended' | 'deleted';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface Department {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Training {
  _id: string;
  trainingName: string;
  department: string;
  content: string;
  lastDate: string;
  users: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserTraining {
  _id: string;
  userId: string;
  trainingId: string;
  content: string;
  status: 'pending' | 'inprogress' | 'completed' | 'expired';
  retrainingDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  _id: string;
  userId: string;
  trainingId: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  _id: string;
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
