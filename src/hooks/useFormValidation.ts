import { useState, useCallback } from 'react';
import { ValidationPatterns, ValidationMessages } from '../types/validation';

interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

export const useFormValidation = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = useCallback((fieldName: string, value: string, pattern: RegExp): boolean => {
        if (!value) return true; // Skip validation for empty optional fields
        return pattern.test(value);
    }, []);

    const validateForm = useCallback((formData: Record<string, any>): ValidationResult => {
        const newErrors: Record<string, string> = {};

        // Personal Information Validation
        if (formData.firstName && !validateField('firstName', formData.firstName, ValidationPatterns.NAME_PATTERN)) {
            newErrors.firstName = ValidationMessages.INVALID_NAME;
        }
        if (formData.lastName && !validateField('lastName', formData.lastName, ValidationPatterns.NAME_PATTERN)) {
            newErrors.lastName = ValidationMessages.INVALID_NAME;
        }
        if (formData.email && !validateField('email', formData.email, ValidationPatterns.EMAIL_PATTERN)) {
            newErrors.email = ValidationMessages.INVALID_EMAIL;
        }
        if (formData.phone && !validateField('phone', formData.phone, ValidationPatterns.PHONE_PATTERN)) {
            newErrors.phone = ValidationMessages.INVALID_PHONE;
        }
        if (formData.ssn && !validateField('ssn', formData.ssn, ValidationPatterns.SSN_PATTERN)) {
            newErrors.ssn = ValidationMessages.INVALID_SSN;
        }

        // Address Validation
        if (formData.address) {
            if (formData.address.zipCode && !validateField('zipCode', formData.address.zipCode, ValidationPatterns.ZIP_CODE_PATTERN)) {
                newErrors['address.zipCode'] = ValidationMessages.INVALID_ZIP;
            }
            if (formData.address.state && !validateField('state', formData.address.state.toUpperCase(), ValidationPatterns.STATE_CODE_PATTERN)) {
                newErrors['address.state'] = ValidationMessages.INVALID_STATE;
            }
        }

        // Education Validation
        if (formData.educationEntries) {
            formData.educationEntries.forEach((entry: any, index: number) => {
                if (entry.institution && !validateField('institution', entry.institution, ValidationPatterns.INSTITUTION_PATTERN)) {
                    newErrors[`educationEntries[${index}].institution`] = ValidationMessages.INVALID_INSTITUTION;
                }
                if (entry.degree && !validateField('degree', entry.degree, ValidationPatterns.DEGREE_PATTERN)) {
                    newErrors[`educationEntries[${index}].degree`] = ValidationMessages.INVALID_DEGREE;
                }
                if (entry.gpa && !validateField('gpa', entry.gpa.toString(), ValidationPatterns.GPA_PATTERN)) {
                    newErrors[`educationEntries[${index}].gpa`] = ValidationMessages.INVALID_GPA;
                }
            });
        }

        // Work Experience Validation
        if (formData.experiences) {
            formData.experiences.forEach((exp: any, index: number) => {
                if (exp.employer && !validateField('employer', exp.employer, ValidationPatterns.COMPANY_NAME_PATTERN)) {
                    newErrors[`experiences[${index}].employer`] = ValidationMessages.INVALID_COMPANY;
                }
                if (exp.position && !validateField('position', exp.position, ValidationPatterns.POSITION_PATTERN)) {
                    newErrors[`experiences[${index}].position`] = ValidationMessages.INVALID_POSITION;
                }
                if (exp.supervisor) {
                    if (exp.supervisor.email && !validateField('email', exp.supervisor.email, ValidationPatterns.EMAIL_PATTERN)) {
                        newErrors[`experiences[${index}].supervisor.email`] = ValidationMessages.INVALID_EMAIL;
                    }
                    if (exp.supervisor.phone && !validateField('phone', exp.supervisor.phone, ValidationPatterns.PHONE_PATTERN)) {
                        newErrors[`experiences[${index}].supervisor.phone`] = ValidationMessages.INVALID_PHONE;
                    }
                }
            });
        }

        // References Validation
        if (formData.references) {
            formData.references.forEach((ref: any, index: number) => {
                if (ref.name && !validateField('name', ref.name, ValidationPatterns.NAME_PATTERN)) {
                    newErrors[`references[${index}].name`] = ValidationMessages.INVALID_NAME;
                }
                if (ref.email && !validateField('email', ref.email, ValidationPatterns.EMAIL_PATTERN)) {
                    newErrors[`references[${index}].email`] = ValidationMessages.INVALID_EMAIL;
                }
                if (ref.phone && !validateField('phone', ref.phone, ValidationPatterns.PHONE_PATTERN)) {
                    newErrors[`references[${index}].phone`] = ValidationMessages.INVALID_PHONE;
                }
                if (ref.company && !validateField('company', ref.company, ValidationPatterns.COMPANY_NAME_PATTERN)) {
                    newErrors[`references[${index}].company`] = ValidationMessages.INVALID_COMPANY;
                }
            });
        }

        setErrors(newErrors);
        return {
            isValid: Object.keys(newErrors).length === 0,
            errors: newErrors
        };
    }, [validateField]);

    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);

    const getFieldError = useCallback((fieldName: string): string | undefined => {
        return errors[fieldName];
    }, [errors]);

    return {
        validateForm,
        validateField,
        clearErrors,
        getFieldError,
        errors
    };
}; 