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
  Avatar,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  RocketLaunch as RocketLaunchIcon,
  ArrowForward as ArrowForwardIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Support as SupportIcon,
  Star as StarIcon,
  Shield as ShieldIcon,
  Storage as StorageIcon,
  CloudDone as CloudDoneIcon,
  Autorenew as AutorenewIcon,
  Verified as VerifiedIcon,
  Business as BusinessIcon,
  Groups as GroupsIcon,
  TrendingUp as TrendingUpIcon,
  AccountTree as AccountTreeIcon,
  Settings as SettingsIcon,
  CheckCircle as CheckCircleIcon,
  FormatQuote as FormatQuoteIcon,
  KeyboardArrowRight as ArrowRightIcon,
} from '@mui/icons-material';
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
      description: 'End-to-end encryption and robust security measures to protect your licensing data.'
    },
    {
      icon: <StorageIcon sx={{ fontSize: 24 }} />,
      title: 'Scalable Infrastructure',
      description: 'Handle millions of licenses with ease. Built for enterprise-scale operations.'
    },
    {
      icon: <CloudDoneIcon sx={{ fontSize: 24 }} />,
      title: 'Cloud-Native Platform',
      description: 'Access your licensing portal from anywhere, anytime. Real-time updates and syncing.'
    },
    {
      icon: <AutorenewIcon sx={{ fontSize: 24 }} />,
      title: 'Automated Workflows',
      description: 'Streamline your licensing process with intelligent automation and custom workflows.'
    }
  ];

  const benefits = [
    {
      icon: <SpeedIcon sx={{ fontSize: 32 }} />,
      title: 'Lightning Fast',
      description: 'Process licenses in minutes, not days'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 32 }} />,
      title: 'Bank-Grade Security',
      description: 'Your data is protected with military-grade encryption'
    },
    {
      icon: <SupportIcon sx={{ fontSize: 32 }} />,
      title: '24/7 Support',
      description: 'Round-the-clock expert assistance'
    },
    {
      icon: <StarIcon sx={{ fontSize: 32 }} />,
      title: 'User-Friendly',
      description: 'Intuitive interface for all skill levels'
    }
  ];

  const stats = [
    { icon: <BusinessIcon />, value: '500+', label: 'Enterprise Clients' },
    { icon: <TrendingUpIcon />, value: '10M+', label: 'Licenses Generated' },
    { icon: <GroupsIcon />, value: '100K+', label: 'Active Users' },
    { icon: <VerifiedIcon />, value: '99.9%', label: 'Customer Satisfaction' },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'CTO',
      company: 'TechCorp Inc.',
      content: 'The licensing platform has revolutionized how we manage our software distribution. The automation capabilities are incredible!',
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

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Header />
      
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 12, md: 16 },
          pb: { xs: 8, md: 12 },
        }}
      >
        {/* Background Gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 50% 0%, ${alpha(theme.palette.primary.main, 0.1)}, transparent 70%)`,
            zIndex: 0,
          }}
        />

        {/* Hero Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={isLoaded} timeout={1000}>
                <Stack spacing={4}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 2,
                    }}
                  >
                    Simplify Your License Management
                  </Typography>
                  
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      fontWeight: 400,
                    }}
                  >
                    Streamline your software licensing process with our powerful platform. 
                    Built for businesses that value security, efficiency, and scalability.
                  </Typography>

                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={2}
                    sx={{ pt: 2 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      component={Link}
                      to="/register"
                      sx={{
                        py: 1.5,
                        px: 4,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        boxShadow: `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
                        '&:hover': {
                          background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Get Started
                      <ArrowForwardIcon sx={{ ml: 1 }} />
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      component={Link}
                      to="/login"
                      sx={{
                        py: 1.5,
                        px: 4,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 2,
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Sign In
                    </Button>
                  </Stack>
                </Stack>
              </Fade>
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Fade in={isLoaded} timeout={1000 + (index * 200)}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          height: '100%',
                          borderRadius: 4,
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          background: alpha(theme.palette.background.paper, 0.8),
                          backdropFilter: 'blur(20px)',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.1)}`,
                            borderColor: 'primary.main',
                          },
                        }}
                      >
                        <Stack spacing={2}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.light, 0.1)})`,
                              color: 'primary.main',
                            }}
                          >
                            {feature.icon}
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              fontSize: '1.1rem',
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              lineHeight: 1.6,
                            }}
                          >
                            {feature.description}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Fade in={isLoaded} timeout={1000 + (index * 200)}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: 4,
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      background: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <Box
                      sx={{
                        mb: 2,
                        display: 'inline-flex',
                        p: 1.5,
                        borderRadius: 2,
                        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.light, 0.1)})`,
                        color: 'primary.main',
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Stack spacing={4}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    letterSpacing: '-0.02em',
                    mb: 2,
                  }}
                >
                  Why Choose Our Platform?
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.6,
                    fontWeight: 400,
                    mb: 4,
                  }}
                >
                  Experience the most comprehensive and secure licensing solution designed for modern businesses.
                </Typography>
                <Grid container spacing={3}>
                  {benefits.map((benefit, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Fade in={isLoaded} timeout={1000 + (index * 200)}>
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            '&:hover': {
                              bgcolor: alpha(theme.palette.primary.main, 0.03),
                            },
                          }}
                        >
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 1.5,
                              background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.light, 0.1)})`,
                              color: 'primary.main',
                            }}
                          >
                            {benefit.icon}
                          </Box>
                          <Stack spacing={0.5}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                fontWeight: 600,
                              }}
                            >
                              {benefit.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                              }}
                            >
                              {benefit.description}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Fade>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: '100%',
                  minHeight: 400,
                  borderRadius: 4,
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.95)}, ${alpha(theme.palette.primary.dark, 0.95)})`,
                    zIndex: 1,
                  },
                }}
              >
                <Stack
                  spacing={3}
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                    height: '100%',
                    p: 4,
                  }}
                >
                  <RocketLaunchIcon sx={{ fontSize: 48, color: 'white' }} />
                  <Typography
                    variant="h3"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      fontSize: { xs: '1.75rem', md: '2rem' },
                    }}
                  >
                    Ready to Transform Your Licensing Process?
                  </Typography>
                  <Typography
                    sx={{
                      color: alpha('#fff', 0.8),
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                    }}
                  >
                    Join thousands of businesses that have streamlined their licensing operations with our platform.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/register"
                    sx={{
                      mt: 2,
                      bgcolor: 'white',
                      color: 'primary.main',
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: alpha('#fff', 0.9),
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Start Free Trial
                    <ArrowRightIcon sx={{ ml: 1 }} />
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center" sx={{ mb: 8 }}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '2.5rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Trusted by Industry Leaders
            </Typography>
            <Typography
              variant="h5"
              align="center"
              sx={{
                color: 'text.secondary',
                maxWidth: 800,
                mx: 'auto',
              }}
            >
              See what our customers have to say about their experience with our platform
            </Typography>
          </Stack>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Fade in={isLoaded} timeout={1000 + (index * 200)}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      borderRadius: 4,
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                      background: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(20px)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <FormatQuoteIcon
                      sx={{
                        position: 'absolute',
                        top: 20,
                        right: 20,
                        fontSize: 40,
                        color: alpha(theme.palette.primary.main, 0.1),
                      }}
                    />
                    <Stack spacing={3}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '1.1rem',
                          lineHeight: 1.6,
                          fontStyle: 'italic',
                          color: 'text.secondary',
                        }}
                      >
                        "{testimonial.content}"
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          sx={{
                            width: 48,
                            height: 48,
                            bgcolor: theme.palette.primary.main,
                          }}
                        >
                          {testimonial.name[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight={600}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role} at {testimonial.company}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 8 },
              borderRadius: 4,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                background: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)',
              }}
            />
            <Stack spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  letterSpacing: '-0.02em',
                }}
              >
                Start Simplifying Your License Management Today
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 400,
                  color: alpha('#fff', 0.9),
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                Join thousands of businesses that trust our platform for their licensing needs
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/register"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    '&:hover': {
                      bgcolor: alpha('#fff', 0.9),
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Get Started Now
                  <ArrowRightIcon sx={{ ml: 1 }} />
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/contact"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    borderWidth: 2,
                    '&:hover': {
                      borderColor: 'white',
                      borderWidth: 2,
                      bgcolor: alpha('#fff', 0.1),
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Contact Sales
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage; 