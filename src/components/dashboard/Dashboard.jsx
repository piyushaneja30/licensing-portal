import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Description as LicenseIcon,
  CheckCircle as ApprovedIcon,
  Pending as PendingIcon,
  Warning as ExpiringIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RenewIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data (replace with actual data from your backend)
  const stats = {
    totalLicenses: 5,
    activeLicenses: 3,
    pendingApplications: 2,
    expiringLicenses: 1,
  };

  const recentActivities = [
    {
      id: 1,
      type: 'application',
      status: 'pending',
      description: 'New license application submitted',
      date: '2024-03-06',
    },
    {
      id: 2,
      type: 'approval',
      status: 'approved',
      description: 'License #12345 approved',
      date: '2024-03-05',
    },
    {
      id: 3,
      type: 'expiring',
      status: 'warning',
      description: 'License #98765 expires in 30 days',
      date: '2024-03-04',
    },
  ];

  const quickActions = [
    {
      title: 'New Application',
      icon: <AddIcon />,
      action: () => navigate('/new-application'),
      color: 'primary',
    },
    {
      title: 'Search Licenses',
      icon: <SearchIcon />,
      action: () => navigate('/license-search'),
      color: 'info',
    },
    {
      title: 'Renew License',
      icon: <RenewIcon />,
      action: () => navigate('/renew-license'),
      color: 'success',
    },
  ];

  return (
    <Box>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 700,
          background: theme => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 4,
        }}
      >
        Welcome to Licensing Portal
      </Typography>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={4} key={action.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  '& .MuiCardContent-root': {
                    transform: 'translateY(-4px)',
                  },
                  '&::after': {
                    opacity: 1,
                  },
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: theme => `linear-gradient(45deg, ${theme.palette[action.color].main}22, ${theme.palette[action.color].light}22)`,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                },
              }}
            >
              <CardContent 
                sx={{ 
                  flexGrow: 1,
                  transition: 'transform 0.3s ease',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    color: `${action.color}.main`,
                  }}
                >
                  {action.icon}
                  <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
                    {action.title}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ position: 'relative', zIndex: 1 }}>
                <Button
                  size="small"
                  color={action.color}
                  onClick={action.action}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    '&:hover': {
                      transform: 'translateX(4px)',
                      transition: 'transform 0.2s ease',
                    },
                  }}
                >
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Statistics */}
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              background: theme => theme.palette.mode === 'dark' 
                ? 'linear-gradient(45deg, #1a237e11, #0d47a111)'
                : 'linear-gradient(45deg, #e3f2fd, #bbdefb33)',
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600}>
              License Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="textSecondary" fontWeight={500}>
                      Active Licenses
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {stats.activeLicenses}/{stats.totalLicenses}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(stats.activeLicenses / stats.totalLicenses) * 100}
                    color="success"
                    sx={{ 
                      height: 8,
                      borderRadius: 4,
                      bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    }}
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="textSecondary" fontWeight={500}>
                      Pending Applications
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {stats.pendingApplications}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(stats.pendingApplications / stats.totalLicenses) * 100}
                    color="warning"
                    sx={{ 
                      height: 8,
                      borderRadius: 4,
                      bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="textSecondary" fontWeight={500}>
                      Expiring Soon
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      {stats.expiringLicenses}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(stats.expiringLicenses / stats.totalLicenses) * 100}
                    color="error"
                    sx={{ 
                      height: 8,
                      borderRadius: 4,
                      bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              background: theme => theme.palette.mode === 'dark' 
                ? 'linear-gradient(45deg, #1a237e11, #0d47a111)'
                : 'linear-gradient(45deg, #e3f2fd, #bbdefb33)',
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity) => (
                <ListItem
                  key={activity.id}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateX(4px)',
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon>
                    {activity.status === 'approved' && <ApprovedIcon color="success" />}
                    {activity.status === 'pending' && <PendingIcon color="warning" />}
                    {activity.status === 'warning' && <ExpiringIcon color="error" />}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight={500}>
                        {activity.description}
                      </Typography>
                    }
                    secondary={activity.date}
                  />
                  {activity.status === 'approved' && (
                    <Chip 
                      label="Approved" 
                      color="success" 
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  )}
                  {activity.status === 'pending' && (
                    <Chip 
                      label="Pending" 
                      color="warning" 
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  )}
                  {activity.status === 'warning' && (
                    <Chip 
                      label="Action Needed" 
                      color="error" 
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  )}
                  <Tooltip title="View Details">
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/activities/${activity.id}`)}
                      sx={{
                        ml: 1,
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/history')}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s ease',
                  },
                }}
              >
                View All Activities
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 