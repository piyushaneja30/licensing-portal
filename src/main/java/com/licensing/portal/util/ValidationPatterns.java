package com.licensing.portal.util;

public class ValidationPatterns {
    // Personal Information Patterns
    public static final String NAME_PATTERN = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
    public static final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@(.+)$";
    public static final String PHONE_PATTERN = "^\\+?1?\\s*\\(?[0-9]{3}\\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}$";
    public static final String SSN_PATTERN = "^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$";
    public static final String ZIP_CODE_PATTERN = "^[0-9]{5}(?:-[0-9]{4})?$";
    public static final String STATE_CODE_PATTERN = "^[A-Z]{2}$";

    // Education Patterns
    public static final String GPA_PATTERN = "^[0-4](\\.\\d{1,2})?$";
    public static final String DEGREE_PATTERN = "^[A-Za-z. ]{2,50}$";
    public static final String INSTITUTION_PATTERN = "^[A-Za-z0-9., ]{2,100}$";

    // Work Experience Patterns
    public static final String COMPANY_NAME_PATTERN = "^[A-Za-z0-9., &'-]{2,100}$";
    public static final String POSITION_PATTERN = "^[A-Za-z0-9., &'-]{2,50}$";
    public static final String DATE_PATTERN = "^\\d{4}-\\d{2}-\\d{2}$";

    // Document Patterns
    public static final String URL_PATTERN = "^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?$";
    public static final String FILE_NAME_PATTERN = "^[\\w\\-. ]+$";

    // Error Messages
    public static class ErrorMessages {
        public static final String INVALID_NAME = "Name should only contain letters, spaces, and basic punctuation";
        public static final String INVALID_EMAIL = "Please enter a valid email address";
        public static final String INVALID_PHONE = "Phone number should be in format: XXX-XXX-XXXX or (XXX) XXX-XXXX";
        public static final String INVALID_SSN = "SSN should be in format: XXX-XX-XXXX";
        public static final String INVALID_ZIP = "ZIP code should be in format: XXXXX or XXXXX-XXXX";
        public static final String INVALID_STATE = "State should be a two-letter code (e.g., MO)";
        public static final String INVALID_GPA = "GPA should be between 0.00 and 4.00";
        public static final String INVALID_DEGREE = "Degree name contains invalid characters";
        public static final String INVALID_INSTITUTION = "Institution name contains invalid characters";
        public static final String INVALID_COMPANY = "Company name contains invalid characters";
        public static final String INVALID_POSITION = "Position title contains invalid characters";
        public static final String INVALID_DATE = "Date should be in format: YYYY-MM-DD";
        public static final String INVALID_URL = "Please enter a valid URL";
        public static final String INVALID_FILENAME = "Filename contains invalid characters";
    }
} 