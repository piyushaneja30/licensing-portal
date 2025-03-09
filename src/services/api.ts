import axios from 'axios';
import { LicenseType } from '../types/license';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const licenseTypeApi = {
    getAll: () => api.get<LicenseType[]>('/license-types'),
    getById: (id: string) => api.get<LicenseType>(`/license-types/${id}`),
    create: (data: Partial<LicenseType>) => api.post<LicenseType>('/license-types', data),
    update: (id: string, data: Partial<LicenseType>) => api.put(`/license-types/${id}`, data),
    delete: (id: string) => api.delete(`/license-types/${id}`)
};

export const applicationApi = {
    getAll: () => api.get('/applications'),
    getById: (id: string) => api.get(`/applications/${id}`),
    create: (data: any) => api.post('/applications', data),
    update: (id: string, data: any) => api.put(`/applications/${id}`, data),
    delete: (id: string) => api.delete(`/applications/${id}`),
    submit: (id: string) => api.post(`/applications/${id}/submit`),
    updateStatus: (id: string, status: string) => 
        api.put(`/applications/${id}/status`, null, { params: { status } })
};

export const personalInfoApi = {
    get: (applicationId: string) => api.get(`/applications/${applicationId}/personal-info`),
    save: (applicationId: string, data: any) => 
        api.post(`/applications/${applicationId}/personal-info`, data)
};

export const educationApi = {
    get: (applicationId: string) => api.get(`/applications/${applicationId}/education`),
    save: (applicationId: string, data: any) => 
        api.post(`/applications/${applicationId}/education`, data)
};

export const workExperienceApi = {
    get: (applicationId: string) => api.get(`/applications/${applicationId}/work-experience`),
    save: (applicationId: string, data: any) => 
        api.post(`/applications/${applicationId}/work-experience`, data)
};

export const referencesApi = {
    get: (applicationId: string) => api.get(`/applications/${applicationId}/references`),
    save: (applicationId: string, data: any) => 
        api.post(`/applications/${applicationId}/references`, data)
};

export const documentsApi = {
    get: (applicationId: string) => api.get(`/applications/${applicationId}/documents`),
    save: (applicationId: string, data: any) => 
        api.post(`/applications/${applicationId}/documents`, data)
}; 