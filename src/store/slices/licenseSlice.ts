import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface License {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'expired' | 'pending';
  expiryDate: string;
}

export interface LicenseState {
  licenses: License[];
  loading: boolean;
  error: string | null;
}

const initialState: LicenseState = {
  licenses: [],
  loading: false,
  error: null,
};

const licenseSlice = createSlice({
  name: 'license',
  initialState,
  reducers: {
    setLicenses: (state, action: PayloadAction<License[]>) => {
      state.licenses = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLicenses, setLoading, setError } = licenseSlice.actions;

export default licenseSlice.reducer; 