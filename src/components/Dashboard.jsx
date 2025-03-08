import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  IconButton,
  Divider,
  Tab,
  Tabs,
  Stack,
  Alert,
  Button,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Schedule as ScheduleIcon,
  School as SchoolIcon,
  Notifications as NotificationsIcon,
  Assessment as AssessmentIcon,
  Group as GroupIcon,
  AccountBalance as AccountBalanceIcon,
  Security as SecurityIcon,
  ReceiptLong as ReceiptLongIcon,
  Campaign as CampaignIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [currentTab, setCurrentTab] = useState(0);

  const stats = [
    {
      title: 'Active Licenses',
      value: '3',
      icon: <CheckCircleIcon color="success" />,
      trend: '+1 this month',
      action: () => navigate('/licenses'),
    },
    {
      title: 'Pending Applications',
      value: '2',
      icon: <PendingIcon color="warning" />,
      trend: '2 in review',
      action: () => navigate('/new-application'),
    },
    {
      title: 'CEU Credits',
      value: '24/30',
      icon: <SchoolIcon color="primary" />,
      trend: '6 credits needed',
      action: () => navigate('/education'),
    },
    {
      title: 'Endorsements',
      value: '5',
      icon: <GroupIcon color="info" />,
      trend: '2 pending review',
      action: () => navigate('/endorsements'),
    },
  ];

  const recentActivities = [
    {
      type: 'License Renewal',
      description: 'Professional Engineer License PE123456 expires in 30 days',
      date: '2024-03-15',
      status: 'action_required',
      priority: 'high',
      action: () => navigate('/licenses'),
    },
    {
      type: 'CEU Course',
      description: 'Ethics in Engineering - 2 Credits completed',
      date: '2024-03-10',
      status: 'completed',
      priority: 'normal',
      action: () => navigate('/education'),
    },
    {
      type: 'Application Status',
      description: 'Additional documents approved for SE789012',
      date: '2024-03-05',
      status: 'in_progress',
      priority: 'normal',
      action: () => navigate('/new-application'),
    },
  ];

  const upcomingDeadlines = [
    {
      title: 'License Renewal',
      description: 'PE123456 expires in 30 days',
      date: '2024-04-15',
      type: 'renewal',
      action: () => navigate('/licenses'),
    },
    {
      title: 'CEU Deadline',
      description: '6 credits needed',
      date: '2024-05-01',
      type: 'education',
      action: () => navigate('/education'),
    },
    {
      title: 'Document Expiration',
      description: 'Insurance certificate expires soon',
      date: '2024-04-20',
      type: 'document',
      action: () => navigate('/documents'),
    },
  ];

  const quickActions = [
    {
      title: 'New Application',
      description: 'Apply for a new license',
      icon: <AccountBalanceIcon />,
      action: () => navigate('/new-application'),
    },
    {
      title: 'View Licenses',
      description: 'Manage your existing licenses',
      icon: <ReceiptLongIcon />,
      action: () => navigate('/licenses'),
    },
    {
      title: 'Background Check',
      description: 'View or initiate verification',
      icon: <SecurityIcon />,
      action: () => navigate('/verification'),
    },
    {
      title: 'Submit CEUs',
      description: 'Record continuing education',
      icon: <SchoolIcon />,
      action: () => navigate('/education'),
    },
  ];

  const getStatusColor = (status) => {
    const statusColors = {
      completed: 'success',
      in_progress: 'info',
      action_required: 'error',
    };
    return statusColors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const priorityColors = {
      high: 'error',
      normal: 'primary',
      low: 'info',
    };
    return priorityColors[priority] || 'default';
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.firstName || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your licensing activities
        </Typography>
      </Box>

      {/* Alert Section */}
      <Stack spacing={2} sx={{ mb: 4 }}>
        <Alert 
          severity="warning" 
          icon={<NotificationsIcon />}
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/licenses')}>
              Renew Now
            </Button>
          }
        >
          Your Professional Engineer License (PE123456) expires in 30 days
        </Alert>
        <Alert 
          severity="info" 
          icon={<SchoolIcon />}
          action={
            <Button color="inherit" size="small" onClick={() => navigate('/education')}>
              View Courses
            </Button>
          }
        >
          You need 6 more CEU credits by May 1st, 2024
        </Alert>
      </Stack>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
              }}
              elevation={0}
              variant="outlined"
              onClick={stat.action}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                {stat.icon}
                <Typography variant="h4" sx={{ mb: 1 }}>
                  {stat.value}
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                {stat.title}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {stat.trend}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={6} md={3} key={action.title}>
            <Card
              variant="outlined"
              sx={{
                cursor: 'pointer',
                '&:hover': { bgcolor: 'action.hover' },
                height: '100%',
              }}
              onClick={action.action}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {React.cloneElement(action.icon, { color: 'primary', fontSize: 'large' })}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {action.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Tabs */}
      <Card variant="outlined">
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Recent Activities" />
          <Tab label="Upcoming Deadlines" />
        </Tabs>

        {/* Recent Activities Tab */}
        {currentTab === 0 && (
          <Box sx={{ p: 3 }}>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={activity.type + activity.date}>
                  <ListItem
                    sx={{
                      px: 2,
                      py: 1.5,
                      borderLeft: 6,
                      borderColor: `${getPriorityColor(activity.priority)}.main`,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                    onClick={activity.action}
                  >
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {activity.type}
                          <Chip
                            size="small"
                            label={activity.status.replace('_', ' ')}
                            color={getStatusColor(activity.status)}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                          <Typography variant="body2">{activity.description}</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {activity.date}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        {/* Upcoming Deadlines Tab */}
        {currentTab === 1 && (
          <Box sx={{ p: 3 }}>
            <List>
              {upcomingDeadlines.map((deadline, index) => (
                <React.Fragment key={deadline.title}>
                  <ListItem
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                    onClick={deadline.action}
                  >
                    <ListItemIcon>
                      {deadline.type === 'renewal' && <ScheduleIcon color="warning" />}
                      {deadline.type === 'education' && <SchoolIcon color="info" />}
                      {deadline.type === 'document' && <CampaignIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={deadline.title}
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                          <Typography variant="body2">{deadline.description}</Typography>
                          <Typography variant="body2" color="error">
                            Due: {deadline.date}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < upcomingDeadlines.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Dashboard; 