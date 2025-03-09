package com.licensing.portal.exception;

public class ApplicationException extends RuntimeException {
    private final String code;

    public ApplicationException(String message, String code) {
        super(message);
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static ApplicationException notFound(String entity, String id) {
        return new ApplicationException(
            String.format("%s with id %s not found", entity, id),
            "NOT_FOUND"
        );
    }

    public static ApplicationException invalidState(String message) {
        return new ApplicationException(message, "INVALID_STATE");
    }

    public static ApplicationException validationError(String message) {
        return new ApplicationException(message, "VALIDATION_ERROR");
    }
} 