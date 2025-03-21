import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Alert, Snackbar } from '@mui/material';
import FormStepWrapper from '../FormStepWrapper';
import PersonalInfoStep from './PersonalInfoStep';
import EducationStep from './EducationStep';
import { LICENSE_TYPES, LicenseApplication } from '../../../types/license';
import { submitApplication } from '../../../store/slices/licenseSlice';
import { RootState, AppDispatch } from '../../../store';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: Date | null;
  ssn: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface Education {
  institution: string;
  degree: string;
  major: string;
  graduationDate: Date | null;
  gpa: string;
}

interface FormData {
  personalInfo: PersonalInfo | null;
  education: { education: Education[] } | null;
  documents: LicenseApplication['documents'] | null;
}

const FORM_STEPS = [
  'Personal Information',
  'Education',
  'Documents',
  'Review & Submit',
];

const EngineerInternForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.license);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: null,
    education: null,
    documents: null,
  });
  const [showError, setShowError] = useState(false);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleStepSave = (step: keyof FormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: data,
    }));
    handleNext();
  };

  const handleSubmit = async () => {
    try {
      if (!formData.personalInfo || !formData.education) {
        throw new Error('Please complete all required sections');
      }

      const { dateOfBirth, ...personalInfoWithoutDate } = formData.personalInfo;
      const applicationData: Partial<LicenseApplication> = {
        licenseTypeId: LICENSE_TYPES.ENGINEER_INTERN.id,
        personalInfo: {
          ...personalInfoWithoutDate,
          dateOfBirth: dateOfBirth?.toISOString() || '',
        },
        education: formData.education.education.map(edu => ({
          ...edu,
          graduationDate: edu.graduationDate?.toISOString() || '',
          gpa: parseFloat(edu.gpa),
        })),
        documents: formData.documents || [],
      };

      // Dispatch action to submit application
      await dispatch(submitApplication(applicationData));

      // Navigate to success page
      navigate('/application-submitted');
    } catch (error) {
      console.error('Error submitting application:', error);
      setShowError(true);
    }
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <PersonalInfoStep
            initialValues={formData.personalInfo}
            onSave={(values) => handleStepSave('personalInfo', values)}
          />
        );
      case 1:
        return (
          <EducationStep
            initialValues={formData.education}
            onSave={(values) => handleStepSave('education', values)}
          />
        );
      // Add more steps here
      default:
        return null;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormStepWrapper
        activeStep={activeStep}
        steps={FORM_STEPS}
        title={`Engineer Intern License Application - ${FORM_STEPS[activeStep]}`}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
        isLastStep={activeStep === FORM_STEPS.length - 1}
        isValid={!loading}
        isSubmitting={loading}
      >
        {renderStep()}
      </FormStepWrapper>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error || 'An error occurred while submitting your application. Please try again.'}
        </Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};

export default EngineerInternForm; 