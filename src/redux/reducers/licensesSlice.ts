import { createSlice } from '@reduxjs/toolkit';
import { fetchUserLicenses, renewLicense } from '../actions/licenseActions';
import { License } from '../../types/license';

interface LicensesState {
  licenses: License[];
  loading: boolean;
  error: string | null;
}

const initialState: LicensesState = {
  licenses: [],
  loading: false,
  error: null,
};

const licensesSlice = createSlice({
  name: 'licenses',
  initialState,
  reducers: {
    clearLicenseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Licenses
      .addCase(fetchUserLicenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLicenses.fulfilled, (state, action) => {
        state.loading = false;
        state.licenses = action.payload;
      })
      .addCase(fetchUserLicenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Renew License
      .addCase(renewLicense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(renewLicense.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.licenses.findIndex(license => license.id === action.payload.id);
        if (index !== -1) {
          state.licenses[index] = action.payload;
        }
      })
      .addCase(renewLicense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearLicenseError } = licensesSlice.actions;
export default licensesSlice.reducer; 