import { createAsyncThunk } from '@reduxjs/toolkit';
import { applicationApi } from '../../services/api';
import { LicenseApplication } from '../../types/license';
import axios from 'axios';

interface ApiError {
  response?: {
    data?: string;
  };
  message?: string;
}

export const fetchUserApplications = createAsyncThunk(
  'application/fetchUserApplications',
  async (_, { rejectWithValue }) => {
    try {
      console.log('=== Redux Action: fetchUserApplications Started ===');
      const token = localStorage.getItem('token');
      console.log('Token exists?:', !!token);
      
      if (!token) {
        console.error('No authentication token found');
        return rejectWithValue('No authentication token found');
      }

      console.log('Calling API getUserApplications...');
      const response = await applicationApi.getUserApplications();
      console.log('API Response Status:', response.status);
      console.log('API Response Data Length:', response.data?.length);
      console.log('API Response Data:', JSON.stringify(response.data, null, 2));
      
      if (!response.data) {
        console.error('No data received from API');
        return rejectWithValue('No data received from API');
      }

      return response.data;
    } catch (error) {
      console.error('=== Redux Action: fetchUserApplications Error ===');
      const apiError = error as ApiError;
      console.error('Error details:', {
        message: apiError.message,
        response: apiError.response?.data
      });
      return rejectWithValue(apiError.response?.data || apiError.message || 'Failed to fetch applications');
    } finally {
      console.log('=== Redux Action: fetchUserApplications Ended ===');
    }
  }
);

export const fetchApplicationDetails = createAsyncThunk(
  'application/fetchApplicationDetails',
  async (applicationId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await applicationApi.getApplicationDetails(applicationId);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data || apiError.message || 'Failed to fetch application details');
    }
  }
);

export const submitApplication = createAsyncThunk(
  'application/submitApplication',
  async (applicationData: Partial<LicenseApplication>, { rejectWithValue }) => {
    console.log('=== Redux Action: submitApplication Started ===');
    try {
      const token = localStorage.getItem('token');
      console.log('Token exists?:', !!token);
      
      if (!token) {
        console.error('No authentication token found');
        return rejectWithValue('No authentication token found');
      }

      // First create the application
      const createResponse = await applicationApi.createApplication(applicationData);
      console.log('Application created:', createResponse.data);

      // Then submit it
      const submitResponse = await applicationApi.submitApplication(createResponse.data.id);
      console.log('Application submitted:', submitResponse.data);

      return submitResponse.data;
    } catch (error) {
      console.error('=== Redux Action: submitApplication Error ===');
      const apiError = error as ApiError;
      console.error('Error details:', {
        message: apiError.message,
        response: apiError.response?.data
      });
      return rejectWithValue(apiError.response?.data || apiError.message || 'Failed to submit application');
    }
  }
);

export const updateApplication = createAsyncThunk(
  'application/updateApplication',
  async ({ id, data }: { id: string; data: Partial<LicenseApplication> }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await applicationApi.updateApplication(id, data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return rejectWithValue(apiError.response?.data || apiError.message || 'Failed to update application');
    }
  }
); 