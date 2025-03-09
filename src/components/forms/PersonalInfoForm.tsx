import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { FormField } from '../common/FormField';
import { useFormValidation } from '../../hooks/useFormValidation';
import { PersonalInfo } from '../../types/license';

interface PersonalInfoFormProps {
    onSubmit: (data: PersonalInfo) => void;
    initialData?: PersonalInfo;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState<PersonalInfo>(initialData || {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        ssn: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'USA'
        }
    });

    const { validateForm, getFieldError, clearErrors } = useFormValidation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData((prev: PersonalInfo) => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData((prev: PersonalInfo) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        
        const validationResult = validateForm(formData);
        if (validationResult.isValid) {
            onSubmit(formData);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h6" gutterBottom>
                Personal Information
            </Typography>
            
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormField
                        name="firstName"
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={getFieldError('firstName')}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormField
                        name="lastName"
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={getFieldError('lastName')}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormField
                        name="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={getFieldError('email')}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormField
                        name="phone"
                        label="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={getFieldError('phone')}
                        placeholder="XXX-XXX-XXXX"
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormField
                        name="ssn"
                        label="Social Security Number"
                        value={formData.ssn}
                        onChange={handleChange}
                        error={getFieldError('ssn')}
                        placeholder="XXX-XX-XXXX"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                        Address
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <FormField
                        name="address.street"
                        label="Street Address"
                        value={formData.address.street}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormField
                        name="address.city"
                        label="City"
                        value={formData.address.city}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormField
                        name="address.state"
                        label="State"
                        value={formData.address.state}
                        onChange={handleChange}
                        error={getFieldError('address.state')}
                        placeholder="MO"
                    />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormField
                        name="address.zipCode"
                        label="ZIP Code"
                        value={formData.address.zipCode}
                        onChange={handleChange}
                        error={getFieldError('address.zipCode')}
                        placeholder="XXXXX"
                    />
                </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Save & Continue
                </Button>
            </Box>
        </Box>
    );
}; 