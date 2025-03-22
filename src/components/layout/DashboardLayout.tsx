import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  useTheme,
  Switch,
  Badge,
  Menu,
  MenuItem,
  ListItemButton,
  Button,
  Tooltip,
  alpha,
  Stack,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as DescriptionIcon,
  Add as AddIcon,
  Search as SearchIcon,
  History as HistoryIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Notifications as NotificationsIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
  ExitToApp as LogoutIcon,
  Brightness4 as ThemeIcon,
  Language as LanguageIcon,
  Contrast as ContrastIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Palette as PaletteIcon,
  AccessTime as ClockIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { User, logout } from '../../store/slices/authSlice';

const drawerWidth = 260;

interface DashboardLayoutProps {
  children: React.ReactNode;
  onToggleTheme: () => void;
  mode: 'light' | 'dark';
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'My Licenses', icon: <DescriptionIcon />, path: '/licenses' },
  { text: 'License Search', icon: <SearchIcon />, path: '/license-search' },
];

const bottomMenuItems = [
  { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { text: 'Help & Support', icon: <HelpIcon />, path: '/support' },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  onToggleTheme,
  mode,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  // Group all useState hooks together
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');
  const [currentTime, setCurrentTime] = useState('');

  // Memoize handlers with useCallback
  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(prev => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  const handleProfileClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  }, []);

  const handleProfileClose = useCallback(() => {
    setProfileAnchor(null);
  }, []);

  const handleFontSizeToggle = useCallback(() => {
    setFontSize(prev => {
      const newSize = prev === 'normal' ? 'large' : 'normal';
      document.documentElement.style.fontSize = newSize === 'large' ? '110%' : '100%';
      return newSize;
    });
  }, []);

  const handleHighContrastToggle = useCallback(() => {
    setHighContrast(prev => {
      const newValue = !prev;
      document.documentElement.style.filter = newValue ? 'contrast(1.2)' : 'none';
      return newValue;
    });
  }, []);

  const handleTimeFormatToggle = useCallback(() => {
    setTimeFormat(prev => prev === '12h' ? '24h' : '12h');
  }, []);

  const getCurrentTime = useCallback(() => {
    const now = new Date();
    if (timeFormat === '12h') {
      return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  }, [timeFormat]);

  // Update time effect
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getCurrentTime());
    };
    
    // Initial update
    updateTime();
    
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [getCurrentTime]);

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={handleProfileClick}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: theme.palette.primary.main,
              cursor: 'pointer',
            }}
          >
            {user?.profile?.firstName?.[0]?.toUpperCase() || 'U'}
          </Avatar>
        </IconButton>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography 
            variant="subtitle1" 
            noWrap
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              lineHeight: 1.2,
              mb: 0.5
            }}
          >
            {user?.profile?.firstName} {user?.profile?.lastName}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            noWrap
            sx={{
              fontSize: '0.75rem',
              lineHeight: 1.2
            }}
          >
            {user?.email}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            disablePadding
            key={item.text}
            sx={{
              mb: 0.5,
            }}
          >
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: '0 24px 24px 0',
                mr: 2,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main + '20',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main + '30',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <List>
        {bottomMenuItems.map((item) => (
          <ListItem
            disablePadding
            key={item.text}
            sx={{
              mb: 0.5,
            }}
          >
            <ListItemButton
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: '0 24px 24px 0',
                mr: 2,
                '&.Mui-selected': {
                  backgroundColor: theme.palette.primary.main + '20',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.main + '30',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />
      
      <Box sx={{ p: 2 }}>
        {/* Theme Settings Section */}
        <ListItemButton
          onClick={() => setThemeMenuOpen(!themeMenuOpen)}
          sx={{
            borderRadius: 2,
            mb: 1,
          }}
        >
          <ListItemIcon>
            <ThemeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Appearance" />
          {themeMenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>

        <Collapse in={themeMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Dark/Light Mode */}
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
              </ListItemIcon>
              <ListItemText 
                primary="Dark Mode"
                secondary={mode === 'dark' ? 'On' : 'Off'}
              />
              <Switch
                checked={mode === 'dark'}
                onChange={onToggleTheme}
                edge="end"
              />
            </ListItem>

            {/* Font Size */}
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <PaletteIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Large Font"
                secondary={fontSize === 'large' ? 'On' : 'Off'}
              />
              <Switch
                checked={fontSize === 'large'}
                onChange={handleFontSizeToggle}
                edge="end"
              />
            </ListItem>

            {/* High Contrast */}
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <ContrastIcon />
              </ListItemIcon>
              <ListItemText 
                primary="High Contrast"
                secondary={highContrast ? 'On' : 'Off'}
              />
              <Switch
                checked={highContrast}
                onChange={handleHighContrastToggle}
                edge="end"
              />
            </ListItem>

            {/* Time Format */}
            <ListItem sx={{ pl: 4 }}>
              <ListItemIcon>
                <ClockIcon />
              </ListItemIcon>
              <ListItemText 
                primary="24-Hour Time"
                secondary={timeFormat === '24h' ? 'On' : 'Off'}
              />
              <Switch
                checked={timeFormat === '24h'}
                onChange={handleTimeFormatToggle}
                edge="end"
              />
            </ListItem>
          </List>
        </Collapse>

        {/* Current Time Display */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 1,
            mt: 1,
            borderRadius: 1,
            bgcolor: alpha(theme.palette.primary.main, 0.1),
          }}
        >
          <ClockIcon sx={{ mr: 1, fontSize: '1rem', color: 'primary.main' }} />
          <Typography variant="body2" color="primary">
            {currentTime}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            mt: 2,
            borderRadius: 2,
            justifyContent: 'flex-start',
            px: 2,
            py: 1,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: theme.palette.error.main + '10',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          boxShadow: 'none',
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            onClick={(e) => setNotificationAnchor(e.currentTarget)}
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}
      >
        <Toolbar />
        {children}
      </Box>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={() => setNotificationAnchor(null)}
        PaperProps={{
          sx: { width: 320, maxHeight: 400 },
        }}
      >
        <MenuItem>
          <Typography variant="body2">Your license application has been approved</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2">Please complete your profile information</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2">Your license will expire in 30 days</Typography>
        </MenuItem>
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchor}
        open={Boolean(profileAnchor)}
        onClose={handleProfileClose}
      >
        <MenuItem onClick={() => { navigate('/profile'); handleProfileClose(); }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => { navigate('/settings'); handleProfileClose(); }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Settings</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DashboardLayout; 