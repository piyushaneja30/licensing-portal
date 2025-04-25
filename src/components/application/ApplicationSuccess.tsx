import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Fade,
  Divider,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  Alert,
} from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import {
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Email as EmailIcon,
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Done as DoneIcon,
  ExpandMore as ExpandMoreIcon,
  Share as ShareIcon,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';
import confetti from 'canvas-confetti';

const ApplicationSuccess: React.FC = () => {
  const { applicationNumber } = useParams<{ applicationNumber: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);

  const isDarkMode = theme.palette.mode === 'dark';
  
  // Memoize theme colors to ensure stable dependencies
  const confettiColors = useMemo(() => [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    '#FFD700'
  ], [theme.palette.primary.main, theme.palette.secondary.main]);

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 3,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { y: 0.6 },
        colors: confettiColors,
      });
    }, 50);

    return () => clearInterval(interval);
  }, [confettiColors]);

  const handleShare = async () => {
    const shareText = `My license application (${applicationNumber}) has been submitted successfully!`;
    try {
      await navigator.clipboard.writeText(shareText);
      setShowCopiedAlert(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Fade in timeout={1000}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 6 },
            mt: 8,
            mb: 8,
            textAlign: 'center',
            background: isDarkMode
              ? `linear-gradient(135deg, 
                  ${theme.palette.background.paper} 0%,
                  ${theme.palette.primary.dark}15 100%)`
              : `linear-gradient(135deg, 
                  ${theme.palette.common.white} 0%,
                  ${theme.palette.primary.light}15 100%)`,
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            boxShadow: isDarkMode 
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: theme => `linear-gradient(90deg, 
                ${theme.palette.primary.main} 0%,
                ${theme.palette.secondary.main} 100%)`
            }
          }}
        >
          <Box sx={{ mb: 4 }}>
            <CheckCircleIcon 
              sx={{ 
                fontSize: { xs: 60, md: 80 },
                color: 'primary.main',
                filter: 'drop-shadow(0 4px 8px rgba(25, 118, 210, 0.3))',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)', opacity: 1 },
                  '50%': { transform: 'scale(1.1)', opacity: 0.8 },
                  '100%': { transform: 'scale(1)', opacity: 1 }
                }
              }} 
            />
          </Box>
          
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 800,
              background: theme => `linear-gradient(45deg, 
                ${theme.palette.primary.main}, 
                ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: isDarkMode 
                ? '0 2px 4px rgba(0,0,0,0.5)'
                : 'none'
            }}
          >
            Application Submitted Successfully!
          </Typography>
          
          <Typography 
            variant="h5" 
            color="primary" 
            sx={{ 
              mb: 3,
              fontFamily: 'monospace',
              letterSpacing: 1,
              fontSize: { xs: '1rem', md: '1.2rem' },
              background: theme => isDarkMode 
                ? `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`
                : 'inherit',
              WebkitBackgroundClip: isDarkMode ? 'text' : 'inherit',
              WebkitTextFillColor: isDarkMode ? 'transparent' : 'inherit',
            }}
          >
            Application Number: {applicationNumber}
          </Typography>
          
          <Divider sx={{ my: 4 }} />

          <Accordion 
            sx={{ 
              mb: 4,
              background: 'transparent',
              boxShadow: 'none',
              '&:before': {
                display: 'none',
              },
              '& .MuiAccordionSummary-root': {
                background: theme => theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.02)',
                borderRadius: 1,
              }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                '& .MuiAccordionSummary-content': {
                  justifyContent: 'center',
                }
              }}
            >
              <Typography variant="h6" color="primary">
                What's Next?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ textAlign: 'left', px: 2 }}>
                <Typography variant="body1" paragraph>
                  1. <strong>Application Review:</strong> Your application will be reviewed by our licensing board within 5-7 business days.
                </Typography>
                <Typography variant="body1" paragraph>
                  2. <strong>Document Verification:</strong> We may contact you if additional documents are required.
                </Typography>
                <Typography variant="body1" paragraph>
                  3. <strong>Status Updates:</strong> You'll receive email notifications about your application status.
                </Typography>
                <Typography variant="body1" paragraph>
                  4. <strong>Final Decision:</strong> Once reviewed, you'll receive a decision via email.
                </Typography>
                <Typography variant="body1">
                  5. <strong>License Issuance:</strong> If approved, your license will be issued and mailed to your registered address.
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Timeline position="alternate" sx={{ mb: 4 }}>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="success">
                  <DoneIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6" component="span">
                  Application Submitted
                </Typography>
                <Typography>Your application has been successfully received</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <AssignmentIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6" component="span">
                  Under Review
                </Typography>
                <Typography>We are reviewing your application</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot>
                  <EmailIcon />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="h6" component="span">
                  Decision
                </Typography>
                <Typography>You will be notified via email</Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>

          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& .MuiButton-root': {
              px: 4,
              py: 1.5,
              borderRadius: 2,
              transition: 'all 0.3s ease',
              flex: { xs: '1 1 100%', sm: '0 1 auto' },
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 6
              }
            }
          }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(`/application-status/${applicationNumber}`)}
              startIcon={<AccessTimeIcon />}
              sx={{
                background: theme => `linear-gradient(45deg, 
                  ${theme.palette.primary.main}, 
                  ${theme.palette.primary.dark})`,
                boxShadow: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shimmer 2s infinite',
                },
                '@keyframes shimmer': {
                  '100%': {
                    left: '100%',
                  }
                }
              }}
            >
              Track Status
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={handleShare}
              startIcon={<ContentCopyIcon />}
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'primary.light',
                  color: 'primary.dark',
                }
              }}
            >
              Share Status
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/dashboard')}
              startIcon={<DashboardIcon />}
              sx={{
                borderColor: 'secondary.main',
                color: 'secondary.main',
                '&:hover': {
                  borderColor: 'secondary.dark',
                  backgroundColor: 'secondary.light',
                  color: 'secondary.dark',
                }
              }}
            >
              Go to Dashboard
            </Button>
          </Box>
        </Paper>
      </Fade>

      <Snackbar
        open={showCopiedAlert}
        autoHideDuration={3000}
        onClose={() => setShowCopiedAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowCopiedAlert(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Application status copied to clipboard!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ApplicationSuccess; 