package com.licensing.portal.model;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "references")
public class References extends BaseDocument {
    private List<Reference> references;
    
    @Data
    public static class Reference {
        private String name;
        private String relationship;
        private String company;
        private String phone;
        private String email;
        private Integer yearsKnown;
    }
} 