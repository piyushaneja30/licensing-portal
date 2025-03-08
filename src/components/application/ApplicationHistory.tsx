import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Error as ErrorIcon,
  RemoveRedEye as ViewIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

interface Application {
  id: string;
  type: string;
  status: 'approved' | 'pending' | 'rejected' | 'in_review';
  submissionDate: string;
  lastUpdated: string;
  licenseType: string;
  state: string;
  applicationNumber: string;
}

const mockApplications: Application[] = [
  {
    id: '1',
    type: 'New License',
    status: 'pending',
    submissionDate: '2024-03-01',
    lastUpdated: '2024-03-15',
    licenseType: 'Professional Engineer',
    state: 'California',
    applicationNumber: 'APP-2024-001',
  },
  {
    id: '2',
    type: 'License Renewal',
    status: 'approved',
    submissionDate: '2024-02-15',
    lastUpdated: '2024-03-10',
    licenseType: 'Structural Engineer',
    state: 'New York',
    applicationNumber: 'APP-2024-002',
  },
  {
    id: '3',
    type: 'New License',
    status: 'in_review',
    submissionDate: '2024-03-05',
    lastUpdated: '2024-03-12',
    licenseType: 'Civil Engineer',
    state: 'Texas',
    applicationNumber: 'APP-2024-003',
  },
];

const ApplicationHistory: React.FC = () => {
  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon color="success" />;
      case 'pending':
      case 'in_review':
        return <PendingIcon color="warning" />;
      case 'rejected':
        return <ErrorIcon color="error" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
      case 'in_review':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: Application['status']) => {
    return status.replace('_', ' ').toUpperCase();
  };

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h1">
            Application History
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.href = '/new-application'}
          >
            New Application
          </Button>
        </Box>

        <List>
          {mockApplications.map((application, index) => (
            <React.Fragment key={application.id}>
              <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getStatusIcon(application.status)}
                          <Typography variant="h6">
                            {application.type}
                          </Typography>
                          <Chip
                            size="small"
                            label={getStatusText(application.status)}
                            color={getStatusColor(application.status)}
                          />
                        </Box>
                        <Box>
                          <IconButton size="small" title="View Details">
                            <ViewIcon />
                          </IconButton>
                          <IconButton size="small" title="Download">
                            <DownloadIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Application Number
                      </Typography>
                      <Typography variant="body1">
                        {application.applicationNumber}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        License Type
                      </Typography>
                      <Typography variant="body1">
                        {application.licenseType}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        State
                      </Typography>
                      <Typography variant="body1">
                        {application.state}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Last Updated
                      </Typography>
                      <Typography variant="body1">
                        {new Date(application.lastUpdated).toLocaleDateString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              {index < mockApplications.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default ApplicationHistory; 