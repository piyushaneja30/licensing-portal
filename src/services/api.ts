import axios from 'axios';
import { store } from '../store';
import { RootState } from '../store';

const API_BASE_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const state = store.getState() as RootState;
    const token = state.auth.token;
    
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Setting auth header:', config.headers.Authorization); // Debug log
    } else {
      console.log('No token found in state'); // Debug log
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error); // Debug log
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      console.error('Unauthorized access:', error.response?.data); // Debug log
      store.dispatch({ type: 'auth/logout' });
    }
    return Promise.reject(error);
  }
);

export default api;

// Application APIs
export const applicationApi = {
  // Create new application
  create: async (data: any) => {
    try {
      const response = await api.post('/applications', data);
      return response.data;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  },

  // Get application by ID
  getById: async (id: string) => {
    try {
      const response = await api.get(`/applications/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  },

  // Get user's applications
  getUserApplications: async () => {
    try {
      const response = await api.get('/applications/user');
      return response.data;
    } catch (error) {
      console.error('Error fetching user applications:', error);
      throw error;
    }
  },

  // Update personal information
  updatePersonalInfo: async (id: string, data: any) => {
    try {
      const response = await api.put(`/applications/${id}/personal-info`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating personal info:', error);
      throw error;
    }
  },

  // Update education
  updateEducation: async (id: string, data: any) => {
    try {
      const response = await api.put(`/applications/${id}/education`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating education:', error);
      throw error;
    }
  },

  // Add document
  addDocument: async (id: string, data: any) => {
    try {
      const response = await api.post(`/applications/${id}/documents`, data);
      return response.data;
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  },

  // Submit application
  submit: async (id: string) => {
    try {
      const response = await api.put(`/applications/${id}/submit`);
      return response.data;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },

  // Delete application
  delete: async (id: string) => {
    try {
      const response = await api.delete(`/applications/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  }
}; 