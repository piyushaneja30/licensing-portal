import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

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
      state.isAuthenticated = false;
      state.mfaVerified = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.mfaRequired = action.payload.mfaRequired;
      state.error = null;
      state.mfaVerified = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.mfaVerified = false;
    },
    mfaVerified: (state) => {
      state.mfaVerified = true;
      state.loading = false;
    },
    logout: (state) => {
      return { ...initialState };
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
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state) => {
      // Reset critical states on rehydration
      state.loading = false;
      state.error = null;
    });
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