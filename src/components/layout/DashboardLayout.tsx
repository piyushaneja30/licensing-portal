import React, { useState } from 'react';
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
  { text: 'New Application', icon: <AddIcon />, path: '/new-application' },
  { text: 'License Search', icon: <SearchIcon />, path: '/license-search' },
  { text: 'Application History', icon: <HistoryIcon />, path: '/history' },
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
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

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
            {user?.firstName?.[0]?.toUpperCase() || 'U'}
          </Avatar>
        </IconButton>
        <Box sx={{ overflow: 'hidden' }}>
          <Typography variant="subtitle1" noWrap>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
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
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="text.secondary">
          {mode === 'light' ? 'Light' : 'Dark'} Mode
        </Typography>
        <Switch
          checked={mode === 'dark'}
          onChange={onToggleTheme}
          icon={<LightModeIcon />}
          checkedIcon={<DarkModeIcon />}
        />
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