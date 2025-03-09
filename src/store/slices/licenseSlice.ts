import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { LicenseApplication, License, LicenseType } from '../../types/license';
import { licenseTypeApi } from '../../services/api';

interface LicenseState {
  applications: LicenseApplication[];
  licenses: License[];
  availableTypes: LicenseType[];
  loading: boolean;
  error: string | null;
  licenseTypes: LicenseType[];
}

const initialState: LicenseState = {
  applications: [],
  licenses: [],
  availableTypes: [],
  loading: false,
  error: null,
  licenseTypes: [],
};

// Async thunks for API calls
export const fetchLicenseTypes = createAsyncThunk(
  'license/fetchLicenseTypes',
  async () => {
    const response = await licenseTypeApi.getAll();
    return response.data;
  }
);

export const createLicenseType = createAsyncThunk(
  'license/createLicenseType',
  async (licenseType: Partial<LicenseType>) => {
    const response = await licenseTypeApi.create(licenseType);
    return response.data;
  }
);

export const updateLicenseType = createAsyncThunk(
  'license/updateLicenseType',
  async ({ id, data }: { id: string; data: Partial<LicenseType> }) => {
    await licenseTypeApi.update(id, data);
    return { id, ...data };
  }
);

export const deleteLicenseType = createAsyncThunk(
  'license/deleteLicenseType',
  async (id: string) => {
    await licenseTypeApi.delete(id);
    return id;
  }
);

export const submitApplication = createAsyncThunk(
  'license/submitApplication',
  async (application: Partial<LicenseApplication>, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(application),
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserLicenses = createAsyncThunk(
  'license/fetchUserLicenses',
  async (userId: string, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/users/${userId}/licenses`);
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserApplications = createAsyncThunk(
  'license/fetchUserApplications',
  async (userId: string, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/users/${userId}/applications`);
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const licenseSlice = createSlice({
  name: 'license',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch license types
      .addCase(fetchLicenseTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLicenseTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.licenseTypes = action.payload;
      })
      .addCase(fetchLicenseTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch license types';
      })
      // Submit application
      .addCase(submitApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.applications.push(action.payload);
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch user licenses
      .addCase(fetchUserLicenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLicenses.fulfilled, (state, action) => {
        state.loading = false;
        state.licenses = action.payload;
      })
      .addCase(fetchUserLicenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch user applications
      .addCase(fetchUserApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchUserApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createLicenseType.fulfilled, (state, action) => {
        state.licenseTypes.push(action.payload);
      })
      .addCase(updateLicenseType.fulfilled, (state, action) => {
        const index = state.licenseTypes.findIndex(lt => lt.id === action.payload.id);
        if (index !== -1) {
          state.licenseTypes[index] = {
            ...state.licenseTypes[index],
            ...action.payload
          };
        }
      })
      .addCase(deleteLicenseType.fulfilled, (state, action) => {
        state.licenseTypes = state.licenseTypes.filter(lt => lt.id !== action.payload);
      });
  },
});

export const { clearError } = licenseSlice.actions;
export default licenseSlice.reducer; 