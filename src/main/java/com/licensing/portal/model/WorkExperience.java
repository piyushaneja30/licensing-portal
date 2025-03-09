package com.licensing.portal.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.time.LocalDate;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "work_experience")
public class WorkExperience extends BaseDocument {
    private List<Experience> experiences;
    
    @Data
    public static class Experience {
        private String employer;
        private String position;
        private LocalDate startDate;
        private LocalDate endDate;
        private boolean current;
        private String responsibilities;
        
        private Supervisor supervisor;
    }
    
    @Data
    public static class Supervisor {
        private String name;
        private String phone;
        private String email;
    }
} 