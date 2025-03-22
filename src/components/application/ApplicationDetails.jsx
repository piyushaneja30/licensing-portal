import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
  Grid,
  Divider,
  CircularProgress,
  Button,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  CheckCircle as ApprovedIcon,
  Pending as PendingIcon,
  Error as RejectedIcon,
} from '@mui/icons-material';
import { fetchApplicationDetails } from '../../redux/actions/applicationActions';
import { formatDate } from '../../utils/dateUtils';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentApplication, loading } = useSelector((state) => state.applications);

  useEffect(() => {
    if (id) {
      dispatch(fetchApplicationDetails(id));
    }
  }, [dispatch, id]);

  const getStatusChip = (status) => {
    const statusConfig = {
      pending: { color: 'warning', icon: <PendingIcon sx={{ fontSize: 16 }} />, label: 'Pending' },
      approved: { color: 'success', icon: <ApprovedIcon sx={{ fontSize: 16 }} />, label: 'Approved' },
      rejected: { color: 'error', icon: <RejectedIcon sx={{ fontSize: 16 }} />, label: 'Rejected' },
    };
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <Chip
        size="small"
        icon={config.icon}
        label={config.label}
        color={config.color}
        sx={{ 
          '& .MuiChip-icon': { 
            marginLeft: '8px',
          }
        }}
      />
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!currentApplication) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="text.secondary">Application not found</Typography>
        <Button
          startIcon={<BackIcon />}
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton
          onClick={() => navigate('/dashboard')}
          sx={{ mr: 2 }}
        >
          <BackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Application Details
        </Typography>
      </Box>

      <Paper 
        elevation={0}
        sx={{ 
          p: 3,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {currentApplication.applicationNumber}
              </Typography>
              {getStatusChip(currentApplication.status)}
            </Box>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              License Type
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {currentApplication.licenseType}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Submitted Date
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {formatDate(currentApplication.submittedDate)}
            </Typography>
          </Grid>

          {currentApplication.personalInfo && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                  Personal Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Full Name
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {currentApplication.personalInfo.firstName} {currentApplication.personalInfo.lastName}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {currentApplication.personalInfo.email}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {currentApplication.personalInfo.phone}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Address
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {currentApplication.personalInfo.address}
                </Typography>
              </Grid>
            </>
          )}

          {currentApplication.education && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                  Education
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Degree
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {currentApplication.education.degree}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Institution
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {currentApplication.education.institution}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary">
                  Graduation Year
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {currentApplication.education.graduationYear}
                </Typography>
              </Grid>
            </>
          )}

          {currentApplication.documents && currentApplication.documents.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                  Submitted Documents
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              {currentApplication.documents.map((doc, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1">
                      {doc.name}
                    </Typography>
                    <Button
                      size="small"
                      sx={{ ml: 2 }}
                      onClick={() => window.open(doc.url, '_blank')}
                    >
                      View Document
                    </Button>
                  </Box>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default ApplicationDetails; 