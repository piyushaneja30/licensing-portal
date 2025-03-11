import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  CheckCircle as CheckIcon,
  Payment as PaymentIcon,
  School as EducationIcon,
  Work as WorkIcon,
  Assignment as DocumentIcon,
  Person as PersonIcon,
  Gavel as LegalIcon,
  VerifiedUser as VerificationIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import PaymentForm from '../payment/PaymentForm';
import SuccessNotification from '../common/SuccessNotification';
import { applicationApi } from '../../services/api';

interface ApplicationFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Education
  university: string;
  degree: string;
  graduationYear: string;
  gpa: string;
  
  // Work Experience
  employer: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  
  // References
  references: {
    name: string;
    email: string;
    phone: string;
    relationship: string;
  }[];
  
  // Documents
  transcripts: File | null;
  resume: File | null;
  identificationDoc: File | null;
  
  // Legal
  criminalRecord: boolean;
  disciplinaryAction: boolean;
  legalDeclaration: boolean;
}

const steps = [
  {
    label: 'Personal Information',
    icon: <PersonIcon />,
  },
  {
    label: 'Education Details',
    icon: <EducationIcon />,
  },
  {
    label: 'Work Experience',
    icon: <WorkIcon />,
  },
  {
    label: 'Professional References',
    icon: <VerificationIcon />,
  },
  {
    label: 'Document Upload',
    icon: <DocumentIcon />,
  },
  {
    label: 'Legal Declarations',
    icon: <LegalIcon />,
  },
  {
    label: 'Review & Payment',
    icon: <PaymentIcon />,
  },
];

const validationSchemas = {
  0: Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
  }),
  1: Yup.object({
    university: Yup.string().required('University name is required'),
    degree: Yup.string().required('Degree is required'),
  }),
  2: Yup.object({
    employer: Yup.string(),
  }),
  3: Yup.object().shape({
    references: Yup.array().of(
      Yup.object().shape({
        name: Yup.string(),
        email: Yup.string(),
        phone: Yup.string(),
        relationship: Yup.string(),
      })
    ),
  }),
  4: Yup.object({}),
  5: Yup.object({}),
  6: Yup.object({}),
};

const ApplicationFlow: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [processingApplication, setProcessingApplication] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      university: '',
      degree: '',
      graduationYear: '',
      gpa: '',
      employer: '',
      position: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
      references: [{
        name: '',
        email: '',
        phone: '',
        relationship: '',
      }],
      transcripts: null,
      resume: null,
      identificationDoc: null,
      criminalRecord: false,
      disciplinaryAction: false,
      legalDeclaration: false,
    },
    validationSchema: validationSchemas[activeStep],
    validateOnMount: false,
    validateOnChange: true,
    onSubmit: async (values) => {
      if (activeStep === steps.length - 1) {
        setShowPaymentDialog(true);
      } else {
        handleNext();
      }
    },
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      formik.handleSubmit();
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFileUpload = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({ ...prev, [field]: progress }));
        if (progress >= 100) {
          clearInterval(interval);
          formik.setFieldValue(field, file);
        }
      }, 500);
    }
  };

  const handlePayment = async (paymentData: any) => {
    setPaymentProcessing(true);
    try {
      // Process payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Prepare application data
      const applicationData = {
        ...formik.values,
        payment: {
          amount: 150,
          status: 'completed',
          transactionId: Math.random().toString(36).substring(7),
          paymentDate: new Date().toISOString(),
          paymentMethod: 'credit_card'
        },
        status: 'submitted',
        submissionDate: new Date().toISOString(),
        licenseTypeId: 'PROF_ENG_001' // You might want to make this dynamic based on the license type
      };

      // Submit application to backend
      await applicationApi.create(applicationData);
      
      setShowPaymentDialog(false);
      setProcessingApplication(true);
      setShowSuccess(true);
      
      // Simulate application processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      setProcessingApplication(false);
      
      // Navigate to application history
      navigate('/application-history');
    } catch (error) {
      console.error('Payment or submission failed:', error);
      setPaymentError('Failed to process payment or submit application. Please try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            {/* Add more personal information fields */}
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="University"
                name="university"
                value={formik.values.university}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Degree"
                name="degree"
                value={formik.values.degree}
                onChange={formik.handleChange}
              />
            </Grid>
            {/* Add more education fields */}
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Current/Most Recent Employer"
                name="employer"
                value={formik.values.employer}
                onChange={formik.handleChange}
              />
            </Grid>
            {/* Add more work experience fields */}
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            {formik.values.references.map((reference, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Reference {index + 1}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Name"
                          name={`references.${index}.name`}
                          value={reference.name}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name={`references.${index}.email`}
                          value={reference.email}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name={`references.${index}.phone`}
                          value={reference.phone}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Relationship"
                          name={`references.${index}.relationship`}
                          value={reference.relationship}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() => {
                  const newReferences = [...formik.values.references];
                  newReferences.push({
                    name: '',
                    email: '',
                    phone: '',
                    relationship: '',
                  });
                  formik.setFieldValue('references', newReferences);
                }}
              >
                Add Reference
              </Button>
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Required Documents
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <UploadIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Official Transcripts"
                        secondary={
                          uploadProgress.transcripts ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CircularProgress
                                variant="determinate"
                                value={uploadProgress.transcripts}
                                size={20}
                              />
                              <Typography variant="body2">
                                {uploadProgress.transcripts}%
                              </Typography>
                            </Box>
                          ) : 'PDF or scanned copy'
                        }
                      />
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<UploadIcon />}
                      >
                        Upload
                        <input
                          type="file"
                          hidden
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload('transcripts')}
                        />
                      </Button>
                    </ListItem>
                    {/* Add more document upload items */}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      case 5:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Please read and acknowledge the following declarations carefully.
              </Alert>
              {/* Add legal declarations and checkboxes */}
            </Grid>
          </Grid>
        );

      case 6:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Application Summary
                  </Typography>
                  {/* Add application summary */}
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Payment Details
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Application Fee: $150.00
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Payment will be processed securely through our payment provider.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel StepIconComponent={() => step.icon}>
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(); }}>
          {renderStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Submit & Pay' : 'Next'}
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Payment Dialog */}
      <Dialog 
        open={showPaymentDialog} 
        onClose={() => !paymentProcessing && setShowPaymentDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Complete Payment</DialogTitle>
        <DialogContent>
          <PaymentForm
            amount={150}
            onSubmit={handlePayment}
            onCancel={() => setShowPaymentDialog(false)}
            processing={paymentProcessing}
          />
        </DialogContent>
      </Dialog>

      {/* Success Notification */}
      <SuccessNotification
        open={showSuccess}
        title={processingApplication ? "Processing Application" : "Application Submitted Successfully!"}
        message={
          processingApplication
            ? "Please wait while we process your application..."
            : "Your application has been submitted successfully. You will receive an email confirmation shortly."
        }
        loading={processingApplication}
        onClose={() => setShowSuccess(false)}
      />
    </Container>
  );
};

export default ApplicationFlow; 