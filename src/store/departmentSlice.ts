import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { departmentService } from '../services/departmentService';
import type { Department } from '../types';

interface DepartmentState {
  departments: Department[];
  currentDepartment: Department | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DepartmentState = {
  departments: [],
  currentDepartment: null,
  isLoading: false,
  error: null,
};

export const fetchDepartments = createAsyncThunk(
  'departments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await departmentService.getAll();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to fetch departments');
    }
  }
);

export const fetchDepartmentById = createAsyncThunk(
  'departments/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await departmentService.getById(id);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to fetch department');
    }
  }
);

export const createDepartment = createAsyncThunk(
  'departments/create',
  async (departmentData: Omit<Department, '_id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await departmentService.create(departmentData);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to create department');
    }
  }
);

export const updateDepartment = createAsyncThunk(
  'departments/update',
  async ({ id, data }: { id: string; data: Partial<Department> }, { rejectWithValue }) => {
    try {
      const response = await departmentService.update(id, data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to update department');
    }
  }
);

export const deleteDepartment = createAsyncThunk(
  'departments/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await departmentService.delete(id);
      return id;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to delete department');
    }
  }
);

const departmentSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentDepartment: (state) => {
      state.currentDepartment = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchDepartments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch By ID
      .addCase(fetchDepartmentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentDepartment = action.payload;
      })
      .addCase(fetchDepartmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createDepartment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departments.push(action.payload);
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update
      .addCase(updateDepartment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.departments.findIndex(dept => dept._id === action.payload._id);
        if (index !== -1) {
          state.departments[index] = action.payload;
        }
        if (state.currentDepartment?._id === action.payload._id) {
          state.currentDepartment = action.payload;
        }
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete
      .addCase(deleteDepartment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departments = state.departments.filter(dept => dept._id !== action.payload);
        if (state.currentDepartment?._id === action.payload) {
          state.currentDepartment = null;
        }
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
