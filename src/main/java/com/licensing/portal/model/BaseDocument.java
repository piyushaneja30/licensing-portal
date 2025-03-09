package com.licensing.portal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public abstract class BaseDocument {
    @Id
    private String id;
    
    private String applicationId;
    private String userId;
    private String status;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
} 