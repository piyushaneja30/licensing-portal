import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const steps = ['Account Information', 'Personal Details', 'Email Verification'];

const Register = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      organization: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          'Must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      firstName: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .required('Required'),
      lastName: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .required('Required'),
      phone: Yup.string()
        .matches(/^\+?[\d\s-]{10,}$/, 'Invalid phone number')
        .required('Required'),
      organization: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);

        if (activeStep === steps.length - 1) {
          // Verify email code
          await mockVerifyEmail(verificationCode);
          // Registration complete
          navigate('/login');
        } else if (activeStep === 0) {
          // Check if email is available
          await mockCheckEmail(values.email);
          handleNext();
        } else {
          // Send verification code
          await mockSendVerificationCode(values.email);
          handleNext();
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Mock API calls (replace with actual API integration)
  const mockCheckEmail = async (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'taken@example.com') {
          reject(new Error('Email is already registered'));
        }
        resolve(true);
      }, 1000);
    });
  };

  const mockSendVerificationCode = async (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  };

  const mockVerifyEmail = async (code) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (code === '123456') {
          resolve(true);
        } else {
          reject(new Error('Invalid verification code'));
        }
      }, 1000);
    });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
            />
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              margin="normal"
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
              helperText={formik.touched.firstName && formik.errors.firstName}
              margin="normal"
            />
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
              margin="normal"
            />
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              margin="normal"
            />
            <TextField
              fullWidth
              id="organization"
              name="organization"
              label="Organization"
              value={formik.values.organization}
              onChange={formik.handleChange}
              error={formik.touched.organization && Boolean(formik.errors.organization)}
              helperText={formik.touched.organization && formik.errors.organization}
              margin="normal"
            />
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="body2" gutterBottom>
              Please enter the verification code sent to your email address.
            </Typography>
            <TextField
              fullWidth
              label="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              margin="normal"
            />
          </>
        );
      default:
        return 'Unknown step';
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
          maxWidth: 600,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Create an Account
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={formik.handleSubmit}>
          {getStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0 || loading}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : activeStep === steps.length - 1 ? (
                'Complete Registration'
              ) : (
                'Next'
              )}
            </Button>
          </Box>
        </form>

        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register; 