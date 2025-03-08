import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  useTheme,
} from '@mui/material';

interface FormStepWrapperProps {
  children: React.ReactNode;
  activeStep: number;
  steps: string[];
  title: string;
  onNext?: () => void;
  onBack?: () => void;
  onSubmit?: () => void;
  isLastStep?: boolean;
  isValid?: boolean;
  isSubmitting?: boolean;
}

const FormStepWrapper: React.FC<FormStepWrapperProps> = ({
  children,
  activeStep,
  steps,
  title,
  onNext,
  onBack,
  onSubmit,
  isLastStep = false,
  isValid = true,
  isSubmitting = false,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: theme => theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #1a237e11, #0d47a111)'
            : 'linear-gradient(45deg, #e3f2fd, #bbdefb33)',
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight={600}>
          {title}
        </Typography>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mt: 3,
            mb: 4,
            '& .MuiStepLabel-label': {
              mt: 1,
              fontSize: '0.875rem',
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4 }}>{children}</Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={onBack}
            disabled={activeStep === 0 || isSubmitting}
            variant="outlined"
            sx={{
              px: 4,
              '&:hover': {
                transform: 'translateX(-4px)',
                transition: 'transform 0.2s ease',
              },
            }}
          >
            Back
          </Button>
          <Button
            onClick={isLastStep ? onSubmit : onNext}
            disabled={!isValid || isSubmitting}
            variant="contained"
            sx={{
              px: 4,
              '&:hover': {
                transform: 'translateX(4px)',
                transition: 'transform 0.2s ease',
              },
            }}
          >
            {isLastStep ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default FormStepWrapper; 