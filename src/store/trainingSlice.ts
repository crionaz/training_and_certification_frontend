import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { trainingService } from '../services/trainingService';
import type { Training } from '../types';

interface TrainingState {
  trainings: Training[];
  currentTraining: Training | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TrainingState = {
  trainings: [],
  currentTraining: null,
  isLoading: false,
  error: null,
};

export const fetchTrainings = createAsyncThunk(
  'trainings/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await trainingService.getAll();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to fetch trainings');
    }
  }
);

export const fetchTrainingById = createAsyncThunk(
  'trainings/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await trainingService.getById(id);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to fetch training');
    }
  }
);

export const createTraining = createAsyncThunk(
  'trainings/create',
  async (trainingData: Omit<Training, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await trainingService.create(trainingData);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to create training');
    }
  }
);

export const updateTraining = createAsyncThunk(
  'trainings/update',
  async ({ id, trainingData }: { id: string; trainingData: Partial<Training> }, { rejectWithValue }) => {
    try {
      const response = await trainingService.update(id, trainingData);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to update training');
    }
  }
);

export const deleteTraining = createAsyncThunk(
  'trainings/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await trainingService.delete(id);
      return id;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to delete training');
    }
  }
);

export const assignUsers = createAsyncThunk(
  'trainings/assignUsers',
  async ({ id, userIds }: { id: string; userIds: string[] }, { rejectWithValue }) => {
    try {
      const response = await trainingService.assignUsers(id, userIds);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue((error as any).response?.data?.message || 'Failed to assign users');
    }
  }
);

const trainingSlice = createSlice({
  name: 'trainings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentTraining: (state) => {
      state.currentTraining = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Trainings
      .addCase(fetchTrainings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrainings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trainings = action.payload;
      })
      .addCase(fetchTrainings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch Training by ID
      .addCase(fetchTrainingById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrainingById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTraining = action.payload;
      })
      .addCase(fetchTrainingById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Training
      .addCase(createTraining.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTraining.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the new training to the beginning of the list
        state.trainings.unshift(action.payload);
      })
      .addCase(createTraining.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update Training
      .addCase(updateTraining.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTraining.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update training in the list
        const index = state.trainings.findIndex(training => training.id === action.payload.id);
        if (index !== -1) {
          state.trainings[index] = action.payload;
        }
        // Update current training if it's the same
        if (state.currentTraining?.id === action.payload.id) {
          state.currentTraining = action.payload;
        }
      })
      .addCase(updateTraining.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete Training
      .addCase(deleteTraining.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTraining.fulfilled, (state, action) => {
        state.isLoading = false;
        // Remove training from the list
        state.trainings = state.trainings.filter(training => training.id !== action.payload);
        // Clear current training if it was deleted
        if (state.currentTraining?.id === action.payload) {
          state.currentTraining = null;
        }
      })
      .addCase(deleteTraining.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Assign Users
      .addCase(assignUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(assignUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update training in the list
        const index = state.trainings.findIndex(training => training.id === action.payload.id);
        if (index !== -1) {
          state.trainings[index] = action.payload;
        }
        // Update current training if it's the same
        if (state.currentTraining?.id === action.payload.id) {
          state.currentTraining = action.payload;
        }
      })
      .addCase(assignUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentTraining } = trainingSlice.actions;
export default trainingSlice.reducer;
