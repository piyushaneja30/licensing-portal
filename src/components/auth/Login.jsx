import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure, clearError } from '../../store/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  // Clear any existing errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(loginStart());
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For testing, always show 2FA dialog
      setShowVerification(true);
      dispatch(clearError()); // Clear loading state after showing dialog
    } catch (err) {
      dispatch(loginFailure(err.message || 'Login failed'));
    }
  };

  const handleVerification = async () => {
    if (!verificationCode) return;
    
    dispatch(loginStart());
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (verificationCode === '123456') {
        // Use a hardcoded token for testing
        const token = 'test-token';
        
        dispatch(loginSuccess({
          user: {
            id: 'test-user-id',
            email,
            firstName: 'Test',
            lastName: 'User',
          },
          token,
          mfaRequired: false
        }));
        setShowVerification(false);
        navigate('/dashboard');
      } else {
        throw new Error('Invalid verification code');
      }
    } catch (err) {
      dispatch(loginFailure(err.message || 'Verification failed'));
    }
  };

  const handleCloseVerification = () => {
    if (loading) return;
    setShowVerification(false);
    setVerificationCode('');
    dispatch(clearError());
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Sign in to Licensing Portal
        </Typography>

        {error && !showVerification && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!email}
            helperText={!email && 'Required'}
            margin="normal"
            disabled={loading || showVerification}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!password}
            helperText={!password && 'Required'}
            margin="normal"
            disabled={loading || showVerification}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading || !email || !password || showVerification}
          >
            {loading && !showVerification ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link component="button" variant="body2" onClick={() => navigate('/forgot-password')}>
            Forgot password?
          </Link>
        </Box>
        <Box sx={{ mt: 1, textAlign: 'center' }}>
          <Link component="button" variant="body2" onClick={() => navigate('/register')}>
            Don't have an account? Sign up
          </Link>
        </Box>

        {/* Verification Dialog */}
        <Dialog 
          open={showVerification} 
          onClose={loading ? undefined : handleCloseVerification}
          disableEscapeKeyDown={loading}
        >
          <DialogTitle>Two-Factor Authentication</DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Please enter the verification code sent to your device.
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              For testing, use code: 123456
            </Typography>
            <TextField
              fullWidth
              label="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              error={!!error}
              helperText={error}
              disabled={loading}
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter' && verificationCode) {
                  handleVerification();
                }
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleCloseVerification} 
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleVerification} 
              variant="contained"
              disabled={loading || !verificationCode}
            >
              {loading ? <CircularProgress size={24} /> : 'Verify'}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Login; 