import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  useTheme,
  alpha,
  Stack,
  IconButton,
  Fade,
  Paper,
  Divider,
  Avatar
} from '@mui/material';
import { Link } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportIcon from '@mui/icons-material/Support';
import StarIcon from '@mui/icons-material/Star';
import ShieldIcon from '@mui/icons-material/Shield';
import StorageIcon from '@mui/icons-material/Storage';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import VerifiedIcon from '@mui/icons-material/Verified';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Header from './common/Header';
import Footer from './common/Footer';

const LandingPage = () => {
  const theme = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <ShieldIcon sx={{ fontSize: 24 }} />,
      title: 'Enterprise Security',
      description: 'End-to-end encryption'
    },
    {
      icon: <StorageIcon sx={{ fontSize: 24 }} />,
      title: 'Scalable',
      description: 'Handle millions of licenses'
    },
    {
      icon: <CloudDoneIcon sx={{ fontSize: 24 }} />,
      title: 'Cloud-Native',
      description: 'Access from anywhere'
    },
    {
      icon: <AutorenewIcon sx={{ fontSize: 24 }} />,
      title: 'Automated',
      description: 'Streamlined workflows'
    }
  ];

  const showcaseFeatures = [
    {
      icon: <ShieldIcon sx={{ fontSize: 40 }} />,
      title: 'Advanced Security',
      description: 'End-to-end encryption and enterprise-grade protection'
    },
    {
      icon: <StorageIcon sx={{ fontSize: 40 }} />,
      title: 'Scalable Infrastructure',
      description: 'Handle millions of licenses with ease'
    },
    {
      icon: <CloudDoneIcon sx={{ fontSize: 40 }} />,
      title: 'Cloud-Native',
      description: 'Access from anywhere, anytime'
    },
    {
      icon: <AutorenewIcon sx={{ fontSize: 40 }} />,
      title: 'Automated Workflows',
      description: 'Streamline your licensing process'
    }
  ];

  const stats = [
    { icon: <BusinessIcon />, value: '500+', label: 'Enterprise Clients' },
    { icon: <TrendingUpIcon />, value: '10M+', label: 'Licenses Generated' },
    { icon: <GroupsIcon />, value: '100K+', label: 'Active Users' },
    { icon: <VerifiedIcon />, value: '99.9%', label: 'Customer Satisfaction' },
  ];

  const workflowSteps = [
    {
      icon: <AccountTreeIcon sx={{ fontSize: 32 }} />,
      title: 'Setup Your Product',
      description: 'Configure your software product and define license parameters'
    },
    {
      icon: <SettingsIcon sx={{ fontSize: 32 }} />,
      title: 'Customize Workflow',
      description: 'Set up automated workflows for license generation and management'
    },
    {
      icon: <CheckCircleIcon sx={{ fontSize: 32 }} />,
      title: 'Start Managing',
      description: 'Begin issuing and tracking licenses with real-time analytics'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO at TechCorp',
      company: 'TechCorp Inc.',
      content: 'The licensing platform has revolutionized how we manage our software distribution. Incredible automation capabilities!',
      avatar: '/avatars/avatar1.png'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Engineering',
      company: 'InnovateX',
      content: 'Security and ease of use in one package. This is exactly what we needed for our enterprise clients.',
      avatar: '/avatars/avatar2.png'
    }
  ];

  const partners = [
    'AWS', 'Microsoft', 'Google Cloud', 'Docker', 'Kubernetes', 'GitHub'
  ];

  return (
    <>
      <Header />
      <Box
        sx={{
          height: '100vh',
          background: '#fff',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Background pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            background: 'radial-gradient(circle at center, #1976d2 1px, transparent 1px) 0 0 / 40px 40px',
          }}
        />

        <Container 
          maxWidth="xl" 
          sx={{ 
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            mt: 8, // Add margin-top to account for the fixed header
          }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              <Stack spacing={4} sx={{ maxWidth: 600 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    color: '#1a1a1a',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  Simplify Your License Management
                </Typography>
                
                <Typography
                  variant="h5"
                  sx={{
                    color: alpha('#000', 0.7),
                    fontWeight: 500,
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                  }}
                >
                  Streamline your software licensing process with our powerful platform
                </Typography>

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    href="/register"
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      color: '#fff',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: theme.palette.primary.dark,
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    Register
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    href="/login"
                    sx={{
                      color: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      '&:hover': {
                        borderColor: theme.palette.primary.dark,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={6}>
              <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                  {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: 2.5,
                          height: '100%',
                          background: '#fff',
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                          },
                        }}
                      >
                        <Stack spacing={1.5}>
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                            }}
                          >
                            {feature.icon}
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              color: '#1a1a1a',
                              fontSize: '1.1rem',
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: alpha('#000', 0.7),
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default LandingPage; 