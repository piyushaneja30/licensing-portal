import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Box,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Email as EmailIcon,
  Refresh as RefreshIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

interface License {
  id: string;
  type: string;
  number: string;
  status: 'active' | 'expired' | 'pending' | 'suspended';
  expiryDate: string;
  issueDate: string;
  state: string;
  specialty: string;
  ceuProgress: number;
  ceuRequired: number;
  ceuCompleted: number;
  renewalEligible: boolean;
}

const mockLicenses: License[] = [
  {
    id: '1',
    type: 'Professional Engineer',
    number: 'PE123456',
    status: 'active',
    expiryDate: '2024-12-31',
    issueDate: '2022-12-31',
    state: 'California',
    specialty: 'Civil Engineering',
    ceuProgress: 75,
    ceuRequired: 30,
    ceuCompleted: 22,
    renewalEligible: true,
  },
  {
    id: '2',
    type: 'Structural Engineer',
    number: 'SE789012',
    status: 'active',
    expiryDate: '2025-06-30',
    issueDate: '2023-06-30',
    state: 'New York',
    specialty: 'Structural Engineering',
    ceuProgress: 40,
    ceuRequired: 40,
    ceuCompleted: 16,
    renewalEligible: false,
  },
  {
    id: '3',
    type: 'Engineer Intern',
    number: 'EI345678',
    status: 'expired',
    expiryDate: '2023-12-31',
    issueDate: '2021-12-31',
    state: 'Texas',
    specialty: 'Mechanical Engineering',
    ceuProgress: 0,
    ceuRequired: 20,
    ceuCompleted: 0,
    renewalEligible: true,
  },
];

const MyLicenses: React.FC = () => {
  const [licenses] = useState<License[]>(mockLicenses);
  const [actionMenu, setActionMenu] = useState<{ anchor: HTMLElement | null; licenseId: string | null }>({
    anchor: null,
    licenseId: null,
  });
  const [renewDialog, setRenewDialog] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);

  const getStatusColor = (status: License['status']) => {
    const colors = {
      active: 'success',
      expired: 'error',
      pending: 'warning',
      suspended: 'error',
    };
    return colors[status];
  };

  const getStatusIcon = (status: License['status']) => {
    const icons = {
      active: <CheckCircleIcon color="success" />,
      expired: <WarningIcon color="error" />,
      pending: <ScheduleIcon color="warning" />,
      suspended: <WarningIcon color="error" />,
    };
    return icons[status];
  };

  const handleActionClick = (event: React.MouseEvent<HTMLElement>, license: License) => {
    setActionMenu({
      anchor: event.currentTarget,
      licenseId: license.id,
    });
    setSelectedLicense(license);
  };

  const handleActionClose = () => {
    setActionMenu({ anchor: null, licenseId: null });
  };

  const handleRenewClick = () => {
    handleActionClose();
    setRenewDialog(true);
  };

  const handleRenewClose = () => {
    setRenewDialog(false);
    setSelectedLicense(null);
  };

  const renderLicenseCard = (license: License) => (
    <Card variant="outlined" sx={{ mb: 2 }} key={license.id}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {getStatusIcon(license.status)}
            <Typography variant="h6">
              {license.type}
            </Typography>
          </Box>
          <IconButton onClick={(e) => handleActionClick(e, license)}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              License Number
            </Typography>
            <Typography variant="body1">
              {license.number}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Chip
              label={license.status.toUpperCase()}
              color={getStatusColor(license.status)}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              State
            </Typography>
            <Typography variant="body1">
              {license.state}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Expiry Date
            </Typography>
            <Typography variant="body1">
              {new Date(license.expiryDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                CEU Progress ({license.ceuCompleted}/{license.ceuRequired} credits)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {license.ceuProgress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={license.ceuProgress}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Button
            size="small"
            startIcon={<RefreshIcon />}
            variant="contained"
            disabled={!license.renewalEligible}
            onClick={handleRenewClick}
          >
            Renew
          </Button>
          <Button
            size="small"
            startIcon={<PrintIcon />}
            variant="outlined"
          >
            Print
          </Button>
          <Button
            size="small"
            startIcon={<DownloadIcon />}
            variant="outlined"
          >
            Download
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h1">
            My Licenses
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.href = '/new-application'}
          >
            Apply for New License
          </Button>
        </Box>

        {licenses.map(renderLicenseCard)}

        <Menu
          anchorEl={actionMenu.anchor}
          open={Boolean(actionMenu.anchor)}
          onClose={handleActionClose}
        >
          <MenuItem onClick={handleRenewClick}>
            <ListItemIcon>
              <RefreshIcon fontSize="small" />
            </ListItemIcon>
            Renew License
          </MenuItem>
          <MenuItem onClick={handleActionClose}>
            <ListItemIcon>
              <PrintIcon fontSize="small" />
            </ListItemIcon>
            Print License
          </MenuItem>
          <MenuItem onClick={handleActionClose}>
            <ListItemIcon>
              <EmailIcon fontSize="small" />
            </ListItemIcon>
            Email Certificate
          </MenuItem>
        </Menu>

        <Dialog open={renewDialog} onClose={handleRenewClose} maxWidth="sm" fullWidth>
          <DialogTitle>Renew License</DialogTitle>
          <DialogContent>
            <Box sx={{ p: 2 }}>
              <Typography variant="body1" paragraph>
                Please confirm the renewal of your {selectedLicense?.type} License ({selectedLicense?.number}).
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Renewal fee: $200.00
              </Typography>
              <TextField
                fullWidth
                label="Additional Notes"
                multiline
                rows={3}
                variant="outlined"
                sx={{ mt: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRenewClose}>Cancel</Button>
            <Button variant="contained" onClick={handleRenewClose}>
              Proceed to Payment
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default MyLicenses; 