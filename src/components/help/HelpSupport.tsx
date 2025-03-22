import React, { useState, useCallback, useMemo } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  InputAdornment,
  IconButton,
  useTheme,
  alpha,
  Chip,
  Fade,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Chat as ChatIcon,
  Article as ArticleIcon,
  Search as SearchIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Send as SendIcon,
  AccessTime as AccessTimeIcon,
  ContactSupport as ContactSupportIcon,
  LiveHelp as LiveHelpIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const CATEGORIES = [
  'All',
  'Account',
  'Applications',
  'Licensing',
  'Payments',
  'Technical',
];

const faqs = [
  {
    question: 'How do I apply for a new license?',
    answer: 'To apply for a new license, navigate to the "New Application" section from the dashboard. Follow the step-by-step process to submit your application, including personal information, education details, and required documents.',
    category: 'Applications',
  },
  {
    question: 'What documents are required for license renewal?',
    answer: 'For license renewal, you typically need: proof of continuing education credits, current license information, and payment for renewal fees. Additional requirements may vary by license type and jurisdiction.',
    category: 'Licensing',
  },
  {
    question: 'How long does the application process take?',
    answer: 'The application processing time varies depending on the type of license and completeness of your application. Typically, it takes 4-6 weeks for review and approval. You can check your application status in the dashboard.',
    category: 'Applications',
  },
  {
    question: 'How do I update my contact information?',
    answer: 'You can update your contact information in the Profile section. Click on your profile, then select "Edit Profile" to modify your details. Remember to save your changes.',
    category: 'Account',
  },
  {
    question: 'What should I do if I forgot my password?',
    answer: 'Click on the "Forgot Password" link on the login page. Enter your registered email address to receive password reset instructions.',
    category: 'Account',
  },
  {
    question: 'How do I make a payment for my application?',
    answer: 'You can make payments through our secure payment gateway using credit/debit cards or bank transfers. Navigate to the Payments section in your dashboard to view and pay any pending fees.',
    category: 'Payments',
  },
  {
    question: 'What browsers are supported?',
    answer: 'Our platform supports the latest versions of Chrome, Firefox, Safari, and Edge browsers. For the best experience, we recommend keeping your browser updated.',
    category: 'Technical',
  },
];

const HelpSupport: React.FC = () => {
  const theme = useTheme();
  
  // Group all state hooks together at the top
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use useMemo for expensive computations
  const filteredFaqs = useMemo(() => 
    faqs.filter(
      faq =>
        (selectedCategory === 'All' || faq.category === selectedCategory) &&
        (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    [searchQuery, selectedCategory]
  );

  // Use useCallback for event handlers
  const handleContactSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setContactFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowContactForm(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const handleContactFormChange = useCallback((field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 6,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 60,
            height: 4,
            borderRadius: 2,
            background: theme => `linear-gradient(90deg, 
              ${theme.palette.primary.main}, 
              ${theme.palette.secondary.main})`
          }
        }}
      >
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 800,
            background: theme => `linear-gradient(45deg, 
              ${theme.palette.primary.main}, 
              ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Help & Support Center
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Find answers to your questions or get in touch with our support team
        </Typography>
      </Box>

      {/* Search Section */}
      <Card 
        elevation={0}
        sx={{ 
          mb: 4,
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(10px)',
        }}
      >
        <CardContent>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search help articles and FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {CATEGORIES.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
                sx={{ 
                  borderRadius: 2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {/* Quick Help Options */}
        <Grid item xs={12} md={4}>
          <Card 
            elevation={0}
            sx={{ 
              height: '100%',
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              background: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: 1,
                  mb: 3,
                }}
              >
                <ContactSupportIcon color="primary" />
                Contact Support
              </Typography>
              <List sx={{ '& .MuiListItem-root': { borderRadius: 2 } }}>
                <ListItem 
                  button 
                  onClick={() => setShowContactForm(true)}
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      background: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email Support"
                    secondary="Get help via email"
                  />
                </ListItem>
                <ListItem 
                  button 
                  component="a" 
                  href="tel:+1234567890"
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      background: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  <ListItemIcon>
                    <PhoneIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone Support"
                    secondary="Call us at 1-234-567-890"
                  />
                </ListItem>
                <ListItem 
                  button
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      background: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  <ListItemIcon>
                    <ChatIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Live Chat"
                    secondary="Chat with our support team"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* FAQs Section */}
        <Grid item xs={12} md={8}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: 1,
              mb: 3,
            }}
          >
            <LiveHelpIcon color="primary" />
            Frequently Asked Questions
          </Typography>
          {filteredFaqs.length === 0 ? (
            <Alert 
              severity="info"
              sx={{ 
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              No FAQs found matching your search criteria.
            </Alert>
          ) : (
            filteredFaqs.map((faq, index) => (
              <Accordion 
                key={index}
                sx={{ 
                  mb: 1,
                  borderRadius: '8px !important',
                  overflow: 'hidden',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  '&:before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    margin: '0 0 8px 0',
                  },
                }}
              >
                <AccordionSummary 
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    '&.Mui-expanded': {
                      minHeight: 48,
                      background: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <QuestionAnswerIcon 
                      color="primary"
                      sx={{ fontSize: 20 }}
                    />
                    <Typography>{faq.question}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {faq.answer}
                  </Typography>
                  <Chip 
                    label={faq.category} 
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Grid>
      </Grid>

      {/* Contact Form Dialog */}
      {showContactForm && (
        <Fade in>
          <Card
            elevation={0}
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 600,
              maxHeight: '90vh',
              overflow: 'auto',
              zIndex: 1000,
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              background: alpha(theme.palette.background.paper, 0.95),
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Contact Support</Typography>
                <IconButton onClick={() => setShowContactForm(false)} size="small">
                  <CloseIcon />
                </IconButton>
              </Box>
              {submitSuccess ? (
                <Alert 
                  severity="success" 
                  sx={{ 
                    mb: 2,
                    borderRadius: 2,
                  }}
                >
                  Your message has been sent successfully. We'll get back to you soon.
                </Alert>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        value={contactFormData.name}
                        onChange={handleContactFormChange('name')}
                        required
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={contactFormData.email}
                        onChange={handleContactFormChange('email')}
                        required
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        value={contactFormData.subject}
                        onChange={handleContactFormChange('subject')}
                        required
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={4}
                        value={contactFormData.message}
                        onChange={handleContactFormChange('message')}
                        required
                        sx={{ borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                          variant="outlined"
                          onClick={() => setShowContactForm(false)}
                          disabled={isSubmitting}
                          sx={{ 
                            borderRadius: 2,
                            px: 3,
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={isSubmitting}
                          sx={{ 
                            borderRadius: 2,
                            px: 3,
                            background: theme => `linear-gradient(45deg, 
                              ${theme.palette.primary.main}, 
                              ${theme.palette.primary.dark})`,
                          }}
                        >
                          {isSubmitting ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            <>
                              Send Message
                              <SendIcon sx={{ ml: 1 }} />
                            </>
                          )}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              )}
            </CardContent>
          </Card>
        </Fade>
      )}
    </Container>
  );
};

export default HelpSupport; 