export const ValidationPatterns = {
    // Personal Information Patterns
    NAME_PATTERN: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
    EMAIL_PATTERN: /^[A-Za-z0-9+_.-]+@(.+)$/,
    PHONE_PATTERN: /^\+?1?\s*\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$/,
    SSN_PATTERN: /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/,
    ZIP_CODE_PATTERN: /^[0-9]{5}(?:-[0-9]{4})?$/,
    STATE_CODE_PATTERN: /^[A-Z]{2}$/,

    // Education Patterns
    GPA_PATTERN: /^[0-4](\.\d{1,2})?$/,
    DEGREE_PATTERN: /^[A-Za-z. ]{2,50}$/,
    INSTITUTION_PATTERN: /^[A-Za-z0-9., ]{2,100}$/,

    // Work Experience Patterns
    COMPANY_NAME_PATTERN: /^[A-Za-z0-9., &'-]{2,100}$/,
    POSITION_PATTERN: /^[A-Za-z0-9., &'-]{2,50}$/,
    DATE_PATTERN: /^\d{4}-\d{2}-\d{2}$/,

    // Document Patterns
    URL_PATTERN: /^(https?:\/\/)?([\\da-z.-]+)\.([a-z.]{2,6})[/\\w .-]*\/?$/,
    FILE_NAME_PATTERN: /^[\w\-. ]+$/
};

export const ValidationMessages = {
    INVALID_NAME: "Name should only contain letters, spaces, and basic punctuation",
    INVALID_EMAIL: "Please enter a valid email address",
    INVALID_PHONE: "Phone number should be in format: XXX-XXX-XXXX or (XXX) XXX-XXXX",
    INVALID_SSN: "SSN should be in format: XXX-XX-XXXX",
    INVALID_ZIP: "ZIP code should be in format: XXXXX or XXXXX-XXXX",
    INVALID_STATE: "State should be a two-letter code (e.g., MO)",
    INVALID_GPA: "GPA should be between 0.00 and 4.00",
    INVALID_DEGREE: "Degree name contains invalid characters",
    INVALID_INSTITUTION: "Institution name contains invalid characters",
    INVALID_COMPANY: "Company name contains invalid characters",
    INVALID_POSITION: "Position title contains invalid characters",
    INVALID_DATE: "Date should be in format: YYYY-MM-DD",
    INVALID_URL: "Please enter a valid URL",
    INVALID_FILENAME: "Filename contains invalid characters"
} as const;

export interface ValidationError {
    field: string;
    message: string;
}

export interface ApiError {
    timestamp: string;
    message: string;
    code: string;
    errors?: ValidationError[];
} 