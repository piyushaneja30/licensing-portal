import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  useTheme,
  alpha,
  Stack,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

const Header = () => {
  const theme = useTheme();
  const location = useLocation();

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  if (isAuthPage) {
    return null;
  }

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${alpha('#000', 0.1)}`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1.5, px: { xs: 2, sm: 3, md: 4 } }}>
          {/* Logo */}
          <Stack 
            direction="row" 
            spacing={1.5} 
            alignItems="center" 
            component={Link} 
            to="/"
            sx={{ 
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: theme.palette.primary.main,
                color: '#fff',
              }}
            >
              <LockIcon />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: '#1a1a1a',
                fontSize: { xs: '1.25rem', md: '1.5rem' },
              }}
            >
              Licensing Portal
            </Typography>
          </Stack>

          {/* Auth Buttons */}
          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                '&:hover': {
                  borderColor: theme.palette.primary.dark,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: '#fff',
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              Register
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 