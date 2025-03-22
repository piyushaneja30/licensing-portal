import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Switch,
  Button,
  Box,
  Card,
  CardContent,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
  Fade,
  Select,
  FormControl,
  InputLabel,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  NotificationsActive as NotificationsActiveIcon,
  Lock as LockIcon,
  Devices as DevicesIcon,
  Refresh as RefreshIcon,
  CalendarMonth as CalendarIcon,
  Campaign as CampaignIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Info as InfoIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';

interface SettingsState {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    renewalReminders: boolean;
    applicationUpdates: boolean;
    marketingEmails: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
    deviceHistory: boolean;
    passwordLastChanged: string;
    activeDevices: Array<{
      device: string;
      location: string;
      lastActive: string;
    }>;
  };
  preferences: {
    darkMode: boolean;
    language: string;
    timezone: string;
    dateFormat: string;
  };
  profile: {
    email: string;
    phone: string;
    notificationEmail: string;
  };
}

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
];

const TIMEZONES = [
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Asia/Tokyo',
  'Asia/Dubai',
  'Europe/London',
  'Europe/Paris',
];

const DATE_FORMATS = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
];

const Settings: React.FC = () => {
  const theme = useTheme();
  
  // Initialize all state variables at the top level
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(() => ({
    notifications: {
      email: true,
      sms: false,
      push: true,
      renewalReminders: true,
      applicationUpdates: true,
      marketingEmails: false,
    },
    security: {
      twoFactorAuth: true,
      loginAlerts: true,
      deviceHistory: true,
      passwordLastChanged: '2024-03-01',
      activeDevices: [
        {
          device: 'MacBook Pro',
          location: 'San Francisco, CA',
          lastActive: 'Now',
        },
        {
          device: 'iPhone 13',
          location: 'San Francisco, CA',
          lastActive: '2 hours ago',
        },
      ],
    },
    preferences: {
      darkMode: theme.palette.mode === 'dark',
      language: 'en',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY',
    },
    profile: {
      email: 'user@example.com',
      phone: '+1 (555) 123-4567',
      notificationEmail: 'notifications@example.com',
    },
  }));

  // Memoize handlers to prevent unnecessary re-renders
  const handleNotificationChange = useCallback((key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  }, []);

  const handleSecurityChange = useCallback((key: keyof typeof settings.security) => {
    if (typeof settings.security[key] === 'boolean') {
      setSettings(prev => ({
        ...prev,
        security: {
          ...prev.security,
          [key]: !prev.security[key],
        },
      }));
    }
  }, []);

  const handlePreferenceChange = useCallback((key: keyof typeof settings.preferences, value: any) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
    }));
  }, []);

  const handleProfileChange = useCallback((key: keyof typeof settings.profile, value: string) => {
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [key]: value,
      },
    }));
  }, []);

  const handleSave = useCallback(async () => {
    try {
      setSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Settings
        </Typography>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={saving}
          sx={{
            ml: 'auto',
            px: 4,
            py: 1,
            borderRadius: 2,
            background: theme => `linear-gradient(45deg, 
              ${theme.palette.primary.main}, 
              ${theme.palette.primary.dark})`,
            '&:hover': {
              background: theme => `linear-gradient(45deg, 
                ${theme.palette.primary.dark}, 
                ${theme.palette.primary.main})`,
            },
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>

      {saveSuccess && (
        <Fade in>
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3,
              borderRadius: 2,
              '& .MuiAlert-icon': {
                fontSize: '1.5rem',
              },
            }}
          >
            Settings saved successfully
          </Alert>
        </Fade>
      )}

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Profile Settings</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Primary Email"
                    value={settings.profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={settings.profile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notification Email"
                    value={settings.profile.notificationEmail}
                    onChange={(e) => handleProfileChange('notificationEmail', e.target.value)}
                    variant="outlined"
                    helperText="Separate email for notifications (optional)"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Security Settings</Typography>
              </Box>
              <List disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <LockIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Two-Factor Authentication"
                    secondary="Secure your account with 2FA"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.security.twoFactorAuth}
                      onChange={() => handleSecurityChange('twoFactorAuth')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemIcon>
                    <NotificationsIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Login Alerts"
                    secondary="Get notified of new sign-ins"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.security.loginAlerts}
                      onChange={() => handleSecurityChange('loginAlerts')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemIcon>
                    <DevicesIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Active Devices"
                    secondary={`${settings.security.activeDevices.length} devices connected`}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Refresh devices">
                      <IconButton edge="end">
                        <RefreshIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <NotificationsIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Notification Preferences</Typography>
              </Box>
              <List disablePadding>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email Notifications"
                    secondary="Updates about your applications"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemIcon>
                    <CalendarIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Renewal Reminders"
                    secondary="Get notified before license expiry"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.renewalReminders}
                      onChange={() => handleNotificationChange('renewalReminders')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider component="li" />
                <ListItem>
                  <ListItemIcon>
                    <CampaignIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Marketing Updates"
                    secondary="News and promotional content"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.marketingEmails}
                      onChange={() => handleNotificationChange('marketingEmails')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Application Preferences */}
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PaletteIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Application Preferences</Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Language</InputLabel>
                    <Select
                      value={settings.preferences.language}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                      label="Language"
                    >
                      {LANGUAGES.map((lang) => (
                        <MenuItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Timezone</InputLabel>
                    <Select
                      value={settings.preferences.timezone}
                      onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                      label="Timezone"
                    >
                      {TIMEZONES.map((tz) => (
                        <MenuItem key={tz} value={tz}>
                          {tz}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Date Format</InputLabel>
                    <Select
                      value={settings.preferences.dateFormat}
                      onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)}
                      label="Date Format"
                    >
                      {DATE_FORMATS.map((format) => (
                        <MenuItem key={format.value} value={format.value}>
                          {format.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon>
                      {settings.preferences.darkMode ? (
                        <DarkModeIcon color="primary" />
                      ) : (
                        <LightModeIcon color="primary" />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary="Dark Mode"
                      secondary="Toggle dark/light theme"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.preferences.darkMode}
                        onChange={() => handlePreferenceChange('darkMode', !settings.preferences.darkMode)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings; 