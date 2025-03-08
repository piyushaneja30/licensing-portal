import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  mfaRequired: false,
  mfaVerified: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.mfaRequired = action.payload.mfaRequired;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    mfaVerified: (state) => {
      state.mfaVerified = true;
    },
    logout: (state) => {
      return initialState;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  mfaVerified,
  logout,
  updateUser,
  setError,
  clearError,
} = authSlice.actions;

export default authSlice.reducer; 