package com.licensing.portal.repository;

import com.licensing.portal.model.WorkExperience;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface WorkExperienceRepository extends MongoRepository<WorkExperience, String> {
    Optional<WorkExperience> findByApplicationId(String applicationId);
} 