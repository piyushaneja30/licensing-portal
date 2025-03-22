import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  useTheme,
  alpha,
  Stack,
  Fade,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure, clearError } from '../../store/slices/authSlice';
import LockIcon from '@mui/icons-material/Lock';
import api from '../../services/api';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!email || !password) {
      return;
    }

    dispatch(loginStart());
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      
      dispatch(loginSuccess(data));
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          background: 'radial-gradient(circle at center, #1976d2 1px, transparent 1px) 0 0 / 40px 40px',
        }}
      />

      <Fade in={isLoaded} timeout={1000}>
        <Paper
          elevation={2}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 440,
            position: 'relative',
            borderRadius: '24px',
            background: '#fff',
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '16px',
                background: alpha(theme.palette.primary.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
              }}
            >
              <LockIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
            </Box>

            <Typography
              variant="h4"
              sx={{
                color: '#1a1a1a',
                fontWeight: 600,
                textAlign: 'center',
                fontSize: '1.75rem',
                mb: 1,
              }}
            >
              Sign in to Licensing Portal
            </Typography>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  width: '100%',
                  bgcolor: alpha('#ff3d00', 0.1),
                  border: `1px solid ${alpha('#ff3d00', 0.2)}`,
                  '& .MuiAlert-icon': {
                    color: '#ff3d00'
                  }
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={handleLogin} style={{ width: '100%' }}>
              <Stack spacing={3} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  error={touched.email && !email}
                  helperText={touched.email && !email ? 'Email is required' : ''}
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: alpha('#000', 0.2),
                      },
                      '&:hover fieldset': {
                        borderColor: alpha('#000', 0.3),
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched({ ...touched, password: true })}
                  error={touched.password && !password}
                  helperText={touched.password && !password ? 'Password is required' : ''}
                  disabled={loading}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: alpha('#000', 0.2),
                      },
                      '&:hover fieldset': {
                        borderColor: alpha('#000', 0.3),
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading || !email || !password}
                  sx={{
                    py: 1.5,
                    bgcolor: theme.palette.primary.main,
                    color: '#fff',
                    fontWeight: 600,
                    borderRadius: '12px',
                    fontSize: '1rem',
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    },
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </Button>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Link href="/forgot-password" underline="hover" sx={{ color: theme.palette.primary.main }}>
                    Forgot password?
                  </Link>
                  <Link href="/register" underline="hover" sx={{ color: theme.palette.primary.main }}>
                    Create account
                  </Link>
                </Box>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Fade>
    </Box>
  );
};

export default Login; 