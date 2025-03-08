import React from 'react';
import {
  Grid,
  TextField,
  Button,
  IconButton,
  Card,
  CardContent,
  Typography,
  Box,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useFormik, FieldArray, FormikErrors } from 'formik';
import * as Yup from 'yup';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Education {
  institution: string;
  degree: string;
  major: string;
  graduationDate: Date | null;
  gpa: string;
}

interface EducationFormValues {
  education: Education[];
}

const validationSchema = Yup.object({
  education: Yup.array().of(
    Yup.object({
      institution: Yup.string().required('Institution name is required'),
      degree: Yup.string().required('Degree is required'),
      major: Yup.string().required('Major is required'),
      graduationDate: Yup.date().required('Graduation date is required'),
      gpa: Yup.number()
        .min(0, 'GPA must be at least 0')
        .max(4, 'GPA must be at most 4')
        .required('GPA is required'),
    })
  ).min(1, 'At least one education entry is required'),
});

const degreeOptions = [
  'Bachelor of Science',
  'Bachelor of Engineering',
  'Bachelor of Technology',
  'Master of Science',
  'Master of Engineering',
  'Doctor of Philosophy',
];

const majorOptions = [
  'Aerospace Engineering',
  'Biomedical Engineering',
  'Chemical Engineering',
  'Civil Engineering',
  'Computer Engineering',
  'Electrical Engineering',
  'Environmental Engineering',
  'Industrial Engineering',
  'Mechanical Engineering',
  'Software Engineering',
  'Other',
];

interface EducationStepProps {
  initialValues: EducationFormValues | null;
  onSave: (values: EducationFormValues) => void;
}

const EducationStep: React.FC<EducationStepProps> = ({ initialValues, onSave }) => {
  const formik = useFormik<EducationFormValues>({
    initialValues: initialValues || {
      education: [
        {
          institution: '',
          degree: '',
          major: '',
          graduationDate: null,
          gpa: '',
        },
      ],
    },
    validationSchema,
    onSubmit: onSave,
  });

  const getFieldError = (index: number, field: keyof Education) => {
    const error = formik.errors.education?.[index];
    if (error && typeof error === 'object' && field in error) {
      return (error as FormikErrors<Education>)[field];
    }
    return undefined;
  };

  const getFieldTouched = (index: number, field: keyof Education) => {
    const touched = formik.touched.education?.[index];
    if (touched && typeof touched === 'object' && field in touched) {
      return touched[field as keyof typeof touched];
    }
    return false;
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <FieldArray
        name="education"
        render={(arrayHelpers) => (
          <div>
            {formik.values.education.map((edu, index) => (
              <Card
                key={index}
                sx={{
                  mb: 3,
                  position: 'relative',
                  '&:hover': {
                    '& .delete-button': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        Education #{index + 1}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name={`education.${index}.institution`}
                        label="Institution Name"
                        value={edu.institution}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={getFieldTouched(index, 'institution') && Boolean(getFieldError(index, 'institution'))}
                        helperText={getFieldTouched(index, 'institution') && getFieldError(index, 'institution')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        name={`education.${index}.degree`}
                        label="Degree"
                        value={edu.degree}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={getFieldTouched(index, 'degree') && Boolean(getFieldError(index, 'degree'))}
                        helperText={getFieldTouched(index, 'degree') && getFieldError(index, 'degree')}
                      >
                        {degreeOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        select
                        name={`education.${index}.major`}
                        label="Major"
                        value={edu.major}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={getFieldTouched(index, 'major') && Boolean(getFieldError(index, 'major'))}
                        helperText={getFieldTouched(index, 'major') && getFieldError(index, 'major')}
                      >
                        {majorOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Graduation Date"
                        value={edu.graduationDate}
                        onChange={(value) =>
                          formik.setFieldValue(
                            `education.${index}.graduationDate`,
                            value
                          )
                        }
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: getFieldTouched(index, 'graduationDate') && Boolean(getFieldError(index, 'graduationDate')),
                            helperText: getFieldTouched(index, 'graduationDate') && getFieldError(index, 'graduationDate'),
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name={`education.${index}.gpa`}
                        label="GPA"
                        type="number"
                        inputProps={{ step: '0.01', min: '0', max: '4' }}
                        value={edu.gpa}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={getFieldTouched(index, 'gpa') && Boolean(getFieldError(index, 'gpa'))}
                        helperText={getFieldTouched(index, 'gpa') && getFieldError(index, 'gpa')}
                      />
                    </Grid>
                  </Grid>
                  {formik.values.education.length > 1 && (
                    <IconButton
                      className="delete-button"
                      onClick={() => arrayHelpers.remove(index)}
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                      }}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </CardContent>
              </Card>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                startIcon={<AddIcon />}
                onClick={() =>
                  arrayHelpers.push({
                    institution: '',
                    degree: '',
                    major: '',
                    graduationDate: null,
                    gpa: '',
                  })
                }
                sx={{
                  mt: 2,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s ease',
                  },
                }}
              >
                Add Education
              </Button>
            </Box>
          </div>
        )}
      />
    </form>
  );
};

export default EducationStep; 