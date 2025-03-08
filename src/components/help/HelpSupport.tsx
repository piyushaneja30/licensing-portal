import React, { useState } from 'react';
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
} from '@mui/icons-material';

const faqs = [
  {
    question: 'How do I apply for a new license?',
    answer: 'To apply for a new license, navigate to the "New Application" section from the dashboard. Follow the step-by-step process to submit your application, including personal information, education details, and required documents.',
  },
  {
    question: 'What documents are required for license renewal?',
    answer: 'For license renewal, you typically need: proof of continuing education credits, current license information, and payment for renewal fees. Additional requirements may vary by license type and jurisdiction.',
  },
  {
    question: 'How long does the application process take?',
    answer: 'The application processing time varies depending on the type of license and completeness of your application. Typically, it takes 4-6 weeks for review and approval. You can check your application status in the dashboard.',
  },
  {
    question: 'How do I update my contact information?',
    answer: 'You can update your contact information in the Profile section. Click on your profile, then select "Edit Profile" to modify your details. Remember to save your changes.',
  },
  {
    question: 'What should I do if I forgot my password?',
    answer: 'Click on the "Forgot Password" link on the login page. Enter your registered email address to receive password reset instructions.',
  },
];

const HelpSupport: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setContactFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Help & Support
        </Typography>

        {/* Search Section */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search help articles and FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Quick Help Options */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contact Support
                </Typography>
                <List>
                  <ListItem button onClick={() => setShowContactForm(true)}>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email Support"
                      secondary="Get help via email"
                    />
                  </ListItem>
                  <ListItem button component="a" href="tel:+1234567890">
                    <ListItemIcon>
                      <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Phone Support"
                      secondary="Call us at 1-234-567-890"
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <ChatIcon />
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
            <Typography variant="h6" gutterBottom>
              Frequently Asked Questions
            </Typography>
            {filteredFaqs.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>
                    <QuestionAnswerIcon
                      sx={{ mr: 1, verticalAlign: 'middle', fontSize: 20 }}
                    />
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>

        {/* Contact Form */}
        {showContactForm && (
          <Box sx={{ mt: 4 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contact Support
                </Typography>
                {submitSuccess && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Your message has been sent successfully. We'll get back to you soon.
                  </Alert>
                )}
                <form onSubmit={handleContactSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Name"
                        value={contactFormData.name}
                        onChange={(e) =>
                          setContactFormData({ ...contactFormData, name: e.target.value })
                        }
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={contactFormData.email}
                        onChange={(e) =>
                          setContactFormData({ ...contactFormData, email: e.target.value })
                        }
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        value={contactFormData.subject}
                        onChange={(e) =>
                          setContactFormData({ ...contactFormData, subject: e.target.value })
                        }
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        multiline
                        rows={4}
                        value={contactFormData.message}
                        onChange={(e) =>
                          setContactFormData({ ...contactFormData, message: e.target.value })
                        }
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                          variant="outlined"
                          onClick={() => setShowContactForm(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                        >
                          Send Message
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default HelpSupport; 