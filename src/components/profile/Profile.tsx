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
  Divider,
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

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      zipCode: user?.zipCode || '',
      company: user?.company || '',
      title: user?.title || '',
      bio: user?.bio || '',
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
    }),
    onSubmit: async (values) => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(updateUser(values));
        setSuccessMessage('Profile updated successfully');
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    },
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setSuccessMessage('');
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
                    {user?.firstName?.[0]}
                  </Avatar>
                  {isEditing && (
                    <IconButton
                      sx={{
                        position: 'absolute',
                        bottom: 16,
                        right: -8,
                        backgroundColor: 'background.paper',
                      }}
                      component="label"
                    >
                      <input hidden type="file" accept="image/*" />
                      <PhotoCameraIcon />
                    </IconButton>
                  )}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {user?.firstName} {user?.lastName}
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
                    disabled={!isEditing}
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