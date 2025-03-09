import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface FormFieldProps extends Omit<TextFieldProps, 'error' | 'helperText'> {
    name: string;
    error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({ name, error, ...props }) => {
    return (
        <TextField
            {...props}
            name={name}
            error={!!error}
            helperText={error}
            fullWidth
            margin="normal"
            sx={{
                '& .MuiFormHelperText-root': {
                    color: error ? 'error.main' : 'text.secondary',
                    marginLeft: 0,
                    marginTop: '4px'
                }
            }}
        />
    );
}; 