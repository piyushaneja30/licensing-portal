import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  LinearProgress,
  Button,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  CheckCircle as ApprovedIcon,
  Pending as PendingIcon,
  Error as RejectedIcon,
  Notifications as NotificationIcon,
  Assignment as ApplicationIcon,
  AccessTime as PendingApplicationIcon,
  CheckCircleOutline as ApprovedApplicationIcon,
  CalendarToday as ExpiryIcon,
  Timeline as TimelineIcon,
  Description as DocumentIcon,
  Update as UpdateIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserApplications } from '../../redux/actions/applicationActions';

const LICENSE_TYPES = {
  'ENG_INTERN_001': 'Engineering Intern',
  'PROF_ENG_001': 'Professional Engineer',
  'PE001': 'Professional Engineer',
  'EI001': 'Engineer Intern',
  // Add other license types as needed
};

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fetchError, setFetchError] = useState(null);
  const [showAllApplications, setShowAllApplications] = useState(false);
  
  const { applications, loading, error } = useSelector((state) => {
    console.log('Redux State:', state);
    return state.application || { applications: [], loading: false, error: null };
  });
  
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        console.log('Fetching applications...');
        const result = await dispatch(fetchUserApplications()).unwrap();
        console.log('Fetched applications:', result);
        if (result) {
          setFetchError(null);
        }
      } catch (err) {
        console.error('Error fetching applications:', err);
        setFetchError(err.message || 'Failed to fetch applications');
        if (err.message === 'No authentication token found' || err.message === 'Invalid authentication token') {
          navigate('/login');
        }
      }
    };
    fetchData();
  }, [dispatch, isAuthenticated, token, navigate]);

  const getStatusChip = (status) => {
    const statusConfig = {
      submitted: { color: 'warning', icon: <PendingIcon sx={{ fontSize: 16 }} />, label: 'Submitted' },
      approved: { color: 'success', icon: <ApprovedIcon sx={{ fontSize: 16 }} />, label: 'Approved' },
      rejected: { color: 'error', icon: <RejectedIcon sx={{ fontSize: 16 }} />, label: 'Rejected' },
      draft: { color: 'default', icon: <PendingIcon sx={{ fontSize: 16 }} />, label: 'Draft' },
    };
    const config = statusConfig[status] || statusConfig.submitted;
    
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewApplication = (applicationNumber) => {
    navigate(`/application-success/${applicationNumber}`);
  };

  // Stats cards data based on actual applications
  const statsData = {
    totalApplications: applications?.length || 0,
    pendingApplications: applications?.filter(app => app.status === 'submitted')?.length || 0,
    approvedApplications: applications?.filter(app => app.status === 'approved')?.length || 0,
    rejectedApplications: applications?.filter(app => app.status === 'rejected')?.length || 0,
  };

  // Filter applications for display
  const displayedApplications = showAllApplications 
    ? applications 
    : applications?.slice(0, 5);

  console.log('Total applications:', applications?.length);
  console.log('Displayed applications:', displayedApplications?.length);
  console.log('Applications data:', applications);

  // Stats cards data based on actual applications
  const statsCards = [
    { 
      title: 'Total Applications', 
      count: statsData.totalApplications, 
      icon: <ApplicationIcon color="primary" /> 
    },
    { 
      title: 'Pending Applications', 
      count: statsData.pendingApplications, 
      icon: <PendingApplicationIcon sx={{ color: 'warning.main' }} /> 
    },
    { 
      title: 'Approved Licenses', 
      count: statsData.approvedApplications, 
      icon: <ApprovedApplicationIcon sx={{ color: 'success.main' }} /> 
    },
    { 
      title: 'Rejected Applications', 
      count: statsData.rejectedApplications, 
      icon: <RejectedIcon sx={{ color: 'error.main' }} /> 
    }
  ];

  // Mock notifications - to be replaced with real notifications later
  const notifications = [
    { id: 1, message: 'Your application APP20252908 is under review', date: '2 hours ago', type: 'info' },
    { id: 2, message: 'License renewal reminder: License will expire in 30 days', date: '1 day ago', type: 'warning' },
    { id: 3, message: 'Application APP20257479 has been approved', date: '2 days ago', type: 'success' },
  ];

  // Mock recent activity data - to be replaced with real data later
  const recentActivity = [
    { 
      id: 1, 
      type: 'update', 
      title: 'Application Status Updated',
      description: 'Your application APP20252908 status changed to "Under Review"',
      timestamp: '2 hours ago',
      icon: <UpdateIcon sx={{ color: 'info.main' }} />
    },
    { 
      id: 2, 
      type: 'document', 
      title: 'Document Uploaded',
      description: 'Additional documents uploaded for APP20257479',
      timestamp: '1 day ago',
      icon: <DocumentIcon sx={{ color: 'success.main' }} />
    },
    { 
      id: 3, 
      type: 'application', 
      title: 'New Application Submitted',
      description: 'Engineering Intern license application submitted successfully',
      timestamp: '2 days ago',
      icon: <ApplicationIcon sx={{ color: 'primary.main' }} />
    },
  ];

  // Mock license progress data - to be replaced with real data later
  const licenseProgress = [
    { type: 'Engineering Intern', progress: 75, count: 3 },
    { type: 'Professional Engineer', progress: 40, count: 1 },
    { type: 'Senior Engineer', progress: 20, count: 1 },
  ];

  return (
    <Box sx={{ p: 3, minHeight: '100vh', bgcolor: 'background.default' }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  {stat.icon}
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {stat.count}
                  </Typography>
                </Box>
                <Typography variant="subtitle2" color="textSecondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Main Content Grid */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: 1, borderColor: 'divider', mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Applications
              </Typography>
              {applications?.length > 5 && (
                <Button
                  color="primary"
                  onClick={() => setShowAllApplications(!showAllApplications)}
                  sx={{ textTransform: 'none' }}
                >
                  {showAllApplications ? 'Show Less' : 'View All'}
                </Button>
              )}
            </Box>

            {(error || fetchError) && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error || fetchError}
              </Alert>
            )}

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Application Number</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>License Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Submitted Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }} align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                        <CircularProgress size={32} />
                      </TableCell>
                    </TableRow>
                  ) : !displayedApplications || displayedApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                        <Typography color="text.secondary">
                          No applications found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    displayedApplications.map((app) => (
                      <TableRow 
                        key={app._id}
                        sx={{ 
                          '&:hover': { 
                            bgcolor: 'action.hover',
                          }
                        }}
                      >
                        <TableCell>{app.applicationNumber}</TableCell>
                        <TableCell>
                          {LICENSE_TYPES[app.licenseTypeId] || app.licenseTypeId}
                        </TableCell>
                        <TableCell>{getStatusChip(app.status)}</TableCell>
                        <TableCell>{formatDate(app.createdAt || app.submittedDate || app.lastUpdated)}</TableCell>
                        <TableCell align="right">
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => handleViewApplication(app.applicationNumber)}
                              sx={{
                                color: 'primary.main',
                                '&:hover': {
                                  bgcolor: 'primary.lighter',
                                },
                              }}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {/* License Progress Section */}
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
              <TimelineIcon sx={{ mr: 1 }} />
              License Application Progress
            </Typography>
            <Grid container spacing={2}>
              {licenseProgress.map((license, index) => (
                <Grid item xs={12} key={index}>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {license.type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {license.count} Applications
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={license.progress} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        bgcolor: 'action.hover',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                        }
                      }} 
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                      {license.progress}% Complete
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          {/* Notifications Section */}
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: 1, borderColor: 'divider', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Badge badgeContent={notifications.length} color="error" sx={{ mr: 1 }}>
                <NotificationIcon color="primary" />
              </Badge>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Notifications
              </Typography>
            </Box>
            <List>
              {notifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem 
                    sx={{ 
                      py: 1.5,
                      px: 2,
                      '&:hover': { bgcolor: 'action.hover', cursor: 'pointer' },
                      borderRadius: 1,
                    }}
                  >
                    <ListItemText 
                      primary={notification.message}
                      secondary={notification.date}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                    />
                  </ListItem>
                  {index < notifications.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Recent Activity Section */}
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: 1, borderColor: 'divider' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Recent Activity
            </Typography>
            <List>
              {recentActivity.map((activity, index) => (
                <React.Fragment key={activity.id}>
                  <ListItem 
                    sx={{ 
                      py: 1.5,
                      px: 2,
                      '&:hover': { bgcolor: 'action.hover', cursor: 'pointer' },
                      borderRadius: 1,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'background.default' }}>
                        {activity.icon}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={activity.title}
                      secondary={
                        <React.Fragment>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            {activity.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.timestamp}
                          </Typography>
                        </React.Fragment>
                      }
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                    />
                  </ListItem>
                  {index < recentActivity.length - 1 && <Divider component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 