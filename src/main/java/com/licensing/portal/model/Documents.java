package com.licensing.portal.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDateTime;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "documents")
public class Documents extends BaseDocument {
    private List<ApplicationDocument> documents;
    
    @Data
    public static class ApplicationDocument {
        private String type;
        private String name;
        private String url;
        private LocalDateTime uploadDate;
        private String status; // pending, approved, rejected
        private String comments;
    }
} 