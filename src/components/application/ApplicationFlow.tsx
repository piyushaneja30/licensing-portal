import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  FormControlLabel,
  Checkbox,
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
  Info as InfoIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import PaymentForm from '../payment/PaymentForm';
import SuccessNotification from '../common/SuccessNotification';
import { applicationApi } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { submitApplication } from '../../redux/actions/applicationActions';
import { LicenseApplication } from '../../types/license';
import { LICENSE_TYPES } from '../../constants/licenseTypes';
import { AppDispatch } from '../../store';

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
  dateOfBirth: string;
  ssn: string;
  gender: string;
  citizenship: string;
  immigrationStatus: string;
  immigrationNumber: string;
  
  // Education
  education: {
    institution: string;
  degree: string;
  graduationYear: string;
    field: string;
  gpa: string;
    credits: string;
    major: string;
    minor: string;
    honors: string;
    thesis: string;
  }[];
  
  // Work Experience
  workExperience: {
  employer: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
    supervisor: string;
    supervisorEmail: string;
    supervisorPhone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  }[];
  
  // References
  references: {
    name: string;
    email: string;
    phone: string;
    relationship: string;
    position: string;
    institution: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    yearsKnown: string;
  }[];
  
  // Documents
  transcripts: File | null;
  resume: File | null;
  identificationDoc: File | null;
  additionalDocuments: File[];
  
  // Legal
  criminalRecord: boolean;
  criminalDetails: string;
  disciplinaryAction: boolean;
  disciplinaryDetails: string;
  legalDeclaration: boolean;
  backgroundCheckConsent: boolean;
  fingerprintConsent: boolean;
  
  // Additional Info
  specialAccommodations: string;
  languages: string[];
  certifications: {
    name: string;
    issuer: string;
    dateIssued: string;
    expirationDate: string;
  }[];
  publications: {
    title: string;
    publisher: string;
    date: string;
    url: string;
  }[];
  professionalMemberships: {
    organization: string;
    membershipNumber: string;
    startDate: string;
    endDate: string;
  }[];
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
    label: 'Additional Information',
    icon: <InfoIcon />,
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
    label: 'Review & Submit',
    icon: <CheckIcon />,
  },
];

const ApplicationFlow: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const selectedLicense = useSelector((state: any) => state.application.selectedLicense);
  const [activeStep, setActiveStep] = useState(0);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [processingApplication, setProcessingApplication] = useState(false);
  const [showError, setShowError] = useState(false);

  // Redirect if no license is selected
  React.useEffect(() => {
    if (!selectedLicense) {
      navigate('/license-search');
    }
  }, [selectedLicense, navigate]);

  const formik = useFormik({
    initialValues: {
      licenseTypeId: selectedLicense?.id || '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      dateOfBirth: '',
      ssn: '',
      gender: '',
      citizenship: '',
      immigrationStatus: '',
      immigrationNumber: '',
      education: [{
        institution: '',
      degree: '',
      graduationYear: '',
        field: '',
      gpa: '',
        credits: '',
        major: '',
        minor: '',
        honors: '',
        thesis: ''
      }],
      workExperience: [{
      employer: '',
      position: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
        supervisor: '',
        supervisorEmail: '',
        supervisorPhone: '',
        address: '',
        city: '',
        state: '',
        zipCode: ''
      }],
      references: [{
        name: '',
        email: '',
        phone: '',
        relationship: '',
        position: '',
        institution: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        yearsKnown: ''
      }],
      transcripts: null,
      resume: null,
      identificationDoc: null,
      additionalDocuments: [],
      criminalRecord: false,
      criminalDetails: '',
      disciplinaryAction: false,
      disciplinaryDetails: '',
      legalDeclaration: false,
      backgroundCheckConsent: false,
      fingerprintConsent: false,
      specialAccommodations: '',
      languages: [],
      certifications: [{
        name: '',
        issuer: '',
        dateIssued: '',
        expirationDate: ''
      }],
      publications: [{
        title: '',
        publisher: '',
        date: '',
        url: ''
      }],
      professionalMemberships: [{
        organization: '',
        membershipNumber: '',
        startDate: '',
        endDate: ''
      }]
    },
    validationSchema: Yup.object({
      licenseTypeId: Yup.string(),
      firstName: Yup.string(),
      lastName: Yup.string(),
      email: Yup.string(),
      phone: Yup.string(),
      address: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      zipCode: Yup.string(),
      dateOfBirth: Yup.date(),
      ssn: Yup.string(),
      gender: Yup.string(),
      citizenship: Yup.string(),
      immigrationStatus: Yup.string(),
      immigrationNumber: Yup.string(),
    }),
    onSubmit: async (values) => {
      console.log('=== Formik onSubmit Started ===');
      try {
        console.log('Form values:', values);
        console.log('Selected license:', selectedLicense);
        
        setProcessingApplication(true);
        console.log('Processing application set to true');

        const applicationData: Partial<LicenseApplication> = {
          licenseTypeId: selectedLicense?.id || 'default_license',
          status: 'draft', // Start as draft
          personalInfo: {
            firstName: values.firstName || '',
            lastName: values.lastName || '',
            email: values.email || 'default@example.com',
            phone: values.phone || '0000000000',
            address: values.address || '',
            city: values.city || '',
            state: values.state || '',
            zipCode: values.zipCode || '',
            dateOfBirth: new Date(),
            ssn: values.ssn || '',
            gender: values.gender || 'prefer_not_to_say',
            citizenship: values.citizenship || 'not_specified',
            immigrationStatus: values.immigrationStatus || 'not_applicable',
            immigrationNumber: values.immigrationNumber || ''
          },
          education: values.education?.map(edu => ({
            institution: edu.institution || '',
            degree: edu.degree || '',
            graduationYear: parseInt(edu.graduationYear) || 0,
            field: edu.field || '',
            gpa: parseFloat(edu.gpa) || 0,
            credits: parseInt(edu.credits) || 0,
            major: edu.major || '',
            minor: edu.minor || '',
            honors: edu.honors || '',
            thesis: edu.thesis || ''
          })) || [],
          workExperience: values.workExperience?.map(work => ({
            employer: work.employer || '',
            position: work.position || '',
            startDate: work.startDate ? new Date(work.startDate) : new Date(),
            endDate: work.endDate ? new Date(work.endDate) : new Date(), // Set to current date if null
            responsibilities: work.responsibilities || '',
            supervisor: work.supervisor || '',
            supervisorEmail: work.supervisorEmail || '',
            supervisorPhone: work.supervisorPhone || '',
            address: work.address || '',
            city: work.city || '',
            state: work.state || '',
            zipCode: work.zipCode || ''
          })) || [],
        };
        
        console.log('Creating application with data:', JSON.stringify(applicationData, null, 2));
        
        // First create the application
        const createResponse = await applicationApi.createApplication(applicationData);
        if (!createResponse.data || (!createResponse.data.id && !createResponse.data._id)) {
          throw new Error('Failed to create application: No application ID received');
        }
        console.log('Application created:', createResponse.data);
        
        // Then submit it using the received ID
        const applicationId = createResponse.data._id || createResponse.data.id;
        const submitResponse = await applicationApi.submitApplication(applicationId);
        if (!submitResponse.data || submitResponse.data.status !== 'submitted') {
          throw new Error('Application submission failed: Status not updated to submitted');
        }
        console.log('Application submitted:', submitResponse.data);
        
        setShowSuccess(true);

        // Extract application number and navigate
        const applicationNumber = submitResponse.data.applicationNumber;
        console.log('Navigating to success page with application number:', applicationNumber);
        navigate(`/application-success/${applicationNumber}`);
      } catch (error) {
        console.error('=== Submission Error ===');
        console.error('Error details:', error);
        setShowError(true);
      } finally {
        setProcessingApplication(false);
        console.log('=== Formik onSubmit Ended ===');
      }
    },
  });

  const handleNext = () => {
    console.log('=== Handle Next Called ===');
    console.log('Current activeStep:', activeStep);
    console.log('Total steps:', steps.length - 1);
    console.log('Is final step?:', activeStep === steps.length - 1);
    
    if (activeStep === steps.length - 1) {
      console.log('On final step, triggering form submission');
      console.log('Form values:', formik.values);
      console.log('Form is submitting?:', formik.isSubmitting);
      console.log('Form is valid?:', formik.isValid);
      console.log('Form errors:', formik.errors);
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

  const renderStepContent = (step: number) => {
    const commonCardProps = {
      variant: "outlined" as const,
      sx: { 
        mb: 2, 
        borderRadius: 2,
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }
      }
    };

    const commonTextFieldProps = {
      size: "medium" as const,
      sx: { 
        '& .MuiOutlinedInput-root': {
          borderRadius: 1
        }
      }
    };

    const sectionHeading = (title: string) => (
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          mb: 3,
          pb: 1,
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          display: 'inline-block'
        }}
      >
        {title}
      </Typography>
    );

    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {sectionHeading("Personal Information")}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                label="State"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                label="ZIP Code"
                name="zipCode"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="SSN"
                name="ssn"
                value={formik.values.ssn}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  label="Gender"
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                  <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Citizenship</InputLabel>
                <Select
                  name="citizenship"
                  value={formik.values.citizenship}
                  onChange={formik.handleChange}
                  label="Citizenship"
                >
                  <MenuItem value="us_citizen">US Citizen</MenuItem>
                  <MenuItem value="permanent_resident">Permanent Resident</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Immigration Status</InputLabel>
                <Select
                  name="immigrationStatus"
                  value={formik.values.immigrationStatus}
                  onChange={formik.handleChange}
                  label="Immigration Status"
                >
                  <MenuItem value="not_applicable">Not Applicable</MenuItem>
                  <MenuItem value="permanent_resident">Permanent Resident</MenuItem>
                  <MenuItem value="h1b">H1-B</MenuItem>
                  <MenuItem value="f1">F-1</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Immigration Number"
                name="immigrationNumber"
                value={formik.values.immigrationNumber}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {sectionHeading("Education Details")}
            </Grid>
            {formik.values.education.map((edu, index) => (
              <Grid container item xs={12} spacing={3} key={index}>
                <Grid item xs={12}>
                  <Card {...commonCardProps}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                        Education {index + 1}
                      </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                            required
                fullWidth
                            label="Institution"
                            name={`education.${index}.institution`}
                            value={edu.institution}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                            required
                fullWidth
                label="Degree"
                            name={`education.${index}.degree`}
                            value={edu.degree}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                            required
                            fullWidth
                            label="Major"
                            name={`education.${index}.major`}
                            value={edu.major}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Minor"
                            name={`education.${index}.minor`}
                            value={edu.minor}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Field of Study"
                            name={`education.${index}.field`}
                            value={edu.field}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="GPA"
                            name={`education.${index}.gpa`}
                            value={edu.gpa}
                            onChange={formik.handleChange}
                            type="number"
                            inputProps={{ step: "0.01", min: "0", max: "4.0" }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Credits Completed"
                            name={`education.${index}.credits`}
                            value={edu.credits}
                            onChange={formik.handleChange}
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                fullWidth
                label="Graduation Year"
                            name={`education.${index}.graduationYear`}
                            value={edu.graduationYear}
                onChange={formik.handleChange}
                            type="number"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Honors"
                            name={`education.${index}.honors`}
                            value={edu.honors}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Thesis Title"
                            name={`education.${index}.thesis`}
                            value={edu.thesis}
                            onChange={formik.handleChange}
                            multiline
                            rows={2}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() => {
                  const newEducation = [...formik.values.education];
                  newEducation.push({
                    institution: '',
                    degree: '',
                    graduationYear: '',
                    field: '',
                    gpa: '',
                    credits: '',
                    major: '',
                    minor: '',
                    honors: '',
                    thesis: ''
                  });
                  formik.setFieldValue('education', newEducation);
                }}
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
              >
                Add Education
              </Button>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {sectionHeading("Work Experience")}
            </Grid>
            {formik.values.workExperience.map((work, index) => (
              <Grid container item xs={12} spacing={3} key={index}>
                <Grid item xs={12}>
                  <Card {...commonCardProps}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                        Work Experience {index + 1}
                      </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                            required
                fullWidth
                            label="Employer"
                            name={`workExperience.${index}.employer`}
                            value={work.employer}
                onChange={formik.handleChange}
              />
            </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Position"
                            name={`workExperience.${index}.position`}
                            value={work.position}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Start Date"
                            name={`workExperience.${index}.startDate`}
                            type="date"
                            value={work.startDate}
                            onChange={formik.handleChange}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="End Date"
                            name={`workExperience.${index}.endDate`}
                            type="date"
                            value={work.endDate}
                            onChange={formik.handleChange}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            label="Responsibilities"
                            name={`workExperience.${index}.responsibilities`}
                            value={work.responsibilities}
                            onChange={formik.handleChange}
                            multiline
                            rows={3}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Supervisor Name"
                            name={`workExperience.${index}.supervisor`}
                            value={work.supervisor}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Supervisor Email"
                            name={`workExperience.${index}.supervisorEmail`}
                            value={work.supervisorEmail}
                            onChange={formik.handleChange}
                            type="email"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Supervisor Phone"
                            name={`workExperience.${index}.supervisorPhone`}
                            value={work.supervisorPhone}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            label="Work Address"
                            name={`workExperience.${index}.address`}
                            value={work.address}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="City"
                            name={`workExperience.${index}.city`}
                            value={work.city}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            required
                            fullWidth
                            label="State"
                            name={`workExperience.${index}.state`}
                            value={work.state}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            required
                            fullWidth
                            label="ZIP Code"
                            name={`workExperience.${index}.zipCode`}
                            value={work.zipCode}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() => {
                  const newWorkExperience = [...formik.values.workExperience];
                  newWorkExperience.push({
                    employer: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    responsibilities: '',
                    supervisor: '',
                    supervisorEmail: '',
                    supervisorPhone: '',
                    address: '',
                    city: '',
                    state: '',
                    zipCode: ''
                  });
                  formik.setFieldValue('workExperience', newWorkExperience);
                }}
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
              >
                Add Work Experience
              </Button>
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {sectionHeading("Professional References")}
            </Grid>
            {formik.values.references.map((reference, index) => (
              <Grid container item xs={12} spacing={3} key={index}>
                <Grid item xs={12}>
                  <Card {...commonCardProps}>
                  <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                      Reference {index + 1}
                    </Typography>
                      <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            required
                          fullWidth
                          label="Name"
                          name={`references.${index}.name`}
                          value={reference.name}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            required
                          fullWidth
                          label="Email"
                          name={`references.${index}.email`}
                          value={reference.email}
                          onChange={formik.handleChange}
                            type="email"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            required
                          fullWidth
                          label="Phone"
                          name={`references.${index}.phone`}
                          value={reference.phone}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            required
                          fullWidth
                          label="Relationship"
                          name={`references.${index}.relationship`}
                          value={reference.relationship}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Position"
                            name={`references.${index}.position`}
                            value={reference.position}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Institution"
                            name={`references.${index}.institution`}
                            value={reference.institution}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            label="Address"
                            name={`references.${index}.address`}
                            value={reference.address}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="City"
                            name={`references.${index}.city`}
                            value={reference.city}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            required
                            fullWidth
                            label="State"
                            name={`references.${index}.state`}
                            value={reference.state}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <TextField
                            required
                            fullWidth
                            label="ZIP Code"
                            name={`references.${index}.zipCode`}
                            value={reference.zipCode}
                            onChange={formik.handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            required
                            fullWidth
                            label="Years Known"
                            name={`references.${index}.yearsKnown`}
                            value={reference.yearsKnown}
                            onChange={formik.handleChange}
                            type="number"
                          />
                        </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                </Grid>
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
                    position: '',
                    institution: '',
                    address: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    yearsKnown: ''
                  });
                  formik.setFieldValue('references', newReferences);
                }}
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
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
              {sectionHeading("Additional Information")}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Special Accommodations"
                name="specialAccommodations"
                value={formik.values.specialAccommodations}
                onChange={formik.handleChange}
                multiline
                rows={3}
                helperText="Please describe any special accommodations you require"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Languages</InputLabel>
                <Select
                  multiple
                  name="languages"
                  value={formik.values.languages}
                  onChange={formik.handleChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="spanish">Spanish</MenuItem>
                  <MenuItem value="french">French</MenuItem>
                  <MenuItem value="german">German</MenuItem>
                  <MenuItem value="chinese">Chinese</MenuItem>
                  <MenuItem value="japanese">Japanese</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            {/* Certifications */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>Certifications</Typography>
              {formik.values.certifications.map((cert, index) => (
                <Card {...commonCardProps}>
                <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Certification Name"
                          name={`certifications.${index}.name`}
                          value={cert.name}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Issuing Organization"
                          name={`certifications.${index}.issuer`}
                          value={cert.issuer}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Date Issued"
                          type="date"
                          name={`certifications.${index}.dateIssued`}
                          value={cert.dateIssued}
                          onChange={formik.handleChange}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Expiration Date"
                          type="date"
                          name={`certifications.${index}.expirationDate`}
                          value={cert.expirationDate}
                          onChange={formik.handleChange}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
              <Button
                variant="outlined"
                onClick={() => {
                  const newCertifications = [...formik.values.certifications];
                  newCertifications.push({
                    name: '',
                    issuer: '',
                    dateIssued: '',
                    expirationDate: ''
                  });
                  formik.setFieldValue('certifications', newCertifications);
                }}
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
              >
                Add Certification
              </Button>
            </Grid>

            {/* Publications */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>Publications</Typography>
              {formik.values.publications.map((pub, index) => (
                <Card {...commonCardProps}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Publication Title"
                          name={`publications.${index}.title`}
                          value={pub.title}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Publisher"
                          name={`publications.${index}.publisher`}
                          value={pub.publisher}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Publication Date"
                          type="date"
                          name={`publications.${index}.date`}
                          value={pub.date}
                          onChange={formik.handleChange}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="URL"
                          name={`publications.${index}.url`}
                          value={pub.url}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
              <Button
                variant="outlined"
                onClick={() => {
                  const newPublications = [...formik.values.publications];
                  newPublications.push({
                    title: '',
                    publisher: '',
                    date: '',
                    url: ''
                  });
                  formik.setFieldValue('publications', newPublications);
                }}
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
              >
                Add Publication
              </Button>
            </Grid>

            {/* Professional Memberships */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>Professional Memberships</Typography>
              {formik.values.professionalMemberships.map((mem, index) => (
                <Card {...commonCardProps}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Organization"
                          name={`professionalMemberships.${index}.organization`}
                          value={mem.organization}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Membership Number"
                          name={`professionalMemberships.${index}.membershipNumber`}
                          value={mem.membershipNumber}
                          onChange={formik.handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Start Date"
                          type="date"
                          name={`professionalMemberships.${index}.startDate`}
                          value={mem.startDate}
                          onChange={formik.handleChange}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="End Date"
                          type="date"
                          name={`professionalMemberships.${index}.endDate`}
                          value={mem.endDate}
                          onChange={formik.handleChange}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
              <Button
                variant="outlined"
                onClick={() => {
                  const newMemberships = [...formik.values.professionalMemberships];
                  newMemberships.push({
                    organization: '',
                    membershipNumber: '',
                    startDate: '',
                    endDate: ''
                  });
                  formik.setFieldValue('professionalMemberships', newMemberships);
                }}
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
              >
                Add Professional Membership
              </Button>
            </Grid>
          </Grid>
        );

      case 5:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {sectionHeading("Document Upload")}
            </Grid>
            <Grid item xs={12}>
              <Card {...commonCardProps}>
                <CardContent>
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
                          ) : 'PDF or scanned copy required'
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
                    <ListItem>
                      <ListItemIcon>
                        <UploadIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Resume/CV"
                        secondary={
                          uploadProgress.resume ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CircularProgress
                                variant="determinate"
                                value={uploadProgress.resume}
                                size={20}
                              />
                              <Typography variant="body2">
                                {uploadProgress.resume}%
                              </Typography>
                            </Box>
                          ) : 'PDF format required'
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
                          accept=".pdf"
                          onChange={handleFileUpload('resume')}
                        />
                      </Button>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <UploadIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Government-Issued ID"
                        secondary={
                          uploadProgress.identificationDoc ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CircularProgress
                                variant="determinate"
                                value={uploadProgress.identificationDoc}
                                size={20}
                              />
                              <Typography variant="body2">
                                {uploadProgress.identificationDoc}%
                              </Typography>
                            </Box>
                          ) : 'Passport, Driver\'s License, or State ID'
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
                          onChange={handleFileUpload('identificationDoc')}
                        />
                      </Button>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>Additional Documents</Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
              >
                Upload Additional Documents
                <input
                  type="file"
                  hidden
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(event) => {
                    const files = Array.from(event.target.files || []);
                    formik.setFieldValue('additionalDocuments', [
                      ...formik.values.additionalDocuments,
                      ...files
                    ]);
                  }}
                />
              </Button>
              <List>
                {formik.values.additionalDocuments.map((file: File, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <DocumentIcon />
                    </ListItemIcon>
                    <ListItemText primary={file.name} secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        );

      case 6:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {sectionHeading("Legal Declarations")}
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Please read and acknowledge the following declarations carefully. Providing false information may result in the rejection of your application.
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formik.values.criminalRecord}
                          onChange={formik.handleChange}
                          name="criminalRecord"
                        />
                      }
                      label="Have you ever been convicted of a crime?"
                    />
                    {formik.values.criminalRecord && (
                      <TextField
                        fullWidth
                        label="Please provide details"
                        name="criminalDetails"
                        value={formik.values.criminalDetails}
                        onChange={formik.handleChange}
                        multiline
                        rows={3}
                        sx={{ mt: 2 }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formik.values.disciplinaryAction}
                          onChange={formik.handleChange}
                          name="disciplinaryAction"
                        />
                      }
                      label="Have you ever been subject to disciplinary action by a licensing board or professional organization?"
                    />
                    {formik.values.disciplinaryAction && (
                      <TextField
                        fullWidth
                        label="Please provide details"
                        name="disciplinaryDetails"
                        value={formik.values.disciplinaryDetails}
                        onChange={formik.handleChange}
                        multiline
                        rows={3}
                        sx={{ mt: 2 }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          required
                          checked={formik.values.legalDeclaration}
                          onChange={formik.handleChange}
                          name="legalDeclaration"
                        />
                      }
                      label="I declare that all information provided in this application is true and accurate to the best of my knowledge."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          required
                          checked={formik.values.backgroundCheckConsent}
                          onChange={formik.handleChange}
                          name="backgroundCheckConsent"
                        />
                      }
                      label="I consent to a background check as part of the application process."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          required
                          checked={formik.values.fingerprintConsent}
                          onChange={formik.handleChange}
                          name="fingerprintConsent"
                        />
                      }
                      label="I consent to provide fingerprints for verification purposes if required."
                    />
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 7:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {sectionHeading("Review & Submit")}
            </Grid>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 3 }}>
                Please review your application carefully before submitting. Once submitted, you cannot make changes without contacting the licensing board.
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Card {...commonCardProps}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Application Summary</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Personal Information</Typography>
                      <Typography>
                        {formik.values.firstName} {formik.values.lastName}
                  </Typography>
                      <Typography>{formik.values.email}</Typography>
                      <Typography>{formik.values.phone}</Typography>
                      <Typography>
                        {formik.values.address}, {formik.values.city}, {formik.values.state} {formik.values.zipCode}
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Education</Typography>
                      {formik.values.education.map((edu, index) => (
                        <Typography key={index}>
                          {edu.degree} in {edu.major} from {edu.institution} ({edu.graduationYear})
                        </Typography>
                      ))}
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">Work Experience</Typography>
                      {formik.values.workExperience.map((work, index) => (
                        <Typography key={index}>
                          {work.position} at {work.employer} ({work.startDate} - {work.endDate || 'Present'})
                        </Typography>
                      ))}
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">References</Typography>
                      {formik.values.references.map((ref, index) => (
                        <Typography key={index}>
                          {ref.name} - {ref.position} at {ref.institution}
                        </Typography>
                      ))}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card {...commonCardProps}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Payment Details</Typography>
                  <Typography variant="body1" gutterBottom>
                    Application Fee: ${(selectedLicense ? selectedLicense.fee : 0).toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Payment will be processed securely through our payment provider.
                  </Typography>
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
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', py: 3 }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Left Sidebar with Steps */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ 
              p: 2, 
              position: 'sticky', 
              top: 20,
              borderRadius: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h6" gutterBottom sx={{ pl: 1, mb: 2 }}>
                Application Progress
              </Typography>
              <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
                    <StepLabel 
                      StepIconComponent={() => (
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          color: activeStep >= index ? 'primary.main' : 'text.disabled'
                        }}>
                          {step.icon}
                        </Box>
                      )}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: activeStep === index ? 600 : 400,
                          color: activeStep === index ? 'primary.main' : 'text.primary'
                        }}
                      >
                {step.label}
                      </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ 
              p: { xs: 2, md: 4 }, 
              borderRadius: 2,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              minHeight: '600px'
            }}>
        <form onSubmit={(e) => { 
          console.log('=== Form Submit Event Triggered ===');
          console.log('Event:', e);
          e.preventDefault(); 
          console.log('Default prevented, calling formik.handleSubmit()');
          formik.handleSubmit(e); 
          console.log('formik.handleSubmit() called');
        }}>
          {selectedLicense ? (
            <>
              {renderStepContent(activeStep)}
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Please select a license to apply for
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/license-search')}
                sx={{ mt: 2 }}
              >
                Browse Licenses
              </Button>
            </Box>
          )}
          
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  mt: 4,
                  pt: 3,
                  borderTop: '1px solid',
                  borderColor: 'divider'
                }}>
            {activeStep > 0 && (
                    <Button 
                      onClick={handleBack} 
                      sx={{ 
                        mr: 1,
                        px: 4
                      }}
                      variant="outlined"
                    >
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
                    sx={{ 
                      px: 4,
                      py: 1
                    }}
            >
              {activeStep === steps.length - 1 ? 'Submit Application' : 'Next'}
            </Button>
          </Box>
        </form>
      </Paper>

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

      {/* Error Notification */}
      {showError && (
        <Alert
          severity="error"
                sx={{ 
                  mt: 2, 
                  mb: 2,
                  borderRadius: 2
                }}
          onClose={() => setShowError(false)}
        >
          An error occurred while submitting your application. Please try again.
        </Alert>
      )}
          </Grid>
        </Grid>
    </Container>
    </Box>
  );
};

export default ApplicationFlow; 