import { createSlice } from '@reduxjs/toolkit';
import { fetchUserApplications, fetchApplicationDetails, submitApplication, updateApplication } from '../actions/applicationActions';
import { LicenseApplication } from '../../types/license';

export interface ApplicationsState {
  applications: LicenseApplication[];
  currentApplication: LicenseApplication | null;
  loading: boolean;
  error: string | null;
}

const initialState: ApplicationsState = {
  applications: [],
  currentApplication: null,
  loading: false,
  error: null,
};

const applicationsSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    clearApplicationError: (state) => {
      state.error = null;
    },
    clearCurrentApplication: (state) => {
      state.currentApplication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Applications
      .addCase(fetchUserApplications.pending, (state) => {
        console.log('Reducer: fetchUserApplications.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserApplications.fulfilled, (state, action) => {
        console.log('Reducer: fetchUserApplications.fulfilled');
        console.log('Payload received:', action.payload);
        console.log('Payload length:', action.payload?.length);
        
        state.loading = false;
        state.applications = action.payload || [];
        
        console.log('State after update:', {
          applicationsLength: state.applications.length,
          applications: JSON.stringify(state.applications, null, 2)
        });
      })
      .addCase(fetchUserApplications.rejected, (state, action) => {
        console.error('Reducer: fetchUserApplications.rejected');
        console.error('Error payload:', action.payload);
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Application Details
      .addCase(fetchApplicationDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentApplication = action.payload;
      })
      .addCase(fetchApplicationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Submit Application
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
      // Update Application
      .addCase(updateApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateApplication.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.applications.findIndex(app => app.id === action.payload.id);
        if (index !== -1) {
          state.applications[index] = action.payload;
        }
      })
      .addCase(updateApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearApplicationError, clearCurrentApplication } = applicationsSlice.actions;
export default applicationsSlice.reducer; 