import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Profile {
  firstName: string;
  lastName: string;
  phone?: string;
  profession?: string;
  licenseNumber?: string;
  specialization?: string;
  yearsOfExperience?: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  company?: string;
  title?: string;
  bio?: string;
}

export interface User {
  _id: string;
  email: string;
  role: string;
  accountType: string;
  firstName?: string;
  lastName?: string;
  profile?: {
    firstName: string;
    lastName: string;
    phone: string;
    profession: string;
    licenseNumber: string;
    specialization: string;
    yearsOfExperience: number;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  mfaRequired: boolean;
  mfaVerified: boolean;
  isVerificationRequired: boolean;
  verificationId: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  mfaRequired: false,
  mfaVerified: false,
  isVerificationRequired: false,
  verificationId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.mfaRequired = false;
      state.mfaVerified = false;
      state.isVerificationRequired = false;
      state.verificationId = null;
      localStorage.removeItem('token');
    },
    setVerificationRequired: (state, action: PayloadAction<{ verificationId: string }>) => {
      state.isVerificationRequired = true;
      state.verificationId = action.payload.verificationId;
    },
    clearVerification: (state) => {
      state.isVerificationRequired = false;
      state.verificationId = null;
    },
    clearError: (state) => {
      state.error = null;
      state.loading = false;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setVerificationRequired,
  clearVerification,
  clearError,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer; 