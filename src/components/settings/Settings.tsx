import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Box,
  Card,
  CardContent,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
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
  };
  preferences: {
    darkMode: boolean;
    language: string;
  };
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
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
    },
    preferences: {
      darkMode: false,
      language: 'en',
    },
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleNotificationChange = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleSecurityChange = (key: keyof typeof settings.security) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: !prev.security[key],
      },
    }));
  };

  const handlePreferenceChange = (key: keyof typeof settings.preferences) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key],
      },
    }));
  };

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h1">
            Settings
          </Typography>
          <Button
            variant="contained"
            sx={{ ml: 'auto' }}
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </Box>

        {saveSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Settings saved successfully
          </Alert>
        )}

        <Grid container spacing={3}>
          {/* Notification Settings */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NotificationsIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Notification Preferences</Typography>
                </Box>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText primary="Email Notifications" />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.notifications.email}
                        onChange={() => handleNotificationChange('email')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText primary="SMS Notifications" />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.notifications.sms}
                        onChange={() => handleNotificationChange('sms')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsActiveIcon />
                    </ListItemIcon>
                    <ListItemText primary="Push Notifications" />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.notifications.push}
                        onChange={() => handleNotificationChange('push')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Security Settings */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SecurityIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Security Settings</Typography>
                </Box>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LockIcon />
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
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsIcon />
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
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Application Preferences */}
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PaletteIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Application Preferences</Typography>
                </Box>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <LanguageIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Language"
                      secondary="Choose your preferred language"
                    />
                    <ListItemSecondaryAction>
                      <Button variant="outlined" size="small">
                        English
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PaletteIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Dark Mode"
                      secondary="Toggle dark/light theme"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings.preferences.darkMode}
                        onChange={() => handlePreferenceChange('darkMode')}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Settings; 