package com.licensing.portal.repository;

import com.licensing.portal.model.Documents;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface DocumentsRepository extends MongoRepository<Documents, String> {
    Optional<Documents> findByApplicationId(String applicationId);
} 