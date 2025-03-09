package com.licensing.portal.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "applications")
public class Application extends BaseDocument {
    private String licenseTypeId;
    private String submissionDate;
    private String expiryDate;
    
    private Payment payment;
    private ReviewNotes reviewNotes;
    
    @Data
    public static class Payment {
        private Double amount;
        private String status; // pending, completed, failed
        private String transactionId;
        private LocalDateTime paymentDate;
        private String paymentMethod;
    }
    
    @Data
    public static class ReviewNotes {
        private LocalDateTime date;
        private String reviewer;
        private String note;
        private String status;
    }
} 