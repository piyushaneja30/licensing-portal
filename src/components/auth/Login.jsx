import React, { useState } from 'react';
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
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginStart());
    // For testing, always show 2FA dialog
    setShowVerification(true);
  };

  const handleVerification = () => {
    if (verificationCode === '123456') {
      // Successful verification
      dispatch(loginSuccess({
        user: {
          email,
          firstName: 'Test',
          lastName: 'User',
        },
        token: 'test-token'
      }));
      navigate('/dashboard');
    } else {
      dispatch(loginFailure('Invalid verification code'));
    }
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

        {error && (
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link href="/forgot-password" variant="body2">
            Forgot password?
          </Link>
        </Box>
        <Box sx={{ mt: 1, textAlign: 'center' }}>
          <Link href="/register" variant="body2">
            Don't have an account? Sign up
          </Link>
        </Box>

        {/* Verification Dialog */}
        <Dialog open={showVerification} onClose={() => setShowVerification(false)}>
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
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowVerification(false)}>Cancel</Button>
            <Button onClick={handleVerification} variant="contained">
              Verify
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Login; 