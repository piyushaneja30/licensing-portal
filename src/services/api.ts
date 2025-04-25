import axios from 'axios';
import { LicenseApplication } from '../types/license';

// In development, if REACT_APP_API_BASE_URL is not set, default to localhost:5001
const API_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5001/api'
  : '/api';  // In production, use relative path

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('API Request:', {
    url: config.url,
    method: config.method,
    hasToken: !!token,
  });
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  console.error('Request interceptor error:', error);
  return Promise.reject(error);
});

// Add response interceptor for debugging and error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data || error.message,
    });

    // If token is invalid or expired, clear it and redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Applications API
export const applicationApi = {
  getUserApplications: () => api.get<LicenseApplication[]>('/applications/user'),
  getApplicationDetails: (id: string) => api.get<LicenseApplication>(`/applications/${id}`),
  createApplication: async (data: Partial<LicenseApplication>) => {
    console.log('=== API: Application Creation Started ===');
    try {
      const response = await api.post<LicenseApplication>('/applications/create', data);
      const applicationId = response.data._id || response.data.id;
      console.log('Application created with ID:', applicationId);
      return response;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  },
  submitApplication: async (applicationId: string) => {
    console.log('=== API: Application Submission Started ===');
    console.log('Submitting application with ID:', applicationId);
    try {
      if (!applicationId) {
        throw new Error('Application ID is required for submission');
      }
      const response = await api.post<LicenseApplication>(`/applications/${applicationId}/submit`);
      console.log('API: Submission Response:', response.data);
      return response;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },
  updateApplication: (id: string, data: Partial<LicenseApplication>) => api.put<LicenseApplication>(`/applications/${id}`, data),
};

// Licenses API
export const licenseApi = {
  getUserLicenses: () => api.get('/licenses'),
  getLicenseDetails: (id: string) => api.get(`/licenses/${id}`),
  renewLicense: (id: string) => api.post(`/licenses/${id}/renew`),
};

export default api; 