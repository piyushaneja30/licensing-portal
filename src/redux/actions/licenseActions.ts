import { createAsyncThunk } from '@reduxjs/toolkit';
import { licenseApi } from '../../services/api';
import { License } from '../../types/license';

export const fetchUserLicenses = createAsyncThunk(
  'licenses/fetchUserLicenses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await licenseApi.getUserLicenses();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch licenses');
    }
  }
);

export const renewLicense = createAsyncThunk(
  'licenses/renewLicense',
  async (licenseId: string, { rejectWithValue }) => {
    try {
      const response = await licenseApi.renewLicense(licenseId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to renew license');
    }
  }
); 