import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const AdminLicenseManagement: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    licenseType: '',
    fee: '',
    category: '',
    processingTime: '',
    validityPeriod: '',
    requirements: [''],
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleAddRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const handleRequirementChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/licenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccess('License created successfully!');
        setFormData({
          name: '',
          description: '',
          licenseType: '',
          fee: '',
          category: '',
          processingTime: '',
          validityPeriod: '',
          requirements: [''],
        });
      } else {
        const err = await response.json();
        setError(err.message || 'Failed to create license');
      }
    } catch (err: any) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 2 }}>
          You do not have permission to access this page.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create New License
        </Typography>
        {success && <Snackbar open autoHideDuration={4000} onClose={() => setSuccess('')}><Alert severity="success">{success}</Alert></Snackbar>}
        {error && <Snackbar open autoHideDuration={4000} onClose={() => setError('')}><Alert severity="error">{error}</Alert></Snackbar>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="License Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="License Type"
                name="licenseType"
                value={formData.licenseType}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                label="Fee"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="Healthcare">Healthcare</MenuItem>
                  <MenuItem value="Engineering">Engineering</MenuItem>
                  <MenuItem value="Construction">Construction</MenuItem>
                  <MenuItem value="Real Estate">Real Estate</MenuItem>
                  <MenuItem value="Personal Services">Personal Services</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                  <MenuItem value="Sports">Sports</MenuItem>
                  <MenuItem value="Social Services">Social Services</MenuItem>
                  <MenuItem value="Security">Security</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Processing Time"
                name="processingTime"
                value={formData.processingTime}
                onChange={handleChange}
                placeholder="e.g., 4-6 weeks"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Validity Period"
                name="validityPeriod"
                value={formData.validityPeriod}
                onChange={handleChange}
                placeholder="e.g., 12 months"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Requirements
              </Typography>
              {formData.requirements.map((requirement, index) => (
                <TextField
                  key={index}
                  fullWidth
                  label={`Requirement ${index + 1}`}
                  value={requirement}
                  onChange={(e) => handleRequirementChange(index, e.target.value)}
                  sx={{ mb: 2 }}
                />
              ))}
              <Button
                variant="outlined"
                onClick={handleAddRequirement}
                sx={{ mt: 1 }}
              >
                Add Requirement
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create License'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard')}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminLicenseManagement; 