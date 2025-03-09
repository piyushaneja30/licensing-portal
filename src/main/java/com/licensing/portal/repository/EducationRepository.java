package com.licensing.portal.repository;

import com.licensing.portal.model.Education;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EducationRepository extends MongoRepository<Education, String> {
    Optional<Education> findByApplicationId(String applicationId);
} 