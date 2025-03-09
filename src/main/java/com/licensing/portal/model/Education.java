package com.licensing.portal.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDate;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "education")
public class Education extends BaseDocument {
    private List<EducationEntry> educationEntries;
    
    @Data
    public static class EducationEntry {
        private String institution;
        private String degree;
        private String major;
        private LocalDate graduationDate;
        private Double gpa;
    }
} 