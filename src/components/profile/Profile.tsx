import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Box,
  Alert,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  PhotoCamera as PhotoCameraIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { User, updateUser } from '../../store/slices/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import type { AxiosError } from 'axios';

interface ProfileResponse {
  _id: string;
  email: string;
  role: string;
  accountType: string;
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
    profession?: string;
    licenseNumber?: string;
    specialization?: string;
    yearsOfExperience?: number;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    company?: string;
    title?: string;
    bio?: string;
  };
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const user = auth?.user;
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: {
      firstName: user?.profile?.firstName || '',
      lastName: user?.profile?.lastName || '',
      email: user?.email || '',
      phone: user?.profile?.phone || '',
      address: user?.profile?.address || '',
      city: user?.profile?.city || '',
      state: user?.profile?.state || '',
      zipCode: user?.profile?.zipCode || '',
      company: user?.profile?.company || '',
      title: user?.profile?.title || '',
      bio: user?.profile?.bio || '',
      profession: user?.profile?.profession || '',
      licenseNumber: user?.profile?.licenseNumber || '',
      specialization: user?.profile?.specialization || '',
      yearsOfExperience: user?.profile?.yearsOfExperience || 0,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string(),
      address: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zipCode: Yup.string(),
      company: Yup.string(),
      title: Yup.string(),
      bio: Yup.string(),
      profession: Yup.string(),
      licenseNumber: Yup.string(),
      specialization: Yup.string(),
      yearsOfExperience: Yup.number().min(0),
    }),
    onSubmit: async (values) => {
      try {
        setError('');
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Authentication token not found. Please log in again.');
          return;
        }

        console.log('Making profile update request with token:', token);
        console.log('Update values:', values);

        // Send the values directly as the backend expects them
        const response = await axios.put<ProfileResponse>(
          '/api/auth/profile',
          {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            address: values.address,
            city: values.city,
            state: values.state,
            zipCode: values.zipCode,
            company: values.company,
            title: values.title,
            bio: values.bio,
            profession: values.profession,
            licenseNumber: values.licenseNumber,
            specialization: values.specialization,
            yearsOfExperience: Number(values.yearsOfExperience),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        console.log('Profile update response:', response);

        if (response.data) {
          // Convert the response data to match our User type
          const userData: User = {
            id: response.data._id,
            email: response.data.email,
            role: response.data.role as 'user' | 'admin',
            accountType: response.data.accountType as 'individual' | 'business',
            profile: response.data.profile,
          };

          console.log('Converted user data:', userData);

          // Update Redux store with the converted data
          dispatch(updateUser(userData));
          setSuccessMessage('Profile updated successfully');
          setIsEditing(false);
        } else {
          throw new Error('No data received from server');
        }
      } catch (err) {
        console.error('Failed to update profile:', err);
        const error = err as AxiosError;
        if (axios.isAxiosError(error)) {
          console.error('Axios error details:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            headers: error.response?.headers,
            config: error.config
          });
          const errorMessage = error.response?.data?.message || error.message;
          setError(`Failed to update profile: ${errorMessage}`);
        } else {
          setError('Failed to update profile. Please try again.');
        }
      }
    },
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setSuccessMessage('');
    setError('');
  };

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h1">
            Profile
          </Typography>
          <Button
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
            sx={{ ml: 'auto' }}
            variant="contained"
            onClick={isEditing ? formik.submitForm : handleEditToggle}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </Box>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      fontSize: 48,
                      mb: 2,
                      mx: 'auto',
                    }}
                  >
                    {user?.profile?.firstName?.[0]}
                  </Avatar>
                </Box>
                <Typography variant="h6" gutterBottom>
                  {user?.profile?.firstName} {user?.profile?.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user?.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    disabled={true} // Email should not be editable
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Profession"
                    name="profession"
                    value={formik.values.profession}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="License Number"
                    name="licenseNumber"
                    value={formik.values.licenseNumber}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Specialization"
                    name="specialization"
                    value={formik.values.specialization}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Years of Experience"
                    name="yearsOfExperience"
                    type="number"
                    value={formik.values.yearsOfExperience}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    name="zipCode"
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    value={formik.values.company}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    multiline
                    rows={4}
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile; 