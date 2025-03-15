import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  useTheme,
  alpha,
  ToggleButtonGroup,
  ToggleButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import axios from 'axios';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';

const INDUSTRY_TYPES = [
  'Healthcare',
  'Manufacturing',
  'Technology',
  'Finance',
  'Education',
  'Construction',
  'Retail',
  'Transportation',
  'Energy',
  'Other'
];

const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees'
];

const BUSINESS_TYPES = [
  'Corporation',
  'LLC',
  'Partnership',
  'Sole Proprietorship',
  'Other'
];

const Register = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [accountType, setAccountType] = useState('individual');

  // Configure axios baseURL
  useEffect(() => {
    axios.defaults.baseURL = 'http://localhost:5001';
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Must contain at least one number')
      .matches(/[^a-zA-Z0-9]/, 'Must contain at least one special character')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be at least 10 digits')
      .required('Phone number is required'),
    ...(accountType === 'individual' ? {
      profession: Yup.string()
        .required('Profession is required')
        .matches(/^[a-zA-Z\s]+$/, 'Profession must contain only letters'),
      specialization: Yup.string()
        .required('Specialization is required')
        .matches(/^[a-zA-Z\s]+$/, 'Specialization must contain only letters'),
      yearsOfExperience: Yup.number()
        .typeError('Years of experience must be a number')
        .min(0, 'Years of experience must be positive')
        .max(100, 'Years of experience cannot exceed 100')
        .required('Years of experience is required'),
      licenseNumber: Yup.string(),
    } : {
      companyName: Yup.string().required('Company name is required'),
      industryType: Yup.string().required('Industry type is required'),
      companySize: Yup.string().required('Company size is required'),
      businessType: Yup.string().required('Business type is required'),
      registrationNumber: Yup.string().required('Registration number is required'),
      jobTitle: Yup.string().required('Job title is required'),
      'businessAddress.street': Yup.string().required('Street is required'),
      'businessAddress.city': Yup.string().required('City is required'),
      'businessAddress.state': Yup.string().required('State is required'),
      'businessAddress.zipCode': Yup.string().required('ZIP code is required'),
      'businessAddress.country': Yup.string().required('Country is required'),
    }),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      // Individual fields
      profession: '',
      specialization: '',
      yearsOfExperience: '',
      licenseNumber: '',
      // Business fields
      companyName: '',
      industryType: '',
      companySize: '',
      businessType: '',
      registrationNumber: '',
      jobTitle: '',
      businessAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
      },
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setError('');
        console.log('Submitting registration data:', {
          accountType,
          ...values
        });
        
        const response = await axios.post('/api/auth/signup', {
          accountType,
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          ...(accountType === 'individual' ? {
            profession: values.profession,
            specialization: values.specialization,
            yearsOfExperience: values.yearsOfExperience,
            licenseNumber: values.licenseNumber,
          } : {
            companyName: values.companyName,
            industryType: values.industryType,
            companySize: values.companySize,
            businessType: values.businessType,
            registrationNumber: values.registrationNumber,
            jobTitle: values.jobTitle,
            businessAddress: values.businessAddress,
          }),
        });

        console.log('Registration response:', response.data);

        if (response.data.user && response.data.token) {
          dispatch(loginSuccess(response.data));
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Registration error:', err);
        if (err.response?.data?.errors) {
          // Handle validation errors
          const errorMessages = Object.values(err.response.data.errors)
            .filter(msg => msg !== null)
            .join(', ');
          setError(errorMessages || err.response.data.message);
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else if (err.message === 'Network Error') {
          setError('Unable to connect to the server. Please check your internet connection.');
        } else {
          setError('An error occurred during registration. Please try again.');
        }
      }
    },
  });

  const handleAccountTypeChange = (event, newType) => {
    if (newType !== null) {
      setAccountType(newType);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={2}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          <Stack spacing={3}>
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 600,
                color: '#1a1a1a',
                mb: 2,
              }}
            >
              Create Your Professional License Account
            </Typography>

            <ToggleButtonGroup
              value={accountType}
              exclusive
              onChange={handleAccountTypeChange}
              aria-label="account type"
              sx={{ justifyContent: 'center' }}
            >
              <ToggleButton value="individual" aria-label="individual account">
                <PersonIcon sx={{ mr: 1 }} />
                Individual
              </ToggleButton>
              <ToggleButton value="business" aria-label="business account">
                <BusinessIcon sx={{ mr: 1 }} />
                Business
              </ToggleButton>
            </ToggleButtonGroup>

            {error && (
              <Alert 
                severity="error"
                sx={{
                  bgcolor: alpha('#ff3d00', 0.1),
                  border: `1px solid ${alpha('#ff3d00', 0.2)}`,
                }}
              >
                {error}
              </Alert>
            )}

            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 500 }}>
                  Personal Information
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
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
                  />
                </Stack>

                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />

                <Divider />

                <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 500 }}>
                  Security
                </Typography>

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
                />

                <Divider />

                {accountType === 'individual' ? (
                  <>
                    <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 500 }}>
                      Professional Information
                    </Typography>

                    <TextField
                      fullWidth
                      id="profession"
                      name="profession"
                      label="Profession"
                      value={formik.values.profession}
                      onChange={formik.handleChange}
                      error={formik.touched.profession && Boolean(formik.errors.profession)}
                      helperText={formik.touched.profession && formik.errors.profession}
                    />

                    <TextField
                      fullWidth
                      id="specialization"
                      name="specialization"
                      label="Specialization"
                      value={formik.values.specialization}
                      onChange={formik.handleChange}
                      error={formik.touched.specialization && Boolean(formik.errors.specialization)}
                      helperText={formik.touched.specialization && formik.errors.specialization}
                    />

                    <TextField
                      fullWidth
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      label="Years of Experience"
                      type="number"
                      value={formik.values.yearsOfExperience}
                      onChange={formik.handleChange}
                      error={formik.touched.yearsOfExperience && Boolean(formik.errors.yearsOfExperience)}
                      helperText={formik.touched.yearsOfExperience && formik.errors.yearsOfExperience}
                    />

                    <TextField
                      fullWidth
                      id="licenseNumber"
                      name="licenseNumber"
                      label="License Number (Optional)"
                      value={formik.values.licenseNumber}
                      onChange={formik.handleChange}
                      error={formik.touched.licenseNumber && Boolean(formik.errors.licenseNumber)}
                      helperText={formik.touched.licenseNumber && formik.errors.licenseNumber}
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 500 }}>
                      Business Information
                    </Typography>

                    <TextField
                      fullWidth
                      id="companyName"
                      name="companyName"
                      label="Company Name"
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                      helperText={formik.touched.companyName && formik.errors.companyName}
                    />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <FormControl fullWidth error={formik.touched.industryType && Boolean(formik.errors.industryType)}>
                        <InputLabel>Industry Type</InputLabel>
                        <Select
                          id="industryType"
                          name="industryType"
                          value={formik.values.industryType}
                          label="Industry Type"
                          onChange={formik.handleChange}
                        >
                          {INDUSTRY_TYPES.map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <FormControl fullWidth error={formik.touched.companySize && Boolean(formik.errors.companySize)}>
                        <InputLabel>Company Size</InputLabel>
                        <Select
                          id="companySize"
                          name="companySize"
                          value={formik.values.companySize}
                          label="Company Size"
                          onChange={formik.handleChange}
                        >
                          {COMPANY_SIZES.map((size) => (
                            <MenuItem key={size} value={size}>{size}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <FormControl fullWidth error={formik.touched.businessType && Boolean(formik.errors.businessType)}>
                        <InputLabel>Business Type</InputLabel>
                        <Select
                          id="businessType"
                          name="businessType"
                          value={formik.values.businessType}
                          label="Business Type"
                          onChange={formik.handleChange}
                        >
                          {BUSINESS_TYPES.map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        fullWidth
                        id="registrationNumber"
                        name="registrationNumber"
                        label="Registration Number"
                        value={formik.values.registrationNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.registrationNumber && Boolean(formik.errors.registrationNumber)}
                        helperText={formik.touched.registrationNumber && formik.errors.registrationNumber}
                      />
                    </Stack>

                    <TextField
                      fullWidth
                      id="jobTitle"
                      name="jobTitle"
                      label="Your Job Title"
                      value={formik.values.jobTitle}
                      onChange={formik.handleChange}
                      error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                      helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                    />

                    <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 500 }}>
                      Business Address
                    </Typography>

                    <TextField
                      fullWidth
                      id="businessAddress.street"
                      name="businessAddress.street"
                      label="Street Address"
                      value={formik.values.businessAddress.street}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.businessAddress?.street && 
                        Boolean(formik.errors.businessAddress?.street)
                      }
                      helperText={
                        formik.touched.businessAddress?.street && 
                        formik.errors.businessAddress?.street
                      }
                    />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        id="businessAddress.city"
                        name="businessAddress.city"
                        label="City"
                        value={formik.values.businessAddress.city}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.businessAddress?.city && 
                          Boolean(formik.errors.businessAddress?.city)
                        }
                        helperText={
                          formik.touched.businessAddress?.city && 
                          formik.errors.businessAddress?.city
                        }
                      />

                      <TextField
                        fullWidth
                        id="businessAddress.state"
                        name="businessAddress.state"
                        label="State"
                        value={formik.values.businessAddress.state}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.businessAddress?.state && 
                          Boolean(formik.errors.businessAddress?.state)
                        }
                        helperText={
                          formik.touched.businessAddress?.state && 
                          formik.errors.businessAddress?.state
                        }
                      />
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        id="businessAddress.zipCode"
                        name="businessAddress.zipCode"
                        label="ZIP Code"
                        value={formik.values.businessAddress.zipCode}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.businessAddress?.zipCode && 
                          Boolean(formik.errors.businessAddress?.zipCode)
                        }
                        helperText={
                          formik.touched.businessAddress?.zipCode && 
                          formik.errors.businessAddress?.zipCode
                        }
                      />

                      <TextField
                        fullWidth
                        id="businessAddress.country"
                        name="businessAddress.country"
                        label="Country"
                        value={formik.values.businessAddress.country}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.businessAddress?.country && 
                          Boolean(formik.errors.businessAddress?.country)
                        }
                        helperText={
                          formik.touched.businessAddress?.country && 
                          formik.errors.businessAddress?.country
                        }
                      />
                    </Stack>
                  </>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    bgcolor: theme.palette.primary.main,
                    color: '#fff',
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Create Account
                </Button>
              </Stack>
            </form>

            <Typography
              variant="body2"
              align="center"
              sx={{
                color: alpha('#000', 0.6),
              }}
            >
              Already have an account?{' '}
              <Link
                to="/login"
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register; 