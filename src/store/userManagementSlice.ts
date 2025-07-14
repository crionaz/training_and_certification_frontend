import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminService } from '../services/adminService';
import { authService } from '../services/authService';
import type { User, PaginationParams, PaginatedResponse, RegisterData } from '../types';

interface UserManagementState {
  users: User[];
  currentUser: User | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    offset: number;
  } | null;
  isLoading: boolean;
  error: string | null;
  filters: PaginationParams;
}

const initialState: UserManagementState = {
  users: [],
  currentUser: null,
  pagination: null,
  isLoading: false,
  error: null,
  filters: {
    page: 1,
    limit: 10,
  },
};

// Async thunks
export const fetchUsers = createAsyncThunk(
  'userManagement/fetchUsers',
  async (params: PaginationParams = {}, { rejectWithValue }) => {
    try {
      console.log('Fetching users with params:', params);
      const response = await adminService.getAllUsers(params);
      console.log('API Response:', response);
      return response;
    } catch (error: unknown) {
      console.error('Error fetching users:', error);
      return rejectWithValue((error as any).response?.data?.message || 'Failed to fetch users');
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'userManagement/fetchUserById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await adminService.getUserById(id);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to fetch user');
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'userManagement/updateUserStatus',
  async ({ id, status }: { id: string; status: 'active' | 'locked' | 'close' }, { rejectWithValue }) => {
    try {
      const response = await adminService.updateUserStatus(id, status);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to update user status');
    }
  }
);

export const createUser = createAsyncThunk(
  'userManagement/createUser',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response.data.user;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to create user');
    }
  }
);

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {
        page: 1,
        limit: 10,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch User By ID
      .addCase(fetchUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update User Status
      .addCase(updateUserStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update user in the list
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        // Update current user if it's the same
        if (state.currentUser?.id === action.payload.id) {
          state.currentUser = action.payload;
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create User
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the new user to the beginning of the list
        state.users.unshift(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentUser, setFilters, resetFilters } = userManagementSlice.actions;
export default userManagementSlice.reducer;
