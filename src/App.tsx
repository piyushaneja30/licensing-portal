import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './components/dashboard/Dashboard';
import ApplicationFlow from './components/application/ApplicationFlow';
import ApplicationHistory from './components/application/ApplicationHistory';
import ApplicationSuccess from './components/application/ApplicationSuccess';
import LicenseSearch from './components/license/LicenseSearch';
import Profile from './components/profile/Profile';
import Settings from './components/settings/Settings';
import HelpSupport from './components/help/HelpSupport';
import MyLicenses from './components/license/MyLicenses';
import LandingPage from './components/LandingPage';
import { RootState } from './store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  // Create a client
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }), []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#dc004e',
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
              },
            },
          },
        },
      }),
    [mode]
  );

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
              <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
              
              {/* Protected routes */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <DashboardLayout onToggleTheme={() => setMode(mode === 'light' ? 'dark' : 'light')} mode={mode}>
                      <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/new-application" element={<ApplicationFlow />} />
                        <Route path="/application-success/:applicationNumber" element={<ApplicationSuccess />} />
                        <Route path="/history" element={<ApplicationHistory />} />
                        <Route path="/license-search" element={<LicenseSearch />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/support" element={<HelpSupport />} />
                        <Route path="/licenses" element={<MyLicenses />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default App; 