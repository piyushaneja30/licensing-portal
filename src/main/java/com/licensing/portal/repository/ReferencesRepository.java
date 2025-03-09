package com.licensing.portal.repository;

import com.licensing.portal.model.References;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ReferencesRepository extends MongoRepository<References, String> {
    Optional<References> findByApplicationId(String applicationId);
} 