import React, { useState } from 'react';
import {
  Box,
  TextField,
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Card,
  CardContent,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CreditCard as CreditCardIcon, Lock as LockIcon } from '@mui/icons-material';

interface PaymentFormProps {
  amount: number;
  onSubmit: (paymentData: any) => Promise<void>;
  onCancel: () => void;
  processing: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  onSubmit,
  onCancel,
  processing,
}) => {
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      cardName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .required('Required')
        .matches(/^[0-9]{16}$/, 'Must be 16 digits'),
      cardName: Yup.string()
        .required('Required')
        .min(2, 'Must be at least 2 characters'),
      expiryMonth: Yup.string()
        .required('Required'),
      expiryYear: Yup.string()
        .required('Required'),
      cvv: Yup.string()
        .required('Required')
        .matches(/^[0-9]{3,4}$/, 'Must be 3 or 4 digits'),
    }),
    onSubmit: async (values) => {
      try {
        setPaymentError(null);
        await onSubmit(values);
      } catch (error) {
        setPaymentError('Payment processing failed. Please try again.');
      }
    },
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return month < 10 ? `0${month}` : `${month}`;
  });

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto' }}>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CreditCardIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Payment Details</Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Amount to pay: ${amount.toFixed(2)}
          </Typography>

          {paymentError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {paymentError}
            </Alert>
          )}

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={formik.values.cardNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                  helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                  placeholder="1234 5678 9012 3456"
                  inputProps={{
                    maxLength: 16,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  name="cardName"
                  value={formik.values.cardName}
                  onChange={formik.handleChange}
                  error={formik.touched.cardName && Boolean(formik.errors.cardName)}
                  helperText={formik.touched.cardName && formik.errors.cardName}
                />
              </Grid>

              <Grid item xs={12} sm={8}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={formik.touched.expiryMonth && Boolean(formik.errors.expiryMonth)}>
                      <InputLabel>Month</InputLabel>
                      <Select
                        name="expiryMonth"
                        value={formik.values.expiryMonth}
                        onChange={formik.handleChange}
                        label="Month"
                      >
                        {months.map((month) => (
                          <MenuItem key={month} value={month}>
                            {month}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.expiryMonth && formik.errors.expiryMonth && (
                        <FormHelperText>{formik.errors.expiryMonth}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth error={formik.touched.expiryYear && Boolean(formik.errors.expiryYear)}>
                      <InputLabel>Year</InputLabel>
                      <Select
                        name="expiryYear"
                        value={formik.values.expiryYear}
                        onChange={formik.handleChange}
                        label="Year"
                      >
                        {years.map((year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched.expiryYear && formik.errors.expiryYear && (
                        <FormHelperText>{formik.errors.expiryYear}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={formik.values.cvv}
                  onChange={formik.handleChange}
                  error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                  helperText={formik.touched.cvv && formik.errors.cvv}
                  inputProps={{
                    maxLength: 4,
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button onClick={onCancel} disabled={processing}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={processing}
                startIcon={<LockIcon />}
              >
                Pay ${amount.toFixed(2)}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>

      <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <LockIcon fontSize="small" />
        Secured by SSL encryption. Your payment information is safe.
      </Typography>
    </Box>
  );
};

export default PaymentForm; 