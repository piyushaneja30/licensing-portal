import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from './slices/authSlice';
import licenseReducer, { LicenseState } from './slices/licenseSlice';
import applicationReducer, { ApplicationsState } from '../redux/reducers/applicationsSlice';

// Define the root state interface
interface StoreState {
  auth: AuthState;
  license: LicenseState;
  application: ApplicationsState;
}

const persistConfig: PersistConfig<StoreState> = {
  key: 'root',
  storage,
  whitelist: ['auth', 'application'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  license: licenseReducer,
  application: applicationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 