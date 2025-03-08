import React from 'react';
import {
  Grid,
  TextField,
  FormHelperText,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

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

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .test('phone', 'Invalid phone number', (value) => {
      if (!value) return false;
      const phoneNumber = parsePhoneNumberFromString(value, 'US');
      return phoneNumber ? phoneNumber.isValid() : false;
    }),
  dateOfBirth: Yup.date()
    .required('Date of birth is required')
    .max(new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000), 'Must be at least 18 years old'),
  ssn: Yup.string()
    .required('SSN is required')
    .matches(/^\d{3}-\d{2}-\d{4}$/, 'Invalid SSN format (XXX-XX-XXXX)'),
  address: Yup.object({
    street: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string()
      .required('ZIP code is required')
      .matches(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format'),
    country: Yup.string().required('Country is required'),
  }),
});

interface PersonalInfoStepProps {
  initialValues: PersonalInfo | null;
  onSave: (values: PersonalInfo) => void;
}

const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ initialValues, onSave }) => {
  const [showSSN, setShowSSN] = React.useState(false);

  const formik = useFormik<PersonalInfo>({
    initialValues: initialValues || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: null,
      ssn: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
      },
    },
    validationSchema,
    onSubmit: onSave,
  });

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = parsePhoneNumberFromString(value, 'US');
    return phoneNumber ? phoneNumber.format('NATIONAL') : value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    formik.setFieldValue('phone', formatted);
  };

  const formatSSN = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
  };

  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSSN(e.target.value);
    formik.setFieldValue('ssn', formatted);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            value={formik.values.phone}
            onChange={handlePhoneChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            placeholder="(XXX) XXX-XXXX"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Date of Birth"
            value={formik.values.dateOfBirth}
            onChange={(value) => formik.setFieldValue('dateOfBirth', value)}
            slotProps={{
              textField: {
                fullWidth: true,
                error: formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth),
                helperText: formik.touched.dateOfBirth && formik.errors.dateOfBirth as string,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="ssn"
            name="ssn"
            label="Social Security Number"
            type={showSSN ? 'text' : 'password'}
            value={formik.values.ssn}
            onChange={handleSSNChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ssn && Boolean(formik.errors.ssn)}
            helperText={formik.touched.ssn && formik.errors.ssn}
            placeholder="XXX-XX-XXXX"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowSSN(!showSSN)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showSSN ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormHelperText>Format: XXX-XX-XXXX</FormHelperText>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="address.street"
            name="address.street"
            label="Street Address"
            value={formik.values.address.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.address?.street && Boolean(formik.errors.address?.street)
            }
            helperText={
              formik.touched.address?.street && formik.errors.address?.street
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="address.city"
            name="address.city"
            label="City"
            value={formik.values.address.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
            helperText={formik.touched.address?.city && formik.errors.address?.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="address.state"
            name="address.state"
            label="State"
            value={formik.values.address.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.address?.state && Boolean(formik.errors.address?.state)
            }
            helperText={
              formik.touched.address?.state && formik.errors.address?.state
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="address.zipCode"
            name="address.zipCode"
            label="ZIP Code"
            value={formik.values.address.zipCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.address?.zipCode &&
              Boolean(formik.errors.address?.zipCode)
            }
            helperText={
              formik.touched.address?.zipCode && formik.errors.address?.zipCode
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="address.country"
            name="address.country"
            label="Country"
            value={formik.values.address.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.address?.country &&
              Boolean(formik.errors.address?.country)
            }
            helperText={
              formik.touched.address?.country && formik.errors.address?.country
            }
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default PersonalInfoStep; 